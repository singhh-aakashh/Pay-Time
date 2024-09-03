"use client"
 
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
 
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
import React from 'react'
import { Input } from "@/components/ui/input"

type Props = {}
const FormSchema = z.object({
    transactionType: z.string(),
    amount:z.string().regex(/^\d+$/),
    phone:z.string().regex(/^\d{10}$/, {
      message: "Phone number must be exactly 10 digits and contain only numbers.",
    })
})

const page = (props: Props) => {
    const {toast} = useToast();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),

  })
 
  function onSubmit(values: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    })
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
    </CardContent>
    </Card>
   </CardWrapper>
   </>
  )
}
export default page