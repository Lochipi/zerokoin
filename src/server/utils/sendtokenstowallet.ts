import { privateKeyAccount } from "thirdweb/wallets";
import { thirdwebServerClient } from "./thirdweb";
import { transfer } from "thirdweb/extensions/erc20";
import { getContract, sendAndConfirmTransaction } from "thirdweb";
import { baseSepolia } from "thirdweb/chains";

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
    chain: baseSepolia,
    address: "0x73bce6bd1ECEa9a52f894BE1b1132896ecC29CA8",
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
