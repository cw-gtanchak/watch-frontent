import { useMyProfile } from 'contexts';
import { useBalanceHistoryQuery } from 'gql';

function useBalanceHistory() {
  const { myProfile } = useMyProfile();
  const { data: balanceHistoryData, loading: isBalanceHistoryLoading } = useBalanceHistoryQuery({
    variables: { userId: myProfile?.id as number },
    skip: !myProfile?.id,
  });
  return { balanceHistoryData: balanceHistoryData?.balanceHistory, isBalanceHistoryLoading };
}

export default useBalanceHistory;
