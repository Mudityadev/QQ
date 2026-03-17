export default function HomePage() {
  return (
    <main className="grid">
      <section className="card">
        <h2>QQ Open Source</h2>
        <p>
          This app is a worldmonitor-style clone focused on news only: pull stories from public RSS and optional free
          news APIs, then show them in list and global map modes.
        </p>
      </section>
      <section className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
        <a className="card" href="/news">
          <h3>Live News Feed</h3>
          <p>Aggregated RSS + API headlines with filtering and deduplication.</p>
        </a>
        <a className="card" href="/globe">
          <h3>Global 2D / 3D</h3>
          <p>Plot geotagged events on a 2D map or 3D globe.</p>
        </a>
      </section>
    </main>
  );
}
