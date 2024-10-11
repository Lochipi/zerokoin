"use client";
import { api } from "@/trpc/react";
import {
  Button,
  Card,
  Image,
  NumberFormatter,
  Paper,
  SegmentedControl,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import { ConnectWalletButton } from "../common/ConnectWalletButton";
import { notifications } from "@mantine/notifications";
import { useActiveAccount } from "thirdweb/react";
import { useRouter } from "next/navigation";

interface WalletOderProps {
  orderId: string;
}
export default function WalletBuyOrder({ orderId }: WalletOderProps) {
  const [mpesaPaymentNumber, setMpesaPaymentNumber] = useState<
    string | undefined
  >(undefined);
  const [walletType, setWalletType] = useState<"WALLET" | "BASENAME">("WALLET");
  const [basename, setBasename] = useState<string | undefined>(undefined);
  const account = useActiveAccount();
  const router = useRouter();
  const getOrderDetails = api.orders.getOrderDetails.useQuery({
    orderId: orderId,
  });

  const intiateMpesaPayment = api.walletBuy.intiateWalletBuyOrder.useMutation({
    onSettled: (data, _, variables) => {
      if (!!data) {
        notifications.show({
          title: "Payment request sent",
          message: `Please complete the payment  sent to +${variables.mpesaPaymentNumber}`,
          color: "green",
        });
        setTimeout(() => {
          checkStkPaymentStatus.mutate({ orderId: orderId });
        }, 4000);
      } else {
        notifications.show({
          title: "Error",
          message: `An error occured in sending payment request`,
          color: "red",
        });
      }
    },
  });

  const checkStkPaymentStatus =
    api.walletBuy.checkWalletBuyOrderSTKpaymentStatus.useMutation({
      onSettled: (data, _, variables) => {
        if (data === "PAYMENT MADE" || data === "PAYMENT CANCELED") {
          notifications.hide("payment-loading");
          if (data === "PAYMENT MADE") {
            notifications.show({
              title: "PAYMENT RECIEVED",
              message: "Intiating crypto transfer",
              color: "green",
              autoClose: 10 * 1000,
            });
            intiateOrderSettlement.mutate({ orderId });
          }
          if (data === "PAYMENT CANCELED") {
            notifications.show({
              title: "PAYMENT CANCELED !",
              message: "You canceled the payment request . Closing order",
              color: "red",
              autoClose: 6 * 1000,
            });
          }
        } else {
          setTimeout(() => {
            checkStkPaymentStatus.mutate({ orderId: variables.orderId });
          }, 5000);
        }
      },
    });
  const intiateOrderSettlement =
    api.walletBuy.intiateOrderSettlement.useMutation({
      onSettled: (data, _, variables) => {
        if (data) {
          closeOrder.mutate({ orderId: variables.orderId });
          notifications.hide("sending-tokens");
          notifications.show({
            title: "Success",
            message: "Crypto tokens sent to your wallet address",
            color: "green",
            autoClose: 15 * 1000,
          });
          router.push(`/orders/status/${orderId}`);
        } else {
          notifications.show({
            title: "System error",
            message: "We encountered an error sending tokens  to your address",
            color: "red",
            autoClose: 10 * 1000,
          });
        }
      },
    });
  const closeOrder = api.walletBuy.closeOrder.useMutation();

  function handleMakePayment() {
    if (
      account?.address &&
      mpesaPaymentNumber &&
      mpesaPaymentNumber.length === 10 &&
      (!isNaN(Number(mpesaPaymentNumber)) ||
        mpesaPaymentNumber.startsWith("01"))
    ) {
      intiateMpesaPayment.mutate({
        walletAddress: account.address,
        orderId: orderId,
        mpesaPaymentNumber: "254" + mpesaPaymentNumber.slice(1),
      });
    } else {
      notifications.show({
        title: "Invalid Mpesa Number",
        message: "Enter a valid Mpesa number starting with 07..",
      });
    }
  }
  useEffect(() => {
    if (checkStkPaymentStatus.isLoading) {
      notifications.hide("payment-loading");
      notifications.show({
        id: "payment-loading",
        title: "Checking Payment Status",
        message: "Hold on while we process your request",
        autoClose: 60 * 1000,
        loading: true,
      });
    }
    if (intiateOrderSettlement.isLoading) {
      notifications.show({
        id: "sending-tokens",
        title: "Sending tokens",
        message: "This may take a few seconds depending of  blockchain traffic",
        autoClose: 60 * 1000,
        loading: true,
      });
    }
  }, [checkStkPaymentStatus.isLoading, intiateOrderSettlement.isLoading]);

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
              <h3>KES</h3>
              <Image
                src={"/images/tokens/KES.png"}
                alt="KES"
                className=" h-8 w-8 rounded-full object-contain"
              />
            </Paper>
          </div>
          <p className=" text-xs leading-[0]">FROM MPESA</p>
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
                alt="KES"
                className=" h-8 w-8 rounded-full object-contain"
              />
            </Paper>
          </div>
          <p className=" text-xs leading-[0]">To your wallet address</p>
        </Card>
      </div>

      <TextInput
        size="lg"
        label={<p className=" text-xs">Mpesa Number</p>}
        placeholder="0712345678"
        value={mpesaPaymentNumber}
        onChange={(e) => setMpesaPaymentNumber(e.target.value)}
      />
      <SegmentedControl
        value={walletType}
        onChange={(value) => setWalletType(value as "WALLET" | "BASENAME")}
        data={[
          { label: "Wallet Address", value: "WALLET" },
          { label: "Use Basename", value: "BASENAME" },
        ]}
      />

      {(account?.address && walletType == "WALLET") ??
      (walletType == "BASENAME" && basename?.length && basename.length > 5) ? (
        getOrderDetails.data?.stkMessage?.stkStatus ? (
          <div className=" flex  items-center justify-center">
            <p>A payment request was intiatiated for this order</p>
          </div>
        ) : (
          <Button
            disabled={
              intiateMpesaPayment.isLoading ||
              intiateMpesaPayment.isSuccess ||
              !!getOrderDetails.data?.stkMessage?.stkStatus
            }
            loading={intiateMpesaPayment.isLoading}
            onClick={() => handleMakePayment()}
            size="lg"
            className=" rounded-full"
          >
            {checkStkPaymentStatus.data == "PAYMENT MADE" && "Payment Recieved"}
            {checkStkPaymentStatus.data == "PAYMENT CANCELED" &&
              "Payment Canceled"}
            {!checkStkPaymentStatus.isLoading &&
              !checkStkPaymentStatus.data &&
              "Make Payment"}
          </Button>
        )
      ) : walletType === "WALLET" ? (
        <ConnectWalletButton buttonText="Connect Wallet" />
      ) : (
        <TextInput
          value={basename}
          onChange={(e) => setBasename(e.target.value)}
          label={<p className=" text-xs">Basename</p>}
          placeholder="johndoe.base.eth"
          size="lg"
        />
      )}
    </Paper>
  );
}
