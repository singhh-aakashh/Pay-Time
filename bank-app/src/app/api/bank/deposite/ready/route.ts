import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {accountId} = await req.json()
    if(accountId){
        try {
            const account = await prisma.account.findFirst({
                where:{
                    userPhone:accountId
                }
            })
            if(account){
                return Response.json({status:"success"})
            }
            else{
                console.log("Account with this accountId is not present")
                return Response.json({status:"failed"})
            }
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed"})
        }
    }
    else{
        console.log("account id is not present in req")
        return Response.json({status:"failed"})
    }
}