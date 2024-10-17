import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .refine(
        (str) => !str.includes("YOUR_MYSQL_URL_HERE"),
        "You forgot to change the default URL",
      ),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    THIRDWEB_SECRET_ID: z.string(),
    DIRECT_URL: z.string(),
    LIQUIDITY_ACCOUNT_PRIVATE_KEY: z.string(),
    MPESA_SANDBOX_CONSUMER_KEY: z.string(),
    MPESA_SANDBOX_CONSUMER_SECRET: z.string(),
    MPESA_SANDBOX_CONSUMER_PASSKEY: z.string(),
    MPESA_SANDBOX_SHORT_CODE: z.string(),
    MPESA_CTOB_CALLBACK_URL: z.string(),
    MPESA_BTOC_CALLBACK_URL: z.string(),
    MPESA_BTOC_TIMEOUT_URL: z.string(),
    PAYSTACK_SECRET_KEY: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: z.string(),
    NEXT_PUBLIC_WALLETKIT_PROJECET_ID: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    // server
    DATABASE_URL: process.env.DATABASE_URL,
    NODE_ENV: process.env.NODE_ENV,
    THIRDWEB_SECRET_ID: process.env.THIRDWEB_SECRET_ID,
    DIRECT_URL: process.env.DIRECT_URL,
    LIQUIDITY_ACCOUNT_PRIVATE_KEY: process.env.LIQUIDITY_ACCOUNT_PRIVATE_KEY,
    MPESA_SANDBOX_CONSUMER_KEY: process.env.MPESA_SANDBOX_CONSUMER_KEY,
    MPESA_SANDBOX_CONSUMER_SECRET: process.env.MPESA_SANDBOX_CONSUMER_SECRET,
    MPESA_SANDBOX_CONSUMER_PASSKEY: process.env.MPESA_SANDBOX_CONSUMER_PASSKEY,
    MPESA_SANDBOX_SHORT_CODE: process.env.MPESA_SANDBOX_SHORT_CODE,
    MPESA_CTOB_CALLBACK_URL: process.env.MPESA_CTOB_CALLBACK_URL,
    MPESA_BTOC_CALLBACK_URL: process.env.MPESA_BTOC_CALLBACK_URL,
    MPESA_BTOC_TIMEOUT_URL: process.env.MPESA_BTOC_TIMEOUT_URL,
    PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,

    // client
    NEXT_PUBLIC_THIRDWEB_CLIENT_ID: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID,
    NEXT_PUBLIC_WALLETKIT_PROJECET_ID:
      process.env.NEXT_PUBLIC_WALLETKIT_PROJECET_ID,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
