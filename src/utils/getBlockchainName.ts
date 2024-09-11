export function getBlockchainName(chainId: number): string {
  if (chainId === 42161) {
    return "ARBITRUM ONE";
  } else if (chainId === 10) {
    return "OPTIMISM";
  } else if (chainId === 1135) {
    return "LISK NETWORK";
  } else if (chainId === 4202) {
    return "LISK NETWORK";
  } else if (chainId === 8453) {
    return "BASE MAINNET";
  } else if (chainId === 11155420) {
    return "OP SEPOLIA";
  } else {
    return "EVM CHAIN";
  }
}
