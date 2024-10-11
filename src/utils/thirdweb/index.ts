import { env } from "@/env";
import { createThirdwebClient } from "thirdweb";

export const thirdwebFrontendClient = createThirdwebClient({
  clientId: env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
});
