import { notFound } from 'next/navigation';
import {unstable_setRequestLocale} from 'next-intl/server';

export default function GenerateImagesPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  notFound();
  return null;
}
