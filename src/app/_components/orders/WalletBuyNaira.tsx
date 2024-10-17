"use client";
import { api } from "@/trpc/react";
import {
  Accordion,
  ActionIcon,
  Button,
  Card,
  Image,
  NumberFormatter,
  Paper,
  Popover,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import { ConnectWalletButton } from "../common/ConnectWalletButton";
import { showNotification } from "@mantine/notifications";
import {
  useActiveAccount,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";
import { useRouter } from "next/navigation";
import Paystack from "@paystack/inline-js";

import { TbWorldSearch } from "react-icons/tb";
import useResolveBaseNameToWalletAddress from "@/utils/hooks/useResolveBaseNameToWalletAddress";
import { FcInfo } from "react-icons/fc";
import { getBlockchainName } from "@/utils/getBlockchainName";
import { env } from "@/env";

interface WalletOderProps {
  orderId: string;
}

export default function WalletBuyNaira({ orderId }: WalletOderProps) {
  const [paymentEmail, setPaymentEmail] = useState<string | undefined>(
    undefined,
  );
  const [walletType, setWalletType] = useState<"WALLET" | "BASENAME">("WALLET");
  const [basename, setBasename] = useState<string | undefined>(undefined);
  const connectionStatus = useActiveWalletConnectionStatus();
  const account = useActiveAccount();
  const router = useRouter();
  const getOrderDetails = api.orders.getOrderDetails.useQuery({
    orderId: orderId,
  });
  const verifyPayment = api.walletBuyNaira.verifyPaystackOder.useMutation({
    onSettled: (data) => {
      if (data?.isSuccess) {
        showNotification({
          title: "Success",
          message: "Payment verified successfully",
          color: "green",
        });
      } else {
        showNotification({
          title: "Error",
          message: "We encountered an error when procesing the payment",
          color: "red",
        });
      }
    },
  });

  const { resolveBaseNameToWalletAddress, loading, resolvedAddress } =
    useResolveBaseNameToWalletAddress();

  function handleMakePayment() {
    console.log("");
    if (
      account?.address &&
      paymentEmail &&
      getOrderDetails.data?.quotedFiatAmount
    ) {
      const popup = new Paystack();

      popup.newTransaction({
        key: env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email: paymentEmail,
        amount: getOrderDetails.data.quotedFiatAmount * 100,
        onSuccess: (transaction) => {
          console.log(transaction);
          verifyPayment.mutate({
            reference: transaction.reference,
            orderId: orderId,
          });
        },
        onLoad: (response) => {
          console.log("onLoad: ", response);
        },
        onCancel: () => {
          console.log("onCancel");
        },
        onError: (error) => {
          console.log("Error: ", error.message);
        },
      });
    }
  }
  const handleResolve = async () => {
    await resolveBaseNameToWalletAddress({
      chainId: 8453,
      basename: basename ?? "",
    });
  };

  return (
    <Paper
      withBorder
      className="mx-auto flex flex-col    gap-y-2 p-4  sm:w-[30rem]  sm:p-8 "
    >
      <div className=" relative flex w-full flex-col">
        <Card
          withBorder
          className={` flex flex-col gap-y-1 rounded-xl  py-1 leading-[0]`}
        >
          <p className=" text-xs  leading-[0]">PAY</p>
          <div className=" flex h-fit w-full items-center justify-between leading-[0] ">
            <h1 className="font-black leading-[0]">
              <NumberFormatter
                value={getOrderDetails.data?.quotedFiatAmount}
                thousandSeparator=","
              />
            </h1>
            <Paper className=" flex h-fit w-32 items-center justify-around rounded-full p-1">
              <h3>NGN</h3>
              <Image
                src={"/images/tokens/ngn.png"}
                alt="NGN"
                className=" h-8 w-8 rounded-full object-contain"
              />
            </Paper>
          </div>
          <p className=" text-xs leading-[0]">FROM PAYSTACK</p>
        </Card>
        <IoSwapVertical className="   place-self-center  justify-self-center " />

        <Card
          withBorder
          className={` flex flex-col gap-y-1 rounded-xl  py-1 leading-[0]`}
        >
          <p className=" text-xs  leading-[0]">RECIEVE</p>
          <div className=" flex h-fit w-full items-center justify-between leading-[0] ">
            <h1 className="font-black leading-[0]">
              <NumberFormatter
                value={getOrderDetails.data?.qoutedTokenAmount}
                thousandSeparator=","
              />
            </h1>
            <Paper className=" flex h-fit w-32 items-center justify-around rounded-full p-1">
              <h3>{getOrderDetails.data?.swapToken}</h3>
              <Image
                src={
                  getOrderDetails.data?.swapToken === "USDT"
                    ? "/images/tokens/USDT.svg"
                    : getOrderDetails.data?.swapToken === "USDC"
                      ? "/images/tokens/USDC.png"
                      : getOrderDetails.data?.swapToken === "FDUSD"
                        ? "/images/tokens/FDUSD.svg"
                        : ""
                }
                alt="USDT"
                className=" h-8 w-8 rounded-full object-contain"
              />
            </Paper>
          </div>
          <p className=" text-xs leading-[0]">To your wallet address</p>
        </Card>
      </div>

      <TextInput
        size="lg"
        label={<p className=" text-xs">Your Email</p>}
        placeholder="johndoe@gmail.com"
        value={paymentEmail}
        onChange={(e) => setPaymentEmail(e.target.value)}
      />
      <Accordion transitionDuration={1000} radius="xl">
        <Accordion.Item value="details">
          <Accordion.Control className=" h-fit">
            Order details
          </Accordion.Control>
          <Accordion.Panel className=" flex flex-col gap-y-4 text-xs">
            <Popover width="target" position="top" withArrow shadow="md">
              <Popover.Target>
                <div className=" flex items-center justify-between">
                  <span className=" flex cursor-pointer items-center gap-x-2">
                    Blockchain Network <FcInfo />
                  </span>
                  <span className="">
                    {getBlockchainName(
                      getOrderDetails.data?.settlementBlockchain ?? 0,
                    )}
                  </span>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="">
                  The blockchain network on which the transcation will be
                  completed
                </div>
              </Popover.Dropdown>
            </Popover>
            <Popover width="target" position="top" withArrow shadow="md">
              <Popover.Target>
                <div className=" flex items-center justify-between">
                  <span className=" flex cursor-pointer items-center gap-x-2">
                    Destination address
                    <FcInfo />
                  </span>
                  <span className="">
                    {connectionStatus === "connected" && walletType === "WALLET"
                      ? `${account?.address.substring(0, 6)} ... ${account?.address.substring(account.address.length - 6)}`
                      : walletType === "BASENAME" && resolvedAddress
                        ? resolvedAddress.substring(0, 6) +
                          " ... " +
                          resolvedAddress.substring(resolvedAddress.length - 6)
                        : ""}
                  </span>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="">The wallet address recieving payment</div>
              </Popover.Dropdown>
            </Popover>
            <Popover width="target" position="top" withArrow shadow="md">
              <Popover.Target>
                <div className=" flex items-center justify-between">
                  <span className=" flex cursor-pointer items-center gap-x-2">
                    Exchange rate
                    <FcInfo />
                  </span>
                  <span className="">
                    {` 1 ${getOrderDetails.data?.swapToken}  =  ${getOrderDetails.data?.qoutedExchangeRate} NGN`}
                  </span>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="">Exchange rate for buying crypto</div>
              </Popover.Dropdown>
            </Popover>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      <SegmentedControl
        value={walletType}
        onChange={(value) => setWalletType(value as "WALLET" | "BASENAME")}
        data={[
          { label: "Wallet Address", value: "WALLET" },
          { label: "Use Basename", value: "BASENAME" },
        ]}
      />

      {(account?.address && walletType == "WALLET") ??
      (walletType == "BASENAME" && resolvedAddress) ? (
        getOrderDetails.data?.payStackPaymentRefrence?.status === "SUCCESS" ? (
          <div className=" flex  items-center justify-center">
            <p>A payment request was intiatiated for this order</p>
          </div>
        ) : (
          <Button
            disabled={paymentEmail && paymentEmail?.length > 8 ? false : true}
            loading={false}
            onClick={() => handleMakePayment()}
            size="lg"
            className=" rounded-full"
          >
            Make Payment
          </Button>
        )
      ) : walletType === "WALLET" ? (
        <ConnectWalletButton buttonText="Connect Wallet" />
      ) : (
        <TextInput
          value={basename}
          onChange={(e) => setBasename(e.target.value)}
          label={<p className=" text-xs">Basename</p>}
          description={resolvedAddress ?? undefined}
          placeholder="johndoe.base.eth"
          size="lg"
          rightSection={
            <ActionIcon
              onClick={() => {
                void handleResolve();
              }}
              loading={loading}
            >
              <TbWorldSearch className=" cursor-pointer text-2xl" />
            </ActionIcon>
          }
        />
      )}
    </Paper>
  );
}
