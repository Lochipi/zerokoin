import { publicProcedure } from "@/server/api/trpc";
import { $Enums } from "@prisma/client";
import { z } from "zod";

export const createNewOrder = publicProcedure
  .input(
    z.object({
      orderType: z.enum(["BUY", "SELL"]),
      swapToken: z.string(),
      fiatCurrency: z.nativeEnum($Enums.SupportedCurrencies),
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
        fiatCurrency: input.fiatCurrency,
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
  });
