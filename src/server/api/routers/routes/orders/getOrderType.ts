import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const getOderType = publicProcedure
  .input(
    z.object({
      orderId: z.string().uuid(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const orderType = await ctx.db.order.findUnique({
      where: {
        id: input.orderId,
      },
    });

    return {
      walletType: orderType?.walletAdressChoice,
      orderType: orderType?.orderType,
    };
  });
