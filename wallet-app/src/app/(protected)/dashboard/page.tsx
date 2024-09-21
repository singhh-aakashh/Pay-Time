"use client"
import React, { useEffect, useState } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
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
import { IndianRupee} from "lucide-react"
import { Badge } from "@/components/ui/badge"
type Props = {}

const page = (props: Props) => {
  const [user,setUser] = useState<any>()
  useEffect(()=>{
    const fetch = async () =>{
      const res = await getUser();
      console.log("res",res)
      if(res){
        setUser(res)
      }
    }
    fetch();
  },[])
  return (
   <>
    <Title title='Dashboard'/>
    <CardWrapper className='flex flex-col space-y-8'>
    <Card x-chunk="dashboard-01-chunk-0" className='h-[150px] w-[300px]' >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Balance
              </CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">&#8377; {user?.wallet?.balance}.00</div> 
            </CardContent>
          </Card>
          <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Transactions</CardTitle>
                    <CardDescription>
                      Recent transaction from your account.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Transferred to</TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Type
                          </TableHead>
                          <TableHead className="hidden sm:table-cell">
                            Status
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Date
                          </TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {/* <TableRow >
                        <TableCell>
                            <div className="font-medium mx-auto">No transactions to show</div>
                          </TableCell>

                        </TableRow> */}
                        
                       {
                        user?.wallet?.transaction?.map((trans:any)=><TableRow key={trans.id} className="bg-accent">
                           <TableCell>
                            <div className="font-medium">{trans?.to}</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            {trans?.type}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">
                            <Badge className="text-xs" variant="secondary">
                              {trans?.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            2023-06-23
                          </TableCell>
                          <TableCell className="text-right">&#8377; {trans?.amount}</TableCell>
                        </TableRow>)
                       }
                      </TableBody>
                    </Table>
                    </CardContent>
                    </Card>
      </CardWrapper>
      page
      </>
  )
}

export default page