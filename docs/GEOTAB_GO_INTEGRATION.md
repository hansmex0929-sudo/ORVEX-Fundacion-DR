# ORVEX Fundación DR — Geotab GO Integration

**Module:** `LOG-064`  
**UI range:** `FD-1010` through `FD-1060`  
**Status:** Approved implementation specification; production activation remains gated.

## Objective

Integrate Geotab GO telematics into the ORVEX Fundación DR fleet module for central vehicle visibility, device health, maintenance meters, geofences, operational alerts, and theft-recovery coordination for the planned 4,200-vehicle fleet.

## Official API model

- MyGeotab exposes a JSON-RPC API over HTTPS at `/apiv1`.
- A dedicated MyGeotab service account authenticates with `Authenticate` and receives a `credentials` object containing a session ID plus a server `path`.
- The integration follows the returned server path for subsequent API requests.
- No separate public API key is required for ordinary MyGeotab customer API access; credentials must be stored only in the approved runtime secret manager.
- Current vehicle state is obtained from `DeviceStatusInfo`.
- Incremental synchronization uses `GetFeed` and durably persists every returned `toVersion` before processing the batch.
- Static and semi-static records such as `Device`, `User`, `Diagnostic`, and `Zone` should be cached and refreshed on a controlled schedule.
- Geofences are represented as MyGeotab `Zone` entities.

## Security rules

1. Server-side calls only. Privileged MyGeotab credentials must never reach a browser.
2. Separate development, staging, and production service accounts.
3. Secrets belong in Cloudflare secret storage or another approved secret manager, never source control.
4. Location data is sensitive employee and operational data.
5. Every live-map view, historical-route view, export, configuration change, alert acknowledgment, and theft-case action must be audited.
6. The integration fails closed when authorization, credentials, or tenant mapping are missing.
7. Remote immobilization is not part of the initial release. A moving vehicle must never be remotely disabled.

## Provider boundary

All Geotab behavior is isolated behind `FleetTelematicsProvider`. ORVEX owns the normalized vehicle, telemetry, alert, maintenance, audit, and theft-case models. Provider identifiers are stored only as external mappings.

## Required synchronization jobs

- Device and vehicle inventory: daily and on demand.
- Current `DeviceStatusInfo`: adaptive near-real-time polling appropriate to the contracted plan and cellular coverage.
- `LogRecord`, `StatusData`, `FaultData`, `Trip`, `ExceptionEvent`, `DriverChange`, and `Zone`: incremental `GetFeed` workers with separate durable cursors.
- Device-health monitor: identifies stale or non-communicating units.
- Maintenance-meter sync: updates mileage, engine hours, and service-due calculations.
- Mapping review: surfaces unmatched Geotab devices and duplicate ORVEX mappings.

A feed worker must persist `toVersion` before processing the returned records so a restart cannot lose the integration cursor. When the result limit is reached, the worker immediately requests the next batch. Empty feeds use progressive backoff.

## Environment variables

```text
GEOTAB_SERVER=my.geotab.com
GEOTAB_DATABASE=
GEOTAB_USERNAME=
GEOTAB_PASSWORD=
GEOTAB_REQUEST_TIMEOUT_MS=30000
ORVEX_INTERNAL_JOB_TOKEN=
```

Values shown above are names only. Real values must be configured as protected runtime secrets.

## Screen registry extension

### FD-1010 — Fleet Command Center

- **Route:** `/fleet/command-center`
- Live national/regional fleet map, freshness indicators, vehicle state, driver, speed, ignition, device health, maintenance state, geofence state, and active alerts.

### FD-1020 — Vehicle Telematics Detail

- **Route:** `/fleet/vehicles/[vehicleId]/telematics`
- Current state, route/trip history, driver history, device installation, diagnostics, maintenance meters, geofence events, alerts, notes, and audit timeline.

### FD-1030 — Fleet Alerts and Exceptions

- **Route:** `/fleet/alerts`
- Triage for unauthorized movement, after-hours ignition, towing, power loss, device offline, geofence exit, speeding, excessive idle, faults, and overdue service.

### FD-1040 — Geofence Administration

- **Route:** `/fleet/geofences`
- Map-based zone creation, categories, effective dates, schedules, vehicle/group assignment, approval, and audit history.

### FD-1050 — Geotab Integration Administration

- **Route:** `/settings/integrations/geotab`
- Connection health, environment, last sync, lag, devices, failed records, unmatched mappings, test connection, resync, reconnect, disable, and credential-rotation workflows. Secrets are never returned to the client.

### FD-1060 — Vehicle Theft and Recovery Case

- **Route:** `/fleet/theft-cases/[caseId]`
- Incident details, last/current location, movement timeline, assigned security officer, law-enforcement references, evidence, insurance, recovery, inspection, and return-to-service workflow.

All screens must use the shared ORVEX shell, page ID, four-language localization, role-aware actions, accessible controls, and synthetic development data.

## Alert and theft-recovery rules

- Critical alerts: unauthorized movement, towing, device tamper/removal, primary-power loss, and movement after a theft case opens.
- Every displayed position shows its timestamp and freshness state: fresh, delayed, stale, or offline.
- Critical alerts cannot be bulk-acknowledged.
- Theft cases require authorized confirmation; an automated alert alone does not prove theft.
- Security staff coordinate with law enforcement and insurance. Employees must not confront suspected thieves.
- A second independently powered concealed tracker may be evaluated separately after privacy, maintenance, subscription, and security review.

## Acceptance gates

- Dedicated test database and synthetic devices.
- Contract tests for authentication, server redirection, session expiration, normalization, and feed cursors.
- Authorization tests for national, regional, local, employee, security, and unauthorized roles.
- Replay, duplicate event, timeout, rate-limit, stale-data, and provider-outage tests.
- Four-language and accessibility tests for every screen.
- Cellular-coverage and installation pilot in representative Dominican regions.
- Legal, HR, privacy, retention, and employee-notice approval.
- Load test for at least 4,200 vehicles.
- Explicit executive approval before production credentials or live employee tracking are enabled.

## Primary references

Implementation must be checked against the current official Geotab Developer documentation for `Authenticate`, API concepts, `DeviceStatusInfo`, `GetFeed`, the data-feed guide, `Zone`, and the current Geotab GO device support documentation before production rollout.