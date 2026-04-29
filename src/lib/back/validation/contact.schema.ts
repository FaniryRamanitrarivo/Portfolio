import { z } from "zod";

export const contactSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(2, "Subject is too short"),
    message: z.string().min(10, "Message is too short").max(500).trim()
})

export type ContactFormData = z.infer<typeof contactSchema>