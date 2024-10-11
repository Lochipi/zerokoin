import { createTRPCRouter } from "@/server/api/trpc";
import { getCurrentExchangeRate } from "./getCurrentExchangeRate";

export const exchangeRatesRouter = createTRPCRouter({
  getCurrentExchangeRate,
});
