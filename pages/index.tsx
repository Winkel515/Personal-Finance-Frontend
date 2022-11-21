import { usePlaidLink, PlaidLinkOptions } from 'react-plaid-link';
import axios from 'axios';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  const res = await axios.get(
    `${process.env.SERVER_URL}/link/getToken/${process.env.USER_ID}`
  );
  const link_token: string = res.data.link_token;

  return { props: { link_token } };
};

export default function Home({
  link_token,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();

  const config: PlaidLinkOptions = {
    token: link_token,
    onSuccess: async (public_token) => {
      console.log(public_token);
      await axios.post('/api/link/setAccessToken', {
        userId: 4,
        public_token,
      });
      router.push('/spending');
    },
  };
  const { open, ready } = usePlaidLink(config);

  return (
    <div>
      <h1>Personal Finance</h1>
      <button disabled={!ready} onClick={() => open()}>
        Launch
      </button>
    </div>
  );
}
