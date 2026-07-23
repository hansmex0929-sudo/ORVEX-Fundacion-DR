# ORVEX Fundación DR Deployment Standard

## Primary platform

Cloudflare Workers & Pages is the permanent primary production platform. GitHub remains the source of truth. A push to the protected production branch must trigger Cloudflare validation and deployment through the connected Git integration.

## Application framework

When the deployable web application is added, prefer a Cloudflare-supported full-stack framework configuration. For Next.js applications with server routes, authentication, or API handlers, deploy through Cloudflare Workers with the OpenNext adapter rather than treating the application as a static-only Pages export.

## Backup platform

Vercel is optional backup infrastructure only. Normal commits must not automatically consume Vercel builds. A Vercel deployment must require an explicit manual workflow or a clearly marked backup commit.

## Required controls

- No hard-coded localhost hostnames or port-3000 dependencies.
- No secrets, credentials, medical data, child data, education data, or beneficiary records in source control.
- Separate preview and production environment variables.
- Runtime secrets must be configured in Cloudflare secret storage.
- Production deployments require lint, typecheck, tests, framework build, and a Cloudflare runtime compatibility check.
- Production custom domains must point to Cloudflare after validation.
- Rollback procedures must retain the last known-good Cloudflare deployment.
- Vercel must remain isolated from production data unless activated for a controlled backup event.

## Repository status

This repository currently contains the controlling product and architecture documentation. Cloudflare deployment automation will be implemented with the application code, package manifest, and production runtime entry point.
