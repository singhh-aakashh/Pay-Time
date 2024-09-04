"use client"
 
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { boolean, z } from "zod"
 
import { toast, useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
 

import CardWrapper from '@/components/app-ui/card-wrapper'
import Title from '@/components/app-ui/title'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { transactionSchema } from "@/lib/types"
import { transaction } from "@/actions/transaction"

type Props = {}


const page = (props: Props) => {
  const [isDisable,setIsDisable]= useState<boolean>(false)
  const {toast} = useToast()
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),

  })
 
 async function onSubmit(values: z.infer<typeof transactionSchema>) {
    setIsDisable(true)
      const res = await transaction(values)
      if(res){
        toast({title:JSON.stringify(res)})
      }
      setIsDisable(false)
  }
 

  return (
   <>
   <Title title='Transaction'/>
   <CardWrapper className=' flex-col gap-4'>
    <div className='text-xl'>Add and withdraw money from your bank.</div>
    <Card className='w-full h-full'>
    <CardContent className="flex h-full justify-center items-center">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="transactionType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl">Transaction Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a transaction type you want to do." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="add">Add Money</SelectItem>
                  <SelectItem value="withdraw">Withdraw Money</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="9999888877"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
               Enter number which is connected to your bank account.
              </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
         <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Amount</FormLabel>
                  <FormControl>
                    <Input
                    type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
               Enter the amount here.
              </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        <Button type="submit" disabled={isDisable }>Submit</Button>
      </form>
    </Form>
    </CardContent>
    </Card>
   </CardWrapper>
   </>
  )
}
export default page