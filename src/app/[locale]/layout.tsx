import { Toaster } from '@/components/ui/toaster';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import { BackgroundBubbles } from '@/components/background-bubbles';
import { JsonLd, organizationSchema, websiteSchema } from '@/components/json-ld';

const locales = ['en', 'fr', 'ht'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
 
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <BackgroundBubbles />
      {children}
      <Toaster />
    </NextIntlClientProvider>
  );
}
