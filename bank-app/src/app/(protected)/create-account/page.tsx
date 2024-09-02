"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import React, { useState } from 'react'
import { z } from 'zod'
import { createAccountSchema } from '@/lib/types'
import { createAccount } from '@/actions/createAccount'
import { useRouter } from 'next/navigation'

type Props = {}


  

const page = (props: Props) => {
  const router = useRouter()
  const [isDisable,setIsDisable] = useState<boolean>(false)
  const form = useForm<z.infer<typeof createAccountSchema>>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      phone: "",
      amount:"",
    },
  })
     
      // 2. Define a submit handler.
     async function onSubmit(values: z.infer<typeof createAccountSchema>) {
      setIsDisable(true)
      const res =   await createAccount(values)
        if(res?.status==="success"){
          router.push("/dashboard")
        }
        setIsDisable(false)
      }
  return (
    <div className='w-screen flex justify-center p-10'>
        <Card className='w-[80%] h-[80vh]'>
        <CardHeader className='w-[80%] mx-auto'>
    <CardTitle className='text-3xl'>Create Bank Account</CardTitle>
    <CardDescription className='text-xl'>Enter details to create an account</CardDescription>
  </CardHeader>
  <CardContent className='w-[80%] mx-auto'>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-xl'>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="9999888877" disabled={isDisable} {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
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
              <FormLabel className='text-xl'>Initial Amount</FormLabel>
              <FormControl>
                <Input placeholder="100"  disabled={isDisable} {...field} />
              </FormControl>
              <FormDescription>
                This is your bank's initial amount.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isDisable}>Create Account</Button>
      </form>
    </Form>
  </CardContent>
  <CardFooter className='w-[80%] mx-auto'>
    <p>Card Footer</p>
  </CardFooter>

        </Card>
    </div>
  )
}

export default page