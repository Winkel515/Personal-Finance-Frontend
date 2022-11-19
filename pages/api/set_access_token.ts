import { PlaidApi, Configuration, PlaidEnvironments } from 'plaid';
import type { NextApiRequest, NextApiResponse } from 'next';
import dotenv from 'dotenv';

dotenv.config();

const { PLAID_CLIENT_ID, PLAID_SECRET, PLAID_ENV = 'sandbox' } = process.env;

const configuration = new Configuration({
  basePath: PlaidEnvironments[PLAID_ENV],
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': PLAID_CLIENT_ID,
      'PLAID-SECRET': PLAID_SECRET,
      'Plaid-Version': '2020-09-14',
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { public_token } = req.body;
  const tokenResponse = await plaidClient.itemPublicTokenExchange({
    public_token,
  });
  const { access_token } = tokenResponse.data;

  res.json({
    access_token,
  });
}
