import { Verify } from '@/components/Verify';
import { Head } from '@/components/layout/Head';
import { SITE_DESCRIPTION } from '@/lib/constants';

const Home = () => {
  return (
    <>
      <Head />
      <h1 className='text-center'>{SITE_DESCRIPTION}</h1>
      <Verify />
    </>
  );
};

export default Home;
