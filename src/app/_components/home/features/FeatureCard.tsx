import { Paper } from "@mantine/core";
import React, { type ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}
export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <Paper
      withBorder
      className=" group h-56 w-full    p-4 leading-tight shadow  hover:border-2 hover:border-[color:var(--mantine-primary-color-4)]"
    >
      <Paper
        withBorder
        className=" flex w-fit items-center justify-center rounded-full p-2"
      >
        {icon}
      </Paper>
      <p className=" font-bold">{title}</p>
      <p>{description}</p>
    </Paper>
  );
};
