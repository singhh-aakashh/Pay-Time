import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {accountId,amount} = await req.json();
    if(accountId){
        try {
            const checkAccount = await prisma.account.findFirst({
                where:{
                    userPhone:accountId
                }
            })
            if(checkAccount){
                if(checkAccount.balance >= Number(amount)){
                    return Response.json({status:"success",msg:"Balance is available"})
                }
                else{
                    return Response.json({status:"failed",msg:"Insufficient funds"})
                }
            }else{
                return Response.json({status:"failed",msg:"Account is not present"})
            }
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed",msg:"Something went wrong"})
        }
    }else{
        console.log("Req body is not present")
        return Response.json({status:"failed",msg:"Req body is not present"})
    }
}