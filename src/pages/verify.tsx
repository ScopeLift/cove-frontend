import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import { Head } from '@/components/layout/Head';

type FormData = {
  contract_address: string;
  repo_url: string;
  repo_commit: string;
};

const Verify: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const [data, setData] = useState<FormData>({
    repo_url: 'https://github.com/ProjectOpenSea/seaport',
    repo_commit: 'd58a91d218b0ab557543c8a292710aa36e693973',
    contract_address: '0x00000000000001ad428e4906aE43D8F9852d0dD6',
  });

  const [result, setResult] = useState<string>('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setResult('');
      const response = await axios.post('http://localhost:8000/verify', {
        contract_address: data.contract_address,
        repo_url: data.repo_url,
        repo_commit: data.repo_commit,
      });
      if (response.status === 200) {
        setResult(response.data);
      } else {
        setResult(`Error: ${response.statusText}`);
      }
    } catch (error: any) {
      setResult(error.message);
    }
  };

  return (
    <div className='Verify mt-8'>
      <div className='input-fields'>
        {Object.keys(data).map((key) => (
          <div key={key}>
            <label htmlFor={key}>
              {key === 'repo_url'
                ? 'Repo URL'
                : key === 'repo_commit'
                ? 'Repo Commit'
                : key === 'contract_address'
                ? 'Contract Address'
                : key}
              :{' '}
            </label>
            <input
              type='text'
              id={key}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:text-white sm:text-sm sm:leading-6'
              name={key}
              value={(data as any)[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <button
        className='rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
        onClick={handleSubmit}
      >
        Verify Contract
      </button>
      {result && (
        <pre style={{ maxWidth: '100vw', overflowX: 'auto' }}>
          <code className='language-json !text-grey-600 dark:text-white' id='json'>
            {result ? JSON.stringify(result, null, 2) : ''}
          </code>
        </pre>
      )}
    </div>
  );
};

export default Verify;
