import { web3FromSource } from '@polkadot/extension-dapp';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import init, { build_apikey, new_cert } from '@analog-labs/timegraph-wasm/web/lib';
import { hexToU8a } from './substrate';
import { u8aToHex } from '@polkadot/util';

type GeneratedApiKey = {
  key: string;
  secret: string;
  cert: string;
};

export async function generateApiKey(account: InjectedAccountWithMeta): Promise<GeneratedApiKey> {
  await init();

  const injector = await web3FromSource(account.meta.source);
  const signRaw = injector?.signer?.signRaw;
  const owner = account.address;

  const [cert_data, secret] = new_cert(owner, 'developer');

  if (signRaw) {
    const { signature } = await signRaw({
      address: account.address,
      data: u8aToHex(cert_data),
      type: 'bytes',
    });

    const apiKey = build_apikey(secret, cert_data, hexToU8a(signature));

    return apiKey;
  }

  throw new Error('Unable to create API key with this account');
}
