import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import logo from 'public/logo.png';
import { COMPANY_NAME } from '@/lib/constants';

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
        <Link href='/' className='flex'>
          <span className='sr-only'>{COMPANY_NAME}</span>
          <Image className='h-8 w-auto rounded-full sm:h-10' src={logo} alt='logo' />
        </Link>
      </div>

      <div className='hidden md:flex md:flex-1 md:items-center md:justify-between'>
        <div className='flex space-x-10'>
          <NavLink path='/about' label='About' />
          <NavLink path='/do-stuff' label='Do Stuff' />
        </div>
      </div>
    </div>
  );
};
