import { NextRequest } from "next/server";

export async function POST(req:NextRequest){
    const {accountId} = await req.json()
    return Response.json({accountId})
}