import {
  Avatar,
  Button,
  NumberInput,
  SegmentedControl,
  Select,
} from "@mantine/core";
import { useSnapshot } from "valtio";
import React, { useState } from "react";
import { globalStore } from "@/stores";
import SelectToken from "./SelectToken";
import { api } from "@/trpc/react";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { useRouter } from "next/navigation";
import { ORDERS_PAGE } from "@/utils/constants";
import Link from "next/link";

interface SwapProps {
  swapType: "Buy" | "Sell";
}
export default function Swap({ swapType }: SwapProps) {
  const [qoutedFiatAmount, setQoutedFiatAmount] = useState<number>(0);
  const [qoutedTokenAmount, setQoutedTokenAmount] = useState<number>(0);
  const [settlementBlockchain, setSettlementBlockchain] = useState<
    number | null
  >(84532);
  const storeSnapshot = useSnapshot(globalStore);
  const router = useRouter();
  const currentExchangeRate =
    api.exchangeRates.getCurrentExchangeRate.useQuery();
  const createNewOrder = api.orders.createNewOrder.useMutation({
    onSettled(data, error) {
      if (data) {
        notifications.show({
          title: "Order Placed",
          message: "Your order has been placed",
          color: "green",
        });
        router.push(`${ORDERS_PAGE}/${data}`);
      }
      if (error?.message) {
        notifications.show({
          title: "Error",
          message: "An error  occured while placing your order",
          color: "green",
        });
      }
    },
  });

  function submitNewOrder() {
    if (
      settlementBlockchain &&
      currentExchangeRate.data &&
      qoutedFiatAmount >= 1 &&
      qoutedFiatAmount < 500000
    ) {
      createNewOrder.mutate({
        orderType: globalStore.orderType == "Buy" ? "BUY" : "SELL",
        swapToken: globalStore.selectedToken,
        qoutedTokenAmount: parseFloat(qoutedTokenAmount.toFixed(8)),
        qoutedFiatAmount: parseFloat(qoutedFiatAmount.toFixed(2)),
        qoutedExchangeRate:
          swapType == "Buy"
            ? currentExchangeRate.data.buyExchangeRate
            : currentExchangeRate.data.sellExchangeRate,
        walletAddressChoice: "SELFCUSTODIALWALLET",
        transactionFee: 0,
        settlementBlockchain: settlementBlockchain,
      });
    } else {
      if (
        (qoutedFiatAmount < 1 || qoutedFiatAmount > 500000) &&
        currentExchangeRate.data
      ) {
        notifications.show({
          title: "Invalid order !",
          message: "Order limit 1 KES - 500,000 KES",
          color: "Red",
        });
      } else {
        notifications.show({
          title: "Invalid Order !",
          message: "Complete missing order details and try again!",
          color: "Red",
        });
      }
    }
  }
  return (
    <form className="flex flex-col gap-y-2    pb-4 sm:w-[30rem] sm:px-4">
      <NumberInput
        value={qoutedFiatAmount}
        onChange={(val) => {
          if (currentExchangeRate.data) {
            const amount = typeof val === "string" ? parseFloat(val) : val;
            setQoutedFiatAmount(amount);
            swapType === "Buy"
              ? setQoutedTokenAmount(
                  amount / currentExchangeRate.data.buyExchangeRate,
                )
              : setQoutedTokenAmount(
                  amount / currentExchangeRate.data.sellExchangeRate,
                );
          }
        }}
        label={
          <p className=" text-xs leading-[0.0] ">
            {swapType == "Buy" ? "You Pay" : "You recieve"}
          </p>
        }
        description={
          storeSnapshot.orderType == "Sell" ? (
            <span className=" text-xs leading-[0.0]">
              1 {storeSnapshot.selectedToken} ≈{" "}
              {swapType === "Buy"
                ? currentExchangeRate.data?.buyExchangeRate
                : currentExchangeRate.data?.sellExchangeRate}{" "}
              KES
            </span>
          ) : undefined
        }
        disabled={!currentExchangeRate.data}
        decimalScale={2}
        allowNegative={false}
        hideControls
        thousandSeparator=","
        rightSectionWidth="fit"
        rightSection={
          <SelectToken isKenyanShilling supportedTokens={["KES", "NGN"]} />
        }
        size="xl"
        className=" w-full text-xs"
      />
      <NumberInput
        value={qoutedTokenAmount}
        onChange={(val) => {
          if (currentExchangeRate.data) {
            const amount = typeof val === "string" ? parseFloat(val) : val;
            setQoutedTokenAmount(amount);
            {
              swapType === "Buy"
                ? setQoutedFiatAmount(
                    amount * currentExchangeRate.data.buyExchangeRate,
                  )
                : setQoutedFiatAmount(
                    amount * currentExchangeRate.data.sellExchangeRate,
                  );
            }
          }
        }}
        disabled={!currentExchangeRate.data}
        label={
          <p className=" text-xs leading-[0.0]">
            {swapType == "Buy" ? "You reicieve" : "I want to sell"}
          </p>
        }
        description={
          storeSnapshot.orderType == "Buy" ? (
            <span className=" text-xs leading-[0.0]">
              1 {storeSnapshot.selectedToken} ≈{" "}
              {swapType === "Buy"
                ? currentExchangeRate.data?.buyExchangeRate
                : currentExchangeRate.data?.sellExchangeRate}{" "}
              KES
            </span>
          ) : undefined
        }
        decimalScale={8}
        allowNegative={false}
        hideControls
        thousandSeparator
        rightSectionWidth="fit"
        rightSection={<SelectToken supportedTokens={["USDC", "USDT"]} />}
        size="xl"
        className={`${swapType === "Sell" ? "  order-first" : ""} w-full text-xs`}
      />

      <Select
        value={settlementBlockchain?.toString()}
        defaultValue={"LISK SEPOLIA"}
        onChange={(val) =>
          val ? setSettlementBlockchain(parseInt(val)) : null
        }
        data={[
          {
            value: "8453",
            label: "BASE MAINNET",
          },
          {
            value: "84532",
            label: "BASE SEPOLIA",
          },
        ]}
        renderOption={({ option }) => (
          <div
            onClick={() => {
              modals.open({
                title: "Blockchain Network info",
                centered: true,
                children: (
                  <div className=" flex w-full flex-col">
                    <div className=" flex  w-full items-center justify-between">
                      <span>Name</span>
                      <span>{option.label}</span>
                    </div>
                    <div className=" flex  w-full items-center justify-between">
                      <span>Native token</span>
                      <span>ETH</span>
                    </div>
                    {storeSnapshot.orderType === "Sell" && (
                      <div className=" flex  w-full items-center justify-between">
                        <span>Estimated Fees</span>
                        <span>
                          {option.label === "BNB SMART CHAIN"
                            ? "0.28 USD"
                            : "0.01 USD"}
                        </span>
                      </div>
                    )}
                    <div className=" flex  w-full items-center justify-between">
                      <span>Completion time</span>
                      <span>
                        {option.label === "BNB SMART CHAIN"
                          ? "≈ 2 mins"
                          : "≈ 1 mins"}
                      </span>
                    </div>
                    <div className=" flex  w-full items-center justify-between">
                      <span className=" text-green-500">
                        Available Liquidity
                      </span>
                      <span>
                        {option.label === "BASE SEPOLIA"
                          ? `1000+ ${storeSnapshot.selectedToken}`
                          : `0 ${storeSnapshot.selectedToken}`}
                      </span>
                    </div>
                  </div>
                ),
              });
            }}
            className=" flex w-full flex-col gap-y-2"
          >
            <div className=" flex w-full items-center justify-between">
              <Avatar
                size="sm"
                src={
                  option.value === "10"
                    ? "https://icons.llamao.fi/icons/chains/rsz_optimism.jpg"
                    : option.value === "8453" || option.value === "84532"
                      ? "/images/base.png"
                      : option.value === "4202"
                        ? "/images/lisk.png"
                        : option.value === "1135"
                          ? "/images/lisk.png"
                          : "https://chainlist.org/unknown-logo.png"
                }
                className=" object-contain"
              />
              <span>{option.label}</span>
            </div>
          </div>
        )}
        comboboxProps={{
          position: "bottom",
          withArrow: true,
          arrowOffset: 0,
          transitionProps: { transition: "pop", duration: 300 },
        }}
        disabled={!currentExchangeRate.data}
        size="md"
        label={<p className=" text-xs">Select blockchain Network</p>}
      />

      <SegmentedControl
        size="md"
        title={
          swapType === "Buy"
            ? "Wallet recieving tokens"
            : "Wallet sending tokens"
        }
        data={[
          { label: "My Wallet", value: "Wallet" },
          { label: "Binance Wallet", value: "Binance" },
        ]}
        value={storeSnapshot.walletChoice}
        onChange={(value) =>
          (globalStore.walletChoice = value as "Binance" | "Wallet")
        }
        className=" my-2 "
        transitionDuration={500}
        transitionTimingFunction="linear"
      />

      <Button
        loading={createNewOrder.isLoading || currentExchangeRate.isLoading}
        disabled={createNewOrder.isLoading || !currentExchangeRate.data}
        onClick={async () => {
          submitNewOrder();
        }}
        color="green"
        size="lg"
      >
        {`${swapType} ${globalStore.selectedToken}`}
      </Button>
    </form>
  );
}
