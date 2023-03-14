import { getNetwork } from '@wagmi/core';
import { isHex } from 'viem';

export const classNames = (...classes: string[]) => classes.filter(Boolean).join(' ');

export const etherscanUrl = (txHashOrAddress: string) => {
  const group = isHex(txHashOrAddress) ? (txHashOrAddress.length === 42 ? 'address' : 'tx') : 'ens';

  const blockExplorer = getNetwork().chain?.blockExplorers?.default.url || 'https://etherscan.io';
  return group === 'ens'
    ? `${blockExplorer}/enslookup-search?search=${txHashOrAddress}`
    : `${blockExplorer}/${group}/${txHashOrAddress}`;
};
