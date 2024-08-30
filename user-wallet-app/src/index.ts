import { PrismaClient } from "@prisma/client";
import express from "express"
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));

const prisma = new PrismaClient();


app.post("/wallet/create",async(req,res)=>{
    const {walletId} = req.body;
    try {
        const wallet = await prisma.wallet.findUnique({where:{walletId}})
        if(!wallet){
            const newWallet = await prisma.wallet.create({
                data:{
                     walletId   ,
                    balance:0
                }
            })
            res.status(200).json({"msg":"new wallet created successfull",newWallet})
        }
        else{
            res.status(500).json({"msg":"wallet already present"})
        }
    } catch (error) {
        console.log(error)

        res.status(500).json({error})
    }

})


app.post("/wallet/balance",async(req,res)=>{
    const {walletId} =  req.body;
    console.log("req wallet id",typeof(walletId),walletId)
   
    try {
        const wallet =await prisma.wallet.findUnique({where:{walletId}})
        if(!wallet){
            res.status(404).json({"msg":"account not present"})
        }
        else{
            res.status(200).json({"balance is ": wallet.balance})
        }
    } catch (error) {
        console.log("error")

        res.status(500).json({error})
    }
})

app.post("/wallet/deposite",async (req,res) =>{
    const {walletId,amount} = req.body;
    try {
        const account = await prisma.wallet.update({
            where:{
                walletId
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

        res.status(500).json({error})
    }

})

app.post("/wallet/deposite/ready",async (req,res)=>{
    const {walletId} = req.body;
    try {
        const wallet = await prisma.wallet.findUnique({where:{walletId}})
        if(wallet){
            res.status(200).json({wallet})
        }
        else{
            res.status(404).json({"msg":"wallet not present"}) 
        }
           
    } catch (error) {
        console.log(error)

        res.status(500).json({error})
    }
})



app.post("/wallet/withdraw/ready",async (req,res)=>{
    const {walletId,amount} = req.body;
    console.log("walletId ",typeof(walletId),walletId)
    console.log("amount ",typeof(amount),amount)
    try {
        const wallet = await prisma.wallet.findUnique({where:{walletId}})
        if(wallet && wallet.balance>=Number(amount)){
            res.status(200).json({"msg":"ready"})
        }
        else{
            res.status(201).json({"msg":"not  ready"})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})

app.post("/wallet/withdraw",async(req,res)=>{
    const {walletId,amount} = req.body;
    try {
        const wallet = await prisma.wallet.update({
            where:{
                walletId
            },
            data:{
                balance:{
                    decrement:amount
                }
            }
        })
        res.status(200).json({"msg":"success"})
    } catch (error) {
        console.log(error)

        res.status(500).json({error})
    }
})


app.listen(3001,()=>{
    console.log("wallet is running on 3001")
})