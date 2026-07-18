# Sequential Module Roadmap

Modules must retain these IDs in planning, issues, migrations, documentation, and dashboards.

## Phase 0 — Foundation

- **FND-000** Repository standards, TypeScript, linting, formatting, testing, CI
- **FND-001** Local development environment and PostgreSQL Docker Compose
- **FND-002** Application shell, Spanish/English localization, accessible navigation
- **FND-003** Configuration, secrets pattern, structured logging, health checks
- **FND-004** Test-data factory and synthetic seed system

## Phase 1 — Security and shared identity

- **SEC-010** Authentication and secure sessions
- **SEC-011** MFA framework and account recovery
- **SEC-012** RBAC permission engine
- **SEC-013** Append-only audit framework
- **SEC-014** Sensitive-access logging and export controls
- **IDN-020** Person and organization master
- **IDN-021** Contact methods, addresses, GPS, Dominican geography
- **IDN-022** Families, households, membership, and relationships
- **IDN-023** Duplicate detection, review, merge, provenance, and history
- **IDN-024** Consent, privacy preferences, and restricted identifiers

## Phase 2 — Intake, assessments, and cases

- **CAS-030** Intake and referral sources
- **CAS-031** Case workspace, assignment, notes, visits, and timeline
- **CAS-032** Configurable assessment templates and answers
- **CAS-033** Poverty, hunger, vulnerability, and eligibility rules
- **CAS-034** Case plans, goals, follow-ups, referrals, closure/reopening
- **CAS-035** Safeguarding and incident controls

## Phase 3 — Assistance and approvals

- **AST-040** Assistance programs and request intake
- **AST-041** Eligibility evaluation and human decision workspace
- **AST-042** Approval workflows and separation of duties
- **AST-043** Benefit limits and duplicate-benefit prevention
- **AST-044** Cash/in-kind disbursement and recipient acknowledgment
- **AST-045** Emergency override and escalation

## Phase 4 — Inventory, warehouse, and logistics

- **INV-050** Item catalog, warehouses, locations, lots, serials, expirations
- **INV-051** Receiving, inspection, quarantine, valuation
- **INV-052** Stock movement, transfer, adjustment, reconciliation
- **INV-053** Kits, reservations, allocations, recalls, loss/damage
- **LOG-060** Vehicles, drivers, routes, stops, and manifests
- **LOG-061** Loading and chain of custody
- **LOG-062** Proof of delivery, signatures, photos, GPS, exceptions
- **LOG-063** Offline field workflow and synchronization

## Phase 5 — Volunteers, projects, and partners

- **VOL-070** Volunteer applications, skills, languages, credentials
- **VOL-071** Scheduling, assignment, check-in, hours, training
- **VOL-072** Volunteer matching, evaluations, incidents, recognition
- **PRJ-080** Programs, projects, locations, teams, partners
- **PRJ-081** Milestones, tasks, risks, budgets, and evidence
- **PRJ-082** Indicators, outcomes, impact, closeout, lessons learned
- **ORG-090** Churches, agencies, schools, clinics, vendors, agreements

## Phase 6 — Sensitive support domains

- **MED-100** Medical-support profile, requests, referrals, accommodations
- **MED-101** Restricted medical documents and follow-up
- **EDU-110** Education profile, enrollment, supplies, devices, transportation
- **EDU-111** Scholarship/tuition support and education outcomes

## Phase 7 — Documents, communications, compliance, and finance

- **DOC-120** Document storage, versions, links, expirations
- **COM-130** Communications, templates, notifications, consent
- **CMP-140** Policies, acknowledgments, requirements, evidence, access reviews
- **FIN-150** Assistance financial controls, budgets, reconciliation
- **DON-160** Lightweight donors, donations, restrictions, receipts

## Phase 8 — Analytics and AI

- **ANL-170** Role dashboards, reports, geographic maps, exports
- **AI-180** Explainable poverty and hunger risk recommendations
- **AI-181** Duplicate identity/benefit recommendations
- **AI-182** Inventory forecasting and expiration risk
- **AI-183** Delivery optimization
- **AI-184** Volunteer matching
- **AI-185** Fraud, anomaly, and conflict detection
- **AI-186** Grant and community-risk recommendations
- **AI-187** Model governance, monitoring, review, and overrides

## First Codex sprint

Codex should implement only:

1. FND-000 through FND-004
2. SEC-010, SEC-012, SEC-013 skeletons
3. IDN-020 through IDN-022 database and service foundations

Sprint acceptance criteria:

- Application starts at localhost:3000
- PostgreSQL runs locally
- Spanish and English shell works
- Login and protected route skeleton works
- Permission service is server-enforced
- Audit event can be written and queried by authorized users
- Synthetic person, household, address, and relationship records work
- Duplicate-search hook is called before person creation
- Tests, lint, typecheck, and production build pass
