"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signinSchema } from "@/lib/types";
import { signin } from "@/actions/signin";

export function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signinSchema>) {
    setIsDisable(true);
    const res = await signin(values);
    if (res) {
      toast({ title: res.msg });
    }
    if (res.status === "success") {
      router.push("/dashboard");
    }
    setIsDisable(false);
  }
  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle className="text-center text-3xl">
         Sign in
        </CardTitle>
        <CardDescription className="text-center text-xl">
          On board to create a bank account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Phone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Aakash"
                      disabled={isDisable}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xl">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="****"
                      disabled={isDisable}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-center">
              <Button type="submit" disabled={isDisable}>
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
          <div>
            New to this ?
            <Button variant={"link"} onClick={() => router.push("/sign-up")}>
              Sign up
            </Button>
          </div>
      </CardFooter>
    </Card>
  );
}