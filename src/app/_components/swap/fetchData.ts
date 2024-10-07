import axios from "axios";
import PaystackPop from '@paystack/inline-js';

const baseUrl = process.env.BASEURL;

async function initializeTransaction(email: string, amount: number) {
    const data = await axios.post("api/paystack/initialize-transaction", {
        amount, customerEmail: email
    });

    return completePaystackTransaction(data.data.data.data.access_code, data.data.data.data.reference);


}


// Call the initialize payment endpoint to get the access code
const completePaystackTransaction = async (access_code: string, reference: string) => {
    const popup = new PaystackPop();
    popup.resumeTransaction(access_code);
    const transactionStatus = await verifyTransaction(reference);
    return {
        status: transactionStatus.status,
        data: transactionStatus.data.data
    }
  }

async function verifyTransaction(reference: string) {
    const data = await axios.post("api/paystack/verify-transaction", {
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
