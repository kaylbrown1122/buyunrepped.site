# Product Rollout: Tiered Pricing and Eligibility Qualifier

## Purpose

Introduce limited-volume early-access pricing and an eligibility qualifier before buyers enter the BuyUnrepped application.

This repository contains the marketing site. The qualifying flow, checkout logic, Stripe integration, product database, and buyer dashboard belong in the separate application repository at `app.buyunrepped.com`.

## Product model

BuyUnrepped is a Tennessee licensed brokerage providing non-representational offer preparation and transaction coordination. Buyers make their own decisions and communicate on their own behalf with the listing side and other parties.

The rollout should favor straightforward Tennessee residential purchases and route more complex scenarios to manual review before purchase.

## Rollout pricing

Use paired, volume-limited early-access tiers:

| Tier | Offer Package | Transaction Guidance |
| --- | ---: | ---: |
| Tier 1 | $350 | $1,200 |
| Tier 2 | $550 | $1,700 |
| Tier 3 | $750 | $2,000 |
| Tier 4 | $950 | $2,495 |

### Customer-facing rules

- Use “Tier 1 — $350,” not `>$350`; the latter can look like a home-price threshold.
- Tiers are limited by available volume and may advance at BuyUnrepped’s discretion.
- Once a tier is sold out, it is no longer available to future buyers.
- Display the active tier and remaining availability only if the remaining count is reliable.
- State that the buyer sees the price applicable to them at checkout.

### Recommended price-lock rule

When a buyer purchases an Offer Package, assign and lock the paired Transaction Guidance tier for a stated period, such as 120 days.

Example:

> You’re purchasing the Tier 1 Offer Package for $350. If your offer is accepted, Tier 1 Transaction Guidance is available for $1,200 through [date].

This avoids a buyer paying Tier 1 for offer preparation and later discovering that the transaction service has advanced to Tier 3.

### Recommended post-acceptance copy

> Included with Transaction Guidance  
> Your Tier 1 price: $1,200 through [date]

## Marketing-site changes

### Call to action

During rollout, replace global “Continue to App” calls to action with “Check eligibility” or “See if you qualify.”

The CTA should send users to:

```text
https://app.buyunrepped.com/qualify
```

The actual destination should be assembled from the existing `NEXT_PUBLIC_APP_URL` variable.

### Pricing page

Add an early-access rollout section near the current pricing cards:

> Early Access Tier 1 is currently available.  
> Offer Package: $350 · Transaction Guidance: $1,200  
> Each tier has limited availability. Once a tier is filled, future buyers move to the next tier. BuyUnrepped may advance tiers at its discretion.

Do not remove the standard pricing until product, checkout, and legal terms are all aligned with the tier system.

## App-side eligibility qualifier

Implement the qualifier in the application, before account onboarding or dashboard access.

### Recommended questions

1. Do you already have a property in mind?
2. What is the Tennessee property address? Optional if not yet known.
3. What is the MLS number? Optional if not yet known.
4. Is the property listed through Realtracs/MLS?
5. What type of property is it?
   - Single-family
   - Townhome
   - Condo
   - Other
6. How are you purchasing?
   - Conventional loan
   - FHA
   - VA
   - USDA
   - Cash
   - Other
7. Is this a standard residential purchase?
   - Standard residential sale
   - Auction
   - Probate or estate sale
   - Short sale
   - Land
   - Commercial
   - Lease option
   - Other
8. When do you expect to write an offer?

### Outcomes

| Result | Behavior |
| --- | --- |
| Eligible | Create/continue onboarding and assign the active rollout tier. |
| Manual review | Show a clear review status and expected response time; create an admin task. |
| Not currently eligible | Explain that the product is currently focused on standard transactions; offer agent-match or contact options. |

Avoid collecting protected-class information or using it in eligibility logic.

## Data model and migrations

All schema changes must be created as tracked Supabase migrations in the application repository and applied to production before or with the corresponding app deployment.

### `rollout_pricing_tiers`

```text
id
tier_number
offer_price_cents
transaction_price_cents
capacity
sold_count
status                 -- draft, active, sold_out, retired
starts_at
ends_at
created_at
updated_at
```

### `buyer_eligibility_assessments`

```text
id
user_id
property_address
mls_number
listing_source
property_type
financing_type
transaction_type
answers_json
status                 -- eligible, manual_review, ineligible
review_reason
reviewed_by
reviewed_at
created_at
updated_at
```

### `buyer_rollout_assignments`

```text
id
user_id
tier_id
offer_price_cents
transaction_price_cents
assigned_at
transaction_price_expires_at
status                 -- reserved, offer_paid, expired, converted
created_at
updated_at
```

### Existing payment and offer records

Add immutable snapshots of:

```text
rollout_tier_id
offer_price_cents
transaction_price_cents
price_lock_expires_at
```

Never calculate historical purchase amounts from the currently active tier.

## Stripe and capacity controls

- Create a server-side tier reservation before creating a Stripe Checkout Session.
- Reserve availability for a short, explicit window, such as 30 minutes.
- Confirm payment and increment sold volume only from a verified Stripe webhook.
- Release expired reservations automatically.
- Make webhook processing idempotent.
- Do not trust tier availability, price, or capacity supplied by the client.

## App environment variables

```env
# Marketing-site redirect
NEXT_PUBLIC_APP_URL=https://app.buyunrepped.com

# Application only — server-side secrets
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# If using dedicated Stripe Prices per tier
STRIPE_OFFER_TIER_1_PRICE_ID=
STRIPE_TRANSACTION_TIER_1_PRICE_ID=
STRIPE_OFFER_TIER_2_PRICE_ID=
STRIPE_TRANSACTION_TIER_2_PRICE_ID=
STRIPE_OFFER_TIER_3_PRICE_ID=
STRIPE_TRANSACTION_TIER_3_PRICE_ID=
STRIPE_OFFER_TIER_4_PRICE_ID=
STRIPE_TRANSACTION_TIER_4_PRICE_ID=

# Operational controls
QUALIFIER_ENABLED=true
QUALIFIER_MANUAL_REVIEW_EMAIL=info@buyunrepped.com
ROLLOUT_TIER_RESERVATION_MINUTES=30
ROLLOUT_TRANSACTION_PRICE_LOCK_DAYS=120
```

Do not use environment variables as the source of truth for active, sold-out, or retired tiers. Store those states in `rollout_pricing_tiers` and manage them through an admin interface.

## Admin requirements

Create an admin view that can:

- view eligibility assessments and their answers;
- approve, reject, or request more information;
- view the currently active tier, sold count, reservations, and capacity;
- activate, pause, sell out, retire, or advance a tier;
- see each buyer’s assigned tier and price-lock expiration;
- manually override a tier only with an audit trail.

## Deployment safety rule

Any code change that includes a Supabase migration must have that migration applied to production before or at the same time as the corresponding application deployment.

Deployment checklist:

1. Confirm migration exists in source control.
2. Apply migration to production.
3. Verify required tables, columns, indexes, RLS policies, and functions exist.
4. Deploy application code.
5. Run a production smoke test for qualification, tier assignment, checkout, webhook confirmation, and admin review.
6. Confirm a rollback or manual recovery path before announcing a tier.

## Delivery order

### P0 — Required before public tiered rollout

1. Application-side qualifier and manual-review queue.
2. Tier, assignment, and price-snapshot migrations.
3. Server-side reservation and Stripe webhook handling.
4. Buyer-facing tier/price-lock explanations.
5. Admin tier controls and production test plan.

### P1 — Marketing integration

1. Update marketing-site CTAs to `/qualify`.
2. Add active-tier messaging to pricing and rollout landing pages.
3. Align Terms, checkout, refund policy, and confirmation emails with tier rules.

### P2 — Future improvements

1. Admin analytics on conversion and eligibility outcomes.
2. Automated tier advancement thresholds.
3. More detailed scenario routing and partner/agent-match paths.
