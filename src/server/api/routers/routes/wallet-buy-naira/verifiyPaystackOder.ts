import { publicProcedure } from "@/server/api/trpc";
import verifyPaystackTransaction from "@/server/utils/verifyPaystackTransaction";
import { z } from "zod";

export const verifyPaystackOder = publicProcedure
  .input(
    z.object({
      reference: z.string(),
      orderId: z.string().uuid(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const orderInfo = await ctx.db.order.findUnique({
      where: {
        id: input.orderId,
        payStackPaymentRefrence: {
          refrence: input.reference,
        },
      },
      include: {
        payStackPaymentRefrence: true,
      },
    });

    if (orderInfo) {
      const paymentStatus = await verifyPaystackTransaction({
        transactionReference: orderInfo.payStackPaymentRefrence?.refrence ?? "",
      });
      if (paymentStatus.isSuccess) {
        await ctx.db.order.update({
          where: {
            id: input.orderId,
          },
          data: {
            status: "PAYMENTCOMPLETED",
            payStackPaymentRefrence: {
              update: {
                status: "SUCCESS",
              },
            },
          },
        });
        return paymentStatus;
      }
    }
  });
