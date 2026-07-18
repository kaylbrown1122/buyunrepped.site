import { getAllPosts } from '../../lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();

  const header = `# BuyUnrepped

> BuyUnrepped is a Tennessee-based licensed real estate brokerage that helps home buyers purchase property without traditional full-service agent representation. We offer flat-fee pricing (a $995 Offer Package, plus an optional $2,495 Transaction Management tier) with structured, non-representational support — saving buyers thousands in commission costs.

BuyUnrepped does not act as the buyer's agent or enter into a buyer agency relationship. Instead, we provide tools, templates, and licensed expert access so buyers can navigate the home purchase process independently.

## Pages

- [About](https://www.buyunrepped.com/about): Our story, founder Kayla Brown, and mission to make home buying more affordable in Tennessee
- [Pricing](https://www.buyunrepped.com/pricing): Two flat-fee tiers — the $995 Offer Package and the $2,495 Transaction Management — with feature comparison
- [Savings Calculator](https://www.buyunrepped.com/savings): Interactive calculator showing how much buyers save vs. traditional agent commissions
- [Contact](https://www.buyunrepped.com/contact): Get in touch — email info@buyunrepped.com or visit our Nashville office

## Legal

- [Privacy Policy](https://www.buyunrepped.com/privacy): How we collect, use, and protect your data
- [Terms & Conditions](https://www.buyunrepped.com/terms): Terms of use for BuyUnrepped services`;

  const blogSection = posts
    .map(
      (post) =>
        `## ${post.frontmatter.title}

- **Date**: ${post.frontmatter.date}
- **Category**: ${post.frontmatter.category}
- **URL**: https://www.buyunrepped.com/resources/${post.slug}

${post.content.trim()}`
    )
    .join('\n\n---\n\n');

  const fullContent = `${header}

---

# Blog Posts

${blogSection}
`;

  return new Response(fullContent, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  });
}
