'use client';

import { useTranslations } from 'next-intl';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

type FaqSectionProps = {
  page: 'HomePage' | 'ServicesPage';
};

export function FaqSection({ page }: FaqSectionProps) {
  const tFaq = useTranslations(`${page}.faq`);
  const faqItems = ['q1', 'q2', 'q3', 'q4'];

  return (
    <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
      <div className="container max-w-3xl px-4 md:px-6">
        <div className="text-center">
          <Badge>{tFaq('badge')}</Badge>
          <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl mt-2">{tFaq('title')}</h2>
          <p className="mt-4 text-foreground/80 md:text-lg">{tFaq('subtitle')}</p>
        </div>
        <Accordion type="single" collapsible className="w-full mt-8">
          {faqItems.map((item) => (
            <AccordionItem key={item} value={item}>
              <AccordionTrigger className="text-left font-bold text-lg hover:no-underline">{tFaq(`${item}.question`)}</AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {tFaq(`${item}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
