import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const ordersRouter = createTRPCRouter({
  createNewOrder: publicProcedure
    .input(
      z.object({
        orderType: z.enum(["BUY", "SELL"]),
        swapToken: z.string(),
        qoutedTokenAmount: z.number(),
        qoutedFiatAmount: z.number(),
        qoutedExchangeRate: z.number(),
        walletAddressChoice: z.enum([
          "BINANCEWALLETADDRESS",
          "SELFCUSTODIALWALLET",
        ]),
        settlementBlockchain: z.number(),
        walletAddress: z.string().optional(),
        transactionFee: z.number(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const newOrder = await ctx.db.order.create({
        data: {
          orderType: input.orderType,
          swapToken: input.swapToken,
          qoutedTokenAmount: input.qoutedTokenAmount,
          quotedFiatAmount: input.qoutedFiatAmount,
          qoutedExchangeRate: input.qoutedExchangeRate,
          walletAdressChoice: input.walletAddressChoice,
          walletAddress: input.walletAddress,
          transactionFee: input.transactionFee,
          settlementBlockchain: input.settlementBlockchain,
        },
      });

      return newOrder.id;
    }),

  getOderType: publicProcedure
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
    }),

  getOrderDetails: publicProcedure
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
    }),
});
