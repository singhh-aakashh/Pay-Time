import {z} from "zod"

export const signupSchema = z.object({
    name:z.string().min(3),
    phone:z.string().regex(/^\d{10}$/, {
        message: "Phone number must be exactly 10 digits and contain only numbers.",
      }),
      password:z.string().min(4)
})

export const signinSchema = z.object({
    phone:z.string().regex(/^\d{10}$/, {
        message: "Phone number must be exactly 10 digits and contain only numbers.",
      }),
      password:z.string().min(4)
})