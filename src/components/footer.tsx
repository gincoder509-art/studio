import { CodeXml } from "lucide-react";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations('Footer');
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <CodeXml className="h-6 w-6 text-primary" />
          <p className="text-center text-sm leading-loose md:text-left text-muted-foreground">
            {t('builtBy')}{' '}
            <a
              href="https://gincoder-ms.netlify.app"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 text-foreground/80 hover:text-foreground"
            >
              Gincoder
            </a>
            {t('rightsReserved', {currentYear})}
          </p>
        </div>
      </div>
    </footer>
  );
}
