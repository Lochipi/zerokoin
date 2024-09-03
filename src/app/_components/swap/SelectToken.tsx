"use client";
import { globalStore } from "@/stores";
import { Image, Menu, Paper } from "@mantine/core";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSnapshot } from "valtio";

interface SelectTokenProps {
  supportedTokens: ("KES" | "NGN" | "USDT" | "USDC")[];
  isKenyanShilling?: boolean;
}
export default function SelectToken({
  isKenyanShilling,
  supportedTokens,
}: SelectTokenProps) {
  const storeSnapshot = useSnapshot(globalStore);

  const tokenImageLink = isKenyanShilling
    ? "/images/tokens/KES.png"
    : storeSnapshot.selectedToken === "NGN"
      ? "/images/tokens/ngn.png"
      : storeSnapshot.selectedToken === "USDT"
        ? "/images/tokens/USDT.svg"
        : storeSnapshot.selectedToken === "USDC"
          ? "/images/tokens/USDC.png"
          : "";
  return (
    <Menu position="bottom" withArrow width={140}>
      <Menu.Target>
        <Paper
          withBorder
          className=" mx-2  flex  items-center  gap-x-2 bg-[var(--mantine-color-primary-filled)] px-2 text-xs hover:bg-[var(--mantine-color-primary-filled)]"
        >
          <Image
            src={tokenImageLink}
            alt="token logo"
            className=" h-4 w-4  object-cover"
          />
          <p className=" w-10  font-bold ">
            {isKenyanShilling ? "KES" : storeSnapshot.selectedToken}
          </p>
          <IoMdArrowDropdown />
        </Paper>
      </Menu.Target>
      <Menu.Dropdown className=" ">
        {supportedTokens.map((token) => (
          <Menu.Item
            className=" h-10 text-sm"
            key={token}
            onClick={() => {
              if (!isKenyanShilling) {
                globalStore.selectedToken = token;
              }
            }}
            leftSection={
              <Image
                src={
                  token === "KES"
                    ? "/images/tokens/KES.png"
                    : token === "NGN"
                      ? "/images/tokens/ngn.png"
                      : token === "USDT"
                        ? "/images/tokens/USDT.svg"
                        : token === "USDC"
                          ? "/images/tokens/USDC.png"
                          : ""
                }
                alt="token logo"
                className=" h-4 w-4 object-contain"
              />
            }
          >
            <p>{token}</p>
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
