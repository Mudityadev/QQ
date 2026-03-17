import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QQ | Global News Monitor',
  description: 'Open source Next.js world monitor clone focused on public news + global 2D/3D visualization.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header>
            <h1>QQ</h1>
            <p>Global news monitor with public RSS + free APIs.</p>
            <nav className="nav">
              <a href="/">Home</a>
              <a href="/news">News</a>
              <a href="/globe">2D / 3D Globe</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
