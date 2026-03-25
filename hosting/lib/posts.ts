import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import gfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostFrontmatter {
  title: string;
  date: string;
  description: string;
  category: string;
  readingTime: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostWithHtml extends Post {
  contentHtml: string;
}

export function getPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
  return posts;
}

export function getPostBySlug(slug: string): Post {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

export async function getPostBySlugWithHtml(slug: string): Promise<PostWithHtml> {
  const post = getPostBySlug(slug);

  // remark-html strips raw HTML tags, so we protect <sup> tags with placeholders
  const protected_content = post.content.replace(/<sup>(\d+)<\/sup>/g, 'SUPCITE_$1_END');
  const processedContent = await remark().use(gfm).use(html).process(protected_content);
  const contentHtml = processedContent
    .toString()
    .replace(/SUPCITE_(\d+)_END/g, '<sup>$1</sup>')
    .replace(/<\/sup><sup>/g, ',');

  return {
    ...post,
    contentHtml,
  };
}
