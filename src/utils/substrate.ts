import { BigNumber } from 'bignumber.js';
import '@polkadot/api-augment/substrate';
import { TypeRegistry } from '@polkadot/types/create';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromSource } from './substrate';
import { ChainProperties, ChainType, InjectedAccountWithMeta } from 'types';

export { web3Accounts, web3Enable, web3FromSource } from '@polkadot/extension-dapp';
export { stringToHex, hexToU8a, u8aToHex, u8aToString, u8aWrapBytes } from '@polkadot/util';

export { ApiPromise, WsProvider };

const registry = new TypeRegistry();

export async function getChainProperties(api: ApiPromise): Promise<ChainProperties> {
  const [chainProperties, systemName, systemVersion, systemChain, systemChainType] =
    await Promise.all([
      api.rpc.system.properties(),
      api.rpc.system.name(),
      api.rpc.system.version(),
      (await api.rpc.system.chain()).toString(),
      api.rpc.system.chainType
        ? api.rpc.system.chainType()
        : Promise.resolve(registry.createType('ChainType', 'Live')),
      api.rpc.system,
    ]);

  const result = {
    genesisHash: api.genesisHash.toHex(),
    systemName: systemName.toString(),
    systemVersion: systemVersion.toString(),
    systemChainType: systemChainType as ChainType,
    systemChain,
    tokenDecimals: chainProperties.tokenDecimals.isSome
      ? chainProperties.tokenDecimals.unwrap().toArray()[0].toNumber()
      : 10,
    tokenSymbol: chainProperties.tokenSymbol.isSome
      ? chainProperties.tokenSymbol
          .unwrap()
          .toArray()
          .map((s) => s.toString())[0]
      : 'Unit',
  };

  return result;
}

export async function depositAmount(
  api: ApiPromise,
  account: InjectedAccountWithMeta,
  amount: number,
  tokenDecimals: number
): Promise<{ status: number; msg: string } | string | unknown> {
  if (account && (await api.isReady)) {
    const injector = await web3FromSource(account.meta.source);
    const value = new BigNumber(amount).multipliedBy(10 ** tokenDecimals).toNumber();
    const results = await api.tx.timegraph
      .deposit(import.meta.env.VITE_TIMEGRAPH_ACCOUNT_ADDRESS, value)
      .signAndSend(account.address, { signer: injector.signer });
    return results.toJSON();
  }
}
/*
usage
const {api, account, chainProps: { tokenDecimals } } = useApi();   ,
const value = new BigNumber(0.01).multipliedBy(10 ** tokenDecimals).toNumber();
const results = await depositAmount(api, account, value);
*/
