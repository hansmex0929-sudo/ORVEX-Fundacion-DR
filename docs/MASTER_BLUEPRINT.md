# ORVEX Fundación DR — Master Blueprint

## 1. Product definition

ORVEX Fundación DR is a private internal charitable-operations and community-support system. Initial development and operation are through `localhost:3000`; public deployment is not required for the first phase. Architecture must remain modular, scalable, secure, and ready for expansion to affiliated foundations, churches, municipalities, community partners, and additional countries.

## 2. Strategic priorities

Development priority order:

1. Security, identity, permissions, and auditability
2. People, families, households, addresses, GPS, and duplicate prevention
3. Intake, poverty/hunger assessment, eligibility, case management, and approvals
4. Assistance delivery, inventory, warehouses, vehicles, routes, and proof of delivery
5. Projects, volunteers, community partners, churches, government agencies, and vendors
6. Medical and education support with strict data segregation
7. Documents, communications, reporting, compliance, backups, and disaster recovery
8. AI-assisted prioritization, forecasting, fraud detection, and optimization
9. Lightweight donor and donation tracking

## 3. User groups and dashboards

- Executive: system-wide performance, risk, approvals, finances, projects, impact
- Operations: intake, cases, assistance plans, deliveries, incidents
- Community: family outreach, assessments, referrals, follow-ups
- Warehouse: receiving, inspection, stock, kits, transfers, expirations
- Volunteer: applications, qualifications, scheduling, assignments, hours
- Medical: authorized health-support records only
- Education: authorized school-support records only
- Finance: assistance disbursement, donation records, reconciliation, approvals
- Project: milestones, budgets, beneficiaries, outputs, outcomes, evidence
- Compliance/Audit: policies, access reviews, evidence, exceptions, audit history
- AI/Analytics: models, recommendations, explanations, overrides, monitoring
- System Administration: users, roles, configuration, integrations, backups

## 4. Core functional domains

### Shared identity

One authoritative identity layer for people, families, households, organizations, addresses, contact methods, relationships, documents, identifiers, and geographic locations. Duplicate detection must occur before record creation and support review, merge, unmerge where feasible, provenance, and immutable merge history.

### Family and beneficiary management

- Intake and registration
- Household composition and relationships
- Income, expenses, employment, housing, utilities, food security, disability, age, dependents, and vulnerability factors
- Poverty and hunger assessments
- Case plans, goals, notes, referrals, visits, follow-ups, closure, and reopening
- Consent, safeguarding, privacy preferences, and document expiration
- Municipality, province, sector, barrio, GPS, and service-area mapping

### Assistance management

- Food, cash, medicine, clothing, school supplies, housing repairs, appliances, transport, emergency relief, and recurring assistance
- Eligibility rules and human approvals
- Funding/project allocation
- Limits, frequency rules, duplicate-benefit warnings, emergency override with reason
- Recipient acknowledgement, proof, and outcomes

### Inventory, warehouse, and logistics

- Multiple warehouses, zones, bins, lots, batches, serials, expiration dates
- Donation/purchase receiving, inspection, quarantine, valuation, transfers, adjustments
- Kit and family-package assembly
- Reservations and allocations
- Vehicles, drivers, routes, manifests, GPS, signatures, photos, failed delivery, redelivery, chain of custody
- Recall, spoilage, damage, shrinkage, and discrepancy workflows

### Volunteers and workforce

- Applications, identity checks, background-check status, skills, languages, certifications
- Availability, scheduling, assignment, attendance, hours, mileage, training, waivers
- Matching, evaluations, incidents, recognition, and retention

### Projects and community programs

- Goals, geography, target population, funding, budget, milestones, tasks, risks
- Partners, staff, volunteers, beneficiaries, inventory consumption, deliveries
- Outputs, outcomes, indicators, evidence, closeout, and lessons learned

### Medical support

Only authorized users may access medical-support information. Support records may include condition category, accommodation needs, medication-assistance requests, referral status, provider organization, consent, documents, and follow-up. The platform is not an electronic health record and must avoid unnecessary clinical detail.

### Education support

School, grade, enrollment, attendance-support indicators, supplies, tuition/scholarship support, devices, transportation, referrals, outcomes, and consent. Child data must use elevated safeguards.

### Organizations and partners

Churches, government agencies, schools, clinics, vendors, sponsors, community organizations, and affiliated foundations, including contacts, agreements, capabilities, service areas, referrals, transactions, and documents.

### Lightweight donations

Basic donor identity, donation date, amount/value, cash/in-kind type, method, receipt, restriction, project/fund allocation, reconciliation, and audit history. Do not prioritize complex campaigns, donor journeys, major-gift pipelines, peer-to-peer fundraising, or marketing automation.

## 5. AI capabilities

AI must be explainable, monitored, permission-controlled, and advisory:

- Poverty and hunger risk scoring
- Family prioritization recommendations
- Duplicate identity and duplicate-benefit detection
- Delivery route optimization
- Inventory demand and expiration forecasting
- Volunteer matching
- Donation forecasting at a basic operational level
- Fraud, anomaly, and conflict-of-interest detection
- Grant opportunity recommendations
- Community risk scoring and geographic heat maps

No family may be denied aid solely by an AI model. Human users must review, approve, reject, or override recommendations with recorded reasons.

## 6. Security and governance

- MFA, strong password policy, session controls, device/session revocation
- RBAC with least privilege and sensitive-domain permissions
- Field- and record-level controls where required
- Encryption in transit and at rest
- Immutable audit trail and access logging
- Export controls, watermarking where practical, and bulk-download restrictions
- Data retention, archival, legal hold, deletion/anonymization workflows
- Incident response, backup, restore testing, and disaster recovery
- Separation of production, test, and development data

## 7. Dominican Republic requirements

- Spanish-first interface and reports; English optional
- Province, municipality, municipal district, section/paraje, barrio/sector support
- Dominican address formats, national ID/passport fields with restricted visibility
- DOP and USD where financial values are required
- Local phone formatting and WhatsApp-ready contact data
- Configurable compliance registry for Dominican nonprofit, labor, tax, privacy, safeguarding, and reporting obligations
- Do not hard-code legal conclusions; maintain configurable policies and obtain Dominican counsel review before production use

## 8. Nonfunctional requirements

- Accessible responsive UI
- Offline-capable field data capture with conflict-aware synchronization
- Searchable, filterable, exportable data subject to permissions
- API-first service boundaries
- Background jobs for alerts, deduplication, forecasts, and scheduled reports
- Observability: structured logs, metrics, health checks, error tracking
- Tested backup and recovery
- Modular IDs assigned sequentially in the roadmap
