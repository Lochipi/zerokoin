import { createTRPCRouter } from "@/server/api/trpc";
import { intiateBinanceBuyOrder } from "./intiateBinanceBuyOrder";
import { checkBinanceBuyOrderSTKpaymentStatus } from "./binanceOrderStatus";
import { closeOrder } from "./closeOrder";
import { intiateOrderSettlement } from "./intiateOrderSettlement";

export const BinanceBuyOrderRouter = createTRPCRouter({
  intiateBinanceBuyOrder,
  checkBinanceBuyOrderSTKpaymentStatus,
  intiateOrderSettlement,
  closeOrder,
});
