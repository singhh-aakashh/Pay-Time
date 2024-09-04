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
                return Response.json({status:"success",balance:account.balance})
            }
            else{
                console.log("account is not present for this id")
                return Response.json({status:"failed"})
            }
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed"})
        }
    }
    else{
        console.log("accountId is not present in req body")
        return Response.json({status:"failed"})
    }
}