"use client";
import BinanceBuyOrder from "@/app/_components/orders/BinanceBuyOrder";
import BinanceSellOrder from "@/app/_components/orders/BinanceSellOrder";
import WalletBuyOrder from "@/app/_components/orders/WalletBuyOrder";
import WalletSellOrder from "@/app/_components/orders/WalletSellOrder";
import { api } from "@/trpc/react";
import React from "react";

export default function SingleOrderPage({
  params,
}: {
  params: { orderId: string };
}) {
  const getOrderType = api.orders.getOderType.useQuery({
    orderId: params.orderId,
  });
  return (
    <div className=" h-full w-full">
      {getOrderType.data?.walletType === "BINANCEWALLETADDRESS" &&
        getOrderType.data.orderType === "BUY" && (
          <BinanceBuyOrder orderId={params.orderId} />
        )}
      {getOrderType.data?.walletType === "BINANCEWALLETADDRESS" &&
        getOrderType.data.orderType === "SELL" && (
          <BinanceSellOrder orderId={params.orderId} />
        )}
      {getOrderType.data?.walletType === "SELFCUSTODIALWALLET" &&
        getOrderType.data.orderType === "BUY" && (
          <WalletBuyOrder orderId={params.orderId} />
        )}
      {getOrderType.data?.walletType === "SELFCUSTODIALWALLET" &&
        getOrderType.data.orderType === "SELL" && (
          <WalletSellOrder orderId={params.orderId} />
        )}
    </div>
  );
}
