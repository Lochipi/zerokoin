"use client";
import { api } from "@/trpc/react";
import {
  Badge,
  Button,
  Card,
  Image,
  NumberFormatter,
  Paper,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import React from "react";
import { IoSwapVertical } from "react-icons/io5";
import { FcCustomerSupport } from "react-icons/fc";

export default function OrderDetails({
  params,
}: {
  params: { orderId: string };
}) {
  const orderDetails = api.orders.getOrderDetails.useQuery({
    orderId: params.orderId,
  });

  return (
    <div className=" h-full w-full">
      <Paper
        withBorder
        className="relative mx-auto flex  flex-col   gap-y-2 p-4  sm:w-[30rem]  sm:p-8 "
      >
        <div className=" flex w-full items-center justify-between">
          <Badge
            p="md"
            color={orderDetails.data?.orderType === "BUY" ? "green" : "red"}
          >
            {orderDetails.data?.orderType === "BUY"
              ? "BUY ORDER"
              : "SELL ORDER"}
          </Badge>

          <Tooltip withArrow label="Contact Customer support">
            <div className="">
              <FcCustomerSupport size={48} />
            </div>
          </Tooltip>
        </div>

        <div className=" relative flex w-full flex-col">
          <Card
            withBorder
            className={` flex flex-col gap-y-1 rounded-xl  py-1 leading-[0]`}
          >
            <p className=" text-xs  leading-[0]">
              {orderDetails.data?.orderType === "BUY"
                ? orderDetails.data.stkMessage
                  ? "PAID"
                  : "TO PAY"
                : orderDetails.data?.stkMessage
                  ? "REICEVED"
                  : "TO RECIEVE"}
            </p>
            <div className=" flex h-fit w-full items-center justify-between leading-[0] ">
              <h1 className="font-black leading-[0]">
                <NumberFormatter
                  value={orderDetails.data?.quotedFiatAmount}
                  thousandSeparator=","
                />
              </h1>
              <Paper className=" flex h-fit w-32 items-center justify-around rounded-full p-1">
                <h3>KES</h3>
                <Image
                  src={"/images/tokens/KES.png"}
                  alt="KES"
                  className=" h-8 w-8 rounded-full object-contain"
                />
              </Paper>
            </div>
            <p className=" text-xs leading-[0]">
              {orderDetails.data?.orderType === "BUY"
                ? "From M-pesa"
                : "To M-pesa"}
              {orderDetails.data?.stkMessage &&
                ` +${orderDetails.data?.stkMessage?.phoneNumber}`}
            </p>
          </Card>
          <IoSwapVertical className="   place-self-center  justify-self-center " />

          <Card
            withBorder
            className={` flex flex-col gap-y-1 rounded-xl  py-1 leading-[0]`}
          >
            <p className=" text-xs  leading-[0]">
              {orderDetails.data?.orderType === "BUY"
                ? orderDetails.data.txnHash
                  ? "RECIEVED"
                  : "TO RECIEVE"
                : orderDetails.data?.txnHash
                  ? "SOLD"
                  : "TO SELL"}
            </p>
            <div className=" flex h-fit w-full items-center justify-between leading-[0] ">
              <h1 className="font-black leading-[0]">
                <NumberFormatter
                  value={orderDetails.data?.qoutedTokenAmount}
                  thousandSeparator=","
                />
              </h1>
              <Paper className=" flex h-fit w-32 items-center justify-around rounded-full p-1">
                <h3>{orderDetails.data?.swapToken}</h3>
                <Image
                  src={
                    orderDetails.data?.swapToken === "USDT"
                      ? "/images/tokens/USDT.svg"
                      : orderDetails.data?.swapToken === "USDC"
                        ? "/images/tokens/USDC.png"
                        : orderDetails.data?.swapToken === "FDUSD"
                          ? "/images/tokens/FDUSD.svg"
                          : ""
                  }
                  alt="KES"
                  className=" h-8 w-8 rounded-full object-contain"
                />
              </Paper>
            </div>
            <p className=" text-xs leading-[0]">
              {orderDetails.data?.orderType === "BUY"
                ? "To wallet address"
                : "From wallet address"}

              {orderDetails.data?.walletAddress &&
                `  ${orderDetails.data?.walletAddress?.substring(0, 6)} ... ${orderDetails.data?.walletAddress?.substring(orderDetails.data?.walletAddress?.length - 6)}`}
            </p>
          </Card>
        </div>
        <div className=" flex w-full flex-col">
          <div className=" flex justify-between  text-xs text-[color:var(--mantine-color-dimmed)]">
            <span>Opened</span>
            {orderDetails.data?.status === "COMPLETED" && <span>Closed</span>}
          </div>
          <div className=" flex justify-between text-sm">
            <span>{orderDetails.data?.createdAt.toLocaleString()}</span>
            {orderDetails.data?.status === "COMPLETED" && (
              <span>{orderDetails.data.updatedAt?.toLocaleString()}</span>
            )}
          </div>
        </div>

        {orderDetails.data?.txnHash && (
          <Link
            href={`https://sepolia-blockscout.lisk.com/tx/${orderDetails.data.txnHash}`}
            className=" my-4 w-full"
          >
            <Button className=" w-full rounded-full">View on blockchain</Button>
          </Link>
        )}
      </Paper>
    </div>
  );
}
