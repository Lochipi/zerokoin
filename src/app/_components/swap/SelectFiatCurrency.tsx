import { globalStore } from "@/stores";
import { Image, Menu, Paper } from "@mantine/core";
import React from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useSnapshot } from "valtio";

export default function SelectFiatCurrency() {
  const storeSnapshot = useSnapshot(globalStore);

  const tokenImageLink =
    storeSnapshot.selectedFiatCurrency === "KES"
      ? "/images/tokens/KES.png"
      : "/images/tokens/ngn.png";

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
            {storeSnapshot.selectedFiatCurrency === "KES" ? "KES" : "NGN"}
          </p>
          <IoMdArrowDropdown />
        </Paper>
      </Menu.Target>
      <Menu.Dropdown className=" ">
        {["KES", "NGN"].map((token) => (
          <Menu.Item
            className=" h-10 text-sm"
            key={token}
            onClick={() => {
              globalStore.selectedFiatCurrency = token as "KES" | "NGN";
            }}
            leftSection={
              <Image
                src={
                  token === "KES"
                    ? "/images/tokens/KES.png"
                    : token === "NGN"
                      ? "/images/tokens/ngn.png"
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
