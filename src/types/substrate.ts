import type { VoidFn } from '@polkadot/api/types';
import type { ChainType } from '@polkadot/types/interfaces';

export type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
export { ChainType, VoidFn };

export interface ChainProperties {
  tokenDecimals: number;
  systemName: string | null;
  systemVersion: string | null;
  systemChainType: ChainType;
  systemChain: string;
  tokenSymbol: string;
  genesisHash: string;
}
