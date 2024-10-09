import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { $Enums } from "@prisma/client";

export const exchangeRatesRouter = createTRPCRouter({
  getCurrentExchangeRate: publicProcedure
    .input(
      z.object({
        currency: z.nativeEnum($Enums.SupportedCurrencies),
      }),
    )
    .query(async ({ ctx, input }) => {
      const currentExchangeRate = await ctx.db.exchangeRate.findMany({
        where: {
          currency: input.currency,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      });

      return currentExchangeRate.at(0);
    }),
});
