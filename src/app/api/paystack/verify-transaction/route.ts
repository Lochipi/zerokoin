import axios from "axios";
import { headers } from "next/headers";
import { v4 as uuidv4 } from "uuid";

export async function POST(req:Request) {

    const {reference} = await req.json();

    const data = await axios.get("https://api.paystack.co/transaction/verify/" + reference, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
    });

    return data.data;
}