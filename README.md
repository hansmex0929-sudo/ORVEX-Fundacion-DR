# ORVEX Fundación DR

Private internal charitable-operations platform for the Dominican Republic, designed for secure Cloudflare-hosted production deployment and framework-managed local development without any permanent localhost or port-3000 dependency.

## Mission

ORVEX Fundación DR manages families, households, beneficiaries, community needs, assistance approvals, inventory, warehouses, deliveries, volunteers, projects, medical and education support, documents, communications, compliance, analytics, and AI-assisted prioritization.

## Deployment standard

- Cloudflare Workers & Pages is the primary production platform.
- GitHub is the source of truth and deployment trigger.
- Vercel may be retained only as an explicit backup after a deployable application is added.
- Local development ports are temporary framework details and must not be embedded in production architecture, scripts, documentation, or health checks.
- Secrets and beneficiary data must be stored in protected runtime services, never committed to source control.

See `docs/DEPLOYMENT.md` for the controlling deployment requirements.

## Important scope decision

Donor management is intentionally lightweight because most donations will be handled directly by the founder. The platform keeps only essential donor and donation records for receipts, restrictions, source tracking, reconciliation, and auditability.

## Start here

1. Read `CODEX.md`.
2. Read `docs/MASTER_BLUEPRINT.md`.
3. Read `docs/ARCHITECTURE.md` and `docs/DATABASE.md`.
4. Read `docs/UI_SCREEN_REGISTRY.md` before implementing any user interface.
5. Read `docs/DEPLOYMENT.md` before adding production infrastructure.
6. Implement the backlog in `docs/ROADMAP.md` sequentially.

## Core principles

- Database-first development
- Strong identity and duplicate prevention
- Role-based access control and MFA
- Full audit history
- Human approval for consequential AI decisions
- Sensitive medical, child, and education data compartmentalization
- Offline-capable field workflows
- Four-language support from the beginning: Spanish, English, Haitian Creole, and French
- Dominican Republic geographic and compliance support
- One application screen per page/view, with a unique sequential page ID
- Official ORVEX red, black, and white visual identity throughout
- No real beneficiary data in source control

## Local foundation setup

1. Copy `.env.example` to `.env` and replace `AUTH_SECRET` with a local random value of at least 32 characters.
2. Start PostgreSQL: `docker compose up -d postgres`.
3. Install dependencies: `pnpm install`.
4. Generate and migrate: `pnpm db:generate && pnpm db:migrate`.
5. Load synthetic data: `pnpm db:seed`.
6. Start the app: `pnpm dev`, then open `http://localhost:3000`.

The local demonstration login is `demo@orvex.local` / `Synthetic!Pass9`. It is synthetic and must never be used in production.

The initial migration creates tenant-scoped identity and household records plus database triggers that reject updates or deletions from the append-only audit table.
