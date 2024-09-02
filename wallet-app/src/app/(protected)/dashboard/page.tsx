"use client"
import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
type Props = {}

const page = (props: Props) => {
  return (
    <div className='p-4 w-full h-full'>
      <div className=' h-16 '>
    <h1 className='text-3xl font-medium '>Dashboard</h1>
      </div>
      <Card className=' h-[85vh] flex p-8'>
      <Card className='w-[400px] h-[200px]'>
      <CardHeader>
      <CardTitle>Wallet Balance</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
      </Card>
      </Card>
      page
      </div>
  )
}

export default page