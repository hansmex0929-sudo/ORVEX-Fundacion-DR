# ORVEX Fundación DR — Banking and Family Benefit Card Integration

## Purpose

Create a bank-agnostic integration layer for Dominican Republic financial institutions and a secure family benefit-card ledger that records funds deposited for each household and tracks card activity returned by participating banks or card processors.

## Initial Dominican Republic connector targets

The first connector adapters should be prepared for:

1. Banco de Reservas (Banreservas)
2. Banco Popular Dominicano
3. Banco BHD
4. Banco Múltiple Santa Cruz
5. Asociación Popular de Ahorros y Préstamos (APAP)
6. Scotiabank República Dominicana

This list is an initial market-coverage target, not a claim that every institution currently exposes a public production API. Each adapter must support multiple transport methods because production access will depend on the institution and contract:

- REST or SOAP API
- OAuth2, mutual TLS, signed requests, or institution-specific authentication
- SFTP statement and transaction files
- ISO 20022 messages where available
- CSV/XLSX import fallback
- Secure webhook/callback ingestion
- Manual reconciliation fallback

## Architecture

Use a common `BankConnector` interface so institution-specific code is isolated.

Required capabilities:

- institution metadata and connection health
- account discovery and account mapping
- balance retrieval
- transaction retrieval with cursor-based incremental sync
- statement ingestion
- payment/deposit instruction preparation
- payment-status retrieval
- beneficiary/card enrollment status
- card transaction retrieval when contractually available
- webhook signature verification
- idempotency and replay protection
- retry queues and dead-letter handling
- normalized error codes
- immutable raw payload archive with strict retention controls

No connector may place bank credentials in source code or application logs.

## Family benefit-card model

A payment card must be associated with a person and household through a safe institution-issued reference.

Store:

- internal card record UUID
- household ID
- designated cardholder person ID
- issuing institution ID
- bank program ID
- bank customer/account/card token or external reference
- Payment Account Reference when supplied
- card network
- product type: debit, prepaid, benefit, virtual
- masked display value, normally last four digits only
- issuance, activation, suspension, replacement, and expiration status
- consent and program agreement records
- funding limits and permitted-use policy
- effective and termination dates

Do not store in the ordinary ORVEX application database:

- full primary account number (PAN)
- CVV/CVC/CID
- PIN or PIN block
- magnetic-stripe or chip track data
- online-banking password
- one-time codes

Preferred identifier order:

1. Institution-issued immutable card ID or token
2. Payment Account Reference (PAR)
3. Processor-issued token
4. Masked last four digits for display only

If a bank requires full PAN handling, it must remain inside a PCI-compliant bank, processor, or isolated tokenization vault. ORVEX receives only a surrogate token.

## Funding workflow

1. Approved assistance award is created for a household.
2. Finance verifies the household, card status, funding source, amount, and restrictions.
3. A funding batch is created.
4. Separation-of-duties approval is completed.
5. The connector sends or exports the deposit/payment instruction.
6. Bank acknowledgement and final status are imported.
7. ORVEX posts the confirmed amount to the family benefit ledger.
8. Failed or returned deposits enter an exception queue.
9. Every transition is audited.

Statuses:

- Draft
- Pending review
- Approved
- Submitted
- Accepted by bank
- Processing
- Posted
- Rejected
- Returned
- Reversed
- Cancelled

## Card transaction ledger

When transaction data is available from the issuer/processor, normalize:

- institution transaction ID
- authorization and settlement identifiers
- card token/reference
- household and cardholder mapping
- transaction time and posting time
- amount and currency
- transaction type
- merchant name and merchant category code
- merchant city/country when supplied
- ATM/POS/e-commerce/contactless/channel indicator
- approved, declined, reversed, refunded, or disputed status
- available balance after transaction when supplied
- raw source reference and import batch

The application must distinguish pending authorizations from settled transactions and must never double-count an authorization and its later settlement.

## Family ledger views

Required views:

- family funding history
- deposits by program/project/funding source
- current card and replacement history
- purchases and withdrawals
- pending versus settled activity
- refunds and reversals
- remaining program balance
- spending by merchant category
- monthly and date-range summaries
- exception and dispute history
- consent and access history

Sensitive merchant-level activity is visible only to authorized finance/compliance roles. Ordinary case workers should see only the minimum information required for program administration.

## Controls and alerts

Support configurable program rules, subject to bank/processor capability:

- per-transaction, daily, weekly, and monthly limits
- ATM withdrawal allowed/blocked
- domestic/cross-border controls
- e-commerce and contactless controls
- merchant-category allow/deny lists
- geographic controls
- card activation, suspension, lost/stolen, replacement
- unusual velocity or duplicate transaction alerts
- transactions after beneficiary death, case closure, or card suspension
- spending inconsistent with the assistance restriction

AI or rule alerts may recommend review but may not automatically accuse a family of fraud or terminate benefits without human review.

## Reconciliation

Three-way reconciliation:

1. approved assistance/funding batch
2. bank-confirmed deposits
3. card/account transaction and balance activity

Required outputs:

- unposted funding
- rejected/returned deposits
- duplicate bank records
- orphan card transactions
- missing card mappings
- balance discrepancies
- stale cards and dormant balances
- period close report

## Security and privacy

- encryption in transit and at rest
- secrets manager integration
- least-privilege connector service accounts
- MFA for finance administrators
- dual approval for funding batches
- field-level access controls
- immutable audit trail
- data minimization and retention schedules
- consent and purpose limitation
- no real card or beneficiary data in development/test
- synthetic fixtures only
- incident response and connector kill switch

## Screen IDs

- BNK-200 Banking command center
- BNK-201 Financial institutions and connectors
- BNK-202 Connector setup and health
- BNK-203 Bank accounts and balances
- BNK-204 Imported bank transactions
- BNK-205 Statements and import batches
- BNK-206 Reconciliation workspace
- BNK-207 Banking exception queue
- BFC-210 Family benefit-card dashboard
- BFC-211 Card directory
- BFC-212 Card profile and household association
- BFC-213 Card issuance/replacement workflow
- BFC-214 Funding batches
- BFC-215 New family deposit
- BFC-216 Deposit approval queue
- BFC-217 Deposit status and exceptions
- BFC-218 Card transaction ledger
- BFC-219 Card controls and limits
- BFC-220 Spending analysis
- BFC-221 Disputes, reversals, and refunds
- BFC-222 Family benefit statement
- BFC-223 Privacy and access audit

## Delivery phases

### Phase 1

- common connector interface
- simulated adapters for all six institutions
- manual CSV/ISO-style import
- secure token-based card records
- funding batches and approvals
- transaction normalization and reconciliation

### Phase 2

- first contracted bank integration
- automated read-only balances, transactions, and statements
- family card transaction feed
- alerts and exception workflows

### Phase 3

- controlled payment initiation or card funding
- bank-supported card controls
- production monitoring, disaster recovery, and formal security/compliance validation
