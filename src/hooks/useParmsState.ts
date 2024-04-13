import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useParmsState(paramName: string) {
  const [searchParams, setSearchParams] = useSearchParams();

  const paramState = useMemo(() => searchParams.get(paramName), [paramName, searchParams]);

  const setParamState = useCallback(
    (paramValue?: string) => {
      if (paramValue) {
        searchParams.set(paramName, paramValue as string);
      } else {
        searchParams.delete(paramName);
      }
      setSearchParams(searchParams);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paramName, searchParams]
  );

  return [paramState, setParamState] as [string, (paramValue?: string) => void];
}
