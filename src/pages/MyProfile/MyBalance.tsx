import { FormatBalance, Image, Skeleton } from 'components';
import { useApi, useMyProfile } from 'contexts';

export function MyBalance() {
  const { account, isReady } = useApi();
  const { myBalance } = useMyProfile();

  if (!account) {
    return null;
  }

  return (
    <div className="card flex items-center justify-start p-5">
      <Image src="/wallet-balance.png" src2x="/wallet-balance@2x.png" className="mr-6 h-20 w-20" />
      <div>
        <div className="mb-2 text-sm text-neutral-500">
          <Skeleton.Loader className="w-32">Account Balance</Skeleton.Loader>
        </div>
        <div className="sm:text-4xl text-2xl font-bold uppercase">
          <Skeleton.Loader isLoading={!isReady} className="w-60">
            {myBalance && <FormatBalance value={myBalance} />}
          </Skeleton.Loader>
        </div>
      </div>
    </div>
  );
}
