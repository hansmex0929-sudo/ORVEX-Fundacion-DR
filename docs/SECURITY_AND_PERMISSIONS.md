# Security, Roles, and Permissions

## Authentication

- Secure password hashing using a modern approved algorithm
- MFA-ready architecture; require MFA for administrators and sensitive roles in production
- Session expiration, inactivity timeout, revocation, device/session list, and forced logout
- Rate limiting, lockout protections, and suspicious-login alerts
- Password reset with short-lived single-use tokens
- No secrets or credentials in source control

## Authorization

Use RBAC with explicit permission scopes. Avoid role-name checks scattered through UI code. All server actions and APIs must authorize independently.

Initial roles:

- SUPER_ADMIN
- SYSTEM_ADMIN
- EXECUTIVE
- OPERATIONS_MANAGER
- CASE_WORKER
- COMMUNITY_FIELD_WORKER
- APPROVER
- WAREHOUSE_MANAGER
- WAREHOUSE_OPERATOR
- LOGISTICS_MANAGER
- DRIVER
- VOLUNTEER_COORDINATOR
- VOLUNTEER
- PROJECT_MANAGER
- MEDICAL_SUPPORT_USER
- EDUCATION_SUPPORT_USER
- FINANCE_USER
- AUDITOR
- ANALYST
- READ_ONLY

Permission families:

- identity.read/write/merge/export
- household.read/write
- case.read/write/assign/close
- assessment.read/write/score
- assistance.request/approve/reject/disburse
- inventory.receive/inspect/adjust/transfer/allocate
- delivery.plan/load/complete/override
- volunteer.manage/schedule/checkin
- project.read/write/approve
- medical.read/write/export
- education.read/write/export
- documents.read/upload/delete
- finance.read/write/reconcile
- donations.read/write/receipt
- compliance.read/manage
- audit.read/export
- ai.run/review/override/admin
- admin.users/roles/configuration/backups

## Sensitive data compartments

The following require elevated scopes and explicit access logging:

- Government identifiers and identity documents
- Child records
- Medical-support records
- Education records involving minors
- Safeguarding concerns
- Investigations and whistleblower records
- Bank/payment information
- Precise GPS and home-location information

## Audit requirements

Append-only audit events must record actor, action, entity type/id, timestamp, tenant, source IP/device metadata where available, correlation ID, before/after summary where safe, reason, and outcome.

Mandatory events include:

- Login success/failure, logout, MFA changes
- User/role/permission changes
- Sensitive data views and exports
- Record creation, modification, archival, merge, and attempted unauthorized access
- Assistance approvals, rejections, overrides, and disbursements
- Inventory adjustments and delivery proof changes
- AI recommendation review and override
- Backup, restore, configuration, and integration changes

## Privacy and safety

- Collect minimum necessary data
- Mask restricted identifiers by default
- Never expose secrets or sensitive data in logs
- Use synthetic data for development and demonstrations
- Require purpose/reason for high-risk exports and overrides
- Support retention, anonymization, archival, and legal hold
- Restrict bulk exports and watermark sensitive reports where practical

## Production readiness gate

Before real data is entered: threat model, permission test suite, backup/restore test, incident-response plan, legal/privacy review for the Dominican Republic, safeguarding policy, user training, and documented access approvals must be complete.
