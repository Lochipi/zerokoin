"use client";
import { api } from "@/trpc/react";
import {
  Button,
  Card,
  Image,
  NumberFormatter,
  Paper,
  TextInput,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import { FcInfo } from "react-icons/fc";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";
import { getBlockchainName } from "@/utils/getBlockchainName";
import { isValidEVMAddress } from "@/utils/isValidEVMaddress";

interface WalletOderProps {
  orderId: string;
}
export default function BinanceBuyOrder({ orderId }: WalletOderProps) {
  const [recievingWalletAddress, setRecievingWalletAddress] = useState<
    string | undefined
  >(undefined);
  const [mpesaPaymentNumber, setMpesaPaymentNumber] = useState<
    string | undefined
  >(undefined);
  const router = useRouter();
  const getOrderDetails = api.orders.getOrderDetails.useQuery({
    orderId: orderId,
  });

  const intiateMpesaPayment = api.binanceBuy.intiateBinanceBuyOrder.useMutation(
    {
      onSettled: (data, _, variables) => {
        if (!!data) {
          notifications.show({
            title: "Payment request sent",
            message: `Please complete the payment  sent to +${variables.mpesaPaymentNumber}`,
            color: "green",
          });
          checkStkPaymentStatus.mutate({ orderId: orderId });
        } else {
          notifications.show({
            title: "Error",
            message: `An error occured in sending payment request`,
            color: "red",
          });
        }
      },
    },
  );

  const checkStkPaymentStatus =
    api.binanceBuy.checkBinanceBuyOrderSTKpaymentStatus.useMutation({
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
          }, 3000);
        }
      },
    });
  const intiateOrderSettlement =
    api.binanceBuy.intiateOrderSettlement.useMutation({
      onSettled: (data, _, variables) => {
        if (data) {
          closeOrder.mutate({ orderId: variables.orderId });
          notifications.hide("sending-tokens");
          notifications.show({
            title: "Success",
            message: "Crypto tokens sent to your binance address",
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
    if (!mpesaPaymentNumber) {
      notifications.show({
        title: "Missing Mpesa Number",
        message: "Add an Mpesa number to continue",
      });
      return;
    }

    if (mpesaPaymentNumber.length !== 10 || isNaN(Number(mpesaPaymentNumber))) {
      notifications.show({
        title: "Invalid Mpesa Number",
        message: "Enter a valid Mpesa number starting with 07..",
      });
      return;
    }
    if (!recievingWalletAddress) {
      notifications.show({
        title: "Missing Wallet address",
        message: "Add a Wallet address to continue",
      });
      return;
    }
    if (!isValidEVMAddress(recievingWalletAddress)) {
      notifications.show({
        title: "Invalid Wallet address",
        message: "Enter a valid cryptocurrency wallet address",
      });
      return;
    }

    intiateMpesaPayment.mutate({
      walletAddress: recievingWalletAddress,
      orderId: orderId,
      mpesaPaymentNumber: "254" + mpesaPaymentNumber.slice(1),
    });
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
        size="md"
        label={<p className=" text-xs">Mpesa Number</p>}
        placeholder="0712345678"
        value={mpesaPaymentNumber}
        onChange={(e) => setMpesaPaymentNumber(e.target.value)}
      />
      <TextInput
        value={recievingWalletAddress}
        onChange={(e) => setRecievingWalletAddress(e.target.value)}
        size="md"
        label={
          <p className=" flex w-full items-center gap-x-1 text-xs">
            {` Your Binance  ${getBlockchainName(
              getOrderDetails.data?.settlementBlockchain ?? 0,
            )} Wallet Address`}
            <FcInfo className="  justify-self-end" />
          </p>
        }
        placeholder="0xb1BC..........23a5"
      />

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
        {checkStkPaymentStatus.data == "PAYMENT CANCELED" && "Payment Canceled"}
        {!checkStkPaymentStatus.isLoading &&
          !checkStkPaymentStatus.data &&
          "Make Payment"}
      </Button>
    </Paper>
  );
}
