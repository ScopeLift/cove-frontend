import Link from 'next/link';
import { ExternalLink } from '@/components/layout/ExternalLink';
import { Head } from '@/components/layout/Head';
import { SITE_DESCRIPTION } from '@/lib/constants';

const Home = () => {
  const faqs = [
    {
      question: 'What is Cove?',
      answer: (
        <>
          Cove is a novel approach to contract verification that aims to solve the{' '}
          <ExternalLink text='problems' href='https://github.com/ScopeLift/cove-backend#why' /> of
          existing verification tools.
        </>
      ),
    },
    {
      question: 'How does it work?',
      answer: (
        <>
          Instead of requiring you to submit a large JSON file or flattened solidity code, Cove asks
          for git information and framework settings (e.g. use forge with the{' '}
          <code className='text-sm'>default</code> profile) for the contracts you want to verify.
          For now it also asks for transaction hashes, but we plan to remove this in the future.
        </>
      ),
    },
    {
      question: 'What are the limitations?',
      answer: (
        <>
          Cove is currently in alpha. We don&apos;t currently store or expose the contract
          verification data. By trying out Cove, you&apos;re helping us learn and improve. The
          current version also has limited functionality:
          <ul className='list-disc pl-8'>
            <li>Only forge projects are supported.</li>
            <li>Only Solidity contracts are supported.</li>
            <li>
              Verified contracts are not saved in a database anywhere. Verifying contracts on the{' '}
              <Link href='/verify' className='hyperlink'>
                verify
              </Link>{' '}
              page solely helps us improve Cove before the official release (and hopefully gets you
              excited about the future of contract verification).
            </li>
            <li>
              Cove does not yet trace calls or search for deployment transactions. This means:
              <ul className='list-disc pl-8'>
                <li>You must provide the transaction on the verification form.</li>
                <li>
                  Contracts deployed from arbitrary factory contracts cannot yet be verified. Only
                  contracts deployed via a standard <code className='text-sm'>create</code>{' '}
                  deployment, Nick Johnson&apos;s <code className='text-sm'>create2</code>{' '}
                  <ExternalLink
                    text='deployer'
                    href='https://github.com/Arachnid/deterministic-deployment-proxy'
                  />
                  , or 0age&apos;s <code className='text-sm'>create2</code>{' '}
                  <ExternalLink
                    text='deployer'
                    href='https://etherscan.io/address/0x0000000000FFe8B47B3e2130213B802212439497'
                  />{' '}
                  are supported.
                </li>
              </ul>
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'I like Cove, how can I help it succeed?',
      answer: (
        <>
          Try{' '}
          <Link href='/verify' className='hyperlink'>
            verifying
          </Link>{' '}
          a contract! This is a public goods project funded solely by hackathon{' '}
          <ExternalLink text='prizes' href='https://ethglobal.com/showcase/cove-8ohfk' />, so
          consider donating to <code className='text-sm'>covecontracts.eth</code> or nominating us
          for the{' '}
          <ExternalLink
            text='upcoming'
            href='https://optimism.mirror.xyz/oVnEz7LrfeOTC7H6xCXb5dMZ8Rc4dSkD2KfgG5W9cCw'
          />{' '}
          Optimism RPGF round.
        </>
      ),
    },
  ];

  return (
    <>
      <Head />

      {/* Header */}
      <h1 className='text-accent text-center text-base font-semibold'>
        <Link href='/verify' className='max-w-prose text-sm font-semibold'>
          Test Cove →
        </Link>
      </h1>
      <p className='mt-2 text-center text-3xl font-bold tracking-tight sm:text-4xl '>
        {SITE_DESCRIPTION}
      </p>

      {/* Content */}
      <div className='flex flex-1 justify-center pt-10'>
        <dl className='max-w-prose space-y-6'>
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className='text-primary font-semibold leading-7'>{faq.question}</dt>
              <dd className='text-secondary mt-1 leading-7'>{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className='mt-10 flex flex-1 justify-center'>
        <Link href='/verify' className='btn-primary max-w-prose'>
          Test Cove now →
        </Link>
      </div>
    </>
  );
};

export default Home;
