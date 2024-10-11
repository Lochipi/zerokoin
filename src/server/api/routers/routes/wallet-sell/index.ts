import { createTRPCRouter } from "@/server/api/trpc";
import { confirmApprovalSucess } from "./confirmApprSuccess";

export const walletSellOrderRouter = createTRPCRouter({
  confirmApprovalSucess,
});
