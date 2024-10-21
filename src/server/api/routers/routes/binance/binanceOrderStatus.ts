import { publicProcedure } from "@/server/api/trpc";
import sendSTKPushQueryRequest from "@/server/utils/query-stk-status";
import { z } from "zod";

export const checkBinanceBuyOrderSTKpaymentStatus = publicProcedure
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
  });
