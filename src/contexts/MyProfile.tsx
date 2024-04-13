import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { default as BigNumber } from 'bignumber.js';
import { useLocalStorage } from 'usehooks-ts';
import { useCookies } from 'react-cookie';
import { useApi } from './Api';
import { useBalance, useMyProfileLazyQuery } from 'hooks';
import { ApiKey, FundExchangefn, InjectedAccountWithMeta, Maybe, Network, Setter } from 'types';
import { depositAmount, pathTo } from 'utils';
import {
  PublisherDetailsFragment,
  UserStatsType,
  useUserBalanceQuery,
  useUserStatsQuery,
  useWidthdrawTokensMutation,
} from 'gql';

interface Value {
  myProfile?: Maybe<PublisherDetailsFragment>;
  userStats?: UserStatsType;
  myBalance?: BigNumber;
  hasKeys: boolean;
  apiKeys?: Maybe<ApiKey[]>;
  isActive: boolean;
  isLoading: boolean;
  setIsActive: Setter<boolean>;
  isCreateVisible: boolean;
  setIsCreateVisible: Setter<boolean>;
  accountBalance: BigNumber;
  depositFund: FundExchangefn;
  withDrawFund: FundExchangefn;
  isFundExchangeLoading: boolean;
}

export const MyProfileContext = createContext<Value>({
  myBalance: undefined,
} as unknown as Value);

export function MyProfileProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const {
    api,
    account,
    sessionKey,
    isReady,
    chainProps: { tokenDecimals },
  } = useApi();
  const [isActive, setIsActive] = useLocalStorage('my-profile-isActive', true);
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isDepositLoading, setDepositLoading] = useState(false);
  const [{ account: accountCookie, sessionKey: sessionKeyCookie }] = useCookies([
    'account',
    'sessionKey',
  ]);

  const [fetchMyProfile, { data: myProfileQuery, loading: isMyProfileLoading }] =
    useMyProfileLazyQuery({ fetchPolicy: 'cache-and-network' });

  const { data: userStats } = useUserStatsQuery({
    variables: { userId: myProfileQuery?.myProfile?.id as number },
    skip: !myProfileQuery?.myProfile?.id,
    fetchPolicy: 'cache-and-network',
  });

  const { data: accountBalance, refetch: refetchAccountBalance } = useUserBalanceQuery({
    variables: { sessionKey: sessionKeyCookie },
  });

  const [WithdrawToken, { loading: isWithdrawLoading }] = useWidthdrawTokensMutation();

  const depositFund: FundExchangefn = useCallback(
    ({ amount, setFundRefAddress, setError }) => {
      setDepositLoading(true);
      depositAmount(api, account as InjectedAccountWithMeta, amount, tokenDecimals)
        .then((res) => {
          setFundRefAddress(res as string);
          setDepositLoading(false);
          refetchAccountBalance();
        })
        .catch((err) => {
          setDepositLoading(false);
          setError(
            'An error occurred with the provided deposit amount. Please try again with a valid amount.'
          );
          // setError(err.data || err.message);
        });
    },
    [account, api, refetchAccountBalance, tokenDecimals]
  );

  const withDrawFund: FundExchangefn = useCallback(
    ({ amount, setFundRefAddress, setError }) => {
      WithdrawToken({
        variables: {
          data: { amount: new BigNumber(amount).multipliedBy(10 ** tokenDecimals).toString() },
          address: account?.address,
          sessionKey: sessionKeyCookie,
        },
        onCompleted: (data) => {
          setFundRefAddress(data.widthdrawTokensMutation.status as string);
          refetchAccountBalance();
        },
        onError: (error) => {
          setError(
            'An error occurred with the provided withdraw amount. Please try again with a valid amount.'
          );
        },
      });
    },
    [WithdrawToken, account?.address, refetchAccountBalance, sessionKeyCookie, tokenDecimals]
  );

  const myBalance = useBalance(account?.address);

  const value = useMemo(() => {
    const apiKeys = [...(myProfileQuery?.apiKeys || [])].sort(
      (a, b) => +new Date(b?.createdAt) - +new Date(a?.createdAt)
    );
    return {
      myProfile: myProfileQuery?.myProfile,
      userStats: userStats?.UserStats,
      apiKeys,
      hasKeys: !!apiKeys && apiKeys.length > 0,
      isActive,
      isLoading: isMyProfileLoading || !myBalance || !isReady,
      myBalance,
      setIsActive,
      isCreateVisible,
      setIsCreateVisible,
      accountBalance: new BigNumber(Number(accountBalance?.userBalance?.balance)),
      depositFund,
      withDrawFund,
      isFundExchangeLoading: isDepositLoading || isWithdrawLoading,
    };
  }, [
    userStats,
    myProfileQuery?.apiKeys,
    myProfileQuery?.myProfile,
    isActive,
    isMyProfileLoading,
    myBalance,
    isReady,
    setIsActive,
    isCreateVisible,
    accountBalance?.userBalance?.balance,
    depositFund,
    withDrawFund,
    isDepositLoading,
    isWithdrawLoading,
  ]);

  useEffect(() => {
    if (account?.address && sessionKey) {
      fetchMyProfile({ variables: { address: account?.address, sessionKey } });
      refetchAccountBalance();
    } else if (!accountCookie?.address && !sessionKeyCookie) {
      navigate(pathTo('Landing'));
    }
  }, [account?.address, sessionKey, fetchMyProfile]);

  return <MyProfileContext.Provider value={value}>{children}</MyProfileContext.Provider>;
}

export const useMyProfile = () => useContext(MyProfileContext);
