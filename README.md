# Whimsical Whiskers Rescue

A cohesive React/TypeScript MVP for a foster-based cat rescue: public content, searchable animal profiles, adoption applications and private status lookup, community forms, donations, merchandise, and role-aware operations tools.

## Local setup

1. Install Node 20.19+ or 22.12+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local` only if connecting Supabase.
4. Run `npm run dev`.

Without Supabase variables, the app uses browser-local demo repositories. Demo admin credentials are `demo@whimsicalwhiskers.local` / `whiskers`. Local storage is for product demonstration only and is not suitable for real applicant data.

## Commands

- `npm run dev` — local Vite server
- `npm run typecheck` — strict TypeScript checks
- `npm run lint` — ESLint
- `npm test` — Vitest suite
- `npm run build` — typecheck and production bundle

## Environment

`VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` enable Supabase Auth/client access. Never expose a secret/service-role key through a `VITE_` variable. `VITE_ENABLE_DEMO_ADMIN` explicitly enables demo authentication; local no-Supabase mode also enables it automatically. Stripe and Printify variables are placeholders only and have no live adapter in this MVP.

## Database and seed

The local SQL contract lives in `supabase/migrations/`; representative seed rows live in `supabase/seed.sql`. Before applying it, install the Supabase CLI, run a local stack, and review policies. Suggested local flow:

```text
supabase start
supabase db reset
supabase db test
```

No remote database operation was performed during development. Public PII form writes intentionally have no anonymous table grants; production submissions should pass through rate-limited Netlify functions with server validation.

## Deployment

`netlify.toml` defines the build and SPA fallback. Deployment was intentionally not attempted. Complete [docs/PRODUCTION_CHECKLIST.md](docs/PRODUCTION_CHECKLIST.md) before creating a site or connecting production services.

## Integrations

- Payments: `paymentAdapter` returns mock references; a Netlify function should create Stripe Checkout Sessions, and a verified webhook should write final donation/order state idempotently.
- Fulfillment: `fulfillmentAdapter` is a mock Printify boundary; replace it server-side with catalog/order calls and webhook reconciliation.
- Email: confirmation copy is shown locally but no message is sent. Attach a transactional-email provider to accepted server submissions.
- Images: placeholder URLs are data values and can be replaced with Supabase Storage paths without changing page logic.

See [Architecture](docs/ARCHITECTURE.md), [Admin Guide](docs/ADMIN_GUIDE.md), [Production Checklist](docs/PRODUCTION_CHECKLIST.md), and [Backlog](docs/BACKLOG.md).
