import React from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { SiAdguard } from "react-icons/si";

import { FeatureCard } from "./FeatureCard";
export default function Features() {
  return (
    <section className="custom-screen py-8">
      <div className="mx-auto max-w-xl text-center leading-none">
        <h3 className=" text-4xl font-bold">Seamless crypto and fiat swaps</h3>
        <p className="">
          Zerokoin offers the best cryto-fiat on-ramp and off-ramp gateway
        </p>
      </div>

      <div className=" mx-auto mt-8 max-w-7xl grid-cols-2 gap-6 space-y-6 py-8 sm:grid sm:space-y-0 lg:grid-cols-3">
        <FeatureCard
          title="Automated"
          description="Seamlessly integrating with M-Pesa, Binance, and web wallets, transactions are automated for effortless crypto-to-Mpesa conversions."
          icon={
            <RiSecurePaymentLine
              size={24}
              className=" text-[color:var(--mantine-primary-color-4)] group-hover:animate-jello group-hover:animate-repeat-6"
            />
          }
        />
        <FeatureCard
          title="Affordable"
          description="Our exchange rates are closely  aligned with the current USD/KES exchange rate, ensuring transparent and competitive pricing ."
          icon={
            <GiTwoCoins
              size={24}
              className="  text-[color:var(--mantine-primary-color-4)]  group-hover:animate-jello group-hover:animate-repeat-6"
            />
          }
        />
        <FeatureCard
          title="Trustworthy"
          description=" With a flawless 100% trade completion rate, you can trade with confidence, knowing that every transaction is executed securely and seamlessly."
          icon={
            <SiAdguard
              size={24}
              className="  text-[color:var(--mantine-primary-color-4)] group-hover:animate-jello group-hover:animate-repeat-6"
            />
          }
        />
      </div>
    </section>
  );
}
