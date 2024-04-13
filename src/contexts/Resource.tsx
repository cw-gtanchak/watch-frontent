import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import omitDeep from 'omit-deep-lodash';
import {
  ResourceQuery,
  SearchType as ResourceType,
  SmartContract,
  View,
  useRecentDataLazyQuery,
} from 'gql';
import { useResourceQuery } from 'hooks';
import { pathTo } from 'utils';
import { Maybe, VoidFn } from 'types';

type Resource = ResourceQuery['resource'];

interface Value<T extends Resource = Resource> {
  resource: T;
  recentData?: Maybe<unknown[]>;
  isRecentDataLoading?: boolean;
  refreshRecentData?: VoidFn;
  smartContractAbi: string;
  isResourceLoading?: boolean;
}

export const ResourceContext = createContext<Value>({ resource: undefined, smartContractAbi: '' });

export function ResourceProvider({
  children,
  type,
}: React.PropsWithChildren<{ type: ResourceType }>) {
  const navigate = useNavigate();
  const { id: identifier } = useParams<{ id?: string }>();

  const [recentData, setRecentData] = useState<Maybe<unknown[]>>();

  const {
    data: resourceQuery,
    error,
    loading: isResourceLoading,
  } = useResourceQuery({
    variables: { request: { identifier: identifier || '', type } },
  });

  const [executeRecentDataQuery, { loading: isRecentDataLoading }] = useRecentDataLazyQuery({
    fetchPolicy: 'network-only',
  });

  const refreshRecentData = useCallback(async () => {
    if (identifier && type !== ResourceType.SmartContracts) {
      const update = await executeRecentDataQuery({ variables: { request: { identifier, type } } });

      setRecentData(update?.data?.recentData);
    }
  }, [executeRecentDataQuery, identifier, type]);

  const smartContractAbi = useMemo(() => {
    if (resourceQuery?.resource?.__typename === 'SmartContract') {
      try {
        const smartContract = resourceQuery.resource;
        return JSON.stringify(
          omitDeep(smartContract?.functions?.map((fn) => fn.contract?.abi) || [], ['__typename'])
        );
      } catch (e) {
        return '[]';
      }
    } else {
      return '[]';
    }
  }, [resourceQuery?.resource]);

  const value = useMemo(
    () => ({
      isRecentDataLoading,
      resource: resourceQuery?.resource,
      recentData,
      refreshRecentData,
      smartContractAbi,
      isResourceLoading,
    }),
    [isRecentDataLoading, recentData, refreshRecentData, resourceQuery?.resource, isResourceLoading]
  );

  useEffect(() => {
    if (error?.message === 'No View found' || error?.message === 'No SmartContract found') {
      navigate(pathTo('NotFound'), { replace: true });
    }
  }, [navigate, error?.message]);

  useEffect(() => {
    refreshRecentData();
  }, [refreshRecentData]);
  return <ResourceContext.Provider value={value}>{children}</ResourceContext.Provider>;
}

export const useResource = <T extends Resource>() => useContext(ResourceContext) as Value<T>;

export const useSmartContract = () => useResource<SmartContract>();

export const useView = () => useResource<View>();
