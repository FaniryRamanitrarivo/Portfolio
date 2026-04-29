// /app/api/contact/route.ts
import emailTemplate from "@/src/components/ui/email-template"
import { contactSchema } from "@/src/lib/back/validation/contact.schema"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = contactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten() },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = parsed.data

    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL!,
      subject: `📩 ${subject} - ${name}`,
      replyTo: email,
      html: emailTemplate({ name, email, subject, message }),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}