import { createTRPCRouter } from "@/server/api/trpc";
import { initializeWalletBuyNaira } from "./intializeWalletBuyNaira";
import { verifyPaystackOder } from "./verifiyPaystackOder";
import { intiatePaystackOrderSettlement } from "./intiatePaystackOrderSettlement";
import { updateOrderBeforePaymentIntialization } from "./updateOrderBeforePaymentIntialization";

export const walletBuyNairaRouter = createTRPCRouter({
  initializeWalletBuyNaira,
  verifyPaystackOder,
  intiatePaystackOrderSettlement,
  updateOrderBeforePaymentIntialization,
});
