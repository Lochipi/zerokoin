import { proxy } from "valtio";

type GlobalStoreType = {
  walletChoice: "Binance" | "Wallet";
  orderType: "Buy" | "Sell";
  selectedToken: "KES" | "NGN" | "USDT" | "USDC";
};

export const globalStore = proxy<GlobalStoreType>({
  walletChoice: "Wallet",
  orderType: "Buy",
  selectedToken: "USDC",
});
