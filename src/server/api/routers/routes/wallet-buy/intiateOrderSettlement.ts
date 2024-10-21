import { publicProcedure } from "@/server/api/trpc";
import { sendStableCoinTokenToWalletAddress } from "@/server/utils/sendtokenstowallet";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const intiateOrderSettlement = publicProcedure
  .input(z.object({ orderId: z.string().uuid() }))
  .mutation(async ({ ctx, input }) => {
    const orderInfo = await ctx.db.order.findUnique({
      where: {
        id: input.orderId,
      },
      include: {
        stkMessage: true,
      },
    });
    if (
      !orderInfo?.txnHash &&
      orderInfo?.status == "PENDING" &&
      orderInfo.stkMessage?.stkStatus == "SUCCESS" &&
      orderInfo.walletAddress
    ) {
      const sentTransaction = await sendStableCoinTokenToWalletAddress({
        toAddress: orderInfo.walletAddress,
        amount: orderInfo.qoutedTokenAmount.toString(),
        stablecoin: "USDC",
      });
      if (sentTransaction) {
        await ctx.db.order.update({
          where: { id: input.orderId },
          data: {
            txnHash: sentTransaction,
          },
        });
      }
      return sentTransaction;
    } else {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Cannot intiate settlement for this order",
      });
    }
  });
