import Link from 'next/link';
import { Verify } from '@/components/Verify';
import { Head } from '@/components/layout/Head';

const Home = () => {
  return (
    <>
      <Head title='Verify Contract' />
      <h2 className='text-center text-2xl font-bold leading-9 tracking-tight'>Verify Contract</h2>
      <p className='text-secondary text-center text-sm'>
        Cove is currently in Alpha and does not store verification results.{' '}
        <Link href='/' className='hyperlink'>
          Learn more
        </Link>
        .
      </p>
      <Verify />
    </>
  );
};

export default Home;
