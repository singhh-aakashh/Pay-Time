"use server"
import prisma from "@/lib/db";
import { getUserByPhone } from "@/lib/data"
import { onboardSchema } from "@/lib/types"
import { cookies } from "next/headers";
import {z} from "zod"

export const signup =async (values:z.infer<typeof onboardSchema>) =>{
    const validate = onboardSchema.safeParse(values);
    if(validate.success){
        const {name,phone,password} = validate.data;
        const user = await getUserByPhone(phone);
        if(user){
            cookies().set("userPhone",user.phone)
             cookies().set("id",user.id)
             return {status:"success",msg:"User signed in"}
        }
        else{
            const newUser = await prisma.user.create({
                data:{
                    name,
                    phone,
                    password
                }
            })
            cookies().set("userPhone",newUser.phone)
            cookies().set("id",newUser.id)
            return {status:"success",msg:"User signed in"}
        }
    }
    else{
        return {status:"failed",msg:"Wrong credentials"}
    }
}