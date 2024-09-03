"use cleint";
import { globalStore } from "@/stores";
import { Paper, SegmentedControl } from "@mantine/core";
import React from "react";
import { TbChecklist } from "react-icons/tb";
import { MdMobileScreenShare } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { useSnapshot } from "valtio";

export default function HowItWorks() {
  const storeSnapshot = useSnapshot(globalStore);
  return (
    <div className=" my-8 py-8">
      <div className=" flex w-full items-center  justify-between">
        <h2>How it works</h2>
        <SegmentedControl
          data={["Buy", "Sell"]}
          value={storeSnapshot.orderType}
          onChange={(value) =>
            (globalStore.orderType = value as "Buy" | "Sell")
          }
          className=" my-2"
          transitionDuration={200}
          transitionTimingFunction="linear"
        />
      </div>
      <section className=" grid grid-cols-1 gap-8 sm:grid-cols-3">
        <Paper withBorder className=" flex w-full flex-col p-4">
          <TbChecklist size={96} />
          <h4>Place an Order</h4>
          <p>
            {storeSnapshot.orderType === "Buy" &&
              "Place an order by selecting the token you want to buy  , amount to buy and  your preffered destination wallet (Binance or Self-custodial wallet)"}
            {storeSnapshot.orderType === "Sell" &&
              "Place an order by selecting the token to  to sell , amount to sell and the wallet holding the funds to sell (Binance or Self-custodial wallet)"}
          </p>
        </Paper>
        <Paper withBorder className=" flex w-full flex-col p-4">
          <MdMobileScreenShare size={96} />
          <h4>Complete Payment</h4>
          <p>
            {storeSnapshot.orderType === "Buy" &&
              "Zerokoin  will send you an M-Pesa  prompt requesting you to  pay the order amount , confirm the payment"}
            {storeSnapshot.orderType === "Sell" &&
              "Send the tokens from your wallet to Zerokoin wallets (Binance or Self-custodial wallet)"}
          </p>
        </Paper>
        <Paper withBorder className=" flex w-full flex-col p-4">
          <GiReceiveMoney size={96} />
          <h4>
            Recieve {storeSnapshot.orderType === "Buy" ? "Crypto" : "Fiat"}
          </h4>
          <p>
            {storeSnapshot.orderType === "Buy" &&
              "Zerokoin automatically  sends  crypto tokens your Binance  wallet or Self-custodial wallet with  crypto tokens"}
            {storeSnapshot.orderType === "Sell" &&
              "Zerokoin automatically  sends  fiat to your M-Pesa number with the equivalent  of  crypto sold"}
          </p>
        </Paper>
      </section>
    </div>
  );
}
