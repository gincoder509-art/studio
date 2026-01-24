import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gincoder Portfolio Pro',
  description: 'Professional portfolio for Gincoder, a web developer.',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23752BE3' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m18 16 4-4-4-4'/><path d='m6 8-4 4 4 4'/><path d='m14.5 4-5 16'/></svg>",
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
