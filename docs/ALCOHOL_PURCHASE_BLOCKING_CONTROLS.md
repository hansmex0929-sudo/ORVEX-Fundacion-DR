# Alcohol Purchase Blocking Controls

## Purpose

ORVEX Fundación benefit cards must deny card authorization attempts associated with alcohol merchants when the participating issuing bank or card processor supports real-time merchant-category controls.

## Core rule

For every active ORVEX family benefit card, the default policy is:

- Alcohol merchant category: BLOCK
- Liquor store merchant category: BLOCK
- Bar/nightclub merchant categories: BLOCK where supported
- Cash withdrawal: separately configurable and disabled by default for restricted-benefit programs

The rule must be enforced by the bank, issuer processor, or card-control platform during authorization. ORVEX itself does not sit in the card network authorization path unless a contracted issuer integration explicitly places it there.

## Important limitation

Merchant-category blocking operates primarily from the merchant category code (MCC) or card-network merchant category group. It can reliably block a transaction at a liquor store or alcohol-classified merchant. It generally cannot identify a single bottle of alcohol inside a mixed basket at a supermarket, general store, restaurant, or delivery platform unless the bank, merchant, processor, or closed-loop program supplies item-level purchase data and supports product-level restrictions.

Therefore the interface must state:

- `Merchant-category alcohol block active` when issuer confirmation is present.
- `Item-level alcohol blocking unavailable` when only MCC-level controls exist.
- `Not enforced by bank` when the selected bank/card program lacks the required control.

No screen may claim guaranteed item-level alcohol prevention unless a tested contractual integration supports it.

## Rules engine

Create a versioned `CardSpendingPolicy` with:

- policy ID and version
- program and funding-source scope
- issuer/bank connector
- effective dates
- alcohol block enabled
- blocked merchant category groups
- blocked MCC list/ranges
- cash withdrawal rule
- gambling, tobacco, adult entertainment, and other configurable categories
- country and channel restrictions
- daily/monthly transaction limits
- creator, approver, approval time, deployment status, and issuer confirmation reference

Policies may be applied to:

- all cards in a program
- one funding batch
- one household
- one family member
- one card token

The most restrictive approved policy wins unless a formally authorized exception exists.

## Authorization and event handling

When the issuer reports a denied authorization:

1. Import the authorization event through webhook, API, or statement/event file.
2. Match it to the tokenized family card.
3. Store masked card reference, family/member, merchant name, MCC/category, amount, currency, date/time, bank, processor response code, and denial reason.
4. Display `Denied — restricted alcohol merchant` when the issuer reason supports that conclusion.
5. Notify authorized staff and optionally the beneficiary according to communication policy.
6. Append an immutable audit event.

Do not store full PAN, CVV, PIN, track data, OTP, online-banking credentials, or unmasked account credentials.

## Required screens

### BFC-227 Spending Policy Directory
Lists policy versions, programs, banks, deployment state, and effective dates.

### BFC-228 Spending Policy Editor
Allows authorized users to configure alcohol and other category restrictions, limits, channels, and scope.

### BFC-229 Bank Policy Deployment Status
Shows per-bank/card-program capability, requested rules, issuer confirmation, deployment timestamp, errors, and last verification.

### BFC-230 Declined Restricted-Purchase Events
Shows denied authorizations with family/member, masked card, bank, merchant, MCC/category, amount, date/time, and reason.

### BFC-231 Spending-Control Exceptions
Supports temporary or permanent exceptions with justification, maker/checker approval, start/end dates, and audit history. Alcohol exceptions should be disabled by default and require executive/compliance authority if the charity permits them at all.

### BFC-232 Card-Control Capability Matrix
Shows whether each bank supports merchant-category blocks, MCC blocks, item-level controls, cash controls, real-time alerts, webhooks, and policy confirmation.

## Payment and card screens

The family payment screen and card-assignment screen must show:

- selected bank
- selected tokenized card/account destination
- spending policy name/version
- alcohol restriction status
- issuer deployment status
- last policy verification time
- warning when the bank cannot enforce the rule

A card cannot be marked `Restricted Program Ready` until the bank confirms deployment of the required spending policy.

## Controls

- Server-side RBAC and field-level privacy
- Maker/checker approval for policy creation and changes
- Submitted policies are immutable; changes create a new version
- Idempotent deployment requests and replay protection
- Daily reconciliation between ORVEX policy state and issuer policy state
- Automatic alert for policy drift, failed deployment, or stale confirmation
- Synthetic data only during development

## Testing

Test at minimum:

1. Liquor-store MCC authorization is declined.
2. Bar/nightclub MCC authorization is declined where configured.
3. Grocery transaction is not falsely claimed as item-level alcohol controlled.
4. Bank without category controls displays a blocking capability warning and cannot be marked ready.
5. Policy deployment failure prevents card activation for the restricted program.
6. Decline event is matched to the correct family member using token/reference only.
7. Policy changes preserve prior version and complete audit history.
