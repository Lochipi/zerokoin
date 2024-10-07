import axios from "axios";
import PaystackPop from '@paystack/inline-js';

const baseUrl = process.env.BASEURL;

async function initializeTransaction(email: string, amount: number) {
    try {
        
        const data = await axios.post("api/paystack/initialize-transaction", {
            amount, customerEmail: email
        });
    
        const popup = new PaystackPop();
        popup.resumeTransaction(data.data.data.data.access_code);
        return data;
    } catch (error) {
        return error;
    }

}


export {
    initializeTransaction
}
