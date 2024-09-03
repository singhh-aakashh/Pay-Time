"use server"

import { getUserByPhone } from "@/lib/data";
import { signinSchema } from "@/lib/types"
import { cookies } from "next/headers";
import {z} from "zod"

export async function signin(values:z.infer<typeof signinSchema>){
    const validate = signinSchema.safeParse(values);
    if(validate.success){
        const {phone,password} = validate.data;
        try {
            const checkUser = await getUserByPhone(phone);
            if(checkUser){
               if(checkUser.password === password){
                cookies().set("id",checkUser.id)
                return {status:"success",msg:"User Signin successfully"}
               }
               else{
                 return {status:"failed",msg:"Password is wrong"}
               }
            }
            else{
                return {status:"failed",msg:"User does not exists"}
            }
        } catch (error) {
            console.log(error)
            return {status:"failed",msg:"Something went wrong"}
        }
    }
    else{
        return {status:"failed",msg:"Credentials are wrong"}
    }
}