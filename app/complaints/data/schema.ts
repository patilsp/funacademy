import { z } from "zod";

export const complaintsSchema = z.object({
  id: z.string(),
  name: z.string(),
  phone: z.string().optional().default(""),
  complaintType: z.string().optional().default(""),
  productType: z.string().optional().default(""),
  address: z.string().optional().default(""),
  status: z.string().optional().default(""),
  visitDate: z.string().optional().default(""),
});

export type Complaint = z.infer<typeof complaintsSchema>;
  