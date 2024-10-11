import { createTRPCRouter } from "@/server/api/trpc";
import { ordersRouter } from "./routers/routes/orders";
import { exchangeRatesRouter } from "./routers/routes/rates";
import { walletBuyOrderRouter } from "./routers/routes/wallet-buy";
import { walletSellOrderRouter } from "./routers/routes/wallet-sell";
import { BinanceBuyOrderRouter } from "./routers/routes/binance";

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
