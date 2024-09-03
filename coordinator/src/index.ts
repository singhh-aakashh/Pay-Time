import axios from "axios";
import express from "express" 

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.post("/wallet/withdraw",async(req,res)=>{
    const {walletId,accountId,amount} = req.body;
    let prepare = false;
    try {
         const response = await axios.post("http://localhost:3001/wallet/withdraw/ready",{walletId,amount})
        if(response.status === 200){
            const checkBank = await axios.post("http://localhost:3000/bank/deposite/ready",{accountId})
            if(checkBank.status===200){
                prepare = true;
            }
        }
         else{
            res.status(200).json({"msg":"not ready"})
         }
         if(prepare){
            const withdrawWallet = await axios.post("http://localhost:3001/wallet/withdraw",{walletId,amount})
            if(withdrawWallet.status === 200 ){
                const depositeBank = await axios.post("http://localhost:3000/bank/deposite",{accountId,amount})
                if(depositeBank.status === 200){
                    res.status(200).json({"msg":"transaction success"})
                }
            }
            else{
                res.status(200).json({"msg":"tranaction failed"})
            }
         }
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    }
})


app.listen(3002,()=>{
    console.log("coordinator in 3002")
})