const REGION_CENTER: Record<string, { lat: number; lng: number }> = {
  us: { lat: 39.5, lng: -98.35 },
  eu: { lat: 50.1, lng: 8.6 },
  asia: { lat: 22.2, lng: 99.8 },
  africa: { lat: 1.3, lng: 20.9 },
  oceania: { lat: -24.8, lng: 134.6 },
  latam: { lat: -14.2, lng: -60.4 },
  world: { lat: 15, lng: 10 }
};

export function inferRegion(title: string): keyof typeof REGION_CENTER {
  const low = title.toLowerCase();
  if (/(usa|u\.s\.|america|washington|new york)/.test(low)) return 'us';
  if (/(europe|uk|france|germany|eu)/.test(low)) return 'eu';
  if (/(china|india|japan|korea|asia)/.test(low)) return 'asia';
  if (/(africa|kenya|nigeria|egypt|south africa)/.test(low)) return 'africa';
  if (/(australia|new zealand|oceania)/.test(low)) return 'oceania';
  if (/(brazil|argentina|mexico|latin america)/.test(low)) return 'latam';
  return 'world';
}

export function withRegionPoint(title: string) {
  const region = inferRegion(title);
  const center = REGION_CENTER[region];
  return { region, lat: center.lat, lng: center.lng };
}
