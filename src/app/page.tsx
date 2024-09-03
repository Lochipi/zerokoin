"use client";
import React from "react";
import { Hero } from "./_components/home/Hero";
import Features from "./_components/home/features/Features";
import Faqs from "./_components/home/faqs/Faqs";
import { NewsLetter } from "./_components/home/newletter/NewsLetter";
import Script from "next/script";

export default function Homepage() {
  return (
    <div className="  ">
      <Hero />
      <Features />
      <Script src="https://public.bnbstatic.com/unpkg/growth-widget/cryptoCurrencyWidget@0.0.9.min.js"></Script>
      <div
        className="binance-widget-marquee"
        data-cmc-ids="1,1027,1839,5426,52,3408,5805,3890,7083,825"
        data-theme="light"
        data-transparent="true"
        data-locale="en"
        data-powered-by="Powered by"
        data-disclaimer="Disclaimer"
      ></div>
      <Faqs />
      <NewsLetter />
    </div>
  );
}
