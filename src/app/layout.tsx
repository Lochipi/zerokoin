import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@/styles/globals.css";

import { TRPCReactProvider } from "@/trpc/react";
import { ColorSchemeScript } from "@mantine/core";
import MainProvider from "./_components/providers/MainProvider";

import Footer from "./_components/common/Footer";
import { Inter } from "next/font/google";
import Navbar from "./_components/common/navbar/Navbar";

export const metadata = {
  title: "Zerokoin",
  description:
    "An automated peer to peer crypto-fiat on/off-ramp solution by Pochylabs",
  icons: [{ rel: "icon", url: "/images/favicon/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <MainProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="w-full flex-1 overflow-y-auto overflow-x-hidden px-4 pt-20 sm:px-12 sm:pt-24">
                {children}
              </main>
              <Footer />
            </div>
          </MainProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
