import { createTRPCRouter } from "@/server/api/trpc";
import { initializeWalletBuyNaira } from "./intializeWalletBuyNaira";

export const walletBuyNairaRouter = createTRPCRouter({
  initializeWalletBuyNaira,
});
