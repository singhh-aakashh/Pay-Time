"use client"
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
    <div className='w-screen min-h-[91vh] bg-gradient-radial from-neutral-950  to-neutral-900 bg-center'>
        {user?JSON.stringify(user):"no user"}
      </div>
  )
}

export default Page