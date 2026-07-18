# ORVEX Fundación DR — Per-Member Bank Routing and Payment Screen

## Purpose

Each family may contain multiple eligible members, and each member may receive assistance through a different participating bank or benefit/debit card. The payment workflow must therefore route each payment item to the correct bank and card/account reference for the selected recipient.

## Core Rules

1. A family can have one or more eligible payment recipients.
2. Each family member can have zero, one, or multiple approved payment destinations.
3. A payment destination belongs to exactly one financial institution connector.
4. Debit or benefit cards must be associated with their issuing bank.
5. The payment screen must provide a bank pull-down menu for each selected family member.
6. After a bank is selected, the destination pull-down must show only approved destinations associated with that member and bank.
7. The system must never store full PAN, CVV, PIN, magnetic-stripe data, online-banking passwords, or OTP values.
8. Store only bank-issued token/reference, masked display value, last four digits when allowed, destination type, issuer bank, status, and consent/verification metadata.
9. A destination cannot be used for payment if expired, blocked, closed, unverified, suspended, or not owned/authorized by the selected member.
10. Every routing change must be audited.

## Required Data Model

### FinancialInstitution
- id
- connectorCode
- legalName
- displayName
- countryCode
- status
- supportedCurrencies
- supportedPaymentRails

### MemberPaymentDestination
- id
- personId
- householdId
- financialInstitutionId
- destinationType: BENEFIT_CARD, DEBIT_CARD_TOKEN, BANK_ACCOUNT_TOKEN, MOBILE_WALLET_TOKEN, CASH_PICKUP_REFERENCE
- providerTokenOrReferenceEncrypted
- maskedDisplay
- lastFour nullable
- accountHolderDisplayName
- currency
- isDefaultForMember
- isDefaultForHousehold
- verificationStatus
- lifecycleStatus
- effectiveFrom
- effectiveTo nullable
- consentRecordId
- createdBy
- createdAt
- updatedAt

### PaymentRoutingSelection
- id
- batchItemId
- personId
- financialInstitutionId
- memberPaymentDestinationId
- routingSource: DEFAULT, USER_SELECTED, RULE_SELECTED, IMPORTED, OVERRIDE
- originalDestinationId nullable
- overrideReason nullable
- selectedBy
- selectedAt

## Payment Screen Requirements

For every selected family member, show a row with:

- Family ID and household name
- Recipient member name
- Relationship to household
- Eligibility status
- Approved amount
- Editable final amount, subject to permission
- Bank pull-down menu
- Payment destination pull-down filtered by selected bank
- Masked card/account display
- Destination status
- Default destination indicator
- Validation status
- Hold/exclude control
- Override reason when bank, destination, or amount differs from default

## Pull-Down Behavior

### Bank Pull-Down

Display only institutions that:

- are active in ORVEX,
- support the payment currency and rail,
- have an active connector or approved manual-file process,
- and have at least one eligible destination for that member.

The pull-down may also show `No eligible destination` as a non-selectable warning state.

### Destination Pull-Down

After bank selection, show only that member's eligible destinations for the chosen bank. Each option should display:

- destination type,
- masked number/reference,
- default marker,
- verification status,
- expiration/status warning when applicable.

## Automatic Routing

When a batch is created, the system should preselect:

1. the member's active default destination for that program and currency;
2. otherwise the member's active default destination;
3. otherwise the household's approved default destination when policy permits;
4. otherwise leave the item unresolved and block submission until corrected.

## Family-Level and Member-Level Payments

- A family-level award may be paid to one designated household recipient.
- A program may split a family award among multiple members.
- Each split item must have its own amount, bank, destination, status, and audit history.
- The system must prevent the combined member allocations from exceeding the approved family award unless an authorized amendment exists.

## Bulk Operations

Authorized users may:

- assign one bank to all selected members who have an eligible destination at that bank;
- assign each member's default bank automatically;
- filter the payment grid by bank;
- group the final batch into bank-specific submission files/API calls;
- bulk-hold all unresolved or invalid destinations;
- bulk-switch to another eligible destination for the same bank, with a recorded reason.

Bulk assignment must never silently assign a bank or destination that is not linked and verified for the member.

## Validation Rules

Before approval and submission, validate:

- person is eligible and active;
- household and program eligibility remain valid;
- selected bank is supported;
- destination belongs to selected person or is an authorized household destination;
- card/account token belongs to selected bank;
- destination is verified and active;
- currency and payment rail are compatible;
- amount is within approved limits;
- no duplicate payment exists for the same program, purpose, and benefit period;
- no member or destination is duplicated unintentionally within the batch;
- total member allocations do not exceed the family award.

## Submission Routing

The system must split one approved ORVEX batch into bank-specific sub-batches while preserving the parent batch ID.

Example:

- Parent batch ORVEX-2026-00041
- Banreservas sub-batch 00041-BRV
- Banco Popular sub-batch 00041-BPD
- BHD sub-batch 00041-BHD

Each sub-batch must track independent submission, acknowledgement, posting, rejection, return, reversal, and reconciliation status.

## Required Screen Changes

### BFC-213 Member Payment Destination Profile
New screen for managing one member's approved bank/card/account destinations.

### BFC-216 Beneficiary Amount and Bank Routing Editor
Enhance the existing amount editor with per-row bank and destination pull-downs, defaults, validation, bulk bank assignment, bank filters, and unresolved-routing warnings.

### BFC-217 Batch Validation and Duplicate Check
Add routing validation by member, bank, destination, currency, and rail.

### BFC-219 Submission and Bank Status
Group items by bank and show parent batch plus bank-specific sub-batches.

### BFC-220 Deposit Exceptions and Corrections
Permit correction to another verified destination for the same member, with reapproval when required.

### BFC-222 Family Benefit Statement
Show which member received each payment, the issuing bank, masked destination, amount, and status.

## Security and Privacy

- Field-level access control for bank and card metadata.
- Masked destination values in all ordinary screens and exports.
- Bank tokens/references encrypted at rest.
- Sensitive values excluded from logs, analytics payloads, support screenshots, and error messages.
- Maker/checker approval for destination changes and payment submission.
- Step-up authentication for high-risk routing changes.
- Append-only history for destination creation, verification, default changes, routing selection, overrides, and submission.

## Acceptance Tests

1. Two members in one family can be paid through two different banks in the same parent batch.
2. The bank pull-down shows only banks with eligible destinations for that member.
3. Selecting a bank filters the destination list correctly.
4. A destination token linked to Bank A cannot be submitted through Bank B.
5. A blocked or expired card cannot be selected.
6. A family-level award split among members cannot exceed the approved total.
7. Equal-payment bulk creation can still route each recipient to a different bank automatically.
8. Bank-specific sub-batches reconcile independently while rolling up to the parent batch.
9. Changing a bank or destination records original value, new value, user, reason, and timestamp.
10. No test or screen exposes a full debit-card number or prohibited authentication data.
