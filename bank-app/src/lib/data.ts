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

export const getAccount = async ()=>{
    const userId = cookies().get("id")?.value
    if(userId){
        try {
            const account  = await prisma.user.findUnique({
                where:{
                    id:userId
                },
                select:{
                    name:true,
                    account:true
                }
            })
            if(account){
                return account
            }
            else{
                return null;
            }
        } catch (error) {
            console.log(error)
            return null
        }
    }
    else{
        return null
    }
   
}

export const getAccountByPhone = async (phone:string) =>{
    try {
        const account = await prisma.account.findUnique({where:{userPhone:phone}})
        if(account){
            return account
        }else{
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