import { usePlaidLink, PlaidLinkOptions } from 'react-plaid-link';
import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = async () => {
  const res = await axios.get(`${process.env.SERVER_URL}/link-token`);
  const link_token: string = res.data.link_token;

  return { props: { link_token } };
};

export default function Home({
  link_token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const config: PlaidLinkOptions = {
    token: link_token,
    onSuccess: (public_token) => {
      axios.post('/api/link-token', { public_token });
    },
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <div>
      <h1>{link_token}</h1>
      <button disabled={!ready} onClick={() => open()}>
        Launch
      </button>
    </div>
  );
}
