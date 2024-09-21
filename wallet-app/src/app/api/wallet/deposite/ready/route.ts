import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {walletId} = await req.json();
    if(walletId){
        try {
            const checkWallet = await prisma.wallet.findFirst({
                where:{
                    userPhone:walletId
                }
            })
            if(checkWallet){
                return  Response.json({status:"success",msg:"Wallet is ready"})
            }else{
                return Response.json({status:"failed",msg:"Wallet is not available"})
            }
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed",msg:"something went wrong"})
        }
    }
    else{
        console.log("WalletId is not available in req")
        return Response.json({status:"failed",msg:"WalletId is not available in req"})
    }
}