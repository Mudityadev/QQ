import { withRegionPoint } from './geo';
import type { NewsItem } from './types';

const GOOGLE_WORLD_RSS = 'https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en';
const GOOGLE_WORLD_TOPIC = 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=en-US&gl=US&ceid=US:en';

function textBetween(item: string, tag: string) {
  const m = item.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m?.[1]?.replace(/<!\[CDATA\[|\]\]>/g, '').trim() ?? '';
}

function parseRss(xml: string, source: NewsItem['source']): NewsItem[] {
  const blocks = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return blocks.map((item) => {
    const title = textBetween(item, 'title');
    const url = textBetween(item, 'link');
    const publishedAt = new Date(textBetween(item, 'pubDate') || Date.now()).toISOString();
    const summary = textBetween(item, 'description');
    const { region, lat, lng } = withRegionPoint(title);
    return {
      id: Buffer.from(url || title).toString('base64').slice(0, 20),
      title,
      url,
      source,
      publishedAt,
      summary,
      region,
      lat,
      lng,
      tags: [region]
    } satisfies NewsItem;
  });
}

export async function fetchGoogleRss(): Promise<NewsItem[]> {
  const [a, b] = await Promise.all([
    fetch(GOOGLE_WORLD_RSS, { next: { revalidate: 600 } }).then((r) => r.text()),
    fetch(GOOGLE_WORLD_TOPIC, { next: { revalidate: 600 } }).then((r) => r.text())
  ]);

  return [...parseRss(a, 'google-rss-world'), ...parseRss(b, 'google-rss-topic')];
}

export async function fetchGNewsApi(query?: string): Promise<NewsItem[]> {
  const key = process.env.GNEWS_API_KEY;
  if (!key) return [];

  const url = new URL('https://gnews.io/api/v4/top-headlines');
  url.searchParams.set('lang', 'en');
  url.searchParams.set('max', '25');
  if (query) url.searchParams.set('q', query);
  url.searchParams.set('token', key);

  const res = await fetch(url, { next: { revalidate: 300 } });
  if (!res.ok) return [];

  const data = (await res.json()) as {
    articles?: Array<{ title: string; url: string; description?: string; publishedAt: string; image?: string }>;
  };

  return (data.articles ?? []).map((a) => {
    const { region, lat, lng } = withRegionPoint(a.title);
    return {
      id: Buffer.from(a.url || a.title).toString('base64').slice(0, 20),
      title: a.title,
      url: a.url,
      source: 'gnews-api',
      publishedAt: new Date(a.publishedAt || Date.now()).toISOString(),
      summary: a.description,
      image: a.image,
      region,
      lat,
      lng,
      tags: [region]
    };
  });
}
