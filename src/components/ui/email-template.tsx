export default function emailTemplate({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) {

    return `
        <div style="font-family: Arial, sans-serif; background:#f9fafb; padding:20px;">
            <div style="max-width:600px;margin:auto;background:white;padding:24px;border-radius:12px;">
            
            <h2 style="color:#111;">📩 Nouveau message depuis ton portfolio</h2>

            <p><strong>Nom:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Sujet:</strong> ${subject}</p>

            <hr style="margin:20px 0;" />

            <p style="white-space:pre-line; line-height:1.5;">
                ${message}
            </p>

            <hr style="margin:20px 20px;" />

            <p style="font-size:12px;color:#6b7280;">
                Envoyé depuis ton portfolio Next.js
            </p>
            </div>
        </div>
    `
    
}