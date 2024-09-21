"use server"

import { transactionSchema } from "@/lib/types"
import {z} from "zod"
import axios from 'axios'
import { getUserPhone } from "@/lib/data"


export async function bankTransaction(values:z.infer<typeof transactionSchema>){
    const validate = transactionSchema.safeParse(values)
    if(validate.success){
        try {
            const userPhone = await getUserPhone()
            if(userPhone){
                const {amount,phone,transactionType,to} = validate.data;
                if(transactionType === "withdraw"){
                      const transfer = await axios.post("http://127.0.0.1:8787/withdraw/wallet",{amount,accountId:phone,walletId:userPhone,to})
                      return transfer.data
                }
                else if(transactionType === "add"){
                    const transfer = await axios.post("http://127.0.0.1:8787/add/wallet",{amount,accountId:phone,walletId:userPhone,to})
                    return transfer.data
                }
            }
            else{
                console.log("user phone is not present")
            return {status:"failed",msg:"user phone is not present"}
                
            }
        } catch (error) {
            console.log(error)
            return {status:"failed",msg:"Something went wrong"}
        }
       
    }
    console.log("credentials are wrong")
    return null;
}