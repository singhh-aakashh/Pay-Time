import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {walletId} = await req.json()
    if(walletId){
        try {
            const wallet = await prisma.wallet.findFirst({
                where:{
                    userPhone:walletId
                }
            })
            if(wallet){
                return Response.json({status:"success",balance:wallet.balance})
            }
            else{
                console.log("wallet is not present for this id")
                return Response.json({status:"failed"})
            }
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed"})
        }
    }
    else{
        console.log("walletId is not present in req body")
        return Response.json({status:"failed"})
    }
}