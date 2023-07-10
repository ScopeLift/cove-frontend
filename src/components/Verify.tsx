import { useEffect, useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/solid';
import type { Address, Chain, Hash } from 'viem';
import { isAddress, isHex } from 'viem';
import { FormErrorMessage } from '@/components/ui/FormErrorMessage';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { SelectChain } from '@/components/ui/SelectChain';
import { VerifiedContract } from '@/components/ui/VerifiedContract';
import { REQUIRED_FIELD_MSG, SUPPORTED_CHAINS } from '@/lib/constants';
import { COVE_API_URL } from '@/lib/constants';
import { BuildFramework, SuccessfulVerification, VerifyData } from '@/lib/cove-api';

type TxFormValues = {
  repoUrl: string;
  repoCommit: string;
  contractAddress: Address;
  framework: BuildFramework;
  buildHint: string;
  creationTxHashes: {
    chainName: string;
    hash: Hash;
  }[];
};

const verifyContract = async (data: TxFormValues) => {
  const verifyData = shapeFormData(data);
  const response = await fetch(new URL('/verify', COVE_API_URL).href, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(verifyData),
  });

  if (!response.ok) {
    // Handle JSON vs. text error response
    if (response.headers.get('Content-Type')?.includes('application/json')) {
      throw new Error(await response.json());
    } else {
      throw new Error(await response.text());
    }
  }
  return await response.json();
};

const CHAIN_NAMES_MAP: { [index: string]: string } = {
  Ethereum: 'mainnet',
  'Arbitrum One': 'arbitrum',
};

const shapeFormData = (data: TxFormValues): VerifyData => {
  return {
    repoUrl: data.repoUrl,
    repoCommit: data.repoCommit,
    contractAddress: data.contractAddress,
    buildConfig: {
      framework: data.framework.toLowerCase() as BuildFramework,
      buildHint: data.buildHint,
    },
    creationTxHashes: data.creationTxHashes.reduce(
      (acc, { chainName, hash }) => ({
        ...acc,
        [CHAIN_NAMES_MAP[chainName] || chainName.toLowerCase()]: hash,
      }),
      {} as Record<string, Hash>
    ),
  };
};

export const Verify = () => {
  // -------- Form management --------
  // Set this to true to pre-populate the form with test data
  const DEV_MODE = true;
  const defaultChain = DEV_MODE ? SUPPORTED_CHAINS.goerli : SUPPORTED_CHAINS.mainnet;
  const defaultDevFormData: Partial<TxFormValues> = {
    repoUrl: 'https://github.com/ScopeLift/cove-test-repo',
    repoCommit: 'b268862cf1ccf495d6dc20a86c41940dfb386d9b',
    contractAddress: '0x8d56e3e001132d84488DbacDbB01AfB8C3171242',
    buildHint: 'default',
    creationTxHashes: [
      {
        chainName: SUPPORTED_CHAINS.goerli.name,
        hash: '0x59724cfbee93a0c10f7cbd312c1d159d62ea602003dd61a407a5cf842b4103d6' as `0x{string}`,
      },
    ],
  };
  const defaultProdFormData: Partial<TxFormValues> = {
    creationTxHashes: [{ chainName: SUPPORTED_CHAINS.mainnet.name, hash: '' as `0x{string}` }],
  };
  const [selectedChains, setSelectedChains] = useState<Chain[]>([defaultChain]);
  const chains = Object.values(SUPPORTED_CHAINS);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<TxFormValues>({
    mode: 'onBlur',
    defaultValues: DEV_MODE ? defaultDevFormData : defaultProdFormData,
  });

  const { fields, append, remove } = useFieldArray({ name: 'creationTxHashes', control });

  // -------- Verification request state --------
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | string | null>(null);
  const [data, setData] = useState<SuccessfulVerification | null>(null);

  const onSubmit = handleSubmit(async (values) => {
    try {
      setIsLoading(true);
      const result = await verifyContract(values);
      setData(result);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err);
        setError(err);
      } else {
        console.error(JSON.stringify(err));
        setError(JSON.stringify(err));
      }
    } finally {
      setIsLoading(false);
    }
  });

  // -------- Scroll to verified contract --------
  const verifiedRef = useRef<HTMLDivElement>(null);
  const scrollToRef = () => {
    verifiedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };
  useEffect(() => {
    if (data) scrollToRef();
  }, [data]);

  // -------- Render --------
  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form action='#' method='POST' onSubmit={onSubmit}>
            {/* Repo URL */}
            <label htmlFor='repoUrl' className='text-primary block text-sm font-medium leading-6'>
              Repo URL
            </label>
            <div>
              <input
                id='repoUrl'
                className='input'
                {...register('repoUrl', {
                  required: REQUIRED_FIELD_MSG,
                  pattern: {
                    value: /^http(s?)(:\/\/)((www.)?)([a-zA-z0-9\-_]+)(.*)$/i,
                    message: 'Please enter a valid repo URL',
                  },
                })}
              />
              <FormErrorMessage error={errors?.repoUrl?.message} />
            </div>

            {/* Commit Hash */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='repoCommit'
                className='text-primary block text-sm font-medium leading-6'
              >
                Commit Hash
              </label>
            </div>
            <div>
              <input
                id='repoCommit'
                className='input'
                {...register('repoCommit', {
                  required: REQUIRED_FIELD_MSG,
                  validate: (value) => {
                    if (value.startsWith('0x')) return 'Commit cannot start with 0x';
                    if (!isHex(`0x${value}`)) return 'Commit hash is not a valid hex string';
                    return true;
                  },
                })}
              />
              <FormErrorMessage error={errors?.repoCommit?.message} />
            </div>

            {/* Contract Address */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='contractAddress'
                className='text-primary block text-sm font-medium leading-6'
              >
                Contract Address
              </label>
            </div>
            <div>
              <input
                id='contractAddress'
                className='input'
                {...register('contractAddress', {
                  required: REQUIRED_FIELD_MSG,
                  validate: (value) => isAddress(value) || 'Please enter a valid address',
                })}
              />
              <FormErrorMessage error={errors?.contractAddress?.message} />
            </div>

            {/* Build Configuration */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='text-primary block text-sm font-medium leading-6'>
                Build Configuration
              </label>
            </div>
            <div className='flex items-center'>
              <div>
                <label className='text-secondary block text-sm leading-6'>Framework</label>
                <select
                  autoComplete='country-name'
                  className='select'
                  {...register('framework', { required: REQUIRED_FIELD_MSG })}
                >
                  <option>Foundry</option>
                </select>
              </div>
              <div className='ml-2 flex-grow'>
                <label className='text-secondary block text-sm leading-6'>Profile Name</label>
                <input
                  id='buildHint'
                  placeholder='default'
                  className='input'
                  {...register('buildHint', { required: REQUIRED_FIELD_MSG })}
                />
              </div>
            </div>
            <div className='mt-1 flex'>
              <FormErrorMessage error={errors?.buildHint?.message} />
            </div>

            {/* Creation Transaction Hashes */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='text-primary block text-sm font-medium leading-6'>
                Creation Transaction Hashes
              </label>
            </div>
            {fields.map((txHash, index) => (
              <div key={index}>
                <div className='flex items-center'>
                  <div>
                    <label className='text-secondary text-sm leading-4'>Chain</label>
                    <input hidden {...register(`creationTxHashes.${index}.chainName`)} />
                    <SelectChain
                      value={selectedChains[index]}
                      onChange={(chainValue) => {
                        setValue(`creationTxHashes.${index}.chainName`, chainValue.name, {
                          shouldValidate: true,
                        });
                        setSelectedChains((prev) => {
                          const newPrev = [...prev];
                          newPrev[index] = chainValue;
                          return newPrev;
                        });
                      }}
                      options={chains}
                    />
                  </div>
                  <div className='ml-2 flex-grow'>
                    <label className='text-secondary block text-sm leading-6'>
                      Transaction Hash
                    </label>
                    <input
                      className='input'
                      {...register(`creationTxHashes.${index}.hash` as const, {
                        required: REQUIRED_FIELD_MSG,
                        validate: (value) => {
                          if (!value.startsWith('0x')) return 'Transaction hash must start with 0x';
                          if (!isHex(value)) return 'Transaction hash is not a valid hex string';
                          if (value.length !== 66) return 'Please enter a valid transaction hash';
                          return true;
                        },
                      })}
                    />
                  </div>
                  {selectedChains.length > 1 && (
                    <XMarkIcon
                      className='text-secondary mb-3 ml-1 h-4 w-4 cursor-pointer self-end'
                      onClick={() => {
                        remove(index);
                        selectedChains.splice(index, 1);
                        setSelectedChains(selectedChains);
                      }}
                    />
                  )}
                </div>

                <div className='mb-2 mt-1 flex'>
                  <FormErrorMessage error={errors?.creationTxHashes?.[index]?.hash?.message} />
                </div>
              </div>
            ))}

            <button
              className='hyperlink flex items-center text-sm'
              onClick={() => {
                setSelectedChains((prev) => [...prev, SUPPORTED_CHAINS.mainnet]);
                append({ chainName: SUPPORTED_CHAINS.mainnet.name, hash: '' as `0x{string}` });
              }}
            >
              <PlusIcon className='mr-2 h-4 w-4 font-bold' />
              Add another chain
            </button>

            {/* Form Submit Button */}
            <button type='submit' className='btn-primary mt-8' disabled={isLoading}>
              {isLoading ? <LoadingSpinner /> : 'Verify'}
            </button>

            {/* Verification Status */}
            {isLoading && (
              <p className='mt-2 text-center text-xs italic'>
                This may take a minute or two, please be patient!
              </p>
            )}
            {error && <FormErrorMessage error={error} />}
          </form>
        </div>

        {/* Verified Data */}
        {!isLoading && !error && data && (
          <div ref={verifiedRef}>
            <VerifiedContract data={data} />
          </div>
        )}
      </div>
    </>
  );
};
