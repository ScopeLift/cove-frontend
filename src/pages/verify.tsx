import { Head } from '@/components/layout/Head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from "axios";

import Prism from "prismjs";

type FormData = {
  contract_address: string;
  repo_url: string;
  repo_commit: string;
};

const Verify: React.FC = () => {

  const router = useRouter();
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  const [data, setData] = useState<FormData>({
    repo_url: "",
    repo_commit: "",
    contract_address: "",
  });
  const [result, setResult] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      setResult("");
      const response = await axios.post("http://localhost:8000/verify",
        {
        contract_address: data.contract_address,
        repo_url: data.repo_url,
        repo_commit: data.repo_commit,
      });
      if (response.status === 200) {
        setResult(response.data);        
      } else {
        setResult(`Error: ${response.statusText}`);
      }
    } catch (error: any) {
       setResult(error.message);
    }
  };

  return (
    <div className="Verify">
      <button className="verify-button" onClick={handleSubmit}>
        Verify Contract
      </button>
      <div className="input-fields">
        {Object.keys(data).map((key) => (
          <div key={key}>
            <label htmlFor={key}>{key}: </label>
            <input
              type="text"
              id={key}
              name={key}
              value={(data as any)[key]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="results">Results: </label>
        <input type="text" id="results" value={result} readOnly />
      </div>
    </div>
  );
};

export default Verify;

