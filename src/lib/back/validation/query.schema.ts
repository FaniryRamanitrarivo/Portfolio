import { z } from "zod";

export const projectQuerySchema = z.object({
  view: z.enum(["summary", "full"]).default("full"),

  start: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 0))
    .refine((v) => Number.isInteger(v) && v >= 0, {
      message: "start must be a positive integer",
    }),

  limit: z
    .string()
    .optional()
    .transform((v) => (v ? Number(v) : 10))
    .refine((v) => Number.isInteger(v) && v > 0 && v <= 50, {
      message: "limit must be between 1 and 50",
    }),

  order: z.enum(["asc", "desc"]).default("asc"),

  popular: z
    .enum(["true", "false"])
    .optional()
    .transform((v) => v === "true"),
});
