import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

interface Props {
  children: JSX.Element;
}

export default function Layout({ children }: Props) {
  return (
    <div className='bg-primary flex h-full min-h-screen flex-col'>
      <Header />
      <main className='h-full w-full px-4 text-gray-800 dark:text-gray-100 sm:px-6 md:justify-between lg:px-8'>
        {children}
      </main>
      <Footer />
    </div>
  );
}
