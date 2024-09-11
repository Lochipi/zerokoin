import axios from "axios";

const baseUrl = ""

async function initializeTransaction(email: string, amount: number) {
    const data = await axios.post(baseUrl + "paystack/initialize-transaction", {
        amount, customerEmail: email
    });

    return {
        status: data.status,
        data: data.data
    }

}


async function verifyTransaction(reference: string) {
    const data = await axios.post(baseUrl + "paystack/verify-transaction", {
        reference
    });

    return {
        status: data.status,
        data: data.data
    }

}


export {
    initializeTransaction,
    verifyTransaction
}
