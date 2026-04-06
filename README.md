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

| Variable | App | Required | Description |
|----------|-----|----------|-------------|
| `DATABASE_URL` | Both | Yes | PostgreSQL connection string |
| `COACH_PASSWORD` | coach-dashboard | Yes | Login password for the dashboard (required — auth fails closed without it). **Rotate from default before deploying.** |
| `COACH_CALENDLY_URL` | coach-dashboard | Yes | Calendly booking link (server-side) |
| `NEXT_PUBLIC_COACH_CALENDLY_URL` | swim-coach | Yes | Calendly booking link (client-side) |
| `NEXT_PUBLIC_COACH_EMAIL` | swim-coach | Yes | Coach email shown on public site (e.g., `nikki@hubbardwellness.com`) |
| `NEXT_PUBLIC_SITE_URL` | swim-coach | No | Custom domain URL for sitemap (e.g., `https://coachnikki.com`) |
| `NOTIFICATION_EMAIL` | swim-coach | No | Email address to notify on new intake submissions |
| `SMTP_HOST` | swim-coach | No | SMTP server host for email notifications |
| `SMTP_PORT` | swim-coach | No | SMTP port (default: 587) |
| `SMTP_SECURE` | swim-coach | No | `true` for TLS, `false` for STARTTLS |
| `SMTP_USER` | swim-coach | No | SMTP username |
| `SMTP_PASS` | swim-coach | No | SMTP password |
| `SMTP_FROM` | swim-coach | No | From address for notification emails |
| `GOOGLE_SHEETS_WEBHOOK_URL` | swim-coach | No | Optional webhook URL to forward new bookings to Google Sheets |
| `BASE_PATH` | coach-dashboard | Yes | `/coach` |
| `NEXT_PUBLIC_BASE_PATH` | coach-dashboard | Yes | `/coach` |
| `NODE_ENV` | Both | — | `production` enables secure cookies |

### Security Note

The `.replit` file is gitignored and must not be committed.
All secrets (`DATABASE_URL`, `COACH_PASSWORD`, SMTP credentials) must be set exclusively via Vercel Environment Variables.
Never hardcode credentials in source files.

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
