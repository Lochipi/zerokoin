"use client";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import cx from "clsx";
import classes from "./ThemeToggle.module.css";
import { CiLight, CiDark } from "react-icons/ci";

export default function ThemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("dark", {
    getInitialValueInEffect: true,
  });

  return (
    <ActionIcon
      onClick={() =>
        setColorScheme(computedColorScheme === "light" ? "dark" : "light")
      }
      variant="default"
      aria-label="Toggle color scheme"
      className=" rounded-full"
    >
      <CiLight size={24} className={cx(classes.icon, classes.light)} />
      <CiDark size={24} className={cx(classes.icon, classes.dark)} />
    </ActionIcon>
  );
}
