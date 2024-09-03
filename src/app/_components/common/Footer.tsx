import React from "react";

import Link from "next/link";
import { RiDiscordFill, RiTwitterXFill, RiYoutubeFill } from "react-icons/ri";

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
            <Link href="/">
              <h2>Zerokoin</h2>
            </Link>
          </div>
        </div>
        <div className="grid list-none grid-cols-2 gap-x-3 gap-y-8 text-sm sm:grid-cols-4 lg:w-2/3">
          <div className="fle  space-y-3">
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
                  Bridge Assets
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
          <div className="space-y-3">
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
          </div>
          <div className="space-y-3">
            <h3 className="uppercase ">SOCIAL MEDIA</h3>
            <div className="flex gap-x-2 space-y-1">
              <Link
                rel="noopener noreferrer"
                href="/"
                title="X"
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
                href="/"
                title="Discord"
                className="flex items-center p-1"
              >
                <RiDiscordFill size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="py-6 text-center text-sm">
        © {currentYear} Zerokoin, All rights reserved.
      </div>
    </footer>
  );
}
