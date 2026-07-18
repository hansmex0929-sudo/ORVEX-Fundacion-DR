# ORVEX Fundación DR — Approved UI Screen Registry

This document is the controlling UI implementation specification for Codex and all developers. The approved visual direction is the modern ORVEX red, black, and white enterprise interface already reviewed by the founder.

## Global UI rules

1. **One screen equals one page/view and one route.** Never combine multiple application screens into a collage or composite layout.
2. Every screen must display a unique sequential page identifier in the header.
3. Every screen must include the shared left navigation, top application bar, user profile, notifications, help access, and role-aware actions.
4. Every screen must include a persistent language selector for:
   - Spanish — `es`
   - English — `en`
   - Haitian Creole — `ht`
   - French — `fr`
5. Changing language must preserve the current route, filters, selected record, pagination, and unsaved-form warning state.
6. All visible text must come from localization keys. No hard-coded user-facing labels.
7. Use only the official spelling **ORVEX** and the official ORVEX Fundación DR red/black/white identity.
8. Use synthetic demonstration data only in development and screenshots.
9. Screens must be responsive, keyboard accessible, screen-reader friendly, and usable at 320 px width and above.
10. Role-based permissions must control navigation visibility, data visibility, actions, exports, and sensitive fields.

## Shared application shell

The application shell is mandatory for all authenticated pages:

- Official ORVEX Fundación DR logo and mission line
- Collapsible left navigation
- Page title and sequential page ID
- Four-language selector (`ES`, `EN`, `HT`, `FR`)
- Notification center
- Signed-in user and role
- Breadcrumbs where appropriate
- Global search where appropriate
- Contextual help and support
- Audit-aware action menus

## Approved primary screens

### FD-0001 — Executive Dashboard

**Route:** `/dashboard`

Purpose: executive overview of foundation activity.

Required content:

- Active families
- People served
- Deliveries today
- Active volunteers
- Active benefit cards
- Partner merchants
- Assistance by program
- Deliveries by region
- Annual budget status
- Alerts and notifications
- Quick actions
- Date and region filters

### FD-0100 — Family Management

**Route:** `/families`

Purpose: search, filter, review, register, and manage families.

Required content:

- Family search
- Region/community filters
- Active, evaluating, suspended, and inactive summary cards
- Family table
- Household head
- Community
- Members
- Monthly income
- Poverty or priority score
- Status
- View/edit/action controls
- New-family workflow
- Export subject to permission

### FD-0110 — Family Profile

**Route:** `/families/[familyId]`

Purpose: complete case-management workspace for one family.

Required tabs:

- General summary
- Members
- Income
- Food assistance
- Health
- Education
- Housing
- Benefit card
- Assistance history
- Scheduled deliveries
- Documents
- Case notes
- Map/GPS

Required summary content:

- Family identity and status
- Members
- Income
- Poverty risk
- Priority score
- Assigned social worker
- Active programs
- Recent and upcoming deliveries

### FD-0200 — Delivery Management

**Route:** `/deliveries`

Purpose: plan and administer assistance deliveries.

Required content:

- Scheduled, in-route, completed, and canceled tabs
- Delivery totals
- Date, region, community, and delivery-type filters
- Delivery table
- Route or map view
- Program distribution summary
- Create-delivery workflow
- Driver, vehicle, warehouse, and proof-of-delivery links

### FD-0300 — Food Assistance

**Route:** `/food-assistance`

Purpose: manage food programs, inventory allocation, kits, and beneficiaries.

Required content:

- Active programs
- Program eligibility and enrollment
- Monthly assistance
- Critical inventory
- Food-kit definitions
- Distribution by program
- School and special-nutrition support
- Create-program workflow

### FD-0400 — Health Services

**Route:** `/health`

Purpose: manage medical cases, patient referrals, clinics, medications, and medical events.

Required content:

- Health cases
- Patients
- Medical days/events
- Health centers
- Status and priority filters
- Restricted access to medical information
- New-case workflow
- Audit logging for every sensitive-record view

### FD-0500 — Education Services

**Route:** `/education`

Purpose: manage students, schools, scholarships, supplies, and educational support.

Required content:

- Active students
- Scholarships awarded
- Partner schools
- Supplies delivered
- Student search and filters
- Program and status fields
- New-student workflow
- Child-data privacy controls

### FD-0600 — Housing Assistance

**Route:** `/housing`

Purpose: assess and manage housing needs, repairs, projects, and approvals.

Required content:

- Housing assessments
- Repair needs
- Active projects
- Inspection history
- Photos and documents
- Approval workflow
- Contractor/vendor linkage
- Location and GPS

### FD-0700 — Benefit Card Management

**Route:** `/benefit-cards`

Purpose: issue, monitor, renew, block, and administer family benefit cards.

This screen must follow the approved standalone benefit-card page layout.

Required content:

- Active cards
- Cards expiring within 30 days
- Temporarily blocked cards
- Successful transaction percentage
- Tabs: all, active, expiring, blocked, inactive
- Search by card number, family, or cardholder
- Filters
- Issue-card action
- Export subject to permission
- Card number
- Cardholder
- Family ID
- Program
- Available balance
- Status
- Expiration date
- Row actions
- Authorized-merchant rule
- Alcohol-purchase prohibition
- Automatic monthly reloads
- Real-time notifications
- Pagination

### FD-0710 — Benefit Card Detail

**Route:** `/benefit-cards/[cardId]`

Purpose: inspect and administer one benefit card.

Required content:

- Card status and masked number
- Beneficiary and family
- Program and restrictions
- Current balance
- Reload schedule
- Transaction history
- Merchant category controls
- Block/unblock/replace/renew actions
- Alerts and dispute history
- Complete audit timeline

### FD-0800 — Merchant Network

**Route:** `/merchants`

Purpose: administer authorized merchants and program rules.

Required content:

- Active, pending, reviewing, and suspended merchants
- Merchant search and filters
- Merchant type and location
- Approval status
- Pricing and promotion data
- Restricted-category enforcement
- New-merchant workflow

### FD-0900 — Warehouse Management

**Route:** `/warehouses`

Purpose: manage warehouses, inventory, stock alerts, kits, and movements.

Required content:

- Warehouse list
- Capacity and status
- Inventory value
- Critical stock
- Products and lot/expiration tracking
- Transfers and adjustments
- Cycle counts
- New-warehouse workflow

### FD-1000 — Fleet Management

**Route:** `/fleet`

Purpose: manage vehicles, drivers, assignments, maintenance, and delivery readiness.

Required content:

- Vehicle status
- Driver assignment
- Maintenance due
- Fuel/energy status where applicable
- Insurance and registration
- Delivery assignment history
- GPS/route integration

### FD-1100 — Volunteer Management

**Route:** `/volunteers`

Purpose: register, vet, assign, schedule, and evaluate volunteers.

Required content:

- Active volunteers
- New volunteers
- Activities
- Hours donated
- Skills and availability
- Community and assignment
- Background-check status where permitted
- New-volunteer workflow

### FD-1200 — Employee Management

**Route:** `/employees`

Purpose: administer employees, roles, regions, training, and assignments.

Required content:

- Employee directory
- Role and region
- Employment status
- Training and certifications
- Assigned assets and vehicle
- Permission profile
- Sensitive HR access controls

### FD-1300 — Reports and Analytics

**Route:** `/reports`

Purpose: generate operational, program, compliance, and executive reports.

Required content:

- Report categories
- Parameter controls
- Preview
- Charts and summaries
- Export with authorization and audit event
- Saved report definitions
- Scheduled reports

### FD-1400 — Administration and Configuration

**Route:** `/settings`

Purpose: configure organization, users, roles, permissions, regions, communities, notifications, integrations, and security.

Required sections:

- Foundation information
- System parameters
- Users
- Roles
- Permissions
- Regions and communities
- Categories and catalogs
- Notifications
- Integrations
- Security
- Audit review
- Localization administration

## Secondary screens required by the approved designs

Each item below must also be a separate route/view, never embedded as a second complete screen on another page:

- Login and MFA
- Password recovery
- Global search results
- Notification center
- User profile and preferences
- Family registration wizard
- Delivery creation wizard
- Benefit-card issue/renew/replace workflow
- Merchant registration and approval
- Medical case creation
- Education enrollment
- Housing assessment
- Volunteer registration
- Employee onboarding
- Warehouse inventory detail
- Vehicle detail and maintenance
- Report builder and report preview
- Audit-log explorer
- Access-denied, not-found, error, empty, and offline states

## Page numbering rules

- Keep the `FD-XXXX` sequence stable after release.
- Do not reuse retired page IDs.
- Child/detail screens should use the parent module range.
- Display the page ID in the header and include it in support/error reports.

## Localization acceptance criteria

For every screen:

- All four languages must render without missing keys.
- Layout must accommodate longer French and Haitian Creole text.
- Dates, numbers, currency, and pluralization must be locale-aware.
- Dominican peso values use `DOP`/`RD$` according to locale and report rules.
- User-selected language must persist securely as a preference.
- Printable and exported reports must support the selected language.

## Implementation order

1. Shared application shell and localization framework
2. Authentication, MFA, RBAC, and audit framework
3. Executive Dashboard
4. Family Management and Family Profile
5. Delivery Management
6. Food Assistance
7. Benefit Card Management and Detail
8. Merchant Network
9. Warehouse and Fleet Management
10. Health, Education, and Housing
11. Volunteer and Employee Management
12. Reports, Analytics, and Administration

Codex must use this registry when creating routes, navigation, localization namespaces, permissions, tests, and implementation backlog items.
