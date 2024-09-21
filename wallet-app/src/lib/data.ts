"use server"
import { cookies } from "next/headers";
import prisma from "./db"

export const getUserByPhone = async (phone:string)=>{
    if(phone){
        try {
            const user = await prisma.user.findUnique({where:{
                phone
            }})
            if(user){
                return user
            }else{
                return null;
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
    else{
        return null;
    }
}

export const getUser = async () =>{
    const userId = cookies().get("id")?.value
    if(userId){
        const user = await prisma.user.findFirst({
            where:{
            id:userId
        },
        include:{
            wallet:{
                include:{
                    transaction:true
                }
            }
        }
    })
    if(user){
        return user;
    }
    else{
        return null;
    }
    }
    else{
        console.log("cookie is not present")
        return null;
    }
}

export const getUserPhone = async () =>{
    const userId = cookies().get("id")?.value
    if(userId){
        const user = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        if(user){
            return user.phone
        }
        else{
            return null
        }
    }
    else{
        return null;
    }
}

export const getUserName = async () =>{
    const userId = cookies().get("id")?.value
    if(userId){
        const user = await prisma.user.findFirst({where:{id:userId}})
        if(user){
            return user.name
        }
        else{
            return null
        }
    }
    else{
        return null;
    }
}