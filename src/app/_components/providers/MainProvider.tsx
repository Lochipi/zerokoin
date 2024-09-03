"use client";

import { MantineProvider } from "@mantine/core";
import React, { type ReactNode } from "react";
import { Notifications } from "@mantine/notifications";
import ThirdwebProviderConfig from "./ThirdWebProviderConfig";
import { ModalsProvider } from "@mantine/modals";

interface MainProviderProps {
  children: ReactNode;
}
const MainProvider = ({ children }: MainProviderProps) => {
  return (
    <MantineProvider
      theme={{
        primaryColor: "yellow",
        primaryShade: { dark: 5 },
        colors: {
          yellow: [
            "#fff8e0",
            "#ffefca",
            "#ffdd99",
            "#ffc962",
            "#ffb936",
            "#ffaf18",
            "#ffaa03",
            "#e49400",
            "#ca8300",
            "#b07000",
          ],
          dark: [
            "#DADEE7",
            "#B3BACC",
            "#8E98B4",
            "#69779B",
            "#4E5974",
            "#353D50",
            "#1C202A",
            "#12151C",
            "#0A0C0F",
            "#040506",
          ],
        },
        fontFamily: "Inter, sans-serif",
      }}
    >
      <ModalsProvider>
        <ThirdwebProviderConfig>{children}</ThirdwebProviderConfig>
        <Notifications />
      </ModalsProvider>
    </MantineProvider>
  );
};

export default MainProvider;
