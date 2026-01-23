'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Globe } from 'lucide-react';

export function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return (
    <Select onValueChange={onSelectChange} defaultValue={locale}>
      <SelectTrigger className="w-auto gap-2">
        <Globe className="h-4 w-4" />
        <SelectValue placeholder={t('label')} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">{t('en')}</SelectItem>
        <SelectItem value="fr">{t('fr')}</SelectItem>
        <SelectItem value="ht">{t('ht')}</SelectItem>
      </SelectContent>
    </Select>
  );
}
