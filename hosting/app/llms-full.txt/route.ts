import { getAllPosts } from '../../lib/posts';
import { llmsPagesBlock, llmsSummaryBlock } from '../../lib/llmsCopy';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();

  const header = `# BuyUnrepped

> ${llmsSummaryBlock().split('\n\n')[0]}

${llmsSummaryBlock().split('\n\n').slice(1).join('\n\n')}

Turnaround: most buyers go from first contact to an offer ready to send in about one day. Timing depends on how quickly the buyer provides details and signs, and is not guaranteed.

${llmsPagesBlock()}

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
