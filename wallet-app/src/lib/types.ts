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

export const transactionSchema = z.object({
  transactionType: z.string(),
  amount:z.string().regex(/^\d+$/),
  phone:z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits and contain only numbers.",
  }),
  to:z.string().min(2)
})