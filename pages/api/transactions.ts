import {
  PlaidApi,
  Configuration,
  PlaidEnvironments,
  TransactionsGetRequest,
} from 'plaid';
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
  const access_token = process.env.ACCESS_TOKEN || '';

  const request: TransactionsGetRequest = {
    access_token,
    start_date: '2022-01-01',
    end_date: '2022-12-30',
  };

  const response = await plaidClient.transactionsGet(request);
  const { transactions } = response.data;

  res.json(transactions);
}
