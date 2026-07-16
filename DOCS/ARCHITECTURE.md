# Architecture

## Shape

The application is a modular React monolith. Public pages, operator tools, typed domain records, and integration boundaries live in one build. React Router provides public and protected route composition; the visual system is centralized in `src/styles.css`.

## Data modes

The current UI uses a repository abstraction backed by sanitized browser-local demo data. Seed content is centralized in `src/data/seed.ts`. Supabase client initialization is guarded: no client exists unless URL and publishable key are present. The committed migration defines the intended PostgreSQL source of truth and RLS boundary.

Production evolution should replace repository methods one at a time with Supabase queries or server-function calls. PII writes, status lookup, payments, orders, and privileged user administration belong behind server endpoints. The browser must never receive the service-role/secret key.

## Auth and authorization

The auth provider follows the proven ITS pattern: hydrate a Supabase session, then load a separate staff profile with role and active state. Protected routes enforce UI access. Database RLS separately enforces role permissions through a private-schema `has_role` helper based on `profiles`, never user-editable metadata.

Roles are administrator, adoption coordinator, animal-care staff, content editor, store manager, and read-only volunteer. UI hiding is convenience only; RLS/server authorization is the security boundary.

## Privacy model

Public cat records contain only public medical and general foster-region information. Internal animal notes and adoption applications have no public select policy. Anonymous PII inserts are deliberately withheld from direct Data API access; production functions must validate, rate-limit, and insert using server-held credentials. Logs must contain identifiers and outcome codes, never full form payloads.

## Integrations

`paymentAdapter` and `fulfillmentAdapter` are explicit mocks. Production adapters should live in Netlify functions, validate all inputs, use idempotency keys, record provider references, and rely on signed webhooks for final state. The database remains authoritative for inventory, paid state, fulfillment, and recurring donations.

## Content and scaling

Cats, products, stories, events, campaigns, and homepage modules are data-driven. `content_entries.fields` provides structured JSON sections rather than one uncontrolled HTML blob. Storage buckets should separate public approved media from private documents, with explicit file type/size constraints and bucket RLS.
