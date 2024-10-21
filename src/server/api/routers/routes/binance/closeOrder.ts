import { publicProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const closeOrder = publicProcedure
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
  });
