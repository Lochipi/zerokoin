import { HOME_PAGE } from "@/utils/constants";
import { Image } from "@mantine/core";
import Link from "next/link";
import React from "react";

export const Logo = () => {
  return (
    <Link href={HOME_PAGE} className="flex items-center gap-x-2">
      <Image src="/images/logo.png" alt="Logo" className="h-10 w-10" />
      <h3>Zerokoin</h3>
    </Link>
  );
};
