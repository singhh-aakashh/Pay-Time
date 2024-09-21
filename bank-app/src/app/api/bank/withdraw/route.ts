import prisma from "@/lib/db";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {accountId,amount,to} = await req.json();
    if(accountId){
        try {
            const checkAccount = await prisma.account.update({
                where:{
                    userPhone:accountId,
                },
                data:{
                    balance:{
                        decrement:Number(amount)
                    },
                    transaction:{
                        create:{
                            amount:Number(amount),
                            type:"SEND",
                            status:"Fulfilled",
                            to
                        }
                    }
                }
            })
            return Response.json({status:"success",msg:"Transfer success"})
        } catch (error) {
            console.log(error)
            return Response.json({status:"failed",msg:"something went wrong"})
        }
    }else{
        console.log("req body is not present")
        return Response.json({status:"failed",msg:"req body is not present"})
    }
}