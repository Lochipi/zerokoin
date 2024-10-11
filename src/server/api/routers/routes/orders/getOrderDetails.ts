import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const getOrderDetails = publicProcedure
  .input(
    z.object({
      orderId: z.string().uuid(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const orderDetails = await ctx.db.order.findUnique({
      where: {
        id: input.orderId,
      },
      include: {
        stkMessage: {
          select: {
            stkStatus: true,
            phoneNumber: true,
          },
        },
      },
    });

    return orderDetails;
  });
