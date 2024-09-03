import { privateKeyAccount } from "thirdweb/wallets";
import { thirdwebServerClient } from "./thirdweb";
import { transfer } from "thirdweb/extensions/erc20";
import { getContract, sendAndConfirmTransaction } from "thirdweb";
import { optimismSepolia } from "thirdweb/chains";

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
  const opSepoliaUSDCTestContract = getContract({
    client: thirdwebServerClient,
    chain: optimismSepolia,
    address: "0x847Daaf2F7A1e4DAa41642206a4eE8BBe3f8521B",
  });
  const transferTokensTransaction = transfer({
    contract: opSepoliaUSDCTestContract,
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
