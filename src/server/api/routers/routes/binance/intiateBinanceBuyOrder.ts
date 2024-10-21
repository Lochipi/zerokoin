import { env } from "@/env";
import { publicProcedure } from "@/server/api/trpc";
import getAccessToken from "@/server/utils/getAccessToken";
import sendStkPush from "@/server/utils/send-stk-push";
import { z } from "zod";

export const intiateBinanceBuyOrder = publicProcedure
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
      orderDetails.walletAdressChoice === "BINANCEWALLETADDRESS"
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
  });
