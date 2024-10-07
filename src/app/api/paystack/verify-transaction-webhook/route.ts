import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import crypto, { KeyObject } from "crypto";


export async function POST(req:NextRequest) {

    const requestBody = await req.json();
    const requestHeaders: any = req.headers;

    const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET as string).update(JSON.stringify(req.body)).digest('hex');
    if (hash == requestHeaders['x-paystack-signature']) {
    // Retrieve the request's body
    const event = requestBody;
    // Do something with event  
        console.log(requestBody);
        
        return NextResponse.json({
            isSuccessful: true,
            data: requestBody
        }, {status: 200});
    } else {
        return NextResponse.json({
            isSuccessful: true,
            data: {
                message: "Invalid response body"
            }
        }, {status: 500});
    }

}
