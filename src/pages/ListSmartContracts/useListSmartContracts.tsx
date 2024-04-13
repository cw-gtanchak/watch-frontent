import { createContext, useContext, useMemo, useState } from 'react';
import { Maybe, TgFunction } from '@watch/common';
import { ApolloError } from '@apollo/client';
import {
  DryRunContractMutationFn,
  MergeContractMutation,
  useDryRunContractMutation,
  useMergeContractMutation,
} from 'gql';
import { UseEditTags, useEditTags, useParmsState } from 'hooks';
import { useApi } from 'contexts';
import { ListBoxOptionType } from 'components';

export type TagType = {
  name: string;
  slug: string;
};

export type FunctionOption = Maybe<TgFunction>;

type ListSmartContractContextType = {
  isListSmartContract: string;
  setIsListSmartContract: (paramValue?: string | undefined) => void;
  isConnect: string;
  setSmartContractAddress: React.Dispatch<React.SetStateAction<string>>;
  smartContractAddress: string;
  setAbiContent: React.Dispatch<React.SetStateAction<string | undefined>>;
  abiContent: string | undefined;
  smartContractIdentifier: string;
  setSmartContractIdentifier: React.Dispatch<React.SetStateAction<string>>;
  smartContractDescription: string;
  setSmartContractDescription: React.Dispatch<React.SetStateAction<string>>;
  smartContractInstance: ListBoxOptionType | undefined;
  setSmartContractInstance: React.Dispatch<React.SetStateAction<ListBoxOptionType | undefined>>;
  isDryRunContractLoading: boolean;
  dryRunContract: DryRunContractMutationFn;
  isDryRunContractError: string | null | undefined;
  functionOptions: FunctionOption[] | null | undefined;
  selectedChain: TagType | undefined;
  handleChainTagClick: (tag: TagType) => void;
  handleSmartContractInputChange: (value: string) => void;
  listSmartContract: (methods: string[]) => Promise<void>;
  isMergeContractLoading: boolean;
  isMergeContractError: ApolloError | undefined;
  mergeContractResult: MergeContractMutation | null | undefined;
  editTags: UseEditTags;
  error: string | undefined;
};

const ListSmartContractContext = createContext<ListSmartContractContextType | undefined>(undefined);

export const ListSmartContractsProvider = ({ children }: { children: React.ReactNode }) => {
  const { account, sessionKey } = useApi();

  const [isListSmartContract, setIsListSmartContract] = useParmsState('list-smart-contracts');
  const [isConnect] = useParmsState('connect');
  const [smartContractAddress, setSmartContractAddress] = useState('');
  const [smartContractIdentifier, setSmartContractIdentifier] = useState('');
  const [smartContractDescription, setSmartContractDescription] = useState('');
  const [smartContractInstance, setSmartContractInstance] = useState<
    ListBoxOptionType | undefined
  >();
  const [error, setError] = useState<string | undefined>();
  const [abiContent, setAbiContent] = useState<string | undefined>();
  const [selectedChain, setSelectedChain] = useState<TagType | undefined>();

  const editTags = useEditTags();

  const [dryRunContract, { data: dryRunContractResult, loading: isDryRunContractLoading }] =
    useDryRunContractMutation();

  const [
    mergeContract,
    { data: mergeContractResult, loading: isMergeContractLoading, error: isMergeContractError },
  ] = useMergeContractMutation({
    refetchQueries: ['Resource', 'SearchLibrary', 'searchLibraryCount', 'MyProfile'],
  });

  const functionOptions = useMemo(() => {
    if (isDryRunContractLoading || !dryRunContractResult) {
      return undefined;
    }
    try {
      return dryRunContractResult.dryRunContract?.functions
        ?.filter((fn: any) => fn.status === 'Proposed')
        .map((fn: any) => fn.function as FunctionOption);
    } catch (e) {
      console.error('Error processing function options:', e);
      return null;
    }
  }, [dryRunContractResult, isDryRunContractLoading]);

  const handleSmartContractInputChange = (value: string) => {
    setSmartContractAddress(value.replace('0x', ''));
  };

  const handleChainTagClick = (tag: TagType) => {
    setSelectedChain((prev) => (prev?.slug !== tag.slug ? tag : undefined));
  };

  const listSmartContract = async (methods: string[]) => {
    try {
      await mergeContract({
        variables: {
          data: {
            contractAddress: smartContractAddress,
            network: selectedChain?.slug || 'mainnet',
            identifier: smartContractIdentifier,
            description: smartContractDescription,
            methods: methods,
            chain: smartContractInstance?.value || 'mainnet',
            abi: abiContent,
            scope: 'global',
            tags: editTags.tags,
          },
          address: account?.address,
          sessionKey: sessionKey,
        },
        onCompleted(data, clientOptions) {
          if (data.MergeContract.status === 'failed') {
            setError('Error listing smart contract');
          }
        },
      });
    } catch (error) {
      console.error('Error while listing smart contract:', error);
    }
  };

  return (
    <ListSmartContractContext.Provider
      value={{
        isListSmartContract,
        setIsListSmartContract,
        isConnect,
        setSmartContractAddress,
        smartContractAddress,
        abiContent,
        setAbiContent,
        smartContractIdentifier,
        setSmartContractIdentifier,
        smartContractDescription,
        setSmartContractDescription,
        smartContractInstance,
        setSmartContractInstance,
        isDryRunContractLoading,
        dryRunContract,
        isDryRunContractError: dryRunContractResult?.dryRunContract?.error,
        functionOptions,
        selectedChain,
        handleChainTagClick,
        handleSmartContractInputChange,
        listSmartContract,
        isMergeContractLoading,
        isMergeContractError,
        mergeContractResult,
        editTags,
        error,
      }}
    >
      {children}
    </ListSmartContractContext.Provider>
  );
};

export const useListSmartContract = () =>
  useContext<ListSmartContractContextType>(
    ListSmartContractContext as React.Context<ListSmartContractContextType>
  );
