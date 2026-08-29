# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio site + a small back-office for managing "projects" (case studies), built with Next.js 16 (App Router), React 19, Prisma 6 (Postgres/Neon), NextAuth 4, Tailwind CSS 4, and Resend for the contact form.

## Commands

```bash
npm install          # runs `prisma generate` via postinstall — requires DATABASE_URL to be set first (see below)
npm run dev           # start dev server
npm run build          # prisma generate && next build
npm run start           # start production server
npm run lint            # eslint
npx tsc --noEmit         # typecheck (no dedicated npm script)

npx prisma migrate dev --name <name>   # create/apply a migration
npx prisma studio                       # inspect the DB
npx prisma db seed                       # seed via prisma/seed.ts (configured in prisma.config.ts)
```

There is currently no test suite (no test runner/config in the repo).

### Environment

Copy `.env.example` to `.env` and fill in real values before running anything — `prisma.config.ts` throws immediately if `DATABASE_URL` is missing, which breaks even `npm install` (via the `postinstall` → `prisma generate` step). All app env access goes through `src/lib/env.ts` (zod-validated, parsed once at import time) instead of raw `process.env.X!`. `DATABASE_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET` are hard-required there; `GITHUB_ID`/`GITHUB_SECRET`, `GOOGLE_ID`/`GOOGLE_SECRET`, `RESEND_API_KEY`/`CONTACT_EMAIL` are optional in the schema (default `""`) since each is only needed if you actually use that OAuth provider / the contact form — add a var to the app by adding one line to `envSchema` in `src/lib/env.ts`.

## Architecture

### Data flow — one path only

`prisma/schema.prisma` → `src/server/repositories/project.repository.ts` (raw Prisma calls) → `src/server/services/project.service.ts` (`projectServiceServer`, business logic + DTO mapping) → consumed **directly** by Server Components, Route Handlers (`src/app/api/projects/**`), and Server Actions (`src/lib/actions/projects.ts`). Client components never fetch projects over HTTP — mutations go through the `"use server"` actions in `src/lib/actions/projects.ts`, which call `revalidateTag("projects")` after writes.

If asked to extend project data-fetching, extend the `src/server/repositories` → `src/server/services` → route/action path. Earlier duplicate layers (`src/lib/back/projects/**`, `src/lib/back/mappers/**`, a whole unused `src/lib/front/api/**` HTTP-client layer, and a stale `src/schema.prisma`) were removed in a cleanup pass — don't reintroduce a parallel data-access layer like that; there should be exactly one.

### Routing structure

- `src/app/(public)/` — the public site route group: single-page layout with sections rendered via `SECTION_COMPONENTS` (`src/lib/front/section-components.ts`), driven by the `SECTIONS` list in `src/lib/front/constant.ts`. Adding a section = add to both.
- `src/app/(public)/@modal/(.)projects/[id]/` — a parallel route (`@modal`) + intercepting route (`(.)`) pair that renders project details as a modal over the homepage when navigated to client-side, while `src/app/(public)/projects/[id]/` renders the same content as a full page on direct load/refresh. Keep both in sync if changing project-detail markup.
- `src/app/admin/` — back office (project CRUD), protected by `src/middleware.ts` (matches `/admin/:path*`).
- `src/app/api/` — route handlers (`projects`, `contact`, `auth/[...nextauth]`, `secure`).

### Auth — two separate allowlists

NextAuth (`src/lib/auth.ts`) supports GitHub + Google, but access is gated by a hardcoded `allowedEmails` array in the `signIn` callback. `src/lib/auth-guard.ts` (`requireAuth()`, used by `/api/secure`) has its **own separate** `allowedEmails` array. `src/middleware.ts` only checks that a JWT exists (not the allowlist) — the actual identity gate happens at sign-in time via the callback. If you change who's allowed in, update both files.

### Project entity — three schemas, one shape

The `Project`/`ProjectDTO` type (`src/types/projects.ts`) is validated in three independent places that must be kept consistent by hand: `prisma/schema.prisma` (storage — array fields are `Json`), `src/app/api/projects/schema.ts` (API route body validation), and `src/lib/back/validation/project-form.schema.ts` (admin form validation, react-hook-form). The form schema represents array fields (`responsibilities`, `technologies`, etc.) as `{ value: string }[]` for `useFieldArray`, while the DTO/DB represent them as `string[]`; conversion happens via `src/lib/front/forms/normalizeProjectForm.ts` and `denormalizeProjectForm.ts` when reading/writing the form.

### Path alias gotcha

`tsconfig.json` maps `@/*` to the repo root, so internal imports are `@/src/...` (e.g. `@/src/lib/back/db`), not `@/lib/...`. `components.json` (leftover shadcn config) declares aliases like `@/components` and `@/lib` pointing at non-existent root-level dirs — if using the shadcn CLI to add a component, expect it to land in the wrong place and need moving into `src/components/ui`.

### Styling

Tailwind v4, CSS-first config via `@theme inline` in `src/app/globals.css` (custom `accent-*`/`neutral-*` palettes, fonts). `tailwind.config.ts` still exists from the v3-style setup but its `content` globs (`./app/**`, `./components/**`) don't match the actual `src/`-rooted layout — Tailwind v4's automatic content detection is what's actually working here, so don't rely on that file's globs when debugging missing styles.

### Images

Project images render via `next/image` (`project-view.tsx`, `project-details.tsx`, `project-table-body.tsx`). `next.config.ts` currently allows **all** remote hostnames (`remotePatterns: [{ hostname: "**" }]`) because project image URLs are free-text admin input with no fixed host — this is a deliberate, documented tradeoff (an open image-optimization proxy) rather than an oversight. Narrow it once project images go through a controlled upload/host (e.g. a specific CDN or bucket) instead of arbitrary URLs.

### Error handling

Route handlers wrap logic in `safeHandler` (`src/lib/back/handler.ts`), which catches `AppError` (`src/lib/back/errors.ts`, carries an HTTP `status`) and formats a consistent `{ success, data | message }` JSON envelope; unexpected errors are logged and reported with a generic message in production.
