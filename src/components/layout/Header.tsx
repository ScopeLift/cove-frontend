import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from 'public/logo.png';
import { SITE_NAME } from '@/lib/constants';

export const Header = () => {
  const currentPath = useRouter().pathname;

  const NavLink = (props: { path: string; label: string }) => {
    const activeClass = props.path === currentPath ? 'font-bold' : '';
    return (
      <Link href={props.path} className={`text-base font-medium text-gray-500 ${activeClass}`}>
        {props.label}
      </Link>
    );
  };

  return (
    <div className='flex items-center justify-between px-4 py-6 sm:px-6 md:justify-start md:space-x-10'>
      <div>
        <Link href='/' className='flex items-center'>
          <Image
            className='h-8 w-auto rounded-full bg-gray-600 p-1 sm:h-10'
            src={logo}
            alt='logo'
          />
          <span className='ml-4'>{SITE_NAME}</span>
        </Link>
      </div>
    </div>
  );
};
