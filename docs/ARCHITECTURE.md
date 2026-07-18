# Architecture

## Deployment model

Initial deployment is a private internal application on the user's laptop at `localhost:3000`. The design must support later migration to a secure server or cloud without rewriting business modules.

## Proposed structure

- Web application: Next.js and TypeScript
- Database: PostgreSQL
- ORM and migrations: Prisma
- Authentication: secure credentials/session framework with MFA-ready interfaces
- Validation: Zod at every trust boundary
- Background work: durable job abstraction for alerts, matching, reports, and AI tasks
- Files: pluggable object-storage interface; local encrypted development storage first
- Mapping: provider abstraction supporting GPS and Dominican geographic layers
- Localization: Spanish (`es-DO`) and English (`en-US`)

## Modular monolith first

Begin as a well-separated modular monolith to reduce cost and operational complexity. Each module owns its application services and authorization policies while sharing a controlled core. Avoid premature microservices.

Suggested folders:

```text
src/
  app/
  modules/
    identity/
    households/
    case-management/
    assessments/
    assistance/
    approvals/
    inventory/
    logistics/
    volunteers/
    projects/
    medical-support/
    education-support/
    organizations/
    donations-lite/
    documents/
    communications/
    compliance/
    analytics/
    ai/
    audit/
  core/
    auth/
    authorization/
    database/
    events/
    localization/
    files/
    jobs/
    observability/
```

## Architectural rules

- UI components never access the database directly.
- All writes pass through application services that enforce authorization, validation, and audit logging.
- Sensitive-domain services use explicit permission checks.
- Cross-module changes use domain/application events and transactional outbox patterns when asynchronous processing is introduced.
- External integrations are behind interfaces and adapters.
- Every entity includes stable ID, timestamps, status, provenance where relevant, and optimistic-concurrency support where risk warrants it.
- Soft deletion is permitted only with policy; audit records are never soft-deleted through ordinary application actions.

## Tenant readiness

Even with one initial foundation, core operational records should include `tenantId`. Tenant isolation must be enforced in repository/service layers and tested. Global identity sharing is not required initially; architecture must not prevent future affiliated-foundation support.

## Environments

- Development: synthetic data, local PostgreSQL, local file storage
- Test: automated ephemeral database
- Staging: production-like configuration without real beneficiary data unless specifically authorized
- Production: encrypted storage, secret manager, backups, monitoring, access reviews

## Backup and disaster recovery

- Daily encrypted database backup minimum once production data exists
- Point-in-time recovery when hosted database supports it
- Encrypted file backup
- Backup retention policy and off-device copy
- Quarterly restore test minimum
- Recovery runbook with RPO/RTO targets established before production

## Security boundaries

Medical, child, education, identity-document, safeguarding, financial, and investigation data require separate permission scopes. Search results and dashboards must not leak restricted fields through counts, snippets, exports, logs, or error messages.
