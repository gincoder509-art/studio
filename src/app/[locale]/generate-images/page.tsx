import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { siteConfig } from '@/config/site';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Seo.generateImages'});

  return {
    title: t('title'),
    description: t('description'),
    robots: {
      index: false,
      follow: false,
    }
  };
}

export default function GenerateImagesPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  notFound();
  // This page is currently not used, but metadata is provided for future use.
  return null;
}
