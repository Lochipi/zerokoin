import React from "react";

interface BinanceSellOderProps {
  orderId: string;
}
export default function BinanceSellOrder({ orderId }: BinanceSellOderProps) {
  return <div>Binance Sell Order : {orderId}</div>;
}
