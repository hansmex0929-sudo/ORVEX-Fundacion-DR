# ORVEX Fundación DR

Private internal charitable-operations platform for the Dominican Republic, designed to run locally at `http://localhost:3000` during development and to remain modular, secure, auditable, and expansion-ready.

## Mission

ORVEX Fundación DR manages families, households, beneficiaries, community needs, assistance approvals, inventory, warehouses, deliveries, volunteers, projects, medical and education support, documents, communications, compliance, analytics, and AI-assisted prioritization.

## Important scope decision

Donor management is intentionally lightweight because most donations will be handled directly by the founder. The platform keeps only essential donor and donation records for receipts, restrictions, source tracking, reconciliation, and auditability.

## Start here

1. Read `CODEX.md`.
2. Read `docs/MASTER_BLUEPRINT.md`.
3. Read `docs/ARCHITECTURE.md` and `docs/DATABASE.md`.
4. Read `docs/UI_SCREEN_REGISTRY.md` before implementing any user interface.
5. Implement the backlog in `docs/ROADMAP.md` sequentially.

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
