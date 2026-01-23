import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { projects } from '@/app/lib/data';
import { ProjectCard } from '@/components/project-card';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare, Facebook } from 'lucide-react';
import { TikTokIcon } from '@/components/icons/tiktok';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function Home() {
  const contactLinks = [
    { href: 'https://wa.me/50934892461', Icon: MessageSquare, label: 'WhatsApp' },
    { href: 'https://www.facebook.com/gincoder509', Icon: Facebook, label: 'Facebook' },
    { href: 'https://www.tiktok.com/@gincoderht', Icon: TikTokIcon, label: 'TikTok' },
    { href: 'tel:+50934892461', Icon: Phone, label: 'Call Me' },
  ];

  const heroImage = PlaceHolderImages.find(p => p.id === 'developer');
  const flyerImage = PlaceHolderImages.find(p => p.id === 'flyer');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-4">
                  <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Gincoder Pro
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    Professional web developer creating stunning, high-performance websites. Let's build your online presence together.
                  </p>
                </div>
                <div id="contact" className="flex flex-col gap-2 min-[400px]:flex-row pt-4 flex-wrap">
                  {contactLinks.map(({ href, Icon, label }) => (
                    <Button key={label} asChild variant="outline" size="lg" className="flex-grow sm:flex-grow-0">
                      <Link href={href} target="_blank" rel="noopener noreferrer">
                        <Icon className="mr-2 h-5 w-5" />
                        {label}
                      </Link>
                    </Button>
                  ))}
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
                <Badge variant="outline">My Work</Badge>
                <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-5xl">Featured Projects</h2>
                <p className="max-w-[900px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A selection of my best projects, demonstrating a range of styles and functionalities.
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

        {/* Services/Flyer Section */}
        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-6 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="font-headline text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Your Idea, My Expertise. Let's Create.
              </h2>
              <p className="mx-auto max-w-[600px] text-foreground/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                I offer a multi-service approach to bring your digital vision to life. From storefronts to personal portfolios, I have the skills to build the website you need.
              </p>
            </div>
            {flyerImage && (
              <div className="relative mx-auto w-full max-w-4xl overflow-hidden rounded-2xl shadow-2xl shadow-primary/20">
                <Image
                  src={flyerImage.imageUrl}
                  alt={flyerImage.description}
                  width={1200}
                  height={600}
                  className="w-full object-cover"
                  data-ai-hint={flyerImage.imageHint}
                />
              </div>
            )}
             <div className="flex justify-center flex-wrap gap-4 pt-8">
               {contactLinks.map(({ href, Icon, label }) => (
                <Button key={label} asChild size="lg">
                  <Link href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="mr-2 h-5 w-5" />
                    {label}
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
