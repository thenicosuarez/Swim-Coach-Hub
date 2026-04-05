# Nikki Hubbard Swim Coach — Monorepo

Premium swimming coach website for Nikki Hubbard. Built with Next.js 15 App Router in a pnpm monorepo targeting Vercel deployment.

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
| `COACH_PASSWORD` | coach-dashboard | Login password for the dashboard |
| `CALENDLY_URL` | coach-dashboard | Calendly booking link |
| `COACH_EMAIL` | coach-dashboard | Coach contact email |
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
   - `CALENDLY_URL`
   - `COACH_EMAIL`

### coach-dashboard

1. Create a new Vercel project
2. Set **Root Directory** to `artifacts/coach-dashboard`
3. Set **Framework** to Next.js
4. Add environment variables:
   - `DATABASE_URL`
   - `COACH_PASSWORD`
   - `CALENDLY_URL`
   - `COACH_EMAIL`
   - `BASE_PATH=/coach`
   - `NEXT_PUBLIC_BASE_PATH=/coach`

### Shared Database

Both apps connect to the same PostgreSQL database. Set the same `DATABASE_URL` in both Vercel projects.

## Tech Stack

- **Framework**: Next.js 15 App Router
- **Database**: PostgreSQL + Drizzle ORM
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Package manager**: pnpm workspaces
- **Auth**: Cookie-based (coach-dashboard only)
