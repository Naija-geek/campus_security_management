import * as z from "zod"
import { addDays, isBefore, isWeekend } from "date-fns"

export const leaveRequestSchema = z.object({
  type: z.enum(["sick", "annual", "personal", "emergency"], {
    required_error: "Please select a leave type",
  }),
  startDate: z.date({
    required_error: "Please select a start date",
  }).refine(
    (date) => !isWeekend(date),
    "Start date cannot be on a weekend"
  ),
  endDate: z.date({
    required_error: "Please select an end date",
  }).refine(
    (date) => !isWeekend(date),
    "End date cannot be on a weekend"
  ),
  reason: z.string().min(10, {
    message: "Reason must be at least 10 characters long",
  }).max(500, {
    message: "Reason cannot exceed 500 characters",
  }),
}).refine(
  (data) => isBefore(data.startDate, data.endDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
).refine(
  (data) => isBefore(data.startDate, addDays(data.endDate, 14)),
  {
    message: "Leave duration cannot exceed 14 days",
    path: ["endDate"],
  }
)

export type LeaveRequestInput = z.infer<typeof leaveRequestSchema>