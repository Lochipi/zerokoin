import { createThirdwebClient } from "thirdweb";

export const thirdwebFrontendClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});
