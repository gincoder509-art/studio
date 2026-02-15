import { type MetadataRoute } from 'next';
import { locales } from '@/navigation';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/services'];

  const sitemapEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${siteConfig.url}/${locale}${route === '/' ? '' : route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: route === '/' ? 1.0 : 0.8,
    }))
  );

  return sitemapEntries;
}
