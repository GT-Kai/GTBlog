import type { APIRoute } from 'astro';
import { getPublishedPosts, postHref, tagHref } from '../lib/posts';
const escapeXml = (str: string) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;');
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://example.com');
  const posts = await getPublishedPosts();
  const tags = [...new Set(posts.flatMap(post => post.data.tags))];
  const paths = ['/', '/writing/', '/projects/', '/about/', ...posts.map(postHref), ...tags.map(tagHref)];
  const urls = paths.map(path => `<url><loc>${escapeXml(new URL(path, base).toString())}</loc></url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
