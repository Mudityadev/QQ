'use client';

import { useMemo, useState } from 'react';
import type { NewsItem } from '@/lib/news/types';

export function NewsList({ items }: { items: NewsItem[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter((n) => n.title.toLowerCase().includes(query.toLowerCase()));
  }, [items, query]);

  return (
    <section className="card">
      <h2>News Feed</h2>
      <input placeholder="Filter headlines" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="news-list" style={{ marginTop: '0.75rem' }}>
        {filtered.map((n) => (
          <article key={n.id} className="news-item">
            <a href={n.url} target="_blank" rel="noreferrer">
              <strong>{n.title}</strong>
            </a>
            <div style={{ color: 'var(--muted)', marginTop: '.35rem', fontSize: '.9rem' }}>
              {n.source} • {new Date(n.publishedAt).toLocaleString()} • {n.region}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
