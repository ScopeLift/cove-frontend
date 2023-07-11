import { Verify } from '@/components/Verify';
import { Head } from '@/components/layout/Head';

const Home = () => {
  return (
    <>
      <Head title='Verify Contract' />
      <h2 className='text-center text-2xl font-bold leading-9 tracking-tight'>Verify Contract</h2>
      <Verify />
    </>
  );
};

export default Home;
