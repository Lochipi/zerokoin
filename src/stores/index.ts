import { proxy } from "valtio";

type GlobalStoreType = {
  walletChoice: "Binance" | "Wallet";
  orderType: "Buy" | "Sell";
  selectedFiatCurrency: "KES" | "NGN";
  selectedCryptoToken: "USDT" | "USDC";
  selectedToken: "KES" | "NGN" | "USDT" | "USDC";
};

export const globalStore = proxy<GlobalStoreType>({
  walletChoice: "Wallet",
  orderType: "Buy",
  selectedFiatCurrency: "KES",
  selectedCryptoToken: "USDC",
  selectedToken: "USDC",
});
