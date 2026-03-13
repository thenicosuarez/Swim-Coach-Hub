# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### `artifacts/swim-coach` — Swim Coach Website
- A premium swimming coaching website for a Black female D1 University of Michigan swimmer turned private coach in Chicago's West Loop
- Design: Teal/aqua primary (174 62% 35%), coral/orange accent (16 85% 62%), airy white backgrounds
- Identity: "[Your Name]" placeholder throughout — coach name, email, social links TBD
- Pages: Hero, About, Services & Rates, Book a Session (Calendly + Intake Form), Contact (chatbot placeholder), Footer
- Scheduling: Service cards and booking tiles link out to Calendly (placeholder URL `https://calendly.com/[your-handle]`)
- Lead intake form: Rich form collecting name, email, phone, neighborhood, swimmer age, service interest, goal (water safety / recreational / competitive), all-four-strokes preference, pool access, preferred days/times, experience level, notes — POSTs to `/api/bookings`
- Contact section: No form — "Live Chat Coming Soon" placeholder + social links (Instagram, LinkedIn, Twitter, Email)
- Routes:
  - `GET /api/bookings` — list all booking requests
  - `POST /api/bookings` — submit a booking/intake request
  - `POST /api/contact` — submit a contact inquiry (currently unused, contact form removed)
- Services & Rates (updated pricing based on $1/min principle):
  - Private Lesson: $60/30 min, $90/45 min, $120/60 min
  - Advanced / Team Prep: $65/30 min, $95/45 min, $130/60 min
  - Baby & Toddler: from $40/session
  - Group / Family: $50/45 min
  - Video Review: $20/video (design-only placeholder)
  - 5-Session Package: $360
  - 10-Session Package: $680
- Frontend packages: framer-motion, @hookform/resolvers, clsx, tailwind-merge, react-hook-form, zod, lucide-react

### `artifacts/coach-dashboard` — Coach CRM Dashboard
- Private coach-facing dashboard at `/coach` for managing leads, clients, and coaching plans
- Password-protected via `COACH_PASSWORD` environment variable (default: `coach2026!`)
- Same teal/coral design palette as the main swim-coach site
- Views:
  - **Lead Funnel**: Lists all intake form submissions, filterable by status (pending/approved/rejected). Approve → promotes to client + shows "Copy Calendly Link". Reject → optional note.
  - **Clients**: Lists approved leads as active clients. Coach can add/edit private session notes (auto-saved on blur). Shows linked coaching plans.
  - **Coaching Plans**: Create/edit training plans (title, goals, drills, notes). Assign to clients. Share via public read-only URL.
  - **Public Plan View**: `/coach/plans/:shareToken` — branded read-only plan page, no auth required.
- API routes (all `/api/coach/*` require `x-coach-password` header):
  - `GET /api/coach/bookings` — list all bookings (newest first)
  - `PATCH /api/coach/bookings/:id/approve` — approve + auto-create client
  - `PATCH /api/coach/bookings/:id/reject` — reject with optional note
  - `GET /api/coach/clients` — list all clients
  - `PATCH /api/coach/clients/:id` — update client notes/status
  - `GET /api/coach/plans` — list all coaching plans
  - `POST /api/coach/plans` — create a plan
  - `PATCH /api/coach/plans/:id` — update a plan
  - `GET /api/plans/share/:token` — public plan view (no auth)
- DB tables: `clients` (FK to bookings), `coaching_plans` (with `share_token` UUID)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   ├── coach-dashboard/    # Coach CRM dashboard (React + Vite)
│   └── swim-coach/         # Swim coaching website (React + Vite)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers
- Depends on: `@workspace/db`, `@workspace/api-zod`

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL.

- `src/schema/bookings.ts` — bookings table for swim coaching session requests
- `src/schema/clients.ts` — clients table (promoted from approved bookings)
- `src/schema/coaching-plans.ts` — coaching plans with shareable tokens

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`).

Run codegen: `pnpm --filter @workspace/api-spec run codegen`
