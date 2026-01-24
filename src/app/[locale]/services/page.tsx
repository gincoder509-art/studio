import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ServiceCard } from '@/components/service-card';
import { Globe, Palette, Bot, Code, Handshake } from 'lucide-react';

const categoryIcons: Record<string, React.ElementType> = {
  web: Globe,
  design: Palette,
  automation: Bot,
  dev: Code,
  consulting: Handshake,
};

export default function ServicesPage({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('ServicesPage');
  const categories = ['web', 'design', 'automation', 'dev', 'consulting'];
  const whatsappNumber = '50933377934';

  return (
    <div className="flex min-h-screen flex-col bg-background">
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
            </div>

            <div className="mx-auto mt-16 max-w-4xl">
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
      </main>
      <Footer />
    </div>
  );
}
