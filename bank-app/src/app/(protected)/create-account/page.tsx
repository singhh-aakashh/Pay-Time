import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

type Props = {}

const formSchema = z.object({
  
    }),
  })

const page = (props: Props) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })
     
      // 2. Define a submit handler.
      function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
      }
  return (
    <div className='w-screen flex justify-center p-10'>
        <Card className='w-[80%] h-[80vh]'>
        <CardHeader>
    <CardTitle className='text-3xl'>Create Bank Account</CardTitle>
    <CardDescription className='text-xl'>Enter details to create an account</CardDescription>
  </CardHeader>
  <CardContent>
  <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </CardContent>
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>

        </Card>
    </div>
  )
}

export default page