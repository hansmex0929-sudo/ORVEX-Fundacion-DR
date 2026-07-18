# ORVEX Fundación — Merchant Partnerships, Price Intelligence, Promotions, and Beneficiary Alerts

## Purpose
Create an approved merchant ecosystem that helps beneficiary families stretch assistance funds through negotiated discounts, transparent price comparisons, and timely multilingual notifications.

## Core Principles
- Participation is voluntary for beneficiaries.
- Merchants may advertise only approved products, prices, and promotions.
- Sponsored placement must be clearly labeled and may not override objective cheapest-price rankings.
- No sensitive beneficiary or household data is shared with merchants.
- Beneficiary communication requires consent and supports opt-out.
- Alcohol, tobacco, gambling, cash-equivalent, and other prohibited categories are excluded from promotions and benefit-card use.
- Prices and availability must have timestamps, effective dates, geographic scope, and source provenance.

## Merchant Partnership Module
Track:
- Merchant organization and chain
- Store locations, GPS, municipalities served, delivery coverage, and accessibility
- Merchant IDs, terminal IDs, settlement references, and approved categories
- Contract, discount schedule, exclusivity terms, volume commitments, and renewal dates
- Integration type: API, webhook, SFTP, EDI, scheduled file, portal entry, or manual upload
- Pricing-feed status, last successful synchronization, and data-quality score
- Eligible and excluded products
- Benefit-card acceptance and bank/processor compatibility
- Complaint, dispute, fraud, and service-performance history
- Average beneficiary savings and purchase volume

Exclusivity agreements must be configurable and legally reviewed. The system must not force exclusive purchasing unless the beneficiary program rules and contract explicitly permit it. Where exclusivity exists, emergency and geographic-access exceptions must be supported.

## Product and Price Catalog
Normalize merchant products into a shared catalog with:
- Product name, brand, size, unit, category, UPC/SKU when available
- Merchant-specific SKU and description
- Regular price, promotional price, member price, and negotiated ORVEX price
- Effective start/end dates
- Store or region applicability
- Stock status and quantity limits
- Tax inclusion status
- Unit-price normalization such as price per kilogram, liter, count, or ounce
- Data source and last verification timestamp

The system must preserve raw merchant data and the normalized interpretation.

## Price Intelligence Engine
Capabilities:
- Compare equivalent products and baskets across approved merchants
- Normalize package sizes and calculate unit prices
- Calculate expected ORVEX discount and final beneficiary price
- Include transportation or delivery costs when estimating total household cost
- Identify cheapest product, cheapest basket, best nearby option, and best delivery option
- Filter by municipality, distance, inventory, dietary needs, accessibility, and benefit-card compatibility
- Detect suspicious price spikes, stale feeds, false discounts, and unavailable advertised products
- Maintain historical price trends and merchant savings performance

Rankings must distinguish:
1. Cheapest verified price
2. Best total basket value
3. Nearest practical option
4. Sponsored promotion
5. Exclusive ORVEX discount

Sponsored results may never be presented as the cheapest unless the verified calculation supports that claim.

## Beneficiary Promotion and Advertising Module
Participating merchants may submit:
- Weekly specials
- ORVEX-exclusive prices
- Bundle offers
- Free-delivery promotions
- Bonus staple-food items
- Location-specific advertisements
- Inventory-clearance offers that remain safe and unexpired

Every promotion requires:
- Merchant authorization
- Product and price validation
- Start/end dates
- Geographic and store scope
- Benefit-card eligibility
- Excluded-category review
- Human approval before publication
- Complete change and approval audit history

## Communication Channels
The system may distribute approved price information through:
- In-app beneficiary feed
- SMS/text message
- WhatsApp Business, subject to approved provider and consent
- Email
- Printed community price bulletin
- Caseworker dashboard
- Optional push notifications in a future mobile app

Messages may include:
- Cheapest nearby staple products
- Estimated basket savings
- Store location, hours, and distance
- Promotion expiration
- Delivery availability
- Card acceptance status
- Low-cost alternatives

Do not expose household risk scores, medical data, case notes, family income, exact benefit balances, or other sensitive information to merchants.

## Notification Preferences and Consent
Store per-person:
- Preferred language
- Preferred channels
- Phone/email verification status
- Quiet hours
- Municipality or travel radius
- Product categories of interest
- Frequency limit
- Consent timestamp and policy version
- Opt-out status and reason

The system must immediately honor opt-outs and maintain suppression lists.

## Required Screens
### MRC-240 Merchant Partnership Dashboard
Active merchants, locations, discounts, feed health, savings, contracts, and issues.

### MRC-241 Merchant Directory
Search and filter merchants by municipality, format, integration, benefit-card acceptance, and status.

### MRC-242 Merchant Profile
Locations, contacts, agreements, integrations, products, performance, complaints, and audit history.

### MRC-243 Merchant Agreement and Discount Editor
Discount rules, eligible categories, volume terms, exclusivity settings, exceptions, dates, and approvals.

### MRC-244 Store and Coverage Map
Stores, delivery zones, poor municipalities, travel distance, and areas without practical access.

### MRC-245 Integration and Feed Monitor
API/file connections, synchronization history, failures, latency, and data-quality alerts.

### PRC-250 Normalized Product Catalog
Cross-merchant product identity, size, category, and equivalence review.

### PRC-251 Merchant Price Feed
Raw and normalized prices, dates, stock, store scope, and provenance.

### PRC-252 Price Comparison Workspace
Product and basket comparison by municipality, distance, delivery, and final ORVEX price.

### PRC-253 Price Anomaly and Verification Queue
Suspicious increases, stale prices, false discounts, stock conflicts, and human verification.

### PRC-254 Household Basket Optimizer
Synthetic or authorized household basket, budget, store combinations, travel cost, and savings.

### ADV-260 Promotion Directory
Draft, approved, scheduled, live, expired, rejected, and withdrawn promotions.

### ADV-261 Promotion Editor
Merchant, products, price, images, message, dates, locations, eligibility, and legal review.

### ADV-262 Promotion Approval Queue
Human review for accuracy, prohibited categories, accessibility, and misleading claims.

### ADV-263 Beneficiary Deals Feed
Objective cheapest-price results and clearly labeled sponsored merchant offers.

### ADV-264 Campaign Audience Builder
Consent-based municipality, language, channel, and product-interest filters without sensitive profiling.

### ADV-265 Message Composer and Preview
Spanish/English templates, SMS length, WhatsApp/email preview, expiration, and deep links.

### ADV-266 Notification Delivery Monitor
Sent, delivered, failed, opened/clicked when available, opt-outs, and provider errors.

### ADV-267 Beneficiary Communication Preferences
Consent, language, channels, quiet hours, radius, frequency, and opt-out.

### ADV-268 Promotion Performance and Savings
Redemptions when available, sales volume, estimated savings, complaints, and merchant ROI.

## Data Model Additions
- MerchantOrganization
- MerchantLocation
- MerchantAgreement
- MerchantDiscountRule
- MerchantIntegration
- MerchantFeedRun
- MerchantProduct
- NormalizedProduct
- ProductEquivalence
- MerchantPrice
- Promotion
- PromotionProduct
- PromotionLocation
- PromotionApproval
- BeneficiaryCommunicationPreference
- NotificationCampaign
- NotificationRecipient
- NotificationDeliveryEvent
- PriceVerificationEvent
- BasketComparison
- MerchantPerformanceMetric

## Integration Contracts
Design adapter interfaces for:
- Merchant catalog import
- Price and promotion import
- Inventory availability
- Store/location synchronization
- Purchase/discount confirmation
- Redemption or transaction detail when contractually available

All merchant integrations begin as simulated adapters. Production activation requires a signed agreement, technical specification, privacy review, security assessment, and sandbox certification.

## Security and Governance
- Server-side RBAC and field-level access
- Separate merchant portal roles from internal foundation roles
- No merchant access to beneficiary identities unless strictly needed for an approved transaction and legally permitted
- Signed webhooks or authenticated file exchange
- Encryption in transit and at rest
- Idempotency, replay protection, and immutable ingestion logs
- Approval separation for merchant onboarding, contracts, promotions, and production credentials
- Complete audit history

## Acceptance Criteria
- Compare at least three synthetic merchants and normalize different package sizes
- Show objective cheapest-price ranking separately from sponsored placement
- Calculate an optimized synthetic household basket
- Create, approve, schedule, publish, and expire a promotion
- Send simulated Spanish and English SMS/WhatsApp/email notifications
- Enforce consent, quiet hours, frequency limits, and opt-out
- Block prohibited-category promotions
- Preserve source, timestamp, price history, and audit events
- Lint, typecheck, tests, and production build pass
