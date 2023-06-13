import { useEffect, useState } from 'react';
import { Address, Hash } from 'viem';
import { COVE_API_URL } from '@/lib/constants';

export type BuildFramework = 'foundry';

export type BuildConfig = {
  framework: BuildFramework;
  buildHint?: string; // For forge, this is the profile name.
};

export type VerifyData = {
  repoUrl: string;
  repoCommit: string;
  contractAddress: Address;
  buildConfig: BuildConfig;
  creationTxHashes?: Record<string, Hash>; // The string is the chain name, e.g. "mainnet".
};

// TODO clean up this type.
type SuccessfulVerification = {
  repo_url: string;
  repo_commit: string;
  contract_address: Address;
  matches: {
    [key: string]: {
      artifact: string;
      creation_code_match_type: string;
      deployed_code_match_type: string;
    };
  };
  creation_tx_hash: Hash;
  creation_block_number: number;
  creation_code: string;
  sources: Array<{
    path: string;
    content: string;
  }>;
  runtime_code: string;
  creation_bytecode: {
    object: string;
    sourceMap: string;
    linkReferences: {};
  };
  deployed_bytecode: {
    object: string;
    sourceMap: string;
    linkReferences: {};
  };
  abi: Array<{
    inputs: Array<{
      internalType: string;
      name: string;
      type: string;
    }>;
    name: string;
    outputs?: Array<{
      internalType: string;
      name: string;
      type: string;
    }>;
    stateMutability: string;
    type: string;
  }>;
  compiler_info: {
    compiler: string;
    language: string;
    settings: {
      remappings: Array<string>;
      optimizer: {
        enabled: boolean;
        runs: number;
      };
      metadata: {
        bytecodeHash: string;
      };
      compilationTarget: {
        [key: string]: string;
      };
      libraries: {};
    };
  };
  ast: {
    absolutePath: string;
    id: number;
    exportedSymbols: {
      [key: string]: Array<number>;
    };
    nodeType: string;
    src: string;
    nodes: Array<any>;
  };
};

type UseVerificationResult = {
  data: SuccessfulVerification | null;
  error: string | null;
  isLoading: boolean;
};

export const useVerifyContract = (form: VerifyData): UseVerificationResult => {
  const [data, setData] = useState<SuccessfulVerification | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(NEXT_PUBLIC_COVE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `Request failed.\nStatus: ${response.status}\nMessage: ${errorData.message}`
          );
        }

        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(`An unexpected error occurred: ${JSON.stringify(err)}`);
        }
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [form]);

  return { data, error, isLoading };
};
