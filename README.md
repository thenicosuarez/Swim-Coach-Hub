# Nikki Hubbard Swim Coach — Monorepo

Premium swimming coach website for Nikki Hubbard. Built with Next.js 15 App Router in a pnpm monorepo targeting Vercel deployment.

> **Note:** Apps live under `artifacts/` (Replit's convention for registered artifacts). This is equivalent to an `apps/` directory in other monorepo setups.

## Apps

| App | Path | Description |
|-----|------|-------------|
| `artifacts/swim-coach` | `/` | Public-facing coach website |
| `artifacts/coach-dashboard` | `/coach` | Private coach CRM dashboard |

## Local Development

```bash
# Install dependencies
pnpm install

# Start both apps
pnpm --filter @workspace/swim-coach run dev       # http://localhost:18674
pnpm --filter @workspace/coach-dashboard run dev   # http://localhost:23134/coach
```

### Environment Variables

| Variable | App | Description |
|----------|-----|-------------|
| `DATABASE_URL` | Both | PostgreSQL connection string |
| `COACH_PASSWORD` | coach-dashboard | Login password for the dashboard (required — auth fails closed without it) |
| `COACH_CALENDLY_URL` | coach-dashboard | Calendly booking link (server-side) |
| `NEXT_PUBLIC_COACH_CALENDLY_URL` | swim-coach | Calendly booking link (client-side embed) |
| `COACH_EMAIL` | Both | Coach contact email |
| `NODE_ENV` | Both | `production` enables secure cookies |

## Database

Uses PostgreSQL + Drizzle ORM via `@workspace/db`.

```bash
# Run migrations
pnpm --filter @workspace/db run migrate
```

## Vercel Deployment

Each app is deployed as a separate Vercel project. Both `vercel.json` files are pre-configured.

### swim-coach

1. Create a new Vercel project
2. Set **Root Directory** to `artifacts/swim-coach`
3. Set **Framework** to Next.js
4. Add environment variables:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_COACH_CALENDLY_URL`
   - `COACH_EMAIL`

### coach-dashboard

1. Create a new Vercel project
2. Set **Root Directory** to `artifacts/coach-dashboard`
3. Set **Framework** to Next.js
4. Add environment variables:
   - `DATABASE_URL`
   - `COACH_PASSWORD` (**required** — dashboard auth will not work without it)
   - `COACH_CALENDLY_URL`
   - `COACH_EMAIL`
   - `BASE_PATH=/coach`
   - `NEXT_PUBLIC_BASE_PATH=/coach`

### Shared Database

Both apps connect to the same PostgreSQL database. Set the same `DATABASE_URL` in both Vercel projects.

### Post-Deploy Smoke Test

After deploying, verify these flows work:

1. **Public site**: Visit `/` — hero, services, and booking sections render correctly
2. **Intake form**: Submit the booking form — check leads appear in coach dashboard
3. **Dashboard login**: Visit `/coach/login`, enter `COACH_PASSWORD` — redirects to `/coach`
4. **Leads view**: `/coach` — intake submissions appear and can be approved/rejected
5. **Shared plan**: Create a plan in `/coach/plans`, copy share link — opens without login

## Tech Stack

- **Framework**: Next.js 15 App Router
- **Database**: PostgreSQL + Drizzle ORM
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Package manager**: pnpm workspaces
- **Auth**: HMAC-SHA256 signed session cookie (coach-dashboard only, fail-closed)
