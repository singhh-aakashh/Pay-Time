import axios from 'axios'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/withdraw/wallet',async (c)=>{
  const body = await c.req.json();
  let ready = false;
  const rollbackAmount = body.amount
  if(body){
    try {
      const prepareWallet = await axios.post("http://localhost:3001/api/wallet/withdraw/ready",{walletId:body.walletId,amount:body.amount,to:body.to})
      if(prepareWallet.data.status === "success"){
        const prepareBank = await axios.post("http://localhost:3000/api/bank/deposite/ready",{accountId:body.accountId})
        if(prepareBank.data.status === "success"){
          ready = true;
        }
        else{
          console.log("Bank is not prepared ",prepareBank)
          return c.json({status:"failed",msg:"Bank is not able to do this transaction"})
        }
      }
      else{
        console.log("wallet is not prepared ",prepareWallet)
        return c.json({status:"failed",msg:"wallet is not able to do this transaction"})
      }
      if(ready){
        const withdrawWallet = await axios.post("http://localhost:3001/api/wallet/withdraw",{walletId:body.walletId,amount:body.amount,to:body.to})
        if(withdrawWallet.data.status === "success"){
          const depositeBank = await axios.post("http://localhost:3000/api/bank/deposite",{accountId:body.accountId,amount:body.amount,to:body.to})
          if(depositeBank.data.status === "success"){
            return c.json({status:"success",msg:"Transaction completed successfully"})
          }
          else{
            console.log("something went wrong in bank")
            return c.json({status:"failed",msg:"Bank is facing some issue"})
          }
        }
        else{
          console.log("something went wrong in wallet")
          return c.json({status:"failed",msg:"wallet is having some issue"})
        }
      }
    } catch (error) {
      console.log(error)
          return c.json({status:"failed",msg:"somethimg went wrong"})
    }
  }
  else{
    console.log("req body is not present")
    return c.json({status:"failed",msg:"something went wrong"})
  }
})

app.post('/add/wallet',async (c)=>{
  const body = await c.req.json();
  let ready = false;
  if(body){
    try {
      const prepareBank = await axios.post("http://localhost:3000/api/bank/withdraw/ready",{accountId:body.accountId,amount:body.amount})
      if(prepareBank.data.status === "success"){
        const prepareWallet = await axios.post("http://localhost:3001/api/wallet/deposite/ready",{walletId:body.walletId})
        if(prepareWallet.data.status === "success"){
          ready=true;
        }else{
          return c.json(prepareWallet.data)
        }
      }else{
        return c.json(prepareBank.data)
      }

      if(ready){
        const addWallet = await axios.post("http://localhost:3001/api/wallet/deposite",{walletId:body.walletId,amount:body.amount,to:body.to})
        if(addWallet.data.status === "success"){
          const withdrawBank = await axios.post("http://localhost:3000/api/bank/withdraw",{accountId:body.accountId,amount:body.amount,to:body.to})
          if(withdrawBank.data.status==="success"){
            return c.json({status:"success",msg:"transaction completed"})
          }
          else{
            return c.json(withdrawBank.data)
          }
        }
        else{
          return c.json(addWallet.data)
        }
      }
    } catch (error) {
      console.log(error)
      return c.json({status:"failed",msg:"Something went wrong"})
    }
  }
  else{
    return c.json({status:"failed",msg:"req Body is not present"})
  }
})
export default app
