import { getAllPosts } from '../../lib/posts';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();

  const header = `# BuyUnrepped

> BuyUnrepped is a Tennessee-based licensed real estate brokerage that helps home buyers purchase property without traditional full-service agent representation. We offer flat-fee pricing ($299–$999) with structured, non-representational support, saving buyers thousands in commission costs.

BuyUnrepped does not act as the buyer's agent or enter into a buyer agency relationship. Instead, we provide tools, templates, and licensed expert access so buyers can navigate the home purchase process independently.

## Pages

- [About](https://buyunrepped.com/about): Our story, founder Kayla Brown, and mission to make home buying more affordable in Tennessee
- [Pricing](https://buyunrepped.com/pricing): Two flat-fee packages, DIY Toolkit ($299) and Full Support ($999), with feature comparison
- [Savings Calculator](https://buyunrepped.com/savings): Interactive calculator showing how much buyers save vs. traditional agent commissions
- [Contact](https://buyunrepped.com/contact): Get in touch, email team@buyunrepped.com or visit our Nashville office

## Legal

- [Privacy Policy](https://buyunrepped.com/privacy): How we collect, use, and protect your data
- [Terms & Conditions](https://buyunrepped.com/terms): Terms of use for BuyUnrepped services`;

  const blogSection = posts
    .map(
      (post) =>
        `## ${post.frontmatter.title}

- **Date**: ${post.frontmatter.date}
- **Category**: ${post.frontmatter.category}
- **URL**: https://buyunrepped.com/resources/${post.slug}

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
