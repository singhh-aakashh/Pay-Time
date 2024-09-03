"use client"
import React, { useEffect, useState } from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Title from '@/components/app-ui/title'
import CardWrapper from '@/components/app-ui/card-wrapper'
import { getUser } from '@/lib/data'
type Props = {}

const page = (props: Props) => {
  const [user,setUser] = useState<any>()
  useEffect(()=>{
    const fetch = async () =>{
      const res = await getUser();
      if(res){
        setUser(res)
      }
    }
    fetch();
  },[])
  return (
   <>
    <Title title='Dashboard'/>
    <CardWrapper>
      <Card className='w-[400px] h-[200px]'>
      <CardHeader>
      <CardTitle className='flex justify-between'>Wallet Balance  <span>{user?.name}</span></CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>{user?.wallet?.balance}</CardContent>
      </Card>
      </CardWrapper>
      page
      </>
  )
}

export default page