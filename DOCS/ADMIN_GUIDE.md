# Admin Guide

## Local demonstration

Visit `/admin` and use the displayed demo credentials. The yellow demo label means changes stay in this browser. Never enter real applicant, donor, foster, or medical information in local demo mode.

## Dashboard

Summary cards reflect current local cat/application/product records. Attention items identify new applications and mocked integration state.

## Animals

Edit public identity, adoption status, summary, featured placement, and public/private medical notes. Changes are explicit and saved together. The production workflow should add photo upload/reordering and archive controls; records should be archived, not permanently deleted.

## Applications

Select an application to review the submitted household and care information. Status changes create a visible local audit note. Coordinators can also mark the associated cat pending or adopted. In production, these actions must be transactional, audited, and notification-aware.

## Content and store

The content screen shows the structured modules supported by the schema; production field editors remain queued. The store screen reports catalog and inventory data and clearly identifies the mock fulfillment provider. No real payment or provider action exists.

## Roles

- Administrator: all operational sections
- Adoption coordinator: animals and applications
- Animal-care staff: animals and private care notes
- Content editor: structured content
- Store manager: products and orders
- Read-only volunteer: dashboard-only baseline

Production account creation and role changes must be performed through a server-authorized admin endpoint, never by editing browser metadata.
