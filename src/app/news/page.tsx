'use client';

import { useEffect, useState } from 'react';
import { NewsList } from '@/components/news/NewsList';
import type { NewsItem } from '@/lib/news/types';

export default function NewsPage() {
  const [items, setItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    fetch('/api/news?limit=80')
      .then((r) => r.json())
      .then((data: { items?: NewsItem[] }) => setItems(data.items ?? []))
      .catch(() => setItems([]));
  }, []);

  return <NewsList items={items} />;
}
