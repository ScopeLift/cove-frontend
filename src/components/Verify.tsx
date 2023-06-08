import { useState } from 'react';
import type { Chain, Hash } from 'viem';
import { SelectChain } from '@/components/ui/SelectChain';
import { SUPPORTED_CHAINS } from '@/lib/constants';
import type { BuildConfig, BuildFramework, VerifyData } from '@/lib/cove-api';

export const Verify = () => {
  const [chain, setChain] = useState<Chain>(SUPPORTED_CHAINS.mainnet);
  const chains = Object.values(SUPPORTED_CHAINS);

  const [formData, setFormData] = useState<VerifyData>({
    repoUrl: '',
    repoCommit: '',
    contractAddress: '0x',
    buildConfig: {
      framework: 'foundry',
      buildHint: 'default',
    },
    creationTxHashes: {},
  });

  // We need to keep track of the tx hashes in a separate state because it's easier to manage this
  // as an array, then just convert it to an object when we need to set `formData.creationTxHashes`.
  type CreationTxHash = { chain: Chain; hash: Hash | undefined };
  const [creationTxHashes, setCreationTxHashes] = useState<CreationTxHash[]>([
    { chain: SUPPORTED_CHAINS.mainnet, hash: undefined },
  ]);
  const handleChainChange = (index: number, chain: Chain) => {
    handleTxHashInput(index, 'chain', chain);
    setChain(chain);
  };

  const handleTxHashInput = (index: number, kind: 'chain' | 'hash', value: string | Chain) => {
    if (kind === 'chain') {
      const chain = value as Chain;
      setCreationTxHashes((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], chain };
        return next;
      });
      console.log('creationTxHashes1:', creationTxHashes);
    } else if (kind === 'hash') {
      const hash = value as unknown as Hash;
      setCreationTxHashes((prev) => {
        const next = [...prev];
        next[index] = { ...next[index], hash };
        return next;
      });
      console.log('creationTxHashes2:', creationTxHashes);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    const key = e.target.id;
    if (['repoUrl', 'repoCommit', 'contractAddress'].includes(key)) {
      setFormData({ ...formData, [key]: e.target.value });
    } else if (key === 'buildHint') {
      setFormData({
        ...formData,
        buildConfig: { ...formData.buildConfig, buildHint: e.target.value },
      });
    } else {
      throw new Error(`Unexpected input ID: ${key}`);
    }
    console.log('formData:', formData);
  };

  return (
    <>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form action='#' method='POST'>
            {/* Repo URL */}
            <label htmlFor='repoUrl' className='block text-sm font-medium leading-6 text-gray-300'>
              Repo URL
            </label>
            <div>
              <input
                id='repoUrl'
                onBlur={handleInput}
                required
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>

            {/* Commit Hash */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='repoCommit'
                className='block text-sm font-medium leading-6 text-gray-300'
              >
                Commit Hash
              </label>
            </div>
            <div>
              <input
                id='repoCommit'
                onBlur={handleInput}
                required
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>

            {/* Contract Address */}
            <div className='mt-4 flex items-center justify-between'>
              <label
                htmlFor='contractAddress'
                className='block text-sm font-medium leading-6 text-gray-300'
              >
                Contract Address
              </label>
            </div>
            <div>
              <input
                id='contractAddress'
                onBlur={handleInput}
                required
                className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>

            {/* Build Configuration */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='block text-sm font-medium leading-6 text-gray-300'>
                Build Configuration
              </label>
            </div>
            <div className='flex items-center'>
              <div>
                <label className='block text-sm leading-6 text-gray-400'>Framework</label>
                <select
                  required
                  // No `onBlur` handler since this is currently the only option.
                  autoComplete='country-name'
                  className='h-9 w-full rounded-md border-0 px-2 py-1.5 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                >
                  <option>Foundry</option>
                </select>
              </div>
              <div className='ml-2 flex-grow'>
                <label className='block text-sm leading-6 text-gray-400'>Profile Name</label>
                <input
                  required
                  id='buildHint'
                  onBlur={handleInput}
                  placeholder='default'
                  className='w-full rounded-md border-0 py-1.5 pl-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            {/* Creation Transaction Hashes */}
            <div className='mt-4 flex items-center justify-between'>
              <label className='block text-sm font-medium leading-6 text-gray-300'>
                Creation Transaction Hashes
              </label>
            </div>

            {creationTxHashes.map((txHash, index) => (
              <div key={index} className='flex items-center'>
                <div>
                  <label className='text-sm leading-6 text-gray-400'>Chain</label>
                  <SelectChain
                    value={creationTxHashes[index].chain}
                    onChange={(chainValue) => handleChainChange(index, chainValue)}
                    options={chains}
                  />
                </div>
                <div className='ml-2 flex-grow'>
                  <label className='block text-sm leading-6 text-gray-400'>Transaction Hash</label>
                  <input
                    required
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleTxHashInput(index, 'hash', e.target.value)
                    }
                    placeholder='default'
                    className='w-full rounded-md border-0 py-1.5 pl-2 text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            ))}
            <button
              className='mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              disabled={creationTxHashes.length === Object.keys(SUPPORTED_CHAINS).length}
              onClick={() => {
                const numChains = Object.keys(SUPPORTED_CHAINS).length;
                if (creationTxHashes.length === numChains) {
                  return;
                }
                handleTxHashInput(creationTxHashes.length, 'chain', SUPPORTED_CHAINS.mainnet);
                handleTxHashInput(creationTxHashes.length, 'hash', '');
              }}
            >
              Add another chain
            </button>
            {creationTxHashes.length > 1 && (
              <button
                className='mt-8 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                onClick={() => {
                  setCreationTxHashes(creationTxHashes.slice(0, -1));
                }}
              >
                Remove a chain
              </button>
            )}

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
