import { createTRPCRouter } from "@/server/api/trpc";
import { initializeWalletBuyNaira } from "./intializeWalletBuyNaira";
import { verifyPaystackOder } from "./verifiyPaystackOder";

export const walletBuyNairaRouter = createTRPCRouter({
  initializeWalletBuyNaira,
  verifyPaystackOder,
});
