import * as z from "zod";

// Core vars: the app cannot boot without these.
// Feature vars (OAuth providers, Resend): optional here — each provider/feature
// degrades gracefully at the point of use if its own vars are blank, rather than
// forcing every deployment to configure every optional integration.
const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  NEXTAUTH_URL: z.string().min(1, "NEXTAUTH_URL is required"),
  NEXTAUTH_SECRET: z.string().min(1, "NEXTAUTH_SECRET is required"),

  GITHUB_ID: z.string().optional().default(""),
  GITHUB_SECRET: z.string().optional().default(""),

  GOOGLE_ID: z.string().optional().default(""),
  GOOGLE_SECRET: z.string().optional().default(""),

  RESEND_API_KEY: z.string().optional().default(""),
  CONTACT_EMAIL: z.string().optional().default(""),

  // Calendly/Cal.com scheduling link shown as a "book a call" CTA on the
  // contact section. Optional — the CTA simply doesn't render if unset.
  BOOKING_URL: z.string().optional().default(""),

  // Canonical production URL — used for metadataBase, sitemap.xml,
  // robots.txt and canonical/OG links. Defaults to a placeholder so local
  // dev and preview builds don't fail; must be overridden in production.
  SITE_URL: z.string().url().optional().default("https://your-portfolio.vercel.app"),

  // Temporary local-dev switch to bypass NextAuth entirely (see
  // src/middleware.ts, src/app/admin/page.tsx, src/lib/auth-guard.ts).
  // Must be "false" (the default) anywhere auth actually matters.
  AUTH_DISABLED: z
    .string()
    .optional()
    .default("false")
    .transform((v) => v === "true"),
});

function loadEnv() {
  const parsed = envSchema.safeParse(process.env);

  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${issues}`);
  }

  return parsed.data;
}

export const env = loadEnv();
