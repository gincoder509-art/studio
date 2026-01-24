import { Link } from '@/navigation';
import { CodeXml, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const t = useTranslations('Navigation');
  const tHeader = useTranslations('Header');

  const navLinks = [
    { href: '/#portfolio', label: t('portfolio') },
    { href: '/#services', label: t('services') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <CodeXml className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Gincoder</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm md:flex">
            <Link
              href="/#portfolio"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {t('portfolio')}
            </Link>
            <Link
              href="/#services"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              {t('services')}
            </Link>
          </nav>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <LocaleSwitcher />
          <Button asChild>
            <Link href="/#contact">{tHeader('contactMe')}</Link>
          </Button>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs p-6">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex h-full flex-col">
                <Link href="/" className="mb-8 flex items-center space-x-2">
                  <CodeXml className="h-6 w-6 text-primary" />
                  <span className="text-lg font-bold font-headline">Gincoder</span>
                </Link>
                <nav className="grid gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-auto flex flex-col gap-4">
                  <LocaleSwitcher />
                  <Button asChild className="w-full">
                    <Link href="/#contact">{tHeader('contactMe')}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
