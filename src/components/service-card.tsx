'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/navigation';
import { MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

type ServiceCardProps = {
  title: string;
  description: string;
  price: string;
  ctaText: string;
  whatsappUrl: string;
};

export function ServiceCard({ title, description, price, ctaText, whatsappUrl }: ServiceCardProps) {
  const t = useTranslations('ServicesPage.qrDialog');
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
    whatsappUrl
  )}`;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <CardHeader>
        <CardTitle className="font-headline text-xl">{title}</CardTitle>
        <p className="font-bold text-primary text-lg">{price}</p>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-primary-foreground">
              <MessageSquare className="mr-2 h-4 w-4" />
              {ctaText}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-xs">
            <DialogHeader>
              <DialogTitle className="font-headline text-center">{t('title')}</DialogTitle>
              <DialogDescription className="text-center">{t('description')}</DialogDescription>
            </DialogHeader>
            <div className="my-4 flex items-center justify-center">
              <Image
                src={qrCodeUrl}
                alt="WhatsApp QR Code"
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <Button
              asChild
              className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-primary-foreground"
            >
              <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageSquare className="mr-2 h-4 w-4" />
                {t('button')}
              </Link>
            </Button>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
