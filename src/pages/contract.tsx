import { useState } from 'react';
import { useRouter } from 'next/router';

interface ContractFormData {
  chain: string;
  address: string;
}

export default function ContractFormPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<ContractFormData>({
    chain: 'polygon',
    address: '0x406B940c7154eDB4Aa2B20CA62fC9A7e70fbe435',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { chain, address } = formData;
    router.push(`/${chain}/${address}`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className='mt-8 flex flex-col items-center justify-center'>
      <div className='w-1/2'>
        <div className='my-3'>
          <label htmlFor='address'>Chain:</label>
          <select
            id='location'
            name='chain'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:text-white sm:text-sm sm:leading-6'
            defaultValue='Polygon'
            value={formData.chain}
            onChange={(e) => setFormData({ ...formData, chain: e.target.value })}
          >
            <option value='ethereum'>Ethereum</option>
            <option value='polygon'>Polygon</option>
            <option value='optimism'>Optimism</option>
            <option value='gnosis'>Gnosis</option>
            <option value='goerli'>Goerli</option>
          </select>
        </div>
        <div className='my-3'>
          <label htmlFor='address'>Address:</label>
          <input
            type='text'
            id='address'
            className='block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:text-white sm:text-sm sm:leading-6'
            name='chain'
            value={formData.address}
            onChange={handleInputChange}
          />
        </div>
        <div className='my-6 flex justify-center'>
          <button
            className='rounded-md bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600'
            type='submit'
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}
