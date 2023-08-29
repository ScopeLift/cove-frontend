import { Fragment } from 'react';
import Image from 'next/image';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Chain } from 'viem';
import { classNames } from '@/lib/utils';

interface Props {
  value: Chain;
  options: Chain[];
  onChange: (chain: Chain) => void;
}

export const SelectChain = ({ value, options, onChange }: Props) => {
  const chainLogoUrl = (chain: Chain) => {
    if ([1, 5, 11155111].includes(chain.id)) {
      return 'https://icons.llamao.fi/icons/chains/rsz_ethereum.jpg';
    }
    if (chain.id === 42161) return 'https://icons.llamao.fi/icons/chains/rsz_arbitrum.jpg';
    if (chain.id === 10) return 'https://icons.llamao.fi/icons/chains/rsz_optimism.jpg';
    if (chain.id === 43114) return 'https://icons.llamao.fi/icons/chains/rsz_avalanche.jpg';
    return `https://icons.llamao.fi/icons/chains/rsz_${chain.name.toLowerCase()}.jpg`;
  };

  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div>
          <Listbox.Button className='select relative pr-10'>
            <span className='flex items-center'>
              <Image
                src={chainLogoUrl(value)}
                width={50}
                height={50}
                alt={`${value.name} logo`}
                className='h-5 w-5 flex-shrink-0 rounded-full'
              />
              <span className='ml-3 block truncate'>{value.name}</span>
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
              <ChevronUpDownIcon className='text-secondary h-5 w-5' aria-hidden='true' />
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='bg-secondary absolute z-10 mt-1 max-h-56 w-full max-w-md overflow-auto rounded-md py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    classNames(
                      active ? 'bg-primary text-primary opacity-90' : 'text-primary',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <>
                      <div className='flex items-center'>
                        <Image
                          src={chainLogoUrl(option)}
                          width={50}
                          height={50}
                          alt={`${value.name} logo`}
                          className='h-5 w-5 flex-shrink-0 rounded-full'
                        />
                        <span
                          className={classNames(
                            selected ? 'font-semibold' : 'font-normal',
                            'ml-3 block truncate'
                          )}
                        >
                          {option.name}
                        </span>
                      </div>

                      {selected ? (
                        <span
                          className={classNames(
                            active ? 'text-white' : 'text-emerald-600',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className='h-5 w-5' aria-hidden='true' />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
