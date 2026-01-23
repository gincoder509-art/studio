import { GenerateImagesForm } from './generate-images-form';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function GenerateImagesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 py-12 md:py-24">
        <div className="container">
          <GenerateImagesForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
