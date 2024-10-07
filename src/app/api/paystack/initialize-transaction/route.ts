import axios from "axios";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const {amount, customerEmail} = await req.json();

    const data = await axios.post("https://api.paystack.co/transaction/initialize", {
        email: customerEmail, amount
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
        }
    });

    return NextResponse.json({
        isSuccessful: true,
        data: data.data
    }, {status: 200});

}