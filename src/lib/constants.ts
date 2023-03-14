import { goerli, mainnet } from '@wagmi/chains';

export const SITE_NAME = 'Cove';
export const SITE_DESCRIPTION = 'Robust, open-source contract verification for the EVM';
export const COMPANY_NAME = 'ScopeLift';
export const COMPANY_URL = 'https://www.scopelift.co/';
export const GITHUB_URL = 'https://github.com/ScpopeLift/cove-frontend';
export const TWITTER_URL = 'https://twitter.com/ScopeLift';

export const SUPPORTED_CHAINS = [
  mainnet,
  ...(process.env.NODE_ENV === 'development' ? [goerli] : []),
];
