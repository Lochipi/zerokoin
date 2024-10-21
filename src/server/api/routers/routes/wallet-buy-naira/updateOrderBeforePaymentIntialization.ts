import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const updateOrderBeforePaymentIntialization = publicProcedure
  .input(
    z.object({
      orderId: z.string().uuid(),
      walletAddress: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const updatedOrder = await ctx.db.order.update({
      where: {
        id: input.orderId,
      },
      data: {
        walletAddress: input.walletAddress,
      },
    });
    return updatedOrder.walletAddress;
  });
