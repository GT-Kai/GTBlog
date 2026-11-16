import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

export async function getPublishedPosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export const postHref = (post: BlogPost) => `/writing/${post.id}/`;
export const tagHref = (tag: string) => `/tags/${encodeURIComponent(tag)}/`;
export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
export const approximateReadTime = (body: string | undefined) =>
  Math.max(1, Math.ceil((body?.replace(/\s+/g, '').length || 0) / 450));
