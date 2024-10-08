import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {walletId,amount,to} = await req.json();
    if(walletId){
        try {
            const wallet = await prisma.wallet.update({
                where:{
                    userPhone:walletId
                },
                data:{
                    balance:{
                        decrement:Number(amount)
                    },
                    transaction:{
                        create:{
                            amaount:Number(amount),
                            status:"Fulfilled",
                            to,
                            type:"Sent"
                        }
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