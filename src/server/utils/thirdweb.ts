import { env } from "@/env";
import { createThirdwebClient } from "thirdweb";

export const thirdwebServerClient = createThirdwebClient({
  secretKey: env.THIRDWEB_SECRET_ID,
});
