import { SWAP_PAGE } from "@/utils/constants";
import { Button, Notification, Pill } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const Hero = () => {
  return (
    <div className=" flex   flex-col items-center px-4 py-8 text-center">
      <Notification
        title={
          <div className=" flex h-full w-full items-center justify-between gap-x-2">
            <Pill>Alpha</Pill>
            <p className="">
              Zerokoin is in early development ! Launching soon
            </p>
          </div>
        }
        className=" flex h-10 w-fit items-center px-2 text-xs"
        radius="xl"
        withCloseButton={false}
      />
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight  md:text-5xl lg:text-6xl ">
        Buy or sell crypto with mobile money
      </h1>
      <p className="mb-8 text-lg font-normal  sm:px-16 lg:text-xl xl:px-48 ">
        An automated crypto-fiat on-ramp and off-ramp solution, integrating with
        Binance and M-Pesa for instant swaps
      </p>
      <div className="mb-8 flex w-full flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16">
        <Link href={SWAP_PAGE}>
          <Button size="lg" className=" w-full sm:w-fit">
            Get started
          </Button>
        </Link>

        <Button size="lg" variant="outline" className=" w-full sm:w-fit">
          Learn more
        </Button>
      </div>
      <div className="mx-auto px-4 text-center ">
        <span className="font-semibold uppercase ">POWERED BY</span>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row  sm:justify-around">
          <div className="mb-5 mr-5 h-32  w-64 ">
            <img
              src="/images/binance-logo.svg"
              alt=""
              className=" h-full w-full object-cover"
            />
          </div>

          <div className="mb-5 mr-5 h-32  w-64 lg:mb-0">
            <img
              src="/images/mpesa-logo.svg"
              alt=""
              className=" h-full w-full object-cover"
            />
          </div>
          <div className="mb-5 mr-5 h-32  w-64 lg:mb-0">
            <img
              src="/images/wallet-connect-logo.png"
              alt=""
              className=" h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
