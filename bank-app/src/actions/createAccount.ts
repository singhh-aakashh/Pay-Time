"use server"

import { getAccountByPhone } from "@/lib/data";
import prisma from "@/lib/db";
import { createAccountSchema } from "@/lib/types";
import {z} from "zod";

export const createAccount =async (values:z.infer<typeof createAccountSchema>) =>{
    const validate = createAccountSchema.safeParse(values)

    if(validate.success){
        const {phone , amount} = validate.data;
        try {
            const checkAccount = await getAccountByPhone(phone)
            if(checkAccount){
                return {status:"success",msg:"Already have an account"}
            }
            else{
                const account = await prisma.account.create({
                    data:{
                        userPhone:phone,
                        balance:Number(amount)
                    }
                })
                return {status:"success",msg:"Account created successfully"}
            }
        } catch (error) {
            console.log(error)
            return {status:"failed",msg:"Error while creating account"}
        }
    }
}