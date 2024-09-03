import { createTRPCRouter, publicProcedure } from "../trpc";

export const exchangeRatesRouter = createTRPCRouter({
  getCurrentExchangeRate: publicProcedure.query(async ({ ctx }) => {
    const currentExchangeRate = await ctx.db.exchangeRate.findMany({
      orderBy: {
        createdAt: "desc",

      },
      take: 1,
    });

    return currentExchangeRate.at(0);
  }),
});
