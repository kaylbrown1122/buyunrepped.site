# BuyUnrepped

A real estate platform that empowers homebuyers to purchase properties directly from sellers without a traditional buyer's agent, saving the average 3% buyer's agent commission.

## About

BuyUnrepped provides professional-grade tools and expert support for independent homebuyers who want to:

- **Save money** - Keep the 3% buyer's agent fee (typically $15,000+ on a $500,000 home)
- **Maintain control** - Represent yourself with professional guidance
- **Access pro tools** - Use the same market data and contract templates as licensed agents

Founded by Kayla Brown, an experienced real estate broker with 8+ years and 250+ transactions in Nashville.

## Features

- **Offer Generator** - AI-assisted purchase agreement generation with state-specific templates
- **Market Data Analysis** - Access to MLS data and fair market value calculations
- **Contract Templates** - Attorney-approved purchase agreements for all 50 states
- **Savings Calculator** - Interactive tool showing commission savings
- **Expert Support** - Licensed real estate professionals available for consultation

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
```

## Development

```bash
# Install dependencies
cd hosting && npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

The Next.js app lives in **`hosting/`**, not the repo root. Vercel must use that folder as the project root.

### Vercel (required)

In [Vercel](https://vercel.com) → your project → **Settings** → **General** → **Root Directory**:

1. Set **Root Directory** to `hosting`
2. Save and redeploy

If Root Directory is left blank, Vercel looks for `package.json` at the repo root, fails to find `next`, and shows the “No Next.js version detected” error.

After connecting `kaylbrown1122/buyunrepped.site`, confirm **Production Branch** is `main` and env vars from `hosting/.env.sample` are set in Vercel.

Deployed automatically via Vercel on push to `main` (GitHub Actions uses `hosting/` as the working directory).


