"use client";

import React, { type ReactNode } from "react";
import { ThirdwebProvider } from "thirdweb/react";

interface ThirdwebProviderConfigProps {
  children: ReactNode;
}
export default function ThirdwebProviderConfig({
  children,
}: ThirdwebProviderConfigProps) {
  return <ThirdwebProvider>{children}</ThirdwebProvider>;
}
