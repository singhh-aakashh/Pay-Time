"use server";

import { getUserByPhone } from "@/lib/data";
import prisma from "@/lib/db";
import { signupSchema } from "@/lib/types";
import { cookies } from "next/headers";
import { z } from "zod";

export async function signup(values: z.infer<typeof signupSchema>) {
  const validate = signupSchema.safeParse(values);
  if (validate.success) {
    const { name, phone, password } = validate.data;
    try {
      const checkUser = await getUserByPhone(phone);
      if (checkUser) {
        return { status: "failed", msg: "User Already exists" };
      } else {
        const newUser = await prisma.user.create({
          data: { name, phone, password ,
            wallet:{
                create:{
                    balance:100
                }
            }
          },
        });
        cookies().set("id", newUser.id);
        cookies().set("userPhone", newUser.phone)
        return { status: "success", msg: "User created successfully" };
      }
    } catch (error) {
      console.log(error);
      return { status: "failed", msg: "Something went wrong" };
    }
  } else {
    return { status: "failed", msg: "Credentials are wrong" };
  }
}
