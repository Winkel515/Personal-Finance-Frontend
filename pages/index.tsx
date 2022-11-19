import { usePlaidLink, PlaidLinkOptions } from 'react-plaid-link';
import axios from 'axios';

import { useEffect, useState } from 'react';

export default function Home() {
  const [linkToken, setLinkToken] = useState('');
  const config: PlaidLinkOptions = {
    token: linkToken,
    onSuccess: (public_token) => {
      console.log(public_token);
    },
  };
  const { open, ready } = usePlaidLink(config);

  useEffect(() => {
    const fetchLinkToken = async () => {
      const res = await axios.post('/api/create_link_token');
      setLinkToken(res.data.link_token);
    };
    fetchLinkToken();
  }, []);

  return (
    <div>
      <h1>{linkToken}</h1>
      <button disabled={!ready} onClick={() => open()}>
        Launch
      </button>
    </div>
  );
}
