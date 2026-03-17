export type NewsSource = 'google-rss-world' | 'google-rss-topic' | 'gnews-api';

export interface NewsItem {
  id: string;
  title: string;
  url: string;
  source: NewsSource;
  publishedAt: string;
  summary?: string;
  image?: string;
  region?: string;
  lat?: number;
  lng?: number;
  tags?: string[];
}

export interface NewsQuery {
  q?: string;
  region?: string;
  limit?: number;
  source?: 'all' | NewsSource;
}
