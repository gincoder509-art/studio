import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gincoder Portfolio Pro',
  description: 'Professional portfolio for Gincoder, a web developer.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='50' fill='%23752BE3'/><text x='50' y='52' font-family='Space Grotesk, sans-serif' font-size='60' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'>G</text></svg>",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={params.locale ?? 'fr'} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Space+Grotesk:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
