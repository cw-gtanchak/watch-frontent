import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Maybe, TgFunction, TgFunctionInputSpec, TgFunctionSpec } from '@watch/common';
import { IEditorInstance } from '@uiw/react-codemirror';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ApolloError } from '@apollo/client';
import { useCookies } from 'react-cookie';
import { useApi } from './Api';
import { useLibrary } from './Library';
import {
  NOOP,
  checkInputError,
  createSQLFromFunction,
  isArrayInput,
  isInputSpecValid,
  pathTo,
} from 'utils';
import { Setter, Tag, VoidFn } from 'types';
// import { VIEW_AVG_MOCK_RESULT } from 'consts';
import {
  DryRunViewMutation,
  SearchType,
  SmartContractDetailsFragment,
  useCreateViewMutation,
  useDryRunViewMutation,
  useResourceQuery,
  useSearchLibraryLazyQuery,
  useSearchLibraryQuery,
} from 'gql';
import { BarLoader, EditMetadata, MagicPen } from 'components';
import { useEditMetadata } from 'hooks';
import { DeploySuccess } from 'components/DeploySuccess';
import { FormField, useFormField } from 'hooks/useFormField';
import { DOCS } from 'consts';

type TagPrimitive = { slug: string; name: string };

interface Value {
  graphId: FormField<string>[0];
  isGraphIdValid: FormField<string>[1];
  isGraphIdTouched: FormField<string>[2];
  setGraphId: FormField<string>[3];
  editorRef: React.MutableRefObject<IEditorInstance | undefined>;
  validate: () => boolean;
  isDryRunValid: boolean;
  isDryRunning: boolean;
  isTestable: boolean;
  dryRunResult: Maybe<DryRunViewMutation>;
  setIsDeployOpen: Setter<boolean>;
  isManualMode: boolean;
  setIsManualMode: Setter<boolean>;
  aggregateTags: TagPrimitive[];
  executeDryRun: VoidFn;
  selectedTab: number;
  setSelectedTab: Setter<number>;
  duplicateColumn: boolean;
  untouched: object | undefined;
  statusMessage: string | ReactNode;
  statusClassName: string | undefined;
  statusIcon: ReactNode;
  smartContracts: SmartContractDetailsFragment[] | undefined;
  selectedSmartContract: SmartContractDetailsFragment | undefined;
  setSelectedSmartContract: Setter<SmartContractDetailsFragment | undefined>;
  functionOptions: Maybe<TgFunction[]>;
  functionSpecs: TgFunctionSpec[];
  setFunctionSpecs: Setter<TgFunctionSpec[]>;
  smartContract: Maybe<SmartContractDetailsFragment>;
  viewDef: string;
  setViewDef: Setter<string>;
  generatedViewDef: string;
  isSmartContractLoading: boolean;
  isFunctionsLoading: boolean;
  setIsGraphIdTouched: Setter<boolean>;
  isDesc: boolean;
  setIsDesc: Setter<boolean>;
  orderBy: string | undefined;
  setOrderBy: Setter<string | undefined>;
  dryRunError: ApolloError | undefined;
  searchSC: (searchTerm?: string, tags?: Tag[]) => void;
  searchedSC: SmartContractDetailsFragment[] | undefined;
  isSearchLoading: boolean;
  isFunctionsSpecError: boolean;
}

function validateInputSpec(inputSpec: TgFunctionInputSpec): TgFunctionInputSpec {
  return {
    ...inputSpec,
    isError: !isInputSpecValid(inputSpec),
    isTouched: true,
    ...(isArrayInput(inputSpec)
      ? {
          array: inputSpec.array.map(validateInputSpec),
        }
      : {}),
  };
}

function validateFunctionSpecs(functionSpecs: TgFunctionSpec[]): TgFunctionSpec[] {
  return functionSpecs.map((functionSpec) => ({
    ...functionSpec,
    inputs: functionSpec.inputs.map(validateInputSpec),
  }));
}

export const NewViewBuilderContext = createContext<Value>({
  collectionSpecs: [],
  setOrderBy: NOOP,
  editorRef: { current: undefined },
} as unknown as Value);

export function NewViewBuilderProvider({ children }: React.PropsWithChildren) {
  const editorRef = useRef<IEditorInstance>();

  const { account, sessionKey, showRefresh } = useApi();
  const { invalidateSearchQuery } = useLibrary();

  const [graphId, isGraphIdValid, isGraphIdTouched, setGraphId, setIsGraphIdTouched] = useFormField(
    '',
    (s) => s.length > 0 && !/\s/.test(s),
    30
  );
  const [selectedTab, setSelectedTab] = useState(0);
  const [isDeployOpen, setIsDeployOpen] = useState(false);
  const [isManualMode, setIsManualMode] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [selectedSmartContract, setSelectedSmartContract] =
    useState<SmartContractDetailsFragment>();
  const [functionSpecs, setFunctionSpecs] = useState<TgFunctionSpec[]>([]);
  const [viewDef, setViewDef] = useState('');
  // const [showSmartContractList, setShowSmartContractList] = useState(true);
  const [isDesc, setIsDesc] = useState(true);
  const [orderBy, setOrderBy] = useState<string | undefined>();
  const [{ funSpec: funSpecCookie }, setCookie, removeCookie] = useCookies(['funSpec']);
  const { pathname } = useLocation();

  const viewSpec = useMemo(() => {
    return { name: graphId, sql: viewDef.replace(/(\s+|\n)/g, ' ') };
  }, [graphId, viewDef]);

  const [dryRunView, { data: dryRunResult, loading: isDryRunning, error: dryRunError }] =
    useDryRunViewMutation();
  const [createView, { data: createResult, loading: isCreating, reset: resetCreatViewQuery }] =
    useCreateViewMutation({ refetchQueries: ['Resource', 'SearchLibrary', 'searchLibraryCount'] });

  useEffect(() => {
    setViewDef(createSQLFromFunction(functionSpecs, { isDesc, orderBy }));
  }, [functionSpecs, isDesc, orderBy]);

  const [created, isSuccess, isError, isDuplicate, error] = useMemo(() => {
    return [
      createResult?.createView?.result,
      !isCreating && createResult?.createView?.status === 'success',
      !isCreating && createResult?.createView?.status === 'error',
      !isCreating && createResult?.createView?.status === 'duplicate',
      createResult?.createView?.error,
    ];
  }, [
    createResult?.createView?.error,
    createResult?.createView?.result,
    createResult?.createView?.status,
    isCreating,
  ]);

  const errorMessage = useMemo(() => {
    if (isError) {
      return <>Timegraph creation failed: {error}</>;
    }

    if (isDuplicate) {
      return (
        <>
          A view with this definition already exists
          {created ? (
            <>
              :{' '}
              <Link to={pathTo('View', created.hashId)} className="hyperlink font-bold">
                {created.name}
              </Link>
            </>
          ) : (
            '.'
          )}
        </>
      );
    }

    return null;
  }, [created, error, isDuplicate, isError]);

  const executeDryRun = useCallback(() => {
    dryRunView({
      variables: {
        data: viewSpec,
        address: account?.address,
        sessionKey,
      },
    });
  }, [account?.address, dryRunView, sessionKey, viewSpec]);

  const isDryRunValid = useMemo(
    () =>
      !!dryRunResult?.dryRunView &&
      dryRunResult.dryRunView.some(
        ({ name, error, status }) =>
          name === graphId && !error && (status === 'Completed' || status === 'Proposed')
      ) &&
      !dryRunResult?.dryRunView[0].view?.dryRun?.errors?.length,
    [dryRunResult?.dryRunView, graphId]
  );

  const generatedViewDef = useMemo(
    () => createSQLFromFunction(functionSpecs, { isDesc, orderBy }),
    [functionSpecs, isDesc, orderBy]
  );

  const validate = useCallback((): boolean => {
    setIsGraphIdTouched(true);
    setFunctionSpecs(validateFunctionSpecs);

    if (functionSpecs.length === 0) {
      return false;
    }

    return (
      isGraphIdValid &&
      functionSpecs.reduce((isPrevValid: boolean, { inputs, outputs }) => {
        return (
          isPrevValid &&
          inputs.reduce((b, input) => {
            return b && isInputSpecValid(input);
          }, true) &&
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          outputs.reduce((b, output) => b && output.name.length > 0, true)
        );
      }, true)
    );
  }, [functionSpecs, isGraphIdValid]);

  const isTestable = useMemo(
    () => !!account && functionSpecs.length > 0,
    [account, functionSpecs.length]
  );

  const { data: initialSC, loading: isLoading } = useSearchLibraryQuery({
    variables: {
      filters: {
        searchType: SearchType.SmartContracts,
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [executeSearch, { data: searchedSC, loading: isSearchLoading }] = useSearchLibraryLazyQuery(
    {
      variables: {
        filters: {
          searchType: SearchType.SmartContracts,
        },
      },
    }
  );

  const searchSC = useCallback(
    (searchTerm?: string, tags?: Tag[]) => {
      return executeSearch({
        variables: {
          filters: {
            searchTerm,
            tags: tags?.map(({ name }) => name.toLowerCase()),
            searchType: SearchType.SmartContracts,
          },
        },
        fetchPolicy: 'cache-and-network',
      });
    },
    [executeSearch]
  );

  const aggregateTags = useMemo<TagPrimitive[]>((): TagPrimitive[] => {
    return [
      ...new Set(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        functionSpecs.reduce((res: TagPrimitive[], { contract }) => {
          const sc = (initialSC?.searchLibrary as SmartContractDetailsFragment[])?.find((el) => {
            return contract.address.replace('0x', '') === el.address;
          });
          const temp: TagPrimitive[] =
            sc?.tags
              .filter(({ isChainTag }) => isChainTag)
              .map(({ name, slug }) => ({ name, slug })) || [];

          return [...res, ...temp]; //  TODO: add something for tags
        }, [])
      ),
    ];
  }, [functionSpecs, initialSC]);

  const editMetadata = useEditMetadata({ tags: aggregateTags });

  const { setName } = editMetadata;

  const onSubmit = useCallback(() => {
    if (account && sessionKey) {
      createView({
        variables: {
          data: {
            definition: { name: editMetadata.name || viewSpec.name, sql: viewSpec.sql },
            description: editMetadata.description,
            name: editMetadata.name,
            tags: editMetadata.tags,
            smartContractIds: functionSpecs
              .map(({ contract }) => contract.address.replace('0x', ''))
              .filter((contract, index, self) => self.indexOf(contract) === index),
            useCases: editMetadata.useCases as string[],
            isListedForGame: editMetadata.submitForGame,
          },
          address: account?.address,
          sessionKey,
        },
        onCompleted(data) {
          if (!data.createView?.error) {
            setIsDeployOpen(false);
            setIsSuccessModalOpen(true);
            invalidateSearchQuery();
          }
        },
      });
    }
  }, [
    account,
    functionSpecs,
    createView,
    editMetadata.description,
    editMetadata.name,
    editMetadata.tags,
    editMetadata.useCases,
    editMetadata.submitForGame,
    sessionKey,
    viewSpec,
  ]);

  const duplicateColumn = useMemo(() => {
    const a: Set<string> = new Set();
    const columns = viewDef.split('FROM')[0].replace('SELECT', '').replaceAll('\n', '').split(',');
    let error = false;
    for (const columnStr of columns) {
      const parts = columnStr.trim().split(' AS ');
      const columnName = parts.length > 1 ? parts[1] : parts[0].split('.')[1];

      if (a.has(columnName)) {
        error = true;
        break;
      }

      a.add(columnName);
      error = false;
    }
    return error;
  }, [viewDef]);

  const untouched = useMemo(
    () => dryRunResult?.dryRunView?.find(({ status }) => status === 'Untouched'),
    [dryRunResult]
  );

  const isFunctionError = useMemo(
    () => dryRunResult?.dryRunView?.[0].view?.dryRun?.errors?.length,
    [dryRunResult]
  );

  const [statusClassName, statusIcon, statusMessage] = useMemo(() => {
    if (functionSpecs.length > 0) {
      const [style, Component] = [
        'flex items-center text-[#DD0050] flex-1',
        <div
          key="circle-icon"
          className="bg-[#DD0050] h-10 w-10 flex items-center justify-center rounded-full"
        >
          <ExclamationCircleIcon color="white" className="w-5 h-5" />
        </div>,
      ];

      if (duplicateColumn) {
        return [style, Component, 'Please ensure that each column name is unique.'];
      }

      if (isDryRunning) {
        return [
          'flex flex-row text-[#F3AA1C] items-center rounded-full',
          <>
            <BarLoader className="bg-[#FFC451] rounded-full" />
          </>,
          'Testing view...',
        ];
      }
      if (dryRunResult) {
        if (isDryRunValid) {
          return [
            'text-[#00CC99] flex items-center ',
            <div
              key="check-circle-icon"
              className="h-10 w-10 bg-[#00CC99] items-center flex justify-center rounded-full"
            >
              <CheckCircleIcon className="w-6 h-6" color="white" />
            </div>,
            'Success!',
          ];
        }

        if (untouched) {
          const [hashId, name] = [untouched?.view?.hashId, untouched?.view?.identifier];
          const errorMessage = (
            <>
              A view with this definition already exists
              {hashId && name ? (
                <span className="w-[inherit]">
                  {': '}
                  <Link
                    to={pathTo('View', hashId)}
                    className="overflow-hidden text-ellipsis line-clamp-1 break-all"
                  >
                    {name}
                  </Link>
                </span>
              ) : (
                '.'
              )}
            </>
          );
          return [style, Component, errorMessage];
        }

        if (isFunctionError) {
          const errorMessage =
            'Some functions may contain errors. Please review and correct as necessary.';
          return [style, Component, errorMessage];
        }

        return [style, Component, dryRunResult.dryRunView && dryRunResult.dryRunView[0].error];
      }
    }
    return [];
  }, [
    functionSpecs.length,
    duplicateColumn,
    isDryRunning,
    dryRunResult,
    selectedTab,
    isDryRunValid,
    untouched,
  ]);

  const { data: smartContractQuery, loading: isFunctionsLoading } = useResourceQuery({
    variables: {
      request: {
        identifier: selectedSmartContract?.address || '',
        type: SearchType.SmartContracts,
      },
    },
    skip: !selectedSmartContract?.address,
  });

  const smartContract = useMemo(
    () => smartContractQuery?.resource as Maybe<SmartContractDetailsFragment>,
    [smartContractQuery?.resource]
  );

  const functionOptions = useMemo<Maybe<TgFunction[]>>(() => {
    if (isFunctionsLoading) {
      return undefined;
    }
    try {
      return smartContract?.functions?.map((fn) => fn as TgFunction);
    } catch (e) {
      return null;
    }
  }, [smartContract, isFunctionsLoading]);

  const smartContracts = useMemo(() => {
    return initialSC?.searchLibrary as Value['smartContracts'];
  }, [initialSC]);

  const isFunctionsSpecError = useMemo(() => {
    return functionSpecs?.reduce((isError, fnSpec) => isError || checkInputError(fnSpec), false);
  }, [functionSpecs, isGraphIdTouched, isGraphIdValid]);

  const value = useMemo(
    () => ({
      graphId,
      setGraphId,
      isGraphIdTouched,
      isGraphIdValid,
      setIsDeployOpen,
      isManualMode,
      setIsManualMode,
      aggregateTags,
      editorRef,
      validate,
      isDryRunning,
      isDryRunValid,
      dryRunResult,
      executeDryRun,
      isTestable,
      selectedTab,
      setSelectedTab,
      duplicateColumn,
      untouched,
      statusMessage,
      statusClassName,
      statusIcon,
      smartContracts,
      selectedSmartContract,
      setSelectedSmartContract,
      functionOptions,
      functionSpecs,
      setFunctionSpecs,
      smartContract,
      viewDef,
      setViewDef,
      generatedViewDef,
      isFunctionsLoading,
      setIsGraphIdTouched,
      isSmartContractLoading: isLoading,
      isDesc,
      setIsDesc,
      orderBy,
      setOrderBy,
      dryRunError,
      searchSC,
      searchedSC: searchedSC?.searchLibrary as Value['smartContracts'],
      isSearchLoading,
      isFunctionsSpecError,
    }),
    [
      graphId,
      setGraphId,
      isGraphIdTouched,
      isGraphIdValid,
      isManualMode,
      aggregateTags,
      validate,
      isDryRunning,
      isDryRunValid,
      dryRunResult,
      executeDryRun,
      isTestable,
      selectedTab,
      setSelectedTab,
      duplicateColumn,
      untouched,
      statusMessage,
      statusClassName,
      statusIcon,
      searchedSC,
      searchedSC,
      selectedSmartContract,
      setSelectedSmartContract,
      functionOptions,
      functionSpecs,
      setFunctionSpecs,
      smartContract,
      viewDef,
      setViewDef,
      generatedViewDef,
      isFunctionsLoading,
      setIsGraphIdTouched,
      isLoading,
      isDesc,
      setIsDesc,
      orderBy,
      setOrderBy,
      dryRunError,
      searchSC,
      searchedSC,
      isSearchLoading,
      isFunctionsSpecError,
    ]
  );

  useEffect(() => {
    setName(graphId);
  }, [graphId, setName]);

  useEffect(() => {
    if (!isManualMode && generatedViewDef !== viewDef) {
      setViewDef(generatedViewDef);
    }
  }, [generatedViewDef, isManualMode, viewDef]);

  useEffect(() => {
    setSelectedTab(0);
    editMetadata.setDescription('');
    editMetadata.setSearchString('');
    editMetadata.setSubmitForGame(false);
    editMetadata.setUseCases([]);
    editMetadata.setTags([]);
    setIsManualMode(false);
    if (!functionSpecs.length) {
      setIsGraphIdTouched(false);
    }
  }, [functionSpecs.length]);

  useEffect(() => {
    if (showRefresh && functionSpecs.length) {
      setCookie('funSpec', functionSpecs);
    }
  }, [showRefresh, functionSpecs]);

  useEffect(() => {
    if (funSpecCookie) {
      setFunctionSpecs(funSpecCookie);
    }
    removeCookie('funSpec');
  }, []);

  useEffect(() => {
    if (isSuccessModalOpen) {
      setGraphId('');
      setIsGraphIdTouched(false);
      setIsManualMode(false);
      setFunctionSpecs([]);
      setSelectedTab(0);
      editMetadata.setDescription('');
      editMetadata.setSearchString('');
      editMetadata.setSubmitForGame(false);
      editMetadata.setUseCases([]);
      editMetadata.setTags([]);
    }
  }, [isSuccessModalOpen]);

  useEffect(() => {
    setIsDeployOpen(false);
  }, [pathname]);

  return (
    <NewViewBuilderContext.Provider value={value}>
      {children}
      {created && isSuccess ? (
        <DeploySuccess
          isOpen={isSuccessModalOpen}
          labels={{
            text: 'Your newly created view is successfully deployed!',
            button: 'Go to View Page',
          }}
          submitTo={pathTo('View', created.hashId)}
          setIsOpen={(isOpen) => {
            setIsSuccessModalOpen(isOpen);
            if (!isOpen) {
              console.log('reset');
              resetCreatViewQuery();
            }
          }}
          isDarkTheme
        />
      ) : (
        <EditMetadata
          isLoading={isCreating}
          isOpen={isDeployOpen}
          onSubmit={onSubmit}
          setIsOpen={setIsDeployOpen}
          link={`${DOCS}/developer-guide/publish-views/watch-ui-view-builder`}
          labels={{
            title: 'Create New View',
            nameLabel: 'Name of View',
            namePlaceholder: 'View Type',
            tagLabel: 'Tags',
            tagPlaceholder: 'Please insert the relevant tags for your view',
            descriptionLabel: 'Description',
            descriptionPlaceholder: 'Please insert a description for your view',
            submitButton: 'Complete',
            error: errorMessage,
            helpLabel: (
              <div className="flex gap-3 items-center">
                <div className="p-[10px] bg-[#ffffff1a] rounded-md h-10 w-10">
                  <MagicPen className="h-5 w-5" />
                </div>
                <p className="text-xs">
                  Need help? Here are{' '}
                  <Link
                    to={`${DOCS}/developers/analog-watch/developers-guide/deploying-views`}
                    className="bg-[linear-gradient(282deg,_#8D74F7_58.34%,_#D285F7_76.33%,_#FFAD97_97.76%)] bg-clip-text text-transparent cursor-pointer"
                    target="_blank"
                  >
                    guidelines
                  </Link>{' '}
                  for deploying a View.
                </p>
              </div>
            ),
          }}
          {...editMetadata}
        />
      )}
    </NewViewBuilderContext.Provider>
  );
}

export const useNewViewBuilder = () => useContext(NewViewBuilderContext);
