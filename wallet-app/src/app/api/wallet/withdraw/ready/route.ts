import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {walletId,amount} = await req.json()
    if(walletId){
        try {
            const wallet = await prisma.wallet.findFirst({
                where:{
                    userPhone:walletId
                }
            })
            if(wallet){
                 if(wallet?.balance>=Number(amount)){
                    return Response.json({status:"success"})
                 }
                 else{
                    console.log("Funds are not enough")
                    return Response.json({status:"failed"})
                 }
            }
            else{
                console.log("wallet does not exist for this wallet Id")
                return Response.json({status:"failed"})
            }
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed"})
        }
    }
    console.log("walletId is not present in body")
    return Response.json({status:"failed"})
}