import { Link } from '@/navigation';
import { CodeXml } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { LocaleSwitcher } from './locale-switcher';

export function Header() {
  const t = useTranslations('Navigation');
  const tHeader = useTranslations('Header');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
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
            <Link
              href="/generate-images"
              className="font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              {t('aiGenerator')}
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <LocaleSwitcher />
          <Button asChild>
            <Link href="/#contact">{tHeader('contactMe')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
