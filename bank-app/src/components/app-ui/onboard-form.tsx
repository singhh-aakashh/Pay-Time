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
import { onboardSchema } from "@/lib/types";
import { onboard } from "@/actions/onboard";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function OnboardForm() {
  const router = useRouter();
  const [newUser, setNewUser] = useState<boolean>(true);
  const { toast } = useToast();
  const [isDisable, setIsDisable] = useState<boolean>(false);
  const form = useForm<z.infer<typeof onboardSchema>>({
    resolver: zodResolver(onboardSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof onboardSchema>) {
    setIsDisable(true);
    const res = await onboard(values);
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
          {newUser ? "Sign up" : "Sign in"}
        </CardTitle>
        <CardDescription className="text-center text-xl">
          On board to create a bank account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {newUser && (
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xl">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Aakash"
                        disabled={isDisable}
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
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
        {newUser ? (
          <div>
            Already have an account ?
            <Button variant={"link"} onClick={() => setNewUser(false)}>
              Signin
            </Button>
          </div>
        ) : (
          <div>
            New to this ?
            <Button variant={"link"} onClick={() => setNewUser(true)}>
              Sign up
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
