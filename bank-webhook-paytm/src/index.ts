import { PrismaClient } from "@prisma/client";
import express from "express"
import cors from "cors"


const prisma = new  PrismaClient();

const app = express();
app.use(express.json())
app.use(cors())


app.post("/bank/deposite/ready",async (req,res)=>{
    const {accountId} = req.body;
    try {
        const account = await prisma.bankAccount.findUnique({where:{accountId}})
        if(account){
            res.status(200).json({account})
        }
        else{
            res.status(404).json({"msg":"account not present"}) 
        }
           
    } catch (error) {
        console.log(error)
        res.send(500).json({error})
    }
})

app.post("/bank/create",async(req,res)=>{
    const {accountId} = req.body;
    try {
        const account = await prisma.bankAccount.findUnique({where:{accountId}})
        if(!account){
            const newAccount = await prisma.bankAccount.create({
                data:{
                    accountId,
                    balance:0
                }
            })
            res.status(200).json({"msg":"new account created successfull",newAccount})
        }
        else{
            res.send(404).json({"msg":"account already present"})
        }
    } catch (error) {
        console.log(error)
        res.send(500).json({error})
    }

})

app.post("/bank/balance",async(req,res)=>{
    const {accountId} = req.body;
    try {
        const account =await prisma.bankAccount.findUnique({where:{accountId}})
        if(!account){
            res.status(404).json({"msg":"account not present"})
        }
        else{
            res.status(200).json({"balance is ": account.balance})

        }
    } catch (error) {
        console.log(error)
        res.send(500).json({error})
    }
})

app.post("/bank/deposite",async (req,res) =>{
    const {accountId,amount} = req.body;
    try {
        const account = await prisma.bankAccount.update({
            where:{
                accountId
            },
            data:{
                balance:{
                    increment:amount
                }
            }
        })
        res.status(200).json({"msg":"transaction success"})
    } catch (error) {
        console.log(error)
        res.send(500).json({error})
    }

})

app.listen(3000,()=>{
    console.log("bank is running on 3000")
})