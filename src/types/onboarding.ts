import { ClassNames, Setter } from './ui';

export type ResponseOption<T> = { label: React.ReactNode; value: T; withInput?: boolean };

export type Response<T> = {
  value?: T;
  extra?: string;
};

export interface QuestionProps<T> {
  header: React.ReactNode;
  text: React.ReactNode;
  options: ResponseOption<T>[];
  value: Response<T>;
  onChange: Setter<Response<T>>;
  classNames?: ClassNames<'optionContainer'>;
}

export type DappType = 'solo-chain' | 'cross-chain';

export type Chain = 'ethereum' | 'polygon' | 'arbitrum' | 'solana' | 'polkadot' | 'other';

export type ProjectType = 'nft' | 'defi' | 'analytics' | 'dao' | 'other';

export type Plan = 'free' | 'standard' | 'business';

export type BillingDetailsType = {
  firstName: string;
  lastName: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  address: string;
};
