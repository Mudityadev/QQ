'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { World2D } from '@/components/maps/World2D';
import { World3D } from '@/components/maps/World3D';
import type { NewsItem } from '@/lib/news/types';

export default function GlobePage() {
  const params = useSearchParams();
  const router = useRouter();
  const [items, setItems] = useState<NewsItem[]>([]);
  const [selected, setSelected] = useState<NewsItem | null>(null);
  const view = params.get('view') === '2d' ? '2d' : '3d';

  useEffect(() => {
    fetch('/api/news?limit=120')
      .then((r) => r.json())
      .then((data: { items?: NewsItem[] }) => setItems(data.items ?? []))
      .catch(() => setItems([]));
  }, []);

  return (
    <main className="grid">
      <section className="card">
        <h2>Global View</h2>
        <div className="controls">
          <button onClick={() => router.push('/globe?view=2d')}>2D</button>
          <button onClick={() => router.push('/globe?view=3d')}>3D</button>
        </div>
      </section>
      {view === '2d' ? <World2D items={items} onSelect={setSelected} /> : <World3D items={items} />}
      {selected && (
        <section className="card">
          <h3>Selected headline</h3>
          <a href={selected.url} target="_blank" rel="noreferrer">
            {selected.title}
          </a>
          <p>{selected.summary}</p>
        </section>
      )}
    </main>
  );
}
