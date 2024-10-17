import axios, { type AxiosResponse } from "axios";
import { env } from "@/env";

interface VerifyTransactionResponseData {
  status: string;
  reference: string;
  amount: number;
  gateway_response: string;
}

interface VerifyTransactionResponse {
  status: boolean;
  message: string;
  data: VerifyTransactionResponseData;
}

interface VerifyPaystackTransactionParams {
  transactionReference: string;
}

interface VerifyTransactionResult {
  isSuccess: boolean;
  transactionStatus: string;
}

async function verifyPaystackTransaction({
  transactionReference,
}: VerifyPaystackTransactionParams): Promise<VerifyTransactionResult> {
  const PAYSTACK_SECRET_KEY = env.PAYSTACK_SECRET_KEY;
  const url = `https://api.paystack.co/transaction/verify/${transactionReference}`;

  try {
    const response: AxiosResponse<VerifyTransactionResponse> = await axios.get(
      url,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data.status) {
      const transactionStatus = response.data.data.status;
      const isSuccess = transactionStatus === "success";

      return {
        isSuccess,
        transactionStatus,
      };
    } else {
      console.log("Error:", response.data.message);
      throw new Error(response.data.message || "Failed to verify transaction");
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Paystack API error during transaction verification");
    } else {
      throw new Error(
        "An unknown error occurred during transaction verification",
      );
    }
  }
}

export default verifyPaystackTransaction;
