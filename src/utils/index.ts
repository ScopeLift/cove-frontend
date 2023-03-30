export const getChainIdFromName = (chainName: string): number => {
  let chainId: number | undefined;

  switch (chainName) {
    case 'ethereum':
      chainId = 1;
      break;
    case 'polygon':
      chainId = 137;
      break;
    case 'optimism':
      chainId = 10;
      break;
    case 'goerli':
      chainId = 5;
      break;
    case 'gnosis':
      chainId = 1313114;
      break;
    default:
      chainId = 1;
      console.log(`Invalid chain name: ${chainName}`);
  }

  return chainId;
};
