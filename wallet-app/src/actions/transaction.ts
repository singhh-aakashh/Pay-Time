"use server"

import { transactionSchema } from "@/lib/types"
import {z} from "zod"
import axios from 'axios'
import { getUserPhone } from "@/lib/data"


export async function transaction(values:z.infer<typeof transactionSchema>){
    const validate = transactionSchema.safeParse(values)
    if(validate.success){
        const userPhone = await getUserPhone()
        if(userPhone){
            const {amount,phone} = validate.data;
        const transfer = await axios.post("http://127.0.0.1:8787/withdraw/wallet",{amount,accountId:phone,walletId:userPhone})
        return transfer.data
        }
        else{
            console.log("user phone is not present")
            return null;
        }
    }
    console.log("credentials are wrong")
    return null;
}