# Production Checklist

## Organization and content

- Replace all placeholder names, address, phone, statistics, images, leadership, social links, fees, event details, nonprofit registration, policies, and legal language.
- Obtain counsel review for privacy, retention, adoption consent, terms, refunds, recurring gifts, and tax receipts.
- Confirm accessibility with keyboard, screen reader, zoom, contrast, reduced-motion, and real content audits.

## Supabase

- Create separate development/staging/production projects and apply migrations to local/staging first.
- Remove the empty CLI-generated migration if the local environment can access it, then verify migration order.
- Configure Data API exposure and grants deliberately; run database/security advisors.
- Complete RLS policies for every management table, history table, storage bucket, and server endpoint; test each role and anonymous access.
- Add server endpoints for adoption, status lookup, community forms, newsletter, checkout, webhook, and staff management.
- Use CAPTCHA/bot scoring, IP/account throttles, payload limits, schema validation, and safe error responses.
- Define encrypted backups, restore drills, audit retention, applicant retention/deletion, and breach response.

## Payments, commerce, and messaging

- Connect Stripe only through server functions; verify webhook signatures and idempotently process duplicates.
- Reconcile paid totals against server-side catalog/campaign data; never trust browser amounts.
- Connect Printify server-side, map variants, handle provider failures, and reconcile fulfillment webhooks.
- Configure transactional email with verified domain, templates, bounce handling, and non-sensitive message content.

## Operations

- Create least-privilege staff accounts, enable MFA, shorten sensitive-session lifetime, and document offboarding.
- Add observability that excludes PII, alerting, incident playbooks, data export/deletion workflows, and support ownership.
- Run typecheck, lint, tests, build, dependency audit, secret scan, migration reset, RLS tests, and end-to-end staging checks.
- Configure CSP/security headers, custom domain, HTTPS, environment scopes, preview isolation, and rollback procedure.
- Do not enable demo admin in any deployed environment.
