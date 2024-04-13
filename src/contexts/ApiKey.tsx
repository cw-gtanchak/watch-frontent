import { createContext, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from './Api';
import { ApiKey } from 'types';
import { useApiKeyQuery } from 'hooks';
import { useBreadCrumbsChild } from 'hooks/useBreadCrumbs';

interface Value {
  apiKey?: ApiKey | null;
}

export const ApiKeyContext = createContext<Value>({} as Value);

export function ApiKeyProvider({ children }: React.PropsWithChildren) {
  const navigate = useNavigate();
  const { account, sessionKey } = useApi();
  const { id: key } = useParams();

  useBreadCrumbsChild({ page: 'ApiKey', params: [key] }, [{ page: 'MyProfile' }]);

  const { data: apiKeyQuery, loading: isLoading } = useApiKeyQuery({
    variables: { address: account?.address, sessionKey, data: { key } },
  });

  useEffect(() => {
    if (!isLoading && !apiKeyQuery?.apiKey) {
      navigate('/profile');
    }
  }, [apiKeyQuery?.apiKey, isLoading, navigate]);

  return (
    <ApiKeyContext.Provider value={{ apiKey: apiKeyQuery?.apiKey }}>
      {children}
    </ApiKeyContext.Provider>
  );
}

export const useApiKey = () => useContext(ApiKeyContext);
