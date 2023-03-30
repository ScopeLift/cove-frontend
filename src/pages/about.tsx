import { useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Prism from 'prismjs';
import meme from 'public/meme.jpg';
import { Head } from '@/components/layout/Head';

const About = () => {
  const router = useRouter();
  const { chainName, address } = router.query;
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <>
      <Head />
      <Image className='w-auto' src={meme} alt='logo' />
      <pre></pre>
    </>
  );
};

export default About;
