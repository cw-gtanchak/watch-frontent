import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Maybe } from 'types';
import { pathTo } from 'utils';
import {
  PublisherDetailsFragment,
  UserStatsType,
  usePublisherLazyQuery,
  useUserStatsQuery,
} from 'gql';
import { useBreadCrumbsChild } from 'hooks/useBreadCrumbs';

interface Value {
  publisher?: Maybe<PublisherDetailsFragment>;
  isLoading: boolean;
  publisherStats?: UserStatsType;
}

export const ProfileContext = createContext<Value | undefined | null>({} as Value);

export function PublisherProvider({ children }: React.PropsWithChildren) {
  const { id: address } = useParams();
  const navigate = useNavigate();

  useBreadCrumbsChild({ page: 'Publisher', params: [address] }, [{ page: 'Library' }]);

  const [fetchPublisher, { loading: isLoading, error }] = usePublisherLazyQuery();

  const [publisher, setPublisher] = useState<Maybe<PublisherDetailsFragment>>();

  const { data: publisherStats } = useUserStatsQuery({
    variables: { userId: publisher?.id as number },
    skip: !publisher?.id,
    fetchPolicy: 'cache-and-network',
  });

  const value = useMemo(
    () => ({ isLoading, publisher, publisherStats: publisherStats?.UserStats }),
    [publisher, isLoading, publisherStats]
  );

  useEffect(() => {
    if (address) {
      fetchPublisher({ variables: { address } }).then(({ data }) => setPublisher(data?.publisher));
    }
  }, [address, fetchPublisher]);

  useEffect(() => {
    if (error?.message === 'PUBLISHER_NOT_FOUND') {
      navigate(pathTo('NotFound'), { replace: true });
    }
  }, [navigate, address, isLoading, publisher, error?.message]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export const usePublisher = (): Value => {
  const value = useContext(ProfileContext);

  if (!value) {
    return {} as Value;
  }

  return value;
};
