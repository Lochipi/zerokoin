import axios, { type AxiosError, type AxiosResponse } from "axios";
import getAccessToken from "./getAccessToken";
import { TRPCError } from "@trpc/server";

interface StkPushRequest {
  BusinessShortCode: string;
  TransactionType: string;
  Amount: string;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
  Timestamp: string;
  Password: string;
}

interface StkPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

type TransactionType = "CustomerPayBillOnline" | "CustomerBuyGoodsOnline";

async function sendStkPush({
  transactionType,
  amount,
  partyA,
  phoneNumber,
  callBackURL,
  accountReference,
  transactionDesc,
  sandbox,
}: {
  transactionType: TransactionType;
  amount: string;
  partyA: string;
  phoneNumber: string;
  callBackURL: string;
  accountReference: string;
  transactionDesc: string;
  sandbox: boolean;
}): Promise<StkPushResponse> {
  try {
    const token = await getAccessToken({
      sandbox: sandbox,
    });
    const businessShortCode = sandbox
      ? process.env.MPESA_SANDBOX_SHORT_CODE!
      : process.env.MPESA_LIVE_SHORT_CODE!;
    const date = new Date();
    const passkey = sandbox
      ? process.env.MPESA_SANDBOX_CONSUMER_PASSKEY!
      : process.env.MPESA_LIVE_CONSUMER_PASSKEY!;
    const stkPassword = Buffer.from(
      businessShortCode + passkey + generateTimestamp(date),
    ).toString("base64");

    const baseURL = sandbox
      ? "https://sandbox.safaricom.co.ke"
      : "https://api.safaricom.co.ke";
    const url = `${baseURL}/mpesa/stkpush/v1/processrequest`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const requestBody: StkPushRequest = {
      BusinessShortCode: businessShortCode,
      TransactionType: transactionType,
      Amount: amount,
      PartyA: partyA,
      PartyB: businessShortCode,
      PhoneNumber: phoneNumber,
      CallBackURL: callBackURL,
      AccountReference: accountReference,
      TransactionDesc: transactionDesc,
      Timestamp: generateTimestamp(date),
      Password: stkPassword,
    };

    console.log("Token Fetched Starting STK");
    const response: AxiosResponse<StkPushResponse> = await axios.post(
      url,
      requestBody,
      { headers },
    );
    console.log("STK invoked");

    return response.data;
  } catch (error) {
    handleStkPushError(error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to send STK push`,
    });
  }
}

function handleStkPushError(error: unknown): void {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    if (axiosError.response) {
      console.error(
        "STK push request failed with status:",
        axiosError.response.status,
      );
      console.error("Response data:", axiosError.response.data);
    } else {
      console.error("STK push request failed:", axiosError.message);
    }
  } else {
    console.error("STK push request failed:", error);
  }
}

function generateTimestamp(date: Date): string {
  return (
    date.getFullYear().toString() +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    ("0" + date.getDate()).slice(-2) +
    ("0" + date.getHours()).slice(-2) +
    ("0" + date.getMinutes()).slice(-2) +
    ("0" + date.getSeconds()).slice(-2)
  );
}

export default sendStkPush;
