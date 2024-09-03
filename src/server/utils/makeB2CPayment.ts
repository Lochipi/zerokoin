import axios, { type AxiosError, type AxiosResponse } from "axios";
import { TRPCError } from "@trpc/server";
import getAccessToken from "./getAccessToken";

interface B2CRequestParams {
  originatorConversationId: string;
  commandId: "BusinessPayment" | "SalaryPayment" | "PromotionPayment";
  amount: number;
  partyB: string;
  remarks: string;
  occasion: string;
}

interface B2CResponse {
  conversationId: string;
  originatorConversationId: string;
  responseCode: string;
  responseDescription: string;
}

export async function makeB2CPayment(
  params: B2CRequestParams,
  sandbox: boolean,
): Promise<B2CResponse> {
  try {
    const baseUrl = sandbox
      ? "https://sandbox.safaricom.co.ke"
      : "https://api.safaricom.co.ke";

    const token = await getAccessToken({
      sandbox: sandbox,
    });

    const response: AxiosResponse<B2CResponse> = await axios.post(
      `${baseUrl}/mpesa/b2c/v3/paymentrequest`,
      {
        originatorConversationId: params.originatorConversationId,
        InitiatorName: "your_api_username",
        SecurityCredential: "your_encrypted_password",
        CommandID: params.commandId,
        Amount: params.amount,
        PartyA: 600982,
        PartyB: params.partyB,
        Remarks: params.remarks,
        QueueTimeOutURL: process.env.MPESA_BTOC_TIMEOUT_URL,
        ResultURL: process.env.MPESA_BTOC_CALLBACK_URL,
        Occasion: params.occasion,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.error(
        "Error making B2C payment request:",
        axiosError.response?.data || axiosError.message,
      );
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        cause: error.cause,
        message: error.message,
      });
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
