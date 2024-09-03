export function getBlockchainName(chainId: number): string {
  if (chainId === 42161) {
    return "ARBITRUM ONE";
  } else if (chainId === 10) {
    return "OPTIMISM";
  } else if (chainId === 56) {
    return "BNB SMART CHAIN";
  } else if (chainId === 11155420) {
    return "OP SEPOLIA";
  } else {
    return "EVM CHAIN";
  }
}
