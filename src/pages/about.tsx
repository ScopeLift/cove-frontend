import Image from 'next/image';
import { Head } from '@/components/layout/Head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Prism from "prismjs";
import meme from 'public/meme.jpg';

const About = () => {
  const router = useRouter();
  const { chainName, address } = router.query;
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return(
    <>
      <Head />
      <Image className='w-auto' src={meme} alt='logo' />
      <pre>
      </pre>
    </>
  );
}

export default About;
