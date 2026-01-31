import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { projectIds, projectLinks, getProjectImage, type Project } from '@/app/lib/data';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Facebook, Mail, ArrowRight } from 'lucide-react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslations } from 'next-intl';
import {unstable_setRequestLocale} from 'next-intl/server';
import { TypewriterEffect } from '@/components/typewriter-effect';

export default function Home({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');
  const tProjects = useTranslations('Projects');
  const tContact = useTranslations('HomePage');
  const tNav = useTranslations('Navigation');
  const tTypewriterWords = t.raw('typewriter.words') as string[];

  const projects: Project[] = projectIds.map(id => {
    const image = getProjectImage(id);
    return {
      id,
      title: tProjects(`${id}.title`),
      description: tProjects(`${id}.description`),
      imageUrl: image.imageUrl,
      imageHint: image.imageHint,
      link: projectLinks[id],
    }
  });

  const contactLinks = [
    { href: 'https://wa.me/50933377934', Icon: MessageSquare, label: tContact('whatsapp'), className: 'bg-[#25D366] hover:bg-[#25D366]/90 text-primary-foreground' },
    { href: 'https://www.facebook.com/share/1AgEHU17B3/', Icon: Facebook, label: tContact('facebook'), className: 'bg-[#1877F2] hover:bg-[#1877F2]/90 text-primary-foreground' },
    { href: 'tel:+50944539500', Icon: Phone, label: tContact('callDigicel'), className: 'bg-[#ED1C24] hover:bg-[#ED1C24]/90 text-primary-foreground' },
    { href: 'tel:+50941704583', Icon: Phone, label: tContact('callNatcom'), className: 'bg-[#00A9E0] hover:bg-[#00A9E0]/90 text-primary-foreground' },
    { href: 'mailto:gincoder-ms@outlook.fr', Icon: Mail, label: tContact('email'), className: 'bg-gray-500 hover:bg-gray-600 text-primary-foreground' },
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'developer');

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {t('heroTitle')}
                  </h1>
                  <TypewriterEffect
                    staticText={t('typewriter.static')}
                    words={tTypewriterWords}
                    className="mt-4"
                  />
                  <p className="max-w-[600px] text-foreground/80 md:text-xl pt-2">
                    {t('heroSubtitle')}
                  </p>
                </div>
                <div id="contact" className="flex flex-col gap-2 min-[400px]:flex-row pt-4 flex-wrap">
                  {contactLinks.map(({ href, Icon, label, className }) => (
                    <Button key={label} asChild size="lg" className={`flex-grow sm:flex-grow-0 ${className}`}>
                      <Link href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="mr-2 h-5 w-5" />
                        {label}
                      </Link>
                    </Button>
                  ))}
                   <Button asChild size="lg" variant="secondary" className="flex-grow sm:flex-grow-0">
                   <Link href="https://gincoder-ms.netlify.app" target="_blank" rel="noopener noreferrer">
                     {t('moreAboutMe')}
                     <ArrowRight className="ml-2 h-5 w-5" />
                   </Link>
                 </Button>
                </div>
              </div>
              {heroImage && (
                <div className="hidden lg:block relative">
                   <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={600}
                      height={400}
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover"
                      data-ai-hint={heroImage.imageHint}
                    />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="w-full py-12 md:py-24 lg:py-32 bg-card">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="outline">{t('portfolioBadge')}</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">{t('portfolioTitle')}</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('portfolioSubtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-7xl items-start gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                {t('servicesTitle')}
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {t('servicesSubtitle')}
              </p>
            </div>
             <div className="flex justify-center">
                <Button asChild size="lg">
                    <Link href="/services">
                        {tNav('services')} <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
