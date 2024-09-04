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
      const prepareWallet = await axios.post("http://localhost:3001/api/wallet/withdraw/ready",{walletId:body.walletId,amount:body.amount})
      if(prepareWallet.data.status === "success"){
        const prepareBank = await axios.post("http://localhost:3000/api/bank/deposite/ready",{accountId:body.accountId})
        if(prepareBank.data.status === "success"){
          ready = true;
        }
        else{
          console.log("Bank is not prepared ",prepareBank)
          return c.json({status:"failed"})
        }
      }
      else{
        console.log("wallet is not prepared ",prepareWallet)
        return c.json({status:"failed"})
      }
      if(ready){
        const withdrawWallet = await axios.post("http://localhost:3001/api/wallet/withdraw",{walletId:body.walletId,amount:body.amount})
        if(withdrawWallet.data.status === "success"){
          const depositeBank = await axios.post("http://localhost:3000/api/bank/deposite",{accountId:body.accountId,amount:body.amount})
          if(depositeBank.data.status === "success"){
            return c.json({status:"success"})
          }
          else{
            
            console.log("something went wrong in bank")
          return c.json({status:"failed"})
          }
        }
        else{
          console.log("something went wrong in wallet")
          return c.json({status:"failed"})
        }
      }
    } catch (error) {
      console.log(error)
          return c.json({status:"failed"})
    }
  }
  else{
    console.log("req body is not present")
    return c.json({status:"failed"})

  }
})


export default app
