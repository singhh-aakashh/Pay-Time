import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {accountId,amount,to} = await req.json()
    if(accountId){
        try {
            const bank = await prisma.account.update({
                where:{
                    userPhone:accountId
                },
                data:{
                    balance:{
                        increment:Number(amount)
                    },
                    transaction:{
                        create:{
                            amount:Number(amount),
                            type:"RECEIVED",
                            status:"Fulfilled",
                            to
                        }
                    }
                }
            })
            return Response.json({status:"success",bank})
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed"})
        }
    }
    else{
        console.log("accountId is not present in req ")
        return Response.json({status:"failed"})
    }
}