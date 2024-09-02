import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {accountId,amount} = await req.json()
    return Response.json({accountId,amount})
}