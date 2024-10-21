import React from "react";
import { Image } from "@mantine/core";
import { HOME_PAGE } from "@/utils/constants";
import Link from "next/link";
import { RiGithubFill, RiTwitterXFill, RiYoutubeFill } from "react-icons/ri";


export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="divide-y px-4 sm:px-12">
      <div className="container mx-auto flex flex-col justify-between space-y-8 py-10 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <div
            rel="noopener noreferrer"
            className="flex justify-center space-x-3 lg:justify-start"
          >
            <Link
              href={HOME_PAGE}
              className=" mb-[50px] flex flex-col items-center"
            >
              <div className="flex items-center gap-x-2">
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  className=" h-10 w-10 md:h-14 md:w-14 lg:h-16 lg:w-16 "
                />
                <h3 className="text-[34px] md:text-[38px] lg:text-[42px]">
                  Zerokoin
                </h3>
              </div>
              <div className="my-[-45px] ml-[50px] text-[10px] md:ml-[65px] md:mt-[-52px] md:text-[11px] lg:ml-[70px] lg:mt-[-57px] lg:text-[12px]">
                Zero Complexity, Zero Barriers.
              </div>
            </Link>
          </div>
        </div>

        <div className="grid list-none grid-cols-2 gap-x-3 gap-y-8 text-sm sm:grid-cols-3 lg:ml-[60px] lg:w-2/3">
          <div className="space-y-3">
            <h3 className="tracki uppercase">Product</h3>
            <div className="space-y-1 ">
              <li>
                <Link rel="noopener noreferrer" href="/">
                  Buy Crypto
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" href="/">
                  Sell Crypto
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" href="/">
                  Whitepaper
                </Link>
              </li>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="tracki uppercase ">Company</h3>
            <div className="space-y-1">
              <li className="">
                <Link rel="noopener noreferrer" href="/">
                  Mission
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" href="#">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" href="#">
                  Privacy policy
                </Link>
              </li>
            </div>
          </div>

          {/* <div className="space-y-3">
            <h3 className="uppercase ">Docs</h3>
            <div className="space-y-1">
              <li>
                <Link rel="noopener noreferrer" href="/">
                  Guide
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" href="/">
                  Documentation
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" href="/">
                  Tutorials
                </Link>
              </li>
              <li>
                <Link rel="noopener noreferrer" href="/">
                  FAQs
                </Link>
              </li>
            </div>
          </div> */}

          <div className="space-y-3">
            <h3 className="uppercase ">SOCIAL MEDIA</h3>
            <div className="flex gap-x-2 space-y-1">
              <Link
                rel="noopener noreferrer"
                href="https://x.com/zerokoin"
                target="_blank"
                title="Twitter"
                className="flex items-center p-1"
              >
                <RiTwitterXFill size={24} />
              </Link>
              <Link
                rel="noopener noreferrer"
                href="/"
                title="Youtube"
                className="flex items-center p-1"
              >
                <RiYoutubeFill size={24} />
              </Link>
              <Link
                rel="noopener noreferrer"
                target="_blank"
                href="https://github.com/Lochipi/Zerokoin/"
                title="Discord"
                className="flex items-center p-1"
              >
                <RiGithubFill size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t-[2px] border-white py-6 text-center text-sm text-[#bbb]">
        © {currentYear} Zerokoin, All rights reserved.
      </div>
    </footer>
  );
}
