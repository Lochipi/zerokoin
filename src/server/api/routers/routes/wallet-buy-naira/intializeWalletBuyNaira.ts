import { publicProcedure } from "@/server/api/trpc";
import initializePaystackTransaction from "@/server/utils/intializePaystackTransaction";
import { z } from "zod";

export const initializeWalletBuyNaira = publicProcedure
  .input(
    z.object({
      orderId: z.string().uuid(),
      paymentEmail: z.string().email(),
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
      const paymentRefrence = await initializePaystackTransaction({
        userPaymentEmail: input.paymentEmail,
        amount: orderInfo.quotedFiatAmount,
      });

      if (paymentRefrence) {
        await ctx.db.order.update({
          where: {
            id: orderInfo.id,
          },
          data: {
            payStackPaymentRefrence: {
              create: {
                refrence: paymentRefrence,
                status: "PENDING",
              },
            },
          },
        });

        return paymentRefrence;
      }
    }
  });
