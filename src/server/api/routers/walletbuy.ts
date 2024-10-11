import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import getAccessToken from "@/server/utils/getAccessToken";
import sendStkPush from "@/server/utils/send-stk-push";
import sendSTKPushQueryRequest from "@/server/utils/query-stk-status";
import { sendStableCoinTokenToWalletAddress } from "@/server/utils/sendtokenstowallet";
import { TRPCError } from "@trpc/server";
import { env } from "@/env";

export const walletBuyOrderRouter = createTRPCRouter({
  intiateWalletBuyOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
        mpesaPaymentNumber: z.string().length(12),
        walletAddress: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const orderDetails = await ctx.db.order.update({
        where: {
          id: input.orderId,
        },
        data: {
          walletAddress: input.walletAddress,
        },
      });
      if (
        orderDetails &&
        orderDetails.walletAdressChoice === "SELFCUSTODIALWALLET"
      ) {
        const mpesaAccessToken = await getAccessToken({
          sandbox: true,
        });
        if (mpesaAccessToken) {
          console.log("FETCHED ACCESS TOKEN", mpesaAccessToken);
          const stkPush = await sendStkPush({
            transactionType: "CustomerPayBillOnline",
            amount:
              process.env.NODE_ENV === "development"
                ? "2"
                : Math.ceil(orderDetails.quotedFiatAmount).toString(),
            partyA: input.mpesaPaymentNumber,
            phoneNumber: input.mpesaPaymentNumber,
            callBackURL: env.MPESA_CTOB_CALLBACK_URL,
            accountReference: "Zerokoin",
            transactionDesc: "Buy Order",
            sandbox: true,
          });

          console.log("SENT STK PUSH", stkPush);
          if (stkPush.ResponseCode === "0") {
            await ctx.db.stkMessage.create({
              data: {
                orderId: input.orderId,
                MerchantRequestID: stkPush.MerchantRequestID,
                CheckoutRequestID: stkPush.CheckoutRequestID,
                phoneNumber: input.mpesaPaymentNumber,
              },
            });
            return "STK SENT";
          } else {
            return undefined;
          }
        }
      }
    }),

  checkWalletBuyOrderSTKpaymentStatus: publicProcedure
    .input(
      z.object({
        orderId: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const orderStkInfo = await ctx.db.order.findUnique({
        where: {
          id: input.orderId,
        },
        select: {
          stkMessage: true,
        },
      });
      if (orderStkInfo?.stkMessage?.CheckoutRequestID) {
        const stkPushResultQuery = await sendSTKPushQueryRequest({
          checkoutRequestID: orderStkInfo.stkMessage.CheckoutRequestID,
          sandbox: true,
        });
        if (stkPushResultQuery.ResultCode === "0") {
          console.log(
            "Confirmed Payment for order",
            stkPushResultQuery.CheckoutRequestID,
          );
          await ctx.db.order.update({
            where: { id: input.orderId },
            data: {
              stkMessage: {
                update: {
                  stkStatus: "SUCCESS",
                },
              },
            },
          });
          return "PAYMENT MADE";
        } else if (stkPushResultQuery.ResultCode === "1032") {
          await ctx.db.order.update({
            where: { id: input.orderId },
            data: {
              status: "CANCELLED",
              stkMessage: {
                update: {
                  stkStatus: "SUCCESS",
                },
              },
            },
          });
          return "PAYMENT CANCELED";
        }
      } else {
        return undefined;
      }
    }),
  intiateOrderSettlement: publicProcedure
    .input(z.object({ orderId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const orderInfo = await ctx.db.order.findUnique({
        where: {
          id: input.orderId,
        },
        include: {
          stkMessage: true,
        },
      });
      if (
        !orderInfo?.txnHash &&
        orderInfo?.status == "PENDING" &&
        orderInfo.stkMessage?.stkStatus == "SUCCESS" &&
        orderInfo.walletAddress
      ) {
        const sentTransaction = await sendStableCoinTokenToWalletAddress({
          toAddress: orderInfo.walletAddress,
          amount: orderInfo.qoutedTokenAmount.toString(),
          stablecoin: "USDC",
        });
        if (sentTransaction) {
          await ctx.db.order.update({
            where: { id: input.orderId },
            data: {
              txnHash: sentTransaction,
            },
          });
        }
        return sentTransaction;
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Cannot intiate settlement for this order",
        });
      }
    }),
  closeOrder: publicProcedure
    .input(
      z.object({
        orderId: z.string().uuid(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db.order.update({
        where: {
          id: input.orderId,
          AND: [
            {
              stkMessage: {
                stkStatus: "SUCCESS",
              },
            },
          ],
        },
        data: {
          status: "COMPLETED",
        },
      });
    }),
});
