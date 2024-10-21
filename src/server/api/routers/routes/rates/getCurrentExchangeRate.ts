import { publicProcedure } from "@/server/api/trpc";
import { $Enums } from "@prisma/client";
import { z } from "zod";

export const getCurrentExchangeRate = publicProcedure
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
  });
