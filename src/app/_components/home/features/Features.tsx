import React from "react";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GiTwoCoins } from "react-icons/gi";
import { SiAdguard } from "react-icons/si";
import {motion} from "framer-motion";
import { FeatureCard } from "./FeatureCard";
import { textVariant } from "../Animations";


export default function Features() {
  return (
    <section className="custom-screen  md:py-8">
      <div className="mx-auto max-w-xl text-center leading-none">
        <motion.h3 className="text-2xl md:text-4xl font-bold"
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        variants={textVariant}
        >Seamless crypto and fiat swaps</motion.h3>
        <motion.p className=""
        initial="initial"
        whileInView="final2"
        viewport={{ once: true }}
        variants={textVariant}
        >
          Zerokoin offers the best cryto-fiat on-ramp and off-ramp gateway
        </motion.p>
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
