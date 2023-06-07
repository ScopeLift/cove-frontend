import { Address, Hash } from 'viem';
import { COVE_API_URL } from './constants';

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

async function verifyContract(form: VerifyData): Promise<any> {
  const response = await fetch(COVE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Request failed.\nStatus: ${response.status}\nMessage: ${errorData.message}`);
  }

  return response.json();
}
