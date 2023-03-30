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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='chain'>Chain:</label>
        <input
          type='text'
          id='chain'
          name='chain'
          value={formData.chain}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor='address'>Address:</label>
        <input
          type='text'
          id='address'
          name='address'
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <button type='submit'>Submit</button>
    </form>
  );
}
