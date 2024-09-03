import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {walletId,amount} = await req.json();
    if(walletId){
        try {
            const wallet = await prisma.wallet.update({
                where:{
                    userPhone:walletId
                },
                data:{
                    balance:{
                        decrement:Number(amount)
                    }
                }
            })
            return Response.json({status:"success",wallet})
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed"})
        }
    }
    else{
        console.log("walletId is not present in body")
        return Response.json({status:"failed"})
    }
}