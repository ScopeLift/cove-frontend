import Image from 'next/image';
import Link from 'next/link';
import logo from 'public/logo.png';
import { ExternalLink } from '@/components/layout/ExternalLink';
import { SITE_NAME } from '@/lib/constants';

export const Header = () => {
  return (
    <>
      <div className='bg-secondary gap-x-6 px-6 py-2.5 text-center shadow-sm sm:px-3.5 sm:before:flex-1'>
        <p className='text-sm font-bold leading-6'>
          <ExternalLink href='https://www.scopelift.co/cove' text='Sign up' /> to stay up to date
          with Cove.
        </p>
      </div>
      <div className='flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
        <div>
          <Link href='/' className='flex items-center'>
            <Image className='h-12 w-auto p-1 sm:h-16' src={logo} alt='logo' />
            <span className='sr-only ml-4'>{SITE_NAME}</span>
          </Link>
        </div>
      </div>
    </>
  );
};
