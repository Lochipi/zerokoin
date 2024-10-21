import { useState, useCallback } from "react";
import { showNotification } from "@mantine/notifications";
import { resolveAddress } from "thirdweb/extensions/ens";
import { thirdwebFrontendClient } from "../thirdweb";
import { base, baseSepolia } from "thirdweb/chains";

const BASENAME_RESOLVER_ADDRESS = "0xC6d566A56A1aFf6508b41f6c90ff131615583BCD";
const BASE_SEPOLIA_BASENAME_RESOLVER_ADDRESS =
  "0x6533C94869D28fAA8dF77cc63f9e2b2D6Cf77eBA";

const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";

const useResolveBaseNameToWalletAddress = () => {
  const [loading, setLoading] = useState(false);
  const [resolvedAddress, setResolvedAddress] = useState<string | null>(null);

  const resolveBaseNameToWalletAddress = useCallback(
    async ({ chainId, basename }: { chainId: number; basename: string }) => {
      if (!basename || basename.length < 8 || !basename.endsWith(".eth")) {
        showNotification({
          title: "Invalid Basename",
          message: "Enter a valid Basename",
        });
        return null;
      }

      setLoading(true);

      try {
        const address = await resolveAddress({
          client: thirdwebFrontendClient,
          name: basename,
          resolverAddress:
            chainId === 8453
              ? BASENAME_RESOLVER_ADDRESS
              : chainId === 84532
                ? BASE_SEPOLIA_BASENAME_RESOLVER_ADDRESS
                : undefined,
          resolverChain:
            chainId === 8453
              ? base
              : chainId === 84532
                ? baseSepolia
                : undefined,
        });

        // Check if the address is the null address
        if (!address || address === NULL_ADDRESS) {
          showNotification({
            title: "Error",
            message: "Could not resolve the wallet address",
            color: "red",
          });
          setResolvedAddress(null);
        } else {
          showNotification({
            title: "Success",
            message: "Resolved wallet address",
            color: "green",
          });
          setResolvedAddress(address);
        }

        return address;
      } catch (error) {
        showNotification({
          title: "Error",
          message: "An error occurred while resolving the address",
          color: "red",
        });
        setResolvedAddress(null);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return { resolveBaseNameToWalletAddress, loading, resolvedAddress };
};

export default useResolveBaseNameToWalletAddress;
