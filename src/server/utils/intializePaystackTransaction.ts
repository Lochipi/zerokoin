import { env } from "@/env";
import axios, { type AxiosResponse } from "axios";

interface InitializeTransactionResponseData {
  authorization_url: string;
  access_code: string;
  reference: string;
}

interface InitializeTransactionResponse {
  status: boolean;
  message: string;
  data: InitializeTransactionResponseData;
}

interface InitializeTransactionParams {
  email: string;
  amount: number; // Amount in subunit (e.g., kobo for NGN)
}

interface InitializePaystackTransactionParams {
  userPaymentEmail: string;
  amount: number;
}

async function initializePaystackTransaction({
  userPaymentEmail,
  amount,
}: InitializePaystackTransactionParams): Promise<string> {
  const PAYSTACK_SECRET_KEY = env.PAYSTACK_SECRET_KEY;
  const url = "https://api.paystack.co/transaction/initialize";

  const params: InitializeTransactionParams = {
    email: userPaymentEmail,
    amount: amount * 100,
  };

  try {
    const response: AxiosResponse<InitializeTransactionResponse> =
      await axios.post(url, params, {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      });

    if (response.data.status) {
      console.log("Success ", "Fetched access code:", response.data.data);
      return response.data.data.reference;
    } else {
      console.log("Error", response.data.message);
      throw new Error(
        response.data.message || "Failed to initialize transaction",
      );
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Paystack API error");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
}

export default initializePaystackTransaction;
