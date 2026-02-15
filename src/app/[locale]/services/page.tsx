import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useTranslations, getTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ServiceCard } from '@/components/service-card';
import { Globe, Bot, Code, Sparkles, Info, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { siteConfig } from '@/config/site';
import { locales } from '@/navigation';
import { JsonLd, generateBreadcrumbs, type Service } from '@/components/json-ld';
import { Badge } from '@/components/ui/badge';
import { FaqSection } from '@/components/faq-section';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Seo.services'});
  
  const alternates = locales.reduce((acc, loc) => {
    acc[loc] = `${siteConfig.url}/${loc}/services`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/services`,
      languages: {
        ...alternates,
        'x-default': `${siteConfig.url}/fr/services`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}/services`,
      images: [ { url: `${siteConfig.url}/og-services.jpg`, width: 1200, height: 630, alt: t('title') } ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      images: [ `${siteConfig.url}/og-services.jpg` ],
    },
  };
}

const categoryIcons: Record<string, React.ElementType> = {
  web: Globe,
  automation: Bot,
  dev: Code,
  other: Sparkles,
};

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('ServicesPage');
  const tNav = useTranslations('Navigation');
  const categories = ['web', 'automation', 'dev', 'other'];
  const whatsappNumber = '50933377934';

  const breadcrumbs = generateBreadcrumbs([
    { name: tNav('home'), item: `${siteConfig.url}/${locale}` },
    { name: tNav('services'), item: `${siteConfig.url}/${locale}/services` }
  ]);

  const allServices = categories.flatMap(category => 
    Object.keys(t.raw(`categories.${category}.services`)).map(serviceKey => {
      const baseKey = `categories.${category}.services.${serviceKey}`;
      const serviceSchema: Service = {
        '@type': 'Service',
        name: t(`${baseKey}.title`),
        description: t(`${baseKey}.description`),
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
        },
        serviceType: t(`categories.${category}.title`),
        offers: {
            '@type': 'Offer',
            priceCurrency: 'USD',
        }
      };
      return serviceSchema;
    })
  );

  return (
    <>
    <JsonLd schema={breadcrumbs} />
    {allServices.map((schema, index) => <JsonLd key={index} schema={schema} />)}
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {t('title')}
              </h1>
              <p className="mt-4 max-w-3xl mx-auto text-foreground/80 md:text-xl">
                {t('subtitle')}
              </p>
              <Alert className="mt-8 text-left">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  {t('priceDisclaimer')}
                </AlertDescription>
              </Alert>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <Accordion type="single" collapsible className="w-full" defaultValue="web">
                {categories.map((category) => {
                  const CategoryIcon = categoryIcons[category];
                  const services = Object.keys(t.raw(`categories.${category}.services`));

                  return (
                    <AccordionItem key={category} value={category}>
                      <AccordionTrigger className="text-2xl font-headline hover:no-underline">
                        <div className="flex items-center gap-3">
                          {<CategoryIcon className="h-6 w-6 text-primary" />}
                          {t(`categories.${category}.title`)}
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="grid gap-6 pt-4 sm:grid-cols-2 lg:grid-cols-3">
                          {services.map((serviceKey) => {
                            const message = t(`categories.${category}.services.${serviceKey}.whatsappMessage`);
                            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

                            return (
                              <ServiceCard
                                key={serviceKey}
                                title={t(`categories.${category}.services.${serviceKey}.title`)}
                                description={t(`categories.${category}.services.${serviceKey}.description`)}
                                price={t(`categories.${category}.services.${serviceKey}.price`)}
                                ctaText={t('cta')}
                                whatsappUrl={whatsappUrl}
                              />
                            );
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <FaqSection page="ServicesPage" />
      </main>
      <Footer />
    </div>
    </>
  );
}
