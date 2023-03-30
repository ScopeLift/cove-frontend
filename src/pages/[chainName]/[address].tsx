import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Prism from 'prismjs';
import 'prismjs/components/prism-solidity';
import { Footer } from '@/components/layout/Footer';
import { Head } from '@/components/layout/Head';
import { getChainIdFromName } from '@/utils';

interface Response {
  chain_id: string;
  address: string;
  verified: boolean;
  abi: string;
  bytecode: string;
  disassembled: string;
  solidity: string;
}

const Contract = () => {
  const router = useRouter();
  const [result, setResult] = useState<Response>();
  const [chainId, setChainId] = useState<number>();
  const { chainName, address } = router.query;
  useEffect(() => {
    Prism.highlightAll();
  }, [result]);

  useEffect(() => {
    if (chainName) {
      const chainId = getChainIdFromName(chainName as string);
      setChainId(chainId);
    }
    if (chainId) {
      handleSubmit(chainId, address as string);
    }
  }, [chainId, address, chainName]);

  const handleSubmit = async (chainId: number, address: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/contract?chain_id=${chainId}&address=${address}`
      );
      if (response.status === 200) {
        setResult(response.data);
      } else {
        console.log(`Error: ${response.statusText}`);
      }
    } catch (error: any) {
      setResult(error.message);
    }
  };

  return (
    <>
      <Head />
      <div>chain: {chainName}</div>
      <div>contract: {address}</div>

      <h1 className='mt-4 text-xl'>ABI</h1>
      <pre>
        <code className='language-javascript'>{result?.abi && `${result.abi}`}</code>
      </pre>

      <h1 className='mt-4 text-xl'>Source Code</h1>
      <pre>
        <code className='language-solidity'>
          {`
            ${result?.solidity && `${result.solidity}`}
          `}
        </code>
      </pre>
    </>
  );
};

export default Contract;
