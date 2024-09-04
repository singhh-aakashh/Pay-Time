"use client"
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { getAccount } from '@/lib/data'
import React, { useEffect, useState } from 'react'

type Props = {}
interface userInterface{
  name:string |null,
  account:any
}
const Page = (props: Props) => {
  const [user,setUser] = useState<userInterface|null>()
  useEffect(()=>{
   const fetchAccount=async()=>{
    const res =  await getAccount()
    if(res){
      setUser(res)
    }
    }
    fetchAccount()
  },[])
  return (
    <div className='w-screen h-[91vh] p-4'>
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        Backgrounds
      </p> */}
      <Card className='w-full h-full p-4'>
      <CardHeader>
          <CardTitle className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 gap-8 flex'> Welcome 
            <span className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 '>{user?.name ? user.name : "User"}</span>
          </CardTitle>
        </CardHeader>
      <Card className='w-[400px] h-[200px] '>
      
      </Card>
      </Card>
      </div>
  )
}

export default Page