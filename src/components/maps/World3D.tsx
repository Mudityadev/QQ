'use client';

import dynamic from 'next/dynamic';
import type { NewsItem } from '@/lib/news/types';

const Globe = dynamic(() => import('react-globe.gl'), { ssr: false });

export function World3D({ items }: { items: NewsItem[] }) {
  const points = items
    .filter((n) => typeof n.lat === 'number' && typeof n.lng === 'number')
    .map((n) => ({
      lat: n.lat as number,
      lng: n.lng as number,
      size: 0.3,
      color: '#ff7a59',
      label: n.title
    }));

  return (
    <div className="map-wrap card" style={{ display: 'grid', placeItems: 'center' }}>
      <Globe
        width={980}
        height={500}
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        pointsData={points}
        pointAltitude="size"
        pointColor="color"
      />
    </div>
  );
}
