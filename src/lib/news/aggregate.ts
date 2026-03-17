import { fetchGNewsApi, fetchGoogleRss } from './providers';
import type { NewsItem, NewsQuery } from './types';

export async function aggregateNews(query: NewsQuery = {}): Promise<NewsItem[]> {
  const limit = Math.min(Math.max(Number(query.limit ?? 50), 1), 200);
  const [rss, gnews] = await Promise.all([fetchGoogleRss(), fetchGNewsApi(query.q)]);

  const all = [...rss, ...gnews]
    .filter((n) => n.title && n.url)
    .filter((n) => (query.source && query.source !== 'all' ? n.source === query.source : true))
    .filter((n) => (query.region ? n.region === query.region : true))
    .filter((n) => (query.q ? n.title.toLowerCase().includes(query.q.toLowerCase()) : true));

  const seen = new Set<string>();
  const deduped: NewsItem[] = [];
  for (const item of all) {
    const key = item.url.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(item);
  }

  return deduped
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, limit);
}
