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
  .mutation(async ({ input, ctx }) => {
    const orderInfo = await ctx.db.order.findUnique({
      where: {
        id: input.orderId,
        fiatCurrency: "NGN",
      },
    });
    if (orderInfo) {
      const result = await verifyPaystackTransaction({
        transactionReference: input.reference,
      });
      if (result.isSuccess) {
        await ctx.db.order.update({
          where: {
            id: orderInfo.id,
          },
          data: {
            status: "PAYMENTCOMPLETED",
            payStackPaymentRefrence: {
              create: {
                refrence: input.reference,
                status: "SUCCESS",
              },
            },
          },
        });
        return result;
      }
    }
  });
