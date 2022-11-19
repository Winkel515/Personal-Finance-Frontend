import dotenv from 'dotenv';
import {
  LinkTokenCreateRequest,
  Products,
  CountryCode,
  PlaidApi,
  Configuration,
  PlaidEnvironments,
} from 'plaid';
import type { NextApiRequest, NextApiResponse } from 'next';
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
  switch (req.method) {
    case 'POST':
      const request: LinkTokenCreateRequest = {
        user: {
          // This should correspond to a unique id for the current user.
          client_user_id: 'user-id',
        },
        client_name: 'Plaid Quickstart',
        products: [Products.Transactions],
        country_codes: [CountryCode.Ca],
        language: 'en',
      };

      const response = await plaidClient.linkTokenCreate(request);
      return res.json(response.data);
    default:
      return res.status(404).json({ message: 'Not Found', status: 404 });
  }
}
