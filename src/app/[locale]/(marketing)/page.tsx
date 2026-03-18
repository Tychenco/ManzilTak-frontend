import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { HeroSection } from '@/components/home/HeroSection';
import { Navbar } from '@/components/layout/Navbar';

type IndexPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: IndexPageProps): Promise<Metadata> {
  await props.params;

  return {
    title: 'ManzilTak',
    description: 'ManzilTak platform foundation',
  };
}

export default async function Index(props: IndexPageProps) {
  const { locale } = await props.params;
  setRequestLocale(locale);

  return (
    <div className="mx-auto w-full max-w-7xl">
      <Navbar />
      <HeroSection />
    </div>
  );
}
