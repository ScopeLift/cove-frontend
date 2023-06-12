import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { XMarkIcon } from '@heroicons/react/24/solid';
import type { Address, Chain, Hash } from 'viem';
import { isAddress } from 'viem';
import FormErrorMessage from '@/components/ui/FormErrorMessage';
import { SelectChain } from '@/components/ui/SelectChain';
import { REQUIRED_FIELD_MSG, SUPPORTED_CHAINS } from '@/lib/constants';
import type { BuildConfig, BuildFramework, VerifyData } from '@/lib/cove-api';

type TxFormValues = {
  repoUrl: string;
  repoCommit: string;
  contractAddress: Address;
  framework: BuildFramework;
  buildHint: string;
  creationTxHashes: {
    chainId: string;
    hash: Hash;
  }[];
};

export const Verify = () => {
  const [selectedChains, setSelectedChains] = useState<Chain[]>([SUPPORTED_CHAINS.mainnet]);
  const chains = Object.values(SUPPORTED_CHAINS);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<TxFormValues>({
    mode: 'onChange',
    defaultValues: {
      creationTxHashes: [
        {
          chainId: SUPPORTED_CHAINS.mainnet.id,
          hash: '',
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'creationTxHashes',
    control,
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log('formData', values);
  });

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form action='#' method='POST' onSubmit={onSubmit}>
            {/* Repo URL */}
            <label htmlFor='repoUrl' className='block text-sm font-medium leading-6 text-gray-900'>
              Repo URL
            </label>
            <div>
              <input
                id='repoUrl'
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('repoUrl', {
                  required: REQUIRED_FIELD_MSG,
                  pattern: {
                    value: /^http(s?)(:\/\/)((www.)?)([a-zA-z0-9\-_]+)(.*)$/i,
                    message: 'Invalid url',
                  },
                })}
              />
              <FormErrorMessage error={errors?.repoUrl?.message} />
            </div>

            {/* Commit Hash */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='repoCommit'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Commit Hash
              </label>
            </div>
            <div>
              <input
                id='repoCommit'
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('repoCommit', {
                  required: REQUIRED_FIELD_MSG,
                  maxLength: {
                    value: 40,
                    message: 'Commit hash cannot be greater than 40 characters',
                  },
                  minLength: {
                    value: 40,
                    message: 'Commit hash cannot be less than 40 characters',
                  },
                })}
              />
              <FormErrorMessage error={errors?.repoCommit?.message} />
            </div>

            {/* Contract Address */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='contractAddress'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Contract Address
              </label>
            </div>
            <div>
              <input
                id='contractAddress'
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                {...register('contractAddress', {
                  required: REQUIRED_FIELD_MSG,
                  validate: (value) => isAddress(value) || 'Invalid address',
                })}
              />
              <FormErrorMessage error={errors?.contractAddress?.message} />
            </div>

            {/* Build Configuration */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Build Configuration
              </label>
            </div>
            <div className='flex items-center'>
              <div>
                <label className='block text-sm leading-6 text-gray-400'>Framework</label>
                <select
                  autoComplete='country-name'
                  className='h-9 w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                  {...register('framework', { required: REQUIRED_FIELD_MSG })}
                >
                  <option>Foundry</option>
                </select>
              </div>
              <div className='ml-2 flex-grow'>
                <label className='block text-sm leading-6 text-gray-400'>Profile Name</label>
                <input
                  id='buildHint'
                  placeholder='default'
                  className='w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  {...register('buildHint', { required: REQUIRED_FIELD_MSG })}
                />
              </div>
            </div>
            <div className='mt-1 flex'>
              <FormErrorMessage error={errors?.buildHint?.message} />
            </div>

            {/* Creation Transaction Hashes */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Creation Transaction Hashes
              </label>
            </div>
            {fields.map((txHash, index) => (
              <>
                <div key={index} className='flex items-center'>
                  <div>
                    <label className='text-sm leading-6 text-gray-400'>Chain</label>
                    <SelectChain
                      value={selectedChains[index]}
                      onChange={(chainValue) => {
                        setSelectedChains((prev) => {
                          prev[index] = chainValue;
                          return prev;
                        });
                        setValue(`creationTxHashes.${index}.chainId`, chainValue.id);
                      }}
                      options={chains}
                    />
                  </div>
                  <div className='ml-2 flex-grow'>
                    <label className='block text-sm leading-6 text-gray-400'>
                      Transaction Hash
                    </label>
                    <input
                      placeholder='default'
                      className='w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                      {...register(`creationTxHashes.${index}.hash` as const, {
                        required: REQUIRED_FIELD_MSG,
                      })}
                    />
                  </div>
                  {selectedChains.length > 1 && (
                    <XMarkIcon
                      className='h-4 w-4 cursor-pointer self-start text-gray-400'
                      onClick={() => {
                        remove(index);
                        selectedChains.splice(index, 1);
                        setSelectedChains(selectedChains);
                      }}
                    />
                  )}
                </div>

                <div className='mb-2 mt-1 flex'>
                  <FormErrorMessage error={errors?.buildHint?.message} />
                </div>
              </>
            ))}

            <button
              className='mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={() => {
                setSelectedChains((prev) => [...prev, SUPPORTED_CHAINS.mainnet]);
                append({ chainId: SUPPORTED_CHAINS.mainnet.id, hash: '' });
              }}
            >
              Add another chain
            </button>

            {/* Form Submit Button */}
            <button
              type='submit'
              className='mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Verify
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
