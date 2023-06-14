import { useEffect } from 'react';
import { useTheme } from 'next-themes';
import Prism from 'prismjs';
import 'prismjs/components/prism-solidity';
import { SuccessfulVerification } from '@/lib/cove-api';

interface Props {
  data: SuccessfulVerification;
}

export const VerifiedContract = ({ data }: Props) => {
  const defaultChain = Object.keys(data.matches)[0];
  const contractName =
    data.compiler_info.settings.compilationTarget[
      Object.keys(data.compiler_info.settings.compilationTarget)[0]
    ];

  const stats = [
    { name: 'Contract', value: contractName },
    { name: 'Language', value: data.compiler_info.language },
    { name: 'Version', value: data.compiler_info.compiler.split('+')[0] },
    {
      name: 'Creation Code Match Type',
      value: data.matches[defaultChain].creation_code_match_type,
    },
    {
      name: 'Deployed Code Match Type',
      value: data.matches[defaultChain].deployed_code_match_type,
    },
  ];

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

  return (
    <div className='max-w-7xl'>
      <p className='text-secondary mt-4 text-center text-sm italic'>
        Showing data for {defaultChain}
      </p>

      {/* Stats */}
      <div>
        <div className='flex flex-wrap items-center justify-between'>
          {stats.map((stat) => (
            <div key={stat.name} className='py-6'>
              <p className='text-secondary text-sm font-medium leading-6'>{stat.name}</p>
              <p className='mt-2 flex items-baseline gap-x-2'>
                <span className='text-primary text-3xl font-semibold tracking-tight'>
                  {stat.value}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Source code */}
      {data.sources.map((source) => (
        <div key={source.path}>
          <p className='font-mono'>{source.path.split('src/')[1]}</p>
          <pre className='bg-secondary p-4 shadow-sm'>
            <code className='language-solidity'>{source.content}</code>
          </pre>
        </div>
      ))}
    </div>
  );
};
