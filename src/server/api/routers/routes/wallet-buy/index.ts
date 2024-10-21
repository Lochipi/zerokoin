import { createTRPCRouter } from "@/server/api/trpc";
import { intiateWalletBuyOrder } from "./intiateWalletBuyOrder";
import { checkWalletBuyOrderSTKpaymentStatus } from "./WalletOrderStatus";
import { intiateOrderSettlement } from "./intiateOrderSettlement";
import { closeOrder } from "./closeOrder";

export const walletBuyOrderRouter = createTRPCRouter({
  intiateWalletBuyOrder,
  checkWalletBuyOrderSTKpaymentStatus,
  intiateOrderSettlement,
  closeOrder,
});
