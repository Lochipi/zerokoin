import { privateKeyAccount } from "thirdweb/wallets";
import { thirdwebServerClient } from "./thirdweb";
import { transfer } from "thirdweb/extensions/erc20";
import { defineChain, getContract, sendAndConfirmTransaction } from "thirdweb";

export async function sendStableCoinTokenToWalletAddress({
  toAddress,
  amount,
}: {
  stablecoin: "USDC" | "USDT";
  toAddress: string;
  amount: string;
}) {
  const liquidityWallet = privateKeyAccount({
    client: thirdwebServerClient,
    privateKey: process.env.LIQUIDITY_ACCOUNT_PRIVATE_KEY!,
  });
  const LiskSepoliaUSDCTestContract = getContract({
    client: thirdwebServerClient,
    chain: defineChain(4202),
    address: "0xf966ce77F72a662b496530349026Aa4881119242",
  });
  const transferTokensTransaction = transfer({
    contract: LiskSepoliaUSDCTestContract,
    to: toAddress,
    amount: amount,
  });

  const receipt = await sendAndConfirmTransaction({
    transaction: transferTokensTransaction,
    account: liquidityWallet,
  });
  if (receipt) {
    console.log("Transaction processed", receipt.transactionHash);
    return receipt.transactionHash;
  } else {
    return undefined;
  }
}
