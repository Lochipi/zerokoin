"use client";
import { Burger, Button, Drawer, Paper } from "@mantine/core";
import Link from "next/link";
import React, { useState } from "react";
import ThemeToggle from "../themetoggle/ThemeToggle";
import { HOME_PAGE, SWAP_PAGE } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { globalStore } from "@/stores";
import { Logo } from "../Logo";
import { ConnectWalletButton } from "../ConnectWalletButton";

export default function Navbar() {
  const pathname = usePathname();

  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const navItems = [
    { label: "Buy crypto", path: SWAP_PAGE },
    { label: "Sell crypto", path: SWAP_PAGE },
    // { label: "Bridge", path: SWAP_PAGE },
    { label: "Whitepaper", path: HOME_PAGE },
  ];
  return (
    <Paper className="fixed top-0 z-50 flex  items-center  justify-center w-full  px-4 py-2   text-sm    font-medium  sm:px-12">
      <div className="flex w-full lg:w-[1400px] ">
        <div className=" flex-1 ">
          <Logo />
        </div>
        <section className=" hidden grow justify-center gap-x-6 sm:flex">
          {navItems.map((item) => (
            <Link
              href={item.path}
              key={item.label}
              onClick={() => {
                item.label === "Buy crypto"
                  ? (globalStore.orderType = "Buy")
                  : "Sell crypto"
                    ? (globalStore.orderType = "Sell")
                    : undefined;
              }}
              className=" hover:text-[color:var(--mantine-primary-color-4)] focus:text-[color:var(--mantine-primary-color-4)]"
            >
              {item.label}
            </Link>
          ))}
        </section>
        <div className=" hidden  items-center justify-end gap-x-2 sm:flex  sm:flex-1">
          {pathname.includes("/swap") || pathname.includes("/orders") ? (
            <ConnectWalletButton buttonText="Connect Wallet" />
          ) : (
            <Link href={SWAP_PAGE}>
              <Button className=" rounded-full shadow">Launch app</Button>
            </Link>
          )}

          <ThemeToggle />
        </div>

        <Burger
          opened={mobileDrawerOpen}
          onClick={() => setMobileDrawerOpen((prev) => !prev)}
          className=" sm:hidden"
        />
        {/* MOBILE DRAWER */}
        <Drawer
          opened={mobileDrawerOpen}
          onClose={() => setMobileDrawerOpen(false)}
          position="top"
          offset={8}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
          title={
            <Link href="/" className=" text-sm font-bold">
              Zerokoin
            </Link>
          }
          radius="md"
          size="xs"
          transitionProps={{
            transition: "slide-down",
            duration: 300,
            timingFunction: "linear",
          }}
          className=" z-50"
        >
          <div className=" flex  flex-col text-sm font-medium">
            <section className="  flex  flex-col gap-y-6">
              {navItems.map((item) => (
                <Link
                  href={item.path}
                  key={item.label}
                  onClick={() => {
                    item.label === "Buy crypto"
                      ? (globalStore.orderType = "Buy")
                      : "Sell crypto"
                        ? (globalStore.orderType = "Sell")
                        : undefined;
                  }}
                  className=" hover:text-[color:var(--mantine-primary-color-4)] focus:text-[color:var(--mantine-primary-color-4)]"
                >
                  {item.label}
                </Link>
              ))}
              <div className="   flex items-center  justify-between gap-x-2">
                {pathname.includes("/swap") || pathname.includes("/orders") ? (
                  <ConnectWalletButton buttonText="Connect Wallet" />
                ) : (
                  <Link href={SWAP_PAGE}>
                    <Button className=" rounded-full shadow">Launch app</Button>
                  </Link>
                )}
                <ThemeToggle />
              </div>
            </section>
          </div>
        </Drawer>

      </div>
    </Paper>
  );
}
