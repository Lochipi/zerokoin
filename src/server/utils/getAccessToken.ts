import { TRPCError } from "@trpc/server";
import axios, { type AxiosError, type AxiosResponse } from "axios";

interface AccessTokenResponse {
  access_token: string;
  expires_in: number;
}

const getAccessToken = async ({
  sandbox,
}: {
  sandbox: boolean;
}): Promise<string> => {
  try {
    const baseURL = sandbox
      ? "https://sandbox.safaricom.co.ke"
      : "https://api.safaricom.co.ke";
    const url = `${baseURL}/oauth/v1/generate?grant_type=client_credentials`;

    const encodedCredentials = Buffer.from(
      `${sandbox ? process.env.MPESA_SANDBOX_CONSUMER_KEY! : process.env.MPESA_LIVE_CONSUMER_KEY!}:${sandbox ? process.env.MPESA_SANDBOX_CONSUMER_SECRET! : process.env.MPESA_LIVE_CONSUMER_SECRET!}`,
    ).toString("base64");

    const headers = {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/json",
    };

    const response: AxiosResponse<AccessTokenResponse> = await axios.get(url, {
      headers,
    });

    return response.data.access_token;
  } catch (error) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to get access token: ${axiosError.response.statusText}`,
        cause: axiosError.cause,
      });
    } else {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: `Failed to get access token: ${axiosError.message}`,
        cause: axiosError.cause,
      });
    }
  }
};

export default getAccessToken;
