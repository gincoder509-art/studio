import { GenerateImagesForm } from '@/app/generate-images/generate-images-form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import {unstable_setRequestLocale} from 'next-intl/server';

export default function GenerateImagesPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <GenerateImagesForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
