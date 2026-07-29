# BuyUnrepped

A Tennessee licensed real estate brokerage (BuyUnrepped, Inc.) that helps unrepresented home buyers purchase property with flat-fee, non-representational support instead of a traditional buyer's agent.

## About

BuyUnrepped provides professional-grade tools and licensed broker support for independent homebuyers who want to:

- **Compare fees fairly** — Illustrative comparisons against a hypothetical buyer-side fee; actual compensation is negotiable and savings are not guaranteed
- **Maintain control** — Represent yourself with licensed guidance, Tennessee REALTORS® forms, and transaction coordination
- **Access pro tools** — Offer preparation, calculators, playbook scripts, and the BuyUnrepped app

Founded by Kayla Brown, Principal Broker (License #339134), who has assisted in 185+ Middle Tennessee transactions representing over $100 million in volume as of July 2026.

**Service area:** Early access in Middle Tennessee (Nashville metro and surrounding counties). Licensed statewide in Tennessee; contact us to confirm availability in other markets.

## Features

- **Offer Package** — Strategy consultation, CMA/BPO, and Tennessee REALTORS® contract preparation ($995 standard)
- **Transaction Guidance** — Coordination from contract through closing ($2,495 standard)
- **Savings Calculator** — Buyer-side-only illustrative fee comparison
- **Buyer Playbook & Resources** — Tennessee-specific guides and scripts
- **Licensed broker access** — Non-representational support within purchased tier scope

## Tech Stack

- Next.js 15+ with App Router
- React 19
- TypeScript
- Tailwind CSS
- Vercel

## Project Structure

```
/hosting          # Next.js application
  /app            # App router pages and components
    /about        # About page
    /contact      # Contact page
    /pricing      # Pricing page
    /savings      # Savings calculator
    /components   # Reusable UI components
  /content        # Blog posts (Markdown)
  /lib            # Shared utilities
```

Product app (buyer workflow): `https://app.buyunrepped.com` — separate repository/deployment.
