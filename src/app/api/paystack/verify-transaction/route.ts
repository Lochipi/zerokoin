import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req:NextRequest) {

    const {reference} = await req.json();

    const data = await axios.get("https://api.paystack.co/transaction/verify/" + reference, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
        }
    });

    return NextResponse.json({
        isSuccessful: true,
        data: data.data
    }, {status: 200});
}