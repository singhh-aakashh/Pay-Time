import {z} from "zod";

export const onboardSchema = z.object({
    name:z.string().min(3).optional(),
    phone:z.string().regex(/^\d{10}$/, {
        message: "Phone number must be exactly 10 digits and contain only numbers.",
      }),
      password:z.string().min(4)
})

export const createAccountSchema = z.object({
  amount:z.string(),
  phone:z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits and contain only numbers.",
  })
    })