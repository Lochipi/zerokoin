import { thirdwebFrontendClient } from "@/utils/thirdweb";
import { useComputedColorScheme } from "@mantine/core";
import { ConnectButton } from "thirdweb/react";
import { createWallet, embeddedWallet } from "thirdweb/wallets";
import { defineChain, optimismSepolia } from "thirdweb/chains";
import { notifications } from "@mantine/notifications";

interface ConnectWalletButtonProps {
  buttonText: string;
  isBuyOrSellButton?: boolean;
}

export const ConnectWalletButton = ({
  buttonText,
  isBuyOrSellButton,
}: ConnectWalletButtonProps) => {
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  return (
    <div className="">
      <ConnectButton
        client={thirdwebFrontendClient}
        chain={optimismSepolia}
        chains={[defineChain(4202), defineChain(1135)]}
        wallets={[
          embeddedWallet(),
          createWallet("com.binance"),
          createWallet("com.trustwallet.app"),
          createWallet("io.metamask"),
          createWallet("walletConnect"),
        ]}
        recommendedWallets={[
          createWallet("com.binance"),
          createWallet("com.trustwallet.app"),
        ]}
        appMetadata={{
          name: "Zerokoin",
          description:
            "Your Instant crypto-fiat on-ramp and off-ramp  solution",
          url: "https://www.zerokoin.vercel.app",
          logoUrl: "/images/logo.png",
        }}
        connectButton={{
          label: buttonText,
          className: " w-full",
          style: {
            width: "100%",
            backgroundColor: isBuyOrSellButton ? "#51CF66" : undefined,
          },
        }}
        connectModal={{
          showThirdwebBranding: false,
          title: "Connect to Zerokoin",
          titleIcon: "",
        }}
        theme={computedColorScheme === "light" ? "light" : "dark"}
        onConnect={(wallet) => {
          notifications.show({
            title: "Wallet connected",
            message: `${wallet.getAccount()?.address} `,
            color: "green",
          });
        }}
      />
    </div>
  );
};
