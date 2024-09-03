import { createThirdwebClient } from "thirdweb";

export const thirdwebServerClient = createThirdwebClient({
  secretKey: process.env.THIRDWEB_SECRET_ID ?? "",
});
