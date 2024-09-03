import { OP_SEPOLIA_TESTNET_CHAIN_ID } from "@/utils/constants";
import { thirdwebServerClient } from "./thirdweb";
import {
  defineChain,
  eth_getBlockByNumber,
  eth_getTransactionByHash,
  eth_getTransactionReceipt,
  getRpcClient,
  hexToBigInt,
  toTokens,
} from "thirdweb";

export async function getERC20TransactionInfo(hash: string) {
  const rpcRequest = getRpcClient({
    client: thirdwebServerClient,
    chain: defineChain(OP_SEPOLIA_TESTNET_CHAIN_ID),
  });
  try {
    const transaction = await eth_getTransactionByHash(rpcRequest, {
      hash: hash as `0x${string}`,
    });
    const blockNumber = transaction.blockNumber;
    const fromAddress = transaction.from;
    const toAddress = transaction.to;
    const gasUsed = transaction.gas.toString();

    const timestamp = blockNumber
      ? (
          await eth_getBlockByNumber(rpcRequest, {
            blockNumber: blockNumber,
          })
        ).timestamp
      : null;

    // Convert timestamp to Date object
    const date = timestamp ? new Date(Number(timestamp) * 1000) : null;

    // Get transaction receipt to check success
    const transactionReceipt = await eth_getTransactionReceipt(rpcRequest, {
      hash: hash as `0x${string}`,
    });
    const transactionStatus = transactionReceipt.status;

    // Decode ERC-20 details from transaction logs
    const logs = transactionReceipt.logs;
    let tokenAddress = null;
    let tokenAmount = null;
    for (const log of logs) {
      if (
        log.topics[0] ===
        "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
      ) {
        // ERC-20 Transfer event signature
        tokenAddress = log.topics[1];
        tokenAmount = toTokens(hexToBigInt(log.data), 18); // Convert raw amount to string
        break;
      }
    }

    console.log({
      timestamp: date,
      transactionStatus,
      fromAddress,
      toAddress,
      gasUsed,
      tokenAddress,
      tokenAmount,
    });
    return {
      timestamp: date,
      transactionStatus,
      fromAddress,
      toAddress,
      gasUsed,
      tokenAmount,
    };
  } catch (error) {
    console.error("Error fetching transaction info:", error);
    return null;
  }
}
