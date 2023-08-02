import { Address, Hash } from 'viem';

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
export type SuccessfulVerification = {
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
