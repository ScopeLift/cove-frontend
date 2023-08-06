import { InformationCircleIcon } from '@heroicons/react/20/solid';

export const Tooltip = ({ text, width = 24 }: { text: string; width?: number }) => {
  return (
    <div className='group relative'>
      <InformationCircleIcon width={width} />
      <span className='bg-secondary absolute -right-20 top-10 z-50 w-56 scale-0 rounded border border-gray-300 p-2 text-xs group-hover:scale-100 dark:border-gray-900'>
        {text}
      </span>
    </div>
  );
};
