import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { projectIds, projectLinks, getProjectImage, type Project } from '@/app/lib/data';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Facebook, Mail, ArrowRight, Code, BrainCircuit, PenTool, SearchCheck, CheckCircle, Lightbulb, Bot } from 'lucide-react';
import { Link } from '@/navigation';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { TypewriterEffect } from '@/components/typewriter-effect';
import { siteConfig } from '@/config/site';
import { locales } from '@/navigation';
import { JsonLd, personSchema, generateBreadcrumbs } from '@/components/json-ld';
import { TikTokIcon } from '@/components/icons/tiktok';
import { FaqSection } from '@/components/faq-section';

export async function generateMetadata({params: {locale}}: {params: {locale: string}}): Promise<Metadata> {
  const t = await getTranslations({locale, namespace: 'Seo.home'});
  
  const alternates = locales.reduce((acc, loc) => {
    acc[loc] = `${siteConfig.url}/${loc}`;
    return acc;
  }, {} as Record<string, string>);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(',').map(k => k.trim()),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        ...alternates,
        'x-default': `${siteConfig.url}/fr`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${siteConfig.url}/${locale}`,
      images: [ { url: `${siteConfig.url}/og-home.jpg`, width: 1200, height: 630, alt: t('title') } ],
      locale: locale,
      type: 'profile',
      profile: {
        firstName: 'Gincoder',
        username: 'Gincoder',
      }
    },
     twitter: {
      title: t('title'),
      description: t('description'),
      images: [ `${siteConfig.url}/og-home.jpg` ],
    },
  };
}

export default function Home({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('HomePage');
  const tProjects = useTranslations('Projects');
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
    { name: "whatsapp", href: siteConfig.socials.whatsapp, Icon: MessageSquare, label: t('contactMethods.whatsapp'), className: 'bg-[#25D366] hover:bg-[#25D366]/90 text-primary-foreground' },
    { name: "facebook", href: siteConfig.socials.facebook, Icon: Facebook, label: t('contactMethods.facebook'), className: 'bg-[#1877F2] hover:bg-[#1877F2]/90 text-primary-foreground' },
    { name: "tiktok", href: siteConfig.socials.tiktok, Icon: TikTokIcon, label: t('contactMethods.tiktok'), className: 'bg-black hover:bg-gray-800 text-white border border-gray-600' },
    { name: "email", href: `mailto:${siteConfig.email}`, Icon: Mail, label: t('contactMethods.email'), className: 'bg-gray-500 hover:bg-gray-600 text-primary-foreground' },
  ];
  
  const skills = [
    { Icon: Code, title: t('skills.frontend.title'), description: t('skills.frontend.description') },
    { Icon: BrainCircuit, title: t('skills.ai.title'), description: t('skills.ai.description') },
    { Icon: PenTool, title: t('skills.design.title'), description: t('skills.design.description') },
    { Icon: SearchCheck, title: t('skills.seo.title'), description: t('skills.seo.description') },
  ];

  const processSteps = [
    {
      title: t('process.step1.title'),
      description: t('process.step1.description'),
    },
    {
      title: t('process.step2.title'),
      description: t('process.step2.description'),
    },
    {
      title: t('process.step3.title'),
      description: t('process.step3.description'),
    },
    {
      title: t('process.step4.title'),
      description: t('process.step4.description'),
    },
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'developer');

  const breadcrumbs = generateBreadcrumbs([
    { name: tNav('home'), item: `${siteConfig.url}/${locale}` }
  ]);

  return (
    <>
    <JsonLd schema={personSchema} />
    <JsonLd schema={breadcrumbs} />
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1fr_550px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                   <Badge variant="secondary">{t('heroBadge')}</Badge>
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
                </div>
              </div>
              {heroImage && (
                <div className="hidden lg:block relative group">
                   <Image
                      src={heroImage.imageUrl}
                      alt={heroImage.description}
                      width={600}
                      height={400}
                      priority
                      className="mx-auto aspect-video overflow-hidden rounded-xl object-cover transition-all duration-300 group-hover:scale-105"
                      data-ai-hint={heroImage.imageHint}
                    />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-card/50">
            <div className="container px-4 md:px-6">
                <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
                    <div>
                        <Badge>{t('about.badge')}</Badge>
                        <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl mt-2">{t('about.title')}</h2>
                        <p className="mt-4 text-foreground/80 md:text-lg">{t('about.p1')}</p>
                        <p className="mt-4 text-foreground/80 md:text-lg">{t('about.p2')}</p>
                        <Button asChild size="lg" className="mt-6">
                            <Link href="/services">{t('about.cta')} <ArrowRight className="ml-2"/></Link>
                        </Button>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        {skills.map(skill => (
                            <div key={skill.title} className="flex flex-col items-center p-6 text-center bg-card rounded-lg shadow-md border border-border/20">
                                <skill.Icon className="h-10 w-10 text-primary mb-3" />
                                <h3 className="text-lg font-bold font-headline">{skill.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        {/* Process Section */}
        <section id="process" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto">
              <Badge variant="outline">{t('process.badge')}</Badge>
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl mt-2">{t('process.title')}</h2>
              <p className="mt-4 text-foreground/80 md:text-xl">{t('process.subtitle')}</p>
            </div>
            <div className="relative mt-12 grid gap-8 md:grid-cols-4">
               <div className="absolute left-0 top-1/2 w-full h-0.5 bg-border -translate-y-1/2 -z-10 hidden md:block"></div>
               {processSteps.map((step, index) => (
                <div key={index} className="relative flex flex-col items-center text-center">
                    <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xl mb-4 border-4 border-background z-10">{index + 1}</div>
                    <h3 className="font-headline font-bold text-xl">{step.title}</h3>
                    <p className="text-muted-foreground mt-2">{step.description}</p>
                </div>
               ))}
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
             <div className="text-center">
                <Button asChild size="lg" variant="secondary">
                   <Link href={t('portfolioCtaLink')}>
                     {t('portfolioCta')}
                     <ArrowRight className="ml-2 h-5 w-5" />
                   </Link>
                 </Button>
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
        
        {/* FAQ Section */}
        <FaqSection page="HomePage" />
      </main>
      <Footer />
    </div>
    </>
  );
}
