import { createTRPCRouter } from "@/server/api/trpc";
import { createNewOrder } from "./createNewOrder";
import { getOderType } from "./getOrderType";
import { getOrderDetails } from "./getOrderDetails";

export const ordersRouter = createTRPCRouter({
  createNewOrder,
  getOderType,
  getOrderDetails,
});
