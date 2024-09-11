import axios from "axios";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
    const {amount, customerEmail} = await req.json();

    const data = await axios.post("https://api.paystack.co/transaction/initialize", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            email: customerEmail,
            amount
        }
    });

    return data.data;

}