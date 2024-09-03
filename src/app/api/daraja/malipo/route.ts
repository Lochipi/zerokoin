import { db } from "@/server/db";

interface ErrorResponse {
  Result: {
    ResultType: number;
    ResultCode: number;
    ResultDesc: string;
    OriginatorConversationID: string;
    ConversationID: string;
    TransactionID: string;
    ReferenceData: {
      ReferenceItem: {
        Key: string;
        Value: string;
      };
    };
  };
}

interface SuccessfulResponse {
  Result: {
    ResultType: number;
    ResultCode: number;
    ResultDesc: string;
    OriginatorConversationID: string;
    ConversationID: string;
    TransactionID: string;
    ResultParameters: {
      ResultParameter: TransactionParameter[];
    };
    ReferenceData: {
      ReferenceItem: {
        Key: string;
        Value: string;
      };
    };
  };
}

interface TransactionParameter {
  Key: string;
  Value: string | number;
}

type SafaricomResponse = ErrorResponse | SuccessfulResponse;

export async function POST(req: Request) {
  const data: SafaricomResponse = (await req.json()) as SafaricomResponse;

  if (!data?.Result) {
    return;
  }

  if (data.Result.ResultCode === 0) {
    const sucessData = data as SuccessfulResponse;
    const { OriginatorConversationID, ConversationID, TransactionID } =
      sucessData.Result;

    // Find the ReceiverPartyPublicName from ResultParameters
    const receiverPartyPublicName =
      sucessData.Result.ResultParameters.ResultParameter?.find(
        (param) => param.Key === "ReceiverPartyPublicName",
      )?.Value;
    await db.order.update({
      where: {
        OriginatorConversationID: OriginatorConversationID,
      },
      data: {
        ConversationID: ConversationID,
        TransactionID: TransactionID,
        receiverPartyPublicName: receiverPartyPublicName as string,
      },
    });
    console.log("Succesful payment");
  } else {
    await db.order.update({
      where: {
        OriginatorConversationID: data.Result.OriginatorConversationID,
      },
      data: {
        status: "SYSTEMPAYMENTFAILED",
      },
    });
  }
}
