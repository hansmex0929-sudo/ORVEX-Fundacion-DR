# Codex Operating Instructions

You are implementing ORVEX Fundación DR. Treat the documents in `/docs` as the controlling product specification.

## Required working method

1. Never invent requirements that conflict with the master blueprint.
2. Work in small, reviewable branches and pull requests.
3. Before coding a module, identify affected entities, permissions, audit events, APIs, UI screens, tests, migrations, and documentation.
4. Preserve tenant-ready architecture even if the first deployment is a single foundation.
5. Never commit secrets, tokens, passwords, production credentials, personal data, medical data, identity documents, or real beneficiary records.
6. Use synthetic seed data only.
7. Every create, update, merge, approval, rejection, export, login, permission change, and sensitive-record access must be auditable.
8. Consequential AI outputs are recommendations only and require human review.
9. Build Spanish and English localization from the beginning.
10. Keep the application functional on localhost:3000.

## Preferred technical baseline

- Next.js with TypeScript
- PostgreSQL
- Prisma ORM
- Auth.js or equivalent secure session framework
- Zod validation
- React Hook Form
- Tailwind CSS with accessible component primitives
- Vitest/Jest for unit tests
- Playwright for end-to-end tests
- Docker Compose for local PostgreSQL

Alternative libraries are allowed only when documented in an architecture decision record.

## Definition of done

A feature is not complete until it includes:

- Database migration
- Authorization checks
- Input validation
- Audit events
- Error and empty states
- Localization keys
- Unit or integration tests
- End-to-end test for critical workflows
- Updated documentation
- No TypeScript, lint, build, or test failures

## First implementation assignment

Implement Phase 0 and Phase 1 from `docs/ROADMAP.md`: repository foundation, local environment, authentication skeleton, RBAC foundation, audit framework, and shared identity core. Do not start donor campaigns, advanced AI, or financial accounting before the core identity and security layers are stable.
