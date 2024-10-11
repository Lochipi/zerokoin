import { publicProcedure } from "@/server/api/trpc";
import { getERC20TransactionInfo } from "@/server/utils/getERC20TransactionInfo";
import { z } from "zod";

export const confirmApprovalSucess = publicProcedure
  .input(
    z.object({
      orderId: z.string().uuid(),
      txHash: z.string(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const orderDetails = await ctx.db.order.findUnique({
      where: {
        id: input.orderId,
      },
    });
    if (orderDetails?.status === "PENDING") {
      const paymentRecieptInfo = await getERC20TransactionInfo(input.txHash);
      if (
        paymentRecieptInfo?.transactionStatus === "success" &&
        paymentRecieptInfo.tokenAmount
      ) {
        await ctx.db.order.update({
          where: {
            id: input.orderId,
          },
          data: {
            status: "PAYMENTCOMPLETED",
          },
        });
        return "PAYMENT_RECIEVED";
      } else {
        return "INVALID_PAYMENT";
      }
    }
  });
