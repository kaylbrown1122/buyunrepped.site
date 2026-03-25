import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const guidesDirectory = path.join(process.cwd(), 'content/guides');

export interface GuideFrontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  readingTime: string;
}

export interface Guide {
  slug: string;
  frontmatter: GuideFrontmatter;
  content: string;
}

export interface GuideWithHtml extends Guide {
  contentHtml: string;
  headings: { id: string; text: string; level: number }[];
}

export function getGuideSlugs(): string[] {
  const fileNames = fs.readdirSync(guidesDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getAllGuides(): Guide[] {
  const slugs = getGuideSlugs();
  return slugs
    .map((slug) => getGuideBySlug(slug))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

export function getGuideBySlug(slug: string): Guide {
  const fullPath = path.join(guidesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { slug, frontmatter: data as GuideFrontmatter, content };
}

export async function getGuideBySlugWithHtml(slug: string): Promise<GuideWithHtml> {
  const guide = getGuideBySlug(slug);

  // Extract headings for table of contents
  const headings: { id: string; text: string; level: number }[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(guide.content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    headings.push({ id, text, level });
  }

  // Protect <sup> tags, process markdown
  const protected_content = guide.content.replace(/<sup>(\d+,?\d*)<\/sup>/g, ';SUPCITE$1;');
  const processedContent = await remark().use(gfm).use(html).process(protected_content);
  let contentHtml = processedContent
    .toString()
    .replace(/;SUPCITE([\d,]+);/g, '<sup>$1</sup>')
    .replace(/<\/sup><sup>/g, ',');

  // Add id attributes to h2 and h3 tags for anchor linking
  contentHtml = contentHtml.replace(/<(h[23])>(.*?)<\/\1>/g, (_, tag, text) => {
    const id = text
      .replace(/<[^>]+>/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return { ...guide, contentHtml, headings };
}
