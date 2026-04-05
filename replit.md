# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Hosts two Next.js 15 App Router applications targeting Vercel deployment.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.8
- **Frontend/Backend**: Next.js 15 (App Router) — both apps are full-stack Next.js
- **Database**: PostgreSQL + Drizzle ORM (`@workspace/db`)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`, shadcn/ui components
- **Fonts**: DM Sans (body) + Outfit (headings) from Google Fonts

## Design Tokens

- **Primary (teal)**: `hsl(174 62% 35%)`
- **Accent (coral)**: `hsl(16 85% 62%)`
- **Background**: white / near-white

## Artifacts

### `artifacts/swim-coach` — Swim Coach Public Website
- Premium public-facing site for Coach Nikki Hubbard (Black female D1 University of Michigan swimmer, Chicago West Loop)
- Next.js 15 App Router, no basePath (served at `/`)
- Port: 18674
- Pages: Hero, About, Services & Rates, Book a Session (Calendly + Intake Form), Contact, Privacy Policy, Terms of Service
- Lead intake form: Rich form collecting name, email, phone, neighborhood, swimmer age, service interest, goal, pool access, preferred days/times, experience level, notes — POSTs to `/api/bookings`
- Services & Rates:
  - Private Lesson: $60/30 min, $90/45 min, $120/60 min
  - Advanced / Team Prep: $65/30 min, $95/45 min, $130/60 min
  - Baby & Toddler: from $40/session
  - Group / Family: $50/45 min
  - Video Review: $20/video
  - 5-Session Package: $360 | 10-Session Package: $680
- API routes (Next.js Route Handlers):
  - `GET /api/health`
  - `POST /api/bookings` — submit intake request (native form in Booking section)
  - `POST /api/contact` — contact inquiry
  - `POST /api/webhooks/calendly` — Calendly booking webhook
- Vercel config: `vercel.json` present

### `artifacts/coach-dashboard` — Coach CRM Dashboard
- Private coach-facing dashboard at `/coach` (basePath = `/coach`)
- Port: 23134
- Auth: Cookie-based (`coach-session` httpOnly, 30 days). Server component layout checks `cookies()` from `next/headers` and calls `redirect()` if no session. Middleware in `src/middleware.ts` provides a secondary auth layer.
- Password: stored in `COACH_PASSWORD` env var (default: `coach2026!`)
- Auth API: `POST /coach/api/auth/login`, `POST /coach/api/auth/logout`, `GET /coach/api/auth/check`
- Config API: `GET /coach/api/coach/config` — returns `{ calendlyUrl, coachEmail }`
- Views:
  - **Lead Funnel** (`/coach`): All intake submissions, filter by status. Approve → creates client, shows Calendly link. Reject → optional note.
  - **Clients** (`/coach/clients`): Approved leads, session notes, linked plans.
  - **Sessions** (`/coach/sessions`): Scheduled coaching sessions CRUD.
  - **Invoices** (`/coach/invoices`): Invoice management.
  - **Plans** (`/coach/plans`): Coaching plans with shareable read-only links.
  - **Shared Plan** (`/coach/plans/[token]`): Public, no auth required — branded read-only plan view.
- API routes (all require `coach-session` cookie):
  - Bookings: `GET/POST /api/coach/bookings`, `POST .../[id]/approve`, `POST .../[id]/reject`
  - Clients: `GET/POST /api/coach/clients`, `GET/PATCH/DELETE .../[id]`
  - Sessions: `GET/POST /api/coach/sessions`, `GET/PATCH/DELETE .../[id]`
  - Invoices: `GET/POST /api/coach/invoices`, `GET/PATCH/DELETE .../[id]`
  - Plans: `GET/POST /api/coach/plans`, `GET/PATCH/DELETE .../[id]`
  - Shared plan (public): `GET /api/plans/share/[token]`
- DB imports: `import { db, bookingsTable, clientsTable, coachingPlansTable, sessionsTable, invoicesTable } from "@workspace/db"`
  - Note: `clientsTable` does NOT have an `updatedAt` column
- Vercel config: `vercel.json` present

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── coach-dashboard/    # Next.js 15 CRM (basePath=/coach, port 23134)
│   └── swim-coach/         # Next.js 15 public site (port 18674)
├── lib/
│   └── db/                 # Drizzle ORM schema + DB connection
├── pnpm-workspace.yaml
├── tsconfig.base.json
└── package.json
```

## Key Architecture Notes

### Next.js basePath
`coach-dashboard` uses `basePath: "/coach"` (set via `BASE_PATH` env var in `artifact.toml`). All routes, API calls, and links are relative to this basePath. The `NEXT_PUBLIC_BASE_PATH` env var is used client-side.

### Auth Pattern (coach-dashboard)
1. **Server layout** (`app/(dashboard)/layout.tsx`): Reads `coach-session` cookie via `cookies()` from `next/headers`. Calls `redirect()` if absent.
2. **Middleware** (`src/middleware.ts`): Secondary layer — cookie check + redirect to login.
3. **Login flow**: `POST /api/auth/login` with `{ password }` → sets `coach-session` httpOnly cookie → redirect to dashboard.

### DB Schema
- `bookingsTable` — intake form submissions
- `clientsTable` — approved clients (promoted from bookings)
- `coachingPlansTable` — training plans with `shareToken` for public sharing
- `sessionsTable` — coaching session records
- `invoicesTable` — invoice records

### `lib/db` (`@workspace/db`)
- `src/schema/bookings.ts` — bookings table
- `src/schema/clients.ts` — clients table (no `updatedAt` column)
- `src/schema/coaching-plans.ts` — plans with shareable tokens
- `src/schema/sessions.ts` — sessions table
- `src/schema/invoices.ts` — invoices table
