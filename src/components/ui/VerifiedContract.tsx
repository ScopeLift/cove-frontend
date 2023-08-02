import { useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useTheme } from 'next-themes';
import Prism from 'prismjs';
import 'prismjs/components/prism-solidity';
import { SuccessfulVerification } from '@/lib/cove-api';
import { Tooltip } from './Tooltip';

interface Props {
  data: SuccessfulVerification;
}

export const VerifiedContract = ({ data }: Props) => {
  // -------- Verification Data Formatting --------
  const defaultChain = Object.keys(data.matches)[0];
  const contractName =
    data.compiler_info.settings.compilationTarget[
      Object.keys(data.compiler_info.settings.compilationTarget)[0]
    ];

  const matchTypeTooltipText =
    'A full match means the executable bytecode and metadata hash both matched, and a partial match mean the executable bytecode matched but the metadata hash did not.';
  const stats = [
    { name: 'Contract', value: contractName },
    { name: 'Language', value: data.compiler_info.language },
    { name: 'Version', value: data.compiler_info.compiler.split('+')[0] },
    {
      name: 'Creation Code Match Type',
      value: data.matches[defaultChain].creation_code_match_type,
      tooltipText: matchTypeTooltipText,
    },
    {
      name: 'Deployed Code Match Type',
      value: data.matches[defaultChain].deployed_code_match_type,
      id: 'deployed-code-match-type',
      tooltipText: matchTypeTooltipText,
    },
  ];

  // The API ensures the first item in the `sources` array is the contract we're verifying, but the
  // rest are unordered. We sort them here so `src/*.sol` comes first, then `src/**/*.sol`, then
  // everything else is alphabetical.
  data.sources.sort((a, b) => {
    // Do not move the first item.
    if (a === data.sources[0]) return -1;
    if (b === data.sources[0]) return 1;

    // Otherwise, sort based on the above criteria.
    const isARootSrcFile = a.path.startsWith('src/') && !a.path.includes('/', 4);
    const isBRootSrcFile = b.path.startsWith('src/') && !b.path.includes('/', 4);
    const isANestedSrcFile = a.path.startsWith('src/') && a.path.includes('/', 4);
    const isBNestedSrcFile = b.path.startsWith('src/') && b.path.includes('/', 4);

    if (isARootSrcFile && !isBRootSrcFile) return -1; // a comes first.
    else if (!isARootSrcFile && isBRootSrcFile) return 1; // b comes first.
    else if (isANestedSrcFile && !isBNestedSrcFile) return -1; // a comes first.
    else if (!isANestedSrcFile && isBNestedSrcFile) return 1; // b comes first.
    else return a.path.localeCompare(b.path); // Compare alphabetically.
  });

  // -------- Source Code Highlighting --------
  // This is required to highlight the code.
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // We conditionally import the Prism theme based on the current theme, to adjust the syntax
  // highlighting to the theme. The logic in the `importTheme` function combined with the presence
  // of the `prism-light.css` and `prism-dark.css` files in the `public` folder is what allows us
  // to ensure all styles from the light theme are removed when the user toggles to the dark theme,
  // and vice versa. Without this, if we just imported both themes, the styles from both themes
  // would be present in the DOM, and the user would see a weird mix of light and dark styles.
  const { resolvedTheme: theme } = useTheme();
  useEffect(() => {
    const importTheme = async () => {
      // Define the new stylesheet href based on the theme and get it's element.
      const newStylesheetHref = theme === 'dark' ? '/prism-dark.css' : '/prism-light.css';
      const existingStylesheet = document.getElementById('dynamic-stylesheet');

      // If there's an existing stylesheet, remove it.
      existingStylesheet?.parentNode?.removeChild(existingStylesheet);

      // Create a new element for the new stylesheet, and append the stylesheet to the head.
      const newStylesheet = document.createElement('link');
      newStylesheet.rel = 'stylesheet';
      newStylesheet.type = 'text/css';
      newStylesheet.href = newStylesheetHref;
      newStylesheet.id = 'dynamic-stylesheet';
      document.head.appendChild(newStylesheet);
    };
    importTheme();
  }, [theme]);

  // -------- Render --------
  return (
    <>
      <div className='mx-auto mt-10 rounded-md bg-green-50 p-4 dark:bg-green-900 sm:w-full sm:max-w-sm'>
        <div className='flex items-center justify-center'>
          <div>
            <CheckCircleIcon
              className='h-12 w-12 text-green-400 dark:text-green-500'
              aria-hidden='true'
            />
          </div>
          <div className='ml-3'>
            <h3 className='text-sm font-medium text-green-800 dark:text-green-100'>
              Verification successful!
            </h3>
            <div className='mt-1 text-xs text-green-700 dark:text-green-200'>
              <p>Showing data for {defaultChain}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto mt-10 max-w-7xl'>
        {/* Stats */}
        <div>
          <div className='flex flex-wrap items-center justify-between'>
            {stats.map((stat) => (
              <div key={stat.name} className='py-6'>
                <p className='text-secondary text-sm font-medium leading-6'>{stat.name}</p>
                <p className='mt-2 flex items-center gap-x-2'>
                  <span className='text-primary text-3xl font-semibold tracking-tight'>
                    {stat.value}
                  </span>
                  {stat.tooltipText && <Tooltip text={stat.tooltipText} />}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Source code */}
        {data.sources.map((source, index) => (
          <div key={source.path} className='mt-10'>
            <p>
              File {index + 1} of {data.sources.length}:{' '}
              <span className='font-mono'>{source.path}</span>
            </p>
            <pre className='bg-secondary p-4 shadow-sm'>
              <code className='language-solidity'>{source.content}</code>
            </pre>
          </div>
        ))}
      </div>
    </>
  );
};
