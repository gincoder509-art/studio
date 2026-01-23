import Link from 'next/link';
import { CodeXml } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Header() {
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
              Portfolio
            </Link>
            <Link
              href="/#services"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Services
            </Link>
            <Link
              href="/generate-images"
              className="font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              AI Generator
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-4">
          <Button asChild>
            <Link href="/#contact">Contact Me</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
