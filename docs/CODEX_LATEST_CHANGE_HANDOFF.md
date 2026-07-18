# ORVEX Fundación DR — Codex Latest Change Handoff

This document consolidates the latest approved requirements that Codex must incorporate into the ORVEX Fundación DR application.

## Required reading order

1. `CODEX.md`
2. All files under `/docs`
3. GitHub Issues #1, #2, #4, and #6
4. This handoff document last, because it consolidates the most recent changes.

## Latest approved requirements

### Banking and treasury
- Provide a connector framework for six major Dominican banking institutions using simulated adapters until formal bank agreements and production credentials exist.
- Support read-only balance, transaction, statement, and reconciliation imports first.
- Support bank-specific submission grouping, item-level status, exceptions, corrections, reversals, and reconciliation.
- Never store full PAN, CVV, PIN, track data, online-banking passwords, OTP codes, or unencrypted bank credentials.

### Family and member payment routing
- Allow one equal amount to be issued to all selected eligible beneficiaries in one batch.
- Allow individual payment amounts by beneficiary.
- Allow hybrid batches with a standard amount plus per-beneficiary increases, decreases, holds, or exclusions.
- Allow rule-based amounts based on household size, risk tier, approved assistance, imported amounts, or authorized manual amounts.
- Each family member may have a different participating bank and a different approved debit card or bank destination.
- The payment screen must include a bank pull-down filtered to approved institutions for the selected family member.
- Selecting a bank must filter the destination pull-down to eligible cards/accounts for that member and institution.
- A household may route payments to multiple members and multiple banks in the same parent batch.
- The sum of member payments may not exceed the household award unless a separate authorized approval exists.
- Preserve original and final amount, override reason, actor, timestamp, and approval history.

### Payment controls
- Use maker/checker approval. The batch creator may not final-approve the same batch.
- Recalculate exact totals server-side before approval and submission.
- Submitted batches are immutable.
- Use idempotency and replay protection.
- Block duplicate benefits by household, program, purpose, and benefit period unless an authorized exception is documented.
- Preserve successfully posted items when other items fail; isolate exceptions rather than rolling back valid payments.

### Benefit-card spending controls
- Support issuer/processor-side alcohol merchant-category blocking where the bank/card processor provides this capability.
- Deny transactions at liquor stores and alcohol-classified merchants.
- Support bars/nightclubs where merchant-category controls are available and approved by policy.
- Clearly distinguish merchant-category blocking from item-level basket controls.
- Do not claim that alcohol inside a mixed supermarket basket can be blocked unless the participating merchant and processor provide item-level product data.
- Track restricted-purchase declines, bank enforcement status, exceptions, and audit history.

### Merchant partnership network
- Maintain participating merchant, chain, store, location, municipality, contract, discount, settlement, integration, and performance records.
- Support major supermarkets, independent supermarkets, approved colmados, pharmacies, agricultural cooperatives, and approved community outlets.
- Support merchant adapters for catalog, prices, promotions, inventory, redemptions, and store locations.
- Use synthetic adapters until agreements exist.

### Price intelligence
- Maintain a normalized product catalog with brand, package size, unit, category, and comparable unit price.
- Compare products across merchants by unit price.
- Compute cheapest item, cheapest household basket, nearest practical option, negotiated ORVEX discount, delivery cost, and transportation-aware total cost.
- Separate objective ranking from sponsored placement.
- A merchant may not be represented as cheapest unless verified calculations support that claim.

### Advertising and beneficiary notifications
- Allow approved participating merchants to submit promotions and sponsored offers.
- Require human review, effective dates, geographic scope, benefit-card eligibility, prohibited-category screening, and withdrawal/expiration controls.
- Show clearly labeled sponsored content separately from objective cheapest-price recommendations.
- Provide beneficiary deal feeds and consent-based SMS, WhatsApp, email, in-app, and printable bulletin communications.
- Support Spanish-first content with full English translation.
- Enforce consent, quiet hours, frequency caps, opt-out, and suppression lists.
- Do not share sensitive beneficiary, household, medical, education, case, income, risk-score, or benefit-balance data with merchants.

## Required screen groups

- Existing core screens from Issue #2.
- Banking screens `BNK-200` through `BNK-207`.
- Family benefit-card/payment screens `BFC-210` through `BFC-232`.
- Merchant partnership screens `MRC-240` through `MRC-245`.
- Price intelligence screens `PRC-250` through `PRC-254`.
- Advertising and notification screens `ADV-260` through `ADV-268`.

## Implementation sequence

1. Complete security, audit, identity, household, and core database foundations.
2. Complete the reusable bilingual application shell and route registry.
3. Implement banking/card domain models and simulated adapters.
4. Implement equal, individual, hybrid, and per-member bank-routing payment workflows.
5. Implement spending-policy controls and restricted-purchase event tracking.
6. Implement merchant partnership, pricing intelligence, promotions, and notification modules.
7. Add tests, synthetic fixtures, error states, privacy controls, and audit coverage.

## Delivery rules

- Work on reviewable feature branches.
- Use synthetic data only.
- Do not commit secrets or real beneficiary data.
- Run lint, typecheck, automated tests, and production build.
- Open pull requests and do not merge without review.
