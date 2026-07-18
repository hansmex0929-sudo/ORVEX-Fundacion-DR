# ORVEX Fundación DR — Bulk Disbursement and Banking Screen Specifications

## Bulk disbursement modes

The family benefit funding module must support both of the following in the same batch:

1. **Equal amount to all selected beneficiaries**
   - User selects an eligible population by program, municipality, project, case status, household risk level, card status, or saved beneficiary group.
   - User enters one standard amount.
   - System previews total beneficiaries, exclusions, duplicates, total funding required, currency, and funding source.
   - The same amount is assigned to every eligible selected family.

2. **Individual amount by beneficiary**
   - User can create a batch where each family has a separate amount.
   - User may type amounts individually, import them from a controlled spreadsheet, or apply a rule and then override selected rows.
   - Each override must retain the original calculated amount, final approved amount, reason, user, and timestamp.

3. **Hybrid batch**
   - Begin with one standard amount for all selected beneficiaries.
   - Permit authorized users to increase, decrease, hold, or exclude individual households before submission.
   - Require an override reason and, above configured limits, an additional approval.

## Required safeguards

- Eligibility must be evaluated at batch creation and revalidated immediately before submission.
- Prevent duplicate payment for the same household, benefit period, program, and purpose unless an approved exception exists.
- Exclude inactive, suspended, deceased, closed, duplicate, unverified, or card-ineligible beneficiaries according to policy.
- Flag households with missing bank/card mapping.
- Show the exact total amount before approval.
- The batch creator cannot be the final approver.
- Once submitted, amounts cannot be edited; corrections require cancellation before processing or a reversal/adjustment batch afterward.
- Every amount, override, exclusion, approval, export, submission, status update, and reconciliation event must be audited.
- Support DOP and other configured currencies, but never mix currencies inside one batch.

## Selection and calculation tools

Filters:

- project/program
- province, municipality, district, community
- family/household status
- poverty and hunger risk tier
- assistance category
- previous payment date
- payment frequency
- card issuer and card status
- case owner
- age, disability, household composition, or other approved program criteria

Calculation methods:

- fixed equal amount
- amount by household size
- amount by eligibility/risk tier
- amount by approved assistance award
- percentage or top-up to a target balance
- imported approved amount
- manual amount

Any formula-based amount must be explainable and stored with its calculation inputs and rule version.

## Batch workflow

Draft → Validation → Review → Approval 1 → Approval 2 when required → Ready to Submit → Submitted → Bank Accepted → Processing → Posted / Partially Posted / Rejected / Returned / Reversed → Reconciled → Closed

Partial success is required. A batch of 1,000 families may have 990 posted and 10 exceptions without losing the successful records.

## Screen specifications for latest banking/card project

### BNK-200 Banking Command Center
- balances by institution and currency
- connector health
- deposits submitted, posted, rejected, and returned
- unresolved reconciliation exceptions
- recent bank imports
- security or connection alerts

### BNK-201 Financial Institutions and Connectors
- six initial DR institutions
- adapter type, connection method, environment, status, owner, last sync
- add/edit/disable connector shell

### BNK-202 Connector Setup and Health
- credential reference fields only, never raw secret display
- endpoint and environment configuration
- connection test
- last successful sync, latency, errors, retry queue, kill switch

### BNK-203 Bank Accounts and Balances
- mapped charity accounts
- masked account references
- ledger/available balance
- currency, institution, purpose, funding restrictions
- daily history

### BNK-204 Imported Bank Transactions
- normalized transaction list
- institution, account, date, amount, direction, description, status
- match status and source batch

### BNK-205 Statements and Import Batches
- API, SFTP, ISO 20022, CSV/XLSX, manual sources
- imported, validated, rejected, duplicate, and archived counts

### BNK-206 Reconciliation Workspace
- approved funding versus bank posting versus card activity
- matched, partially matched, unmatched, duplicate, and balance differences

### BNK-207 Banking Exception Queue
- connector failures
- rejected and returned payments
- orphan transactions
- missing mappings
- stale pending items

### BFC-210 Family Benefit-Card Dashboard
- active cards and cardholders
- balances where available
- upcoming and recent funding
- posted spending and withdrawals
- suspended, lost, replaced, and expired cards

### BFC-211 Card Directory
- family, designated cardholder, issuer, product, masked last four, token status, activation status
- filters and duplicate/reference warnings

### BFC-212 Card Profile and Household Association
- household and cardholder
- institution token/PAR/processor reference
- issuance and replacement history
- funding and transaction summaries
- access-controlled merchant activity

### BFC-213 Card Issuance and Replacement Workflow
- request, verification, bank submission/export, delivery, activation, replacement, closure

### BFC-214 Funding Batch Directory
- draft through closed batches
- batch totals, selected family count, standard amount, overrides, exclusions, funding source, bank, status

### BFC-215 Create Funding Batch
- choose equal, individual, or hybrid mode
- define eligibility population
- select standard amount or formula
- choose period, purpose, program, bank, currency, and funding source
- preview total

### BFC-216 Beneficiary Amount Editor
- spreadsheet-like controlled grid
- family, eligibility status, card status, standard/calculated amount, final amount, override reason, hold/exclude
- bulk edit, validated import, and export preview

### BFC-217 Batch Validation and Duplicate Check
- missing card mappings
- duplicate period/program payments
- inactive or suspended cards
- ineligible or closed families
- total and funding availability validation

### BFC-218 Deposit Approval Queue
- batch summary and amount distribution
- exception and override review
- maker/checker separation
- approve, reject, or return for correction

### BFC-219 Submission and Bank Status
- generated file/API request reference
- submission attempts
- bank acceptance and item-level results
- partial success handling

### BFC-220 Deposit Exceptions and Corrections
- rejected, returned, reversed, held, missing mapping
- repair mapping, resubmit eligible items, create adjustment batch

### BFC-221 Card Transaction Ledger
- pending and settled activity
- authorization/settlement matching
- refunds, reversals, declines, ATM/POS/e-commerce classifications

### BFC-222 Family Benefit Statement
- starting balance where available
- deposits
- spending/withdrawals
- refunds/reversals
- ending balance
- date range and program filters

### BFC-223 Spending Analysis
- totals by family, program, merchant category, geography, issuer, and period
- privacy-limited views by role

### BFC-224 Card Controls and Limits
- bank-supported configurable controls
- spending, ATM, online, geographic, and merchant-category limits
- activation/suspension/lost-stolen actions as integration placeholders until contracted

### BFC-225 Disputes, Refunds, and Reversals
- dispute intake
- bank case reference
- evidence and status
- refund/reversal posting

### BFC-226 Privacy and Access Audit
- who viewed sensitive transaction details
- reason/purpose
- export and print history
- unauthorized attempts

## UI requirements

- Spanish-first and fully translated English
- desktop, tablet, and mobile responsive layouts
- synthetic data only
- clear labels for simulated or contract-dependent features
- masked card/account values only
- role-based field visibility
- loading, empty, error, unauthorized, and partial-success states
- reusable table, wizard, approval, exception, reconciliation, and statement components
