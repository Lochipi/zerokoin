import axios, {
  type AxiosRequestConfig,
  type AxiosResponse,
  type AxiosError,
} from "axios";
import getAccessToken from "./getAccessToken";

interface STKPushQueryRequest {
  BusinessShortCode: number;
  Password: string;
  Timestamp: string;
  CheckoutRequestID: string;
}

interface STKPushQueryResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: string;
  ResultDesc: string;
}

export async function sendSTKPushQueryRequest({
  checkoutRequestID,
  sandbox,
}: {
  checkoutRequestID: string;
  sandbox: boolean;
}): Promise<STKPushQueryResponse> {
  try {
    const token = await getAccessToken({
      sandbox: sandbox,
    });

    const passkey = sandbox
      ? process.env.MPESA_SANDBOX_CONSUMER_PASSKEY!
      : process.env.MPESA_LIVE_CONSUMER_PASSKEY!;
    const businessShortCode = parseInt(
      sandbox
        ? process.env.MPESA_SANDBOX_SHORT_CODE!
        : process.env.MPESA_LIVE_SHORT_CODE!,
    );
    const stkQueryPassword = Buffer.from(
      businessShortCode + passkey + generateTimestamp(new Date()),
    ).toString("base64");

    const baseURL = sandbox
      ? "https://sandbox.safaricom.co.ke"
      : "https://api.safaricom.co.ke";

    const apiUrl = `${baseURL}/mpesa/stkpushquery/v1/query`;
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const config: AxiosRequestConfig = {
      headers,
    };

    const requestData: STKPushQueryRequest = {
      BusinessShortCode: businessShortCode,
      Password: stkQueryPassword,
      Timestamp: generateTimestamp(new Date()),
      CheckoutRequestID: checkoutRequestID,
    };

    const response: AxiosResponse<STKPushQueryResponse> = await axios.post(
      apiUrl,
      requestData,
      config,
    );
    return response.data;
  } catch (error) {
    handleRequestError(error);

    return Promise.reject(error);
  }
}

function handleRequestError(error: unknown) {
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

export default sendSTKPushQueryRequest;
