"use client";
import { api } from "@/trpc/react";
import {
  Accordion,
  Card,
  Image,
  NumberFormatter,
  Paper,
  Popover,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import { FcInfo } from "react-icons/fc";
import { ConnectWalletButton } from "../common/ConnectWalletButton";
import {
  TransactionButton,
  useActiveAccount,
  useActiveWalletConnectionStatus,
} from "thirdweb/react";
import { transfer } from "thirdweb/extensions/erc20";
import { getContract } from "thirdweb";
import { thirdwebFrontendClient } from "@/utils/thirdweb";
import { optimismSepolia } from "thirdweb/chains";
import { LIQUIDITY_ACCOUNT_PUBLIC_KEY } from "@/utils/constants";
import { notifications } from "@mantine/notifications";

interface WalletOderProps {
  orderId: string;
}
export default function WalletSellOrder({ orderId }: WalletOderProps) {
  const [mpesaPaymentNumber, setMpesaPaymentNumber] = useState<
    string | undefined
  >(undefined);
  const connectionStatus = useActiveWalletConnectionStatus();
  const account = useActiveAccount();
  const getOrderDetails = api.orders.getOrderDetails.useQuery(
    {
      orderId: orderId,
    },
    {
      staleTime:
        process.env.NODE_ENV === "development" ? 5 * 60 * 1000 : undefined,
    },
  );
  const confimPaymentApproval =
    api.walletSell.confirmApprovalSucess.useMutation();

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
          <p className=" text-xs  leading-[0]">SELL</p>
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
          <p className=" text-xs leading-[0]">From your wallet address</p>
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
          <p className=" text-xs leading-[0]">To your M-Pesa</p>
        </Card>
      </div>

      <TextInput
        size="lg"
        label={<p className=" text-xs">Mpesa Number</p>}
        placeholder="0712345678"
        value={mpesaPaymentNumber}
        onChange={(e) => setMpesaPaymentNumber(e.target.value)}
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
                  <span className="">BNB Smart Chain</span>
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
                    Source address
                    <FcInfo />
                  </span>
                  <span className="">
                    {connectionStatus === "connected"
                      ? `${account?.address.substring(0, 6)} ... ${account?.address.substring(account.address.length - 6)}`
                      : connectionStatus === "connecting"
                        ? "Waiting"
                        : connectionStatus === "disconnected"
                          ? "Connect wallet"
                          : "unknown wallet"}
                  </span>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="">The wallet address making payment</div>
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
                    {` 1 ${getOrderDetails.data?.swapToken}  =  ${getOrderDetails.data?.qoutedExchangeRate} KES`}
                  </span>
                </div>
              </Popover.Target>
              <Popover.Dropdown>
                <div className="">Exchange rate for selling crypto</div>
              </Popover.Dropdown>
            </Popover>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {!account?.address && <ConnectWalletButton buttonText="Connect Wallet" />}
      {getOrderDetails.data?.qoutedTokenAmount &&
        account?.address &&
        mpesaPaymentNumber &&
        mpesaPaymentNumber.length === 10 &&
        !isNaN(Number(mpesaPaymentNumber)) && (
          <TransactionButton
            transaction={() =>
              transfer({
                contract: getContract({
                  client: thirdwebFrontendClient,
                  chain: optimismSepolia,
                  address: "0x847Daaf2F7A1e4DAa41642206a4eE8BBe3f8521B",
                }),
                to: LIQUIDITY_ACCOUNT_PUBLIC_KEY,
                amount:
                  getOrderDetails.data?.qoutedTokenAmount ?? 10000000000000,
              })
            }
            onClick={() => {
              notifications.show({
                title: "Sending payment popup",
                message: "Confirm the payment pop  sent  to your wallet",
                autoClose: 8 * 1000,
              });
            }}
            onTransactionConfirmed={(reciept) => {
              confimPaymentApproval.mutate({
                orderId: orderId,
                txHash: reciept.transactionHash,
              });
              notifications.show({
                title: "Payment confirmed",
                message: "Intiating Fiat transfer to your M-pesa",
                autoClose: 10 * 1000,
                color: "green",
              });
              console.log(reciept.transactionHash);
            }}
            onError={(error) => {
              notifications.show({
                title: "Could not complete payment",
                message: error.message,
                color: "red",
              });
            }}
          >
            Make payment
          </TransactionButton>
        )}
    </Paper>
  );
}
