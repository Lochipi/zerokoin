import { SWAP_PAGE } from "@/utils/constants";
import { Button, Notification, Pill } from "@mantine/core";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { contVariant, leftVariant, textVariant } from "./Animations";
import { useRouter } from "next/navigation";

const Words = ["Complexity", "Barriers"];

export const Hero = () => {
  const [words] = useState(Words);
  const [index, setIndex] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [words.length]);

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
      <motion.h1
        className="mb-4 text-4xl font-extrabold leading-none  tracking-tight md:text-5xl lg:text-6xl"
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        variants={textVariant}
      >
        Exchange digital currencies with <br />
        Zero{" "}
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </motion.h1>
      <motion.p
        className="mb-8 text-lg font-normal  sm:px-16 lg:text-xl xl:px-48 "
        initial="initial"
        whileInView="final2"
        viewport={{ once: true }}
        variants={textVariant}
      >
        An automated crypto-fiat on-ramp and off-ramp solution, integrating with
        Binance and M-Pesa for instant swaps
      </motion.p>
      <motion.div
        className="mb-8 flex w-full flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0 lg:mb-16"
        initial="initial"
        whileInView="final"
        viewport={{ once: true }}
        variants={contVariant}
      >
        {/* <Link href={SWAP_PAGE}> */}

        <Button
          size="lg"
          className=" w-full animate-bounce sm:w-fit"
          onClick={() => router.push(SWAP_PAGE)}
        >
          Get started
        </Button>
        {/* </Link> */}
        <Button
          size="lg"
          variant="outline"
          className=" w-full animate-bounce sm:w-fit"
        >
          Learn more
        </Button>
      </motion.div>
      <div className="mx-auto px-4 text-center ">
        <span className="font-semibold uppercase ">POWERED BY</span>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row  sm:justify-around">
          <motion.div
            className="mb-5 mr-5 h-32  w-64 "
            initial="initial"
            whileInView="final"
            // viewport={{ once: true }}
            variants={leftVariant}
          >
            <img
              src="/images/binance-logo.svg"
              alt=""
              className=" h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            className="mb-5 mr-5 h-32  w-64 lg:mb-0"
            initial="initial"
            whileInView="final2"
            // viewport={{ once: true }}
            variants={leftVariant}
          >
            <img
              src="/images/mpesa-logo.svg"
              alt=""
              className=" h-full w-full object-cover"
            />
          </motion.div>
          <motion.div
            className="mb-5 mr-5 h-32  w-64 lg:mb-0"
            initial="initial"
            whileInView="final3"
            // viewport={{ once: true }}
            variants={leftVariant}
          >
            <img
              src="/images/wallet-connect-logo.png"
              alt=""
              className=" h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
