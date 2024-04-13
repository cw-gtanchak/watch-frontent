import { useEffect, useMemo, useState } from 'react';
// import { RadioGroup } from '@headlessui/react';
import { CreateApiKey } from './CreateApiKey';
import { ApiKey } from './ApiKey';
import {
  Button,
  Header,
  Image,
  NoAPI,
  // RadioButton,
  // RadioButtons,
  Select,
  Skeleton,
  useSkeleton,
} from 'components';
import { useMyProfile } from 'contexts';
import { GetStarted } from './GetStarted';
import { usePageFilter } from 'hooks/usePageFilter';

// const NETWORKS = [
//   {
//     label: 'Testnet',
//     value: 'testnet',
//   },
//   { label: 'Mainnet', value: 'mainnet' },
// ];

export function ApiKeys({ sortBy }: { sortBy: 'testnet' | 'mainnet' | 'all' }) {
  const { apiKeys, hasKeys, isActive, setIsActive, isCreateVisible, setIsCreateVisible } =
    useMyProfile();

  const isLoading = useSkeleton();

  const createButton = (
    <Skeleton.Loader className="h-12 sm:w-48">
      <Button onClick={() => setIsCreateVisible(true)} variant="darkThemeFilled">
        Create New API Key
      </Button>
    </Skeleton.Loader>
  );

  const list = useMemo(() => {
    if (hasKeys) {
      if (sortBy === 'all') {
        return apiKeys;
      } else {
        return apiKeys?.filter((apiKey) => apiKey.network === sortBy);
      }
    }
    return [];
  }, [apiKeys, sortBy, hasKeys]);

  const { controller, currentPage } = usePageFilter(list);

  return (
    <div>
      {isLoading ? (
        <>
          {[undefined, undefined].map((empty, i) => (
            <ApiKey key={`loading-${i}`} value={empty} />
          ))}
        </>
      ) : list?.length ? (
        <div className="">
          {currentPage.map((apiKey) => (
            <ApiKey key={apiKey.key} value={apiKey} />
          ))}
          {controller}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center pb-6">
          <div className="w-full py-[81px] justify-center items-center flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
            <NoAPI />
            <h3 className="mb-3 text-center">
              <Skeleton.Loader className="w-[440px]">
                {hasKeys ? 'No matching API keys' : "You don't have any API key yet!"}
              </Skeleton.Loader>
            </h3>
            {!hasKeys && (
              <>
                <div className="text-md mb-3 text-[#B2B3B8]">
                  <Skeleton.Loader className="w-50">
                    Please create your first API key.
                  </Skeleton.Loader>
                </div>
                {createButton}
              </>
            )}
          </div>
        </div>
      )}
      <GetStarted />
      <CreateApiKey isOpen={isCreateVisible} setIsOpen={setIsCreateVisible} />
    </div>
  );
}
