'use client';

import type { NewsItem } from '@/lib/news/types';

function project(lat: number, lng: number) {
  const x = ((lng + 180) / 360) * 100;
  const y = ((90 - lat) / 180) * 100;
  return { x, y };
}

export function World2D({ items, onSelect }: { items: NewsItem[]; onSelect: (item: NewsItem) => void }) {
  return (
    <div className="map-wrap two-d card">
      {items
        .filter((n) => typeof n.lat === 'number' && typeof n.lng === 'number')
        .map((n) => {
          const p = project(n.lat!, n.lng!);
          return (
            <button
              key={n.id}
              className="dot"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              title={n.title}
              onClick={() => onSelect(n)}
            />
          );
        })}
    </div>
  );
}
