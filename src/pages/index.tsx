import { Head } from '@/components/layout/Head';
import { Header } from '@/components/layout/Header';
import { SITE_DESCRIPTION } from '@/lib/constants';

const Home = () => {
  return (
    <>
      <Head />
      <h1 className='text-center'>{SITE_DESCRIPTION}</h1>
    </>
  );
};

export default Home;
