# ORVEX Fundación DR — UI Design System

## Purpose

This document defines the shared visual language and interaction rules for every ORVEX Fundación screen. Codex must use these rules consistently unless a later approved design decision replaces them.

## Product character

- Professional, compassionate, trustworthy, and operationally efficient.
- Designed for office staff, field workers, warehouse staff, executives, volunteers, medical staff, education staff, and administrators.
- Optimized for Spanish-first use in the Dominican Republic, with complete English support.
- Must work well on desktop, laptop, tablet, and mobile.
- Avoid aviation imagery or aviation terminology.

## Brand direction

- Primary visual identity: deep red, charcoal, white, and restrained warm neutrals.
- Use red for brand emphasis and important primary actions, not for every interface element.
- Use green for completed/approved/safe states, amber for warnings, and red for urgent or blocked states.
- Maintain strong color contrast and WCAG-compliant accessibility.
- Do not hard-code scattered colors. Use centralized design tokens.

## Application shell

Every authenticated screen should use the same shell:

1. Collapsible left navigation.
2. Top header with:
   - page title,
   - global search,
   - notifications,
   - language switcher,
   - current operating location,
   - user profile and sign-out.
3. Breadcrumbs beneath the header where useful.
4. Main content area with responsive width.
5. Optional right-side contextual panel for activity, help, or AI recommendations.

## Navigation behavior

- Modules are grouped by operational area.
- Navigation must be permission-aware.
- Hidden modules must not be discoverable by unauthorized users.
- Favorites and recent pages may be added later.
- Mobile navigation uses a drawer.

## Standard page patterns

### Dashboard

- KPI cards at the top.
- Trend or distribution charts below.
- Action queues and alerts next.
- Recent activity and upcoming work last.
- Every metric must have a drill-down destination.

### Record list

- Title, short explanation, and primary action.
- Search, filters, saved views, export, and column controls.
- Sortable table with pagination.
- Bulk actions only when authorized.
- Clear empty, loading, error, and permission-denied states.

### Record detail

- Summary header with identity, status, ownership, and important alerts.
- Tabbed sections.
- Timeline/activity feed.
- Documents and related records.
- Actions must be permission-aware and audited.

### Create/edit form

- Use sections or a stepper for long forms.
- Preserve drafts.
- Validate inline and server-side.
- Warn before leaving with unsaved changes.
- Show duplicate-search results before creating a person, family, household, organization, or address.

### Approval queue

- Filters by priority, location, amount, type, and age.
- Side-by-side request summary and supporting evidence.
- Approve, reject, return for correction, escalate, or request information.
- Require reason text for rejection, override, and escalation.

## Shared components

Codex should create reusable components for:

- App shell and navigation
- Page header
- KPI cards
- Status badges
- Data tables
- Filter bars
- Saved views
- Empty states
- Alert banners
- Record summary cards
- Timeline/activity feed
- Document list and uploader
- Approval panel
- Address and GPS editor
- Household-member selector
- Duplicate-match review panel
- Risk score display with explanation
- Inventory quantity and expiration indicators
- Delivery proof panel
- Audit history viewer
- Language switcher
- Permission guard

## Status language

Use consistent status vocabularies. Examples:

- Draft
- Submitted
- Under Review
- Approved
- Rejected
- Returned for Correction
- Scheduled
- In Progress
- Completed
- Cancelled
- Suspended
- Closed

Spanish translations must be maintained centrally, not embedded independently in components.

## Accessibility

- Full keyboard navigation.
- Visible focus states.
- Semantic headings and form labels.
- Screen-reader-friendly validation and status updates.
- Do not rely on color alone.
- Touch targets suitable for tablets and phones.

## Privacy behavior

- Sensitive medical, child, safeguarding, identity, and financial fields must support masking.
- Hide or redact fields based on permissions.
- Prevent sensitive details from appearing in generic notifications.
- Display a privacy indicator when a record contains restricted information.
- All views and exports of sensitive records must be auditable.

## Responsive behavior

- Desktop: full navigation, multi-column layouts, advanced tables.
- Tablet: collapsible navigation, reduced columns, sticky actions.
- Mobile: card-based lists, one-column forms, bottom or sticky primary action.
- Field workflows must remain usable with unreliable connectivity; offline support can be added incrementally.

## Initial technical direction

- Next.js App Router
- TypeScript
- Tailwind CSS or an equivalent token-driven utility system
- Accessible component primitives
- Server-side authorization for every protected route and action
- Shared design tokens and centralized translations

## Non-goals for initial screen work

- No real beneficiary data.
- No production payment processing.
- No advanced AI decisions.
- No full medical record implementation.
- No copying proprietary layouts from other products.
