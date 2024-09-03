import { createTRPCRouter } from "@/server/api/trpc";
import { exchangeRatesRouter } from "./routers/exchangerates";
import { ordersRouter } from "./routers/orders";

import { walletSellOrderRouter } from "./routers/walletsell";
import { walletBuyOrderRouter } from "./routers/walletbuy";
import { BinanceBuyOrderRouter } from "./routers/binancebuy";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  exchangeRates: exchangeRatesRouter,
  orders: ordersRouter,
  walletBuy: walletBuyOrderRouter,
  walletSell: walletSellOrderRouter,
  binanceBuy: BinanceBuyOrderRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
