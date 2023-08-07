import { arbitrum, gnosis, goerli, mainnet, optimism, polygon, sepolia } from 'viem/chains';

export const SITE_NAME = 'Cove';
export const SITE_DESCRIPTION = 'Robust, open-source contract verification for the EVM';
export const COMPANY_NAME = 'ScopeLift';
export const COMPANY_URL = 'http://covecontracts.com/';
export const GITHUB_URL = 'https://github.com/ScpopeLift/cove-backend';
export const TWITTER_URL = 'https://twitter.com/ScopeLift';

export const IS_DEV_MODE = process.env.NODE_ENV === 'development';

export const SUPPORTED_CHAINS = { arbitrum, gnosis, goerli, mainnet, optimism, polygon, sepolia };
export const COVE_API_URL = process.env.NEXT_PUBLIC_COVE_API_URL || 'https://api.covecontracts.com';

export const REQUIRED_FIELD_MSG = 'This field is required';
