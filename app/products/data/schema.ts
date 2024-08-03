import { z } from "zod"

export const productsSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  model: z.string(),
  price: z.string().or(z.number()),
  capacity: z.string(),
  technology:z.string(),
  warranty:z.string(),
  
})

export type Product = z.infer<typeof productsSchema>
