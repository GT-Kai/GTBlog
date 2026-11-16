import type { APIRoute } from 'astro';
import { getPublishedPosts, postHref } from '../lib/posts';
import { siteConfig } from '../config';
const escapeXml = (str: string) => str.replace(/[<>&"']/g, ch => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[ch]!));
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const posts = await getPublishedPosts();
  const items = posts.map(post => `<item><title>${escapeXml(post.data.title)}</title><link>${new URL(postHref(post), base)}</link><guid>${new URL(postHref(post), base)}</guid><pubDate>${post.data.pubDate.toUTCString()}</pubDate><description>${escapeXml(post.data.description)}</description></item>`).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(siteConfig.name)}</title><link>${base}</link><description>${escapeXml(siteConfig.description)}</description><language>zh-cn</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
