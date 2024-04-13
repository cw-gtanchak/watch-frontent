import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { useApi } from 'contexts';

export function useBalance(address?: string): BigNumber | undefined {
  const { api, isReady } = useApi();
  const { data: result } = useQuery({
    queryKey: ['balance', address],
    queryFn: ({ queryKey }): Promise<BigNumber | undefined> => {
      if (!queryKey[1]) {
        return Promise.resolve(undefined);
      }

      return api.derive.balances
        .account(queryKey[1])
        .then(({ freeBalance }) => new BigNumber(freeBalance.toString()))
        .catch(() => new BigNumber(0));
    },
    enabled: isReady,
  });

  return result;
}
