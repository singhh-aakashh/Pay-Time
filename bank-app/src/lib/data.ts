"use server"
import { cookies } from "next/headers"
import prisma from "./db"

export const getUserByPhone = async (phone:string) =>{
    try {
        const user = await prisma.user.findUnique({
            where:{
                phone
            }
        })
        if(user){
            return user
        }
        else{
            return null
        }
    } catch (error) {
        console.log(error)
        return null
    }
}

export const logout = async () =>{
    cookies().delete("id")
}

export const getCurrentUser = async () =>{
    const userId = cookies().get("id")?.value
    if(userId){
        const user = await prisma.user.findUnique({where:{id:userId},
        select:{
            id:true,
            name:true
        }})
        if(user){
            return user
        }else{
            return null;
        }
    }
    return null;
}