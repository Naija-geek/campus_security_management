import * as z from "zod"

export const loanRequestSchema = z.object({
  amount: z.number()
    .min(500, { message: "Minimum loan amount is $500" })
    .max(10000, { message: "Maximum loan amount is $10,000" }),
  purpose: z.enum(["medical", "education", "home", "emergency", "other"], {
    required_error: "Please select a loan purpose",
  }),
  deductionPercentage: z.number()
    .min(5, { message: "Minimum deduction is 5%" })
    .max(25, { message: "Maximum deduction is 25%" }),
  details: z.string()
    .min(20, { message: "Please provide more details about your loan request" })
    .max(1000, { message: "Details cannot exceed 1000 characters" }),
})

export type LoanRequestInput = z.infer<typeof loanRequestSchema>