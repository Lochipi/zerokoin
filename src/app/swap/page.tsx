"use client";
import { useSnapshot } from "valtio";
import { Paper, Tabs } from "@mantine/core";
import React from "react";
import { globalStore } from "@/stores";
import HowItWorks from "../_components/swap/HowItWorks";
import Swap from "../_components/swap/Swap";

export default function SwapPage() {
  const storeSnapshot = useSnapshot(globalStore);
  return (
    <div className="  flex min-h-screen w-full flex-col">
      <Paper withBorder className="  mx-auto w-full    px-2 sm:w-fit  ">
        <Tabs
          className="  w-full "
          value={storeSnapshot.orderType}
          onChange={(value) =>
            (globalStore.orderType = value as "Buy" | "Sell")
          }
        >
          <Tabs.List grow className=" h-12">
            <Tabs.Tab value="Buy" className=" h-full">
              <h4>BUY</h4>
            </Tabs.Tab>
            <Tabs.Tab value="Sell" className=" h-full">
              <h4>SELL</h4>
            </Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="Buy">
            <Swap swapType="Buy" />
          </Tabs.Panel>
          <Tabs.Panel value="Sell">
            <Swap swapType="Sell" />
          </Tabs.Panel>
        </Tabs>
      </Paper>
      <HowItWorks />
    </div>
  );
}
