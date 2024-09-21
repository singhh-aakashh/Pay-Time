import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {walletId , amount , to} = await req.json();
    if(walletId){
        try {
            const wallet = await prisma.wallet.update({
                where:{
                    userPhone:walletId
                },
                data:{
                    balance:{
                        increment:Number(amount)
                    },
                    transaction:{
                        create:{
                            amaount:Number(amount),
                            status:"Fulfilled",
                            type:"Received",
                            to
                        }
                    }
                }
            })
            if(wallet){
                return Response.json({status:"success",balance:wallet.balance})
            }
            else{
                console.log("wallet with this wallet id is not present")
                return Response.json({status:"failed"})
            }
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed"})
        }
    }
    else{
        console.log("wallet id is not present in body")
        return Response.json({status:"failed"})
    }
}