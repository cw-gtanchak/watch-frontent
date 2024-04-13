import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  BigInt: { input: any; output: any; }
  DateTime: { input: any; output: any; }
  Json: { input: any; output: any; }
};

export type ApiKey = {
  __typename?: 'ApiKey';
  createdAt: Scalars['DateTime']['output'];
  key: Scalars['String']['output'];
  name: Scalars['String']['output'];
  network: Network;
  tg?: Maybe<KeyInfo>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
};

export type ApiKeyCreateInput = {
  cert: Scalars['String']['input'];
  key: Scalars['String']['input'];
  name: Scalars['String']['input'];
  network: Network;
};

export type ApiKeyGetInput = {
  key?: InputMaybe<Scalars['String']['input']>;
};

export type ApiKeyOutput = {
  __typename?: 'ApiKeyOutput';
  apiKey: ApiKey;
  secret: Scalars['String']['output'];
};

export type ApiKeyUpdateInput = {
  key: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type ContractCreateResult = {
  __typename?: 'ContractCreateResult';
  contract: ContractResult;
  /** Error message if error happens */
  error?: Maybe<Scalars['String']['output']>;
  functions: Array<FunctionCreateResult>;
  /** Error message if error happens */
  status: Scalars['String']['output'];
};

/** Contract Input/Output information */
export type ContractInOutInfo = {
  __typename?: 'ContractInOutInfo';
  /** Data type */
  type: Scalars['String']['output'];
};

export type ContractResult = {
  __typename?: 'ContractResult';
  /** contract address */
  address: Scalars['String']['output'];
  /** Error message if error happens */
  error?: Maybe<Scalars['String']['output']>;
  /** unique indentifier */
  identifier?: Maybe<Scalars['String']['output']>;
  /** networl of the contract */
  network: Scalars['String']['output'];
  /** Status of the request can be Failed, Created, Untouched */
  status?: Maybe<Scalars['String']['output']>;
};

/** Contract Specifications */
export type ContractSpec = {
  /** Abi of Contract */
  abi?: InputMaybe<Scalars['String']['input']>;
  /** Chain type i.e mainnet testnet optional default is mainnet */
  chain?: InputMaybe<Scalars['String']['input']>;
  /** Address of contract */
  contractAddress: Scalars['String']['input'];
  /** Created Functions description  */
  description?: InputMaybe<Scalars['String']['input']>;
  /** Created Functions identifier  */
  identifier: Scalars['String']['input'];
  /** Selected Methods */
  methods?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Network of contract */
  network: Scalars['String']['input'];
  /** Scope of creation subgraph or global */
  scope?: InputMaybe<Scalars['String']['input']>;
  tags: Array<TagInput>;
};

/** Contract Specifications */
export type DryRunContractSpec = {
  /** Abi of Contract */
  abi?: InputMaybe<Scalars['String']['input']>;
  /** Address of contract */
  address: Scalars['String']['input'];
  /** Chain type i.e mainnet testnet optional default is mainnet */
  chain?: InputMaybe<Scalars['String']['input']>;
  /** Created Functions identifier  */
  identifier: Scalars['String']['input'];
  /** Network of contract */
  network: Scalars['String']['input'];
};

export type EditMetadataInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  hashId?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<TagInput>>;
};

export type FiltersInput = {
  search?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Contract ABI information */
export type FunctionContractAbiInfo = {
  __typename?: 'FunctionContractAbiInfo';
  /** Input information */
  inputs: Array<ContractInOutInfo>;
  /** ABI entrypoint name */
  name: Scalars['String']['output'];
  /** Output information */
  outputs: Array<ContractInOutInfo>;
};

/** Contract information */
export type FunctionContractInfo = {
  __typename?: 'FunctionContractInfo';
  /** Contract ABI */
  abi: FunctionContractAbiInfo;
  /** Contract address */
  address: Scalars['String']['output'];
};

export type FunctionCreateResult = {
  __typename?: 'FunctionCreateResult';
  /** Error message if error happens */
  error?: Maybe<Scalars['String']['output']>;
  function?: Maybe<FunctionMinimalInfo>;
  /** Requested function name */
  name?: Maybe<Scalars['String']['output']>;
  /** Status of the request can be Merged, Unchanged, Error */
  status: Scalars['String']['output'];
};

/** Function information */
export type FunctionInfo = {
  __typename?: 'FunctionInfo';
  /** Contract information */
  contract?: Maybe<FunctionContractInfo>;
  /** Wallet created the function */
  creator: Scalars['String']['output'];
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Object hash id */
  hashId: Scalars['String']['output'];
  /** Global unique identifier */
  identifier: Scalars['String']['output'];
  /** Function inputs */
  inputs: Array<FunctionInputInfo>;
  /** Local name in the current subgraph */
  name?: Maybe<Scalars['String']['output']>;
  /** Target network */
  network: Scalars['String']['output'];
  /** Function outputs */
  outputs: Array<FunctionOutputInfo>;
};

/** Function input information */
export type FunctionInputInfo = {
  __typename?: 'FunctionInputInfo';
  /** Predefined constant is used as argument */
  constant?: Maybe<Scalars['String']['output']>;
  /** Type conversion */
  value?: Maybe<Scalars['String']['output']>;
};

export type FunctionMinimalInfo = {
  __typename?: 'FunctionMinimalInfo';
  /** Description */
  description?: Maybe<Scalars['String']['output']>;
  /** Object hash id */
  hashId: Scalars['String']['output'];
  /** Global unique identifier */
  identifier: Scalars['String']['output'];
  /** Function inputs */
  inputs: Array<FunctionInputInfo>;
  /** Local name in the current subgraph */
  name?: Maybe<Scalars['String']['output']>;
  /** Target network */
  network: Scalars['String']['output'];
  /** Function outputs */
  outputs: Array<FunctionOutputInfo>;
};

/** Function output information */
export type FunctionOutputInfo = {
  __typename?: 'FunctionOutputInfo';
  /** name of output in feeds */
  name?: Maybe<Scalars['String']['output']>;
  /** Type converter */
  value?: Maybe<Scalars['String']['output']>;
};

export type GlobalStatsType = {
  __typename?: 'GlobalStatsType';
  contractCount: Scalars['Int']['output'];
  functionCount: Scalars['Int']['output'];
  fundLocked: Scalars['String']['output'];
  fundLockedInView: Scalars['String']['output'];
  networkCount: Scalars['Int']['output'];
  totalQuery: Scalars['Int']['output'];
  totalQueryFee: Scalars['String']['output'];
  viewCount: Scalars['Int']['output'];
};

/** User API key information */
export type KeyInfo = {
  __typename?: 'KeyInfo';
  /** Key certificate */
  cert: Array<Scalars['Int']['output']>;
  /** Public key */
  key: Scalars['String']['output'];
  /** Key role */
  role: Scalars['String']['output'];
  /** Status (enabled/disabled/revoked) */
  status: Scalars['String']['output'];
  /** User id */
  userId: Scalars['Int']['output'];
};

export enum MergeStatus {
  Duplicate = 'duplicate',
  Error = 'error',
  Success = 'success'
}

export type Mutation = {
  __typename?: 'Mutation';
  MergeContract: ContractCreateResult;
  SponsorViewMutation: SponsorViewResponseType;
  createApiKey?: Maybe<ApiKey>;
  createUser?: Maybe<User>;
  createView?: Maybe<ViewCreateResult>;
  dryRunContract: ContractCreateResult;
  dryRunView?: Maybe<Array<ViewMergeResult>>;
  editView?: Maybe<View>;
  enableApiKey?: Maybe<ApiKey>;
  onboarding?: Maybe<Scalars['Boolean']['output']>;
  revokeApiKey?: Maybe<ApiKey>;
  updateApiKey?: Maybe<ApiKey>;
  widthdrawTokensMutation: WithdrawTokensType;
};


export type MutationMergeContractArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ContractSpec;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSponsorViewMutationArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: SponsorViewInputType;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateApiKeyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ApiKeyCreateInput;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateUserArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCreateViewArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ViewInput;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDryRunContractArgs = {
  data: DryRunContractSpec;
  sessionKey: Scalars['String']['input'];
};


export type MutationDryRunViewArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ViewSpec;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEditViewArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: EditMetadataInput;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationEnableApiKeyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ApiKeyGetInput;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationOnboardingArgs = {
  address: Scalars['String']['input'];
  answers: Scalars['Json']['input'];
};


export type MutationRevokeApiKeyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ApiKeyGetInput;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateApiKeyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ApiKeyUpdateInput;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type MutationWidthdrawTokensMutationArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: WihdrawTokensInputType;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};

export enum Network {
  Mainnet = 'mainnet',
  Testnet = 'testnet'
}

export type Query = {
  __typename?: 'Query';
  GlobalStats: GlobalStatsType;
  SSKGraph: Scalars['Json']['output'];
  SSkStats: SskStatsType;
  UserGraph: Scalars['Json']['output'];
  UserStats: UserStatsType;
  ViewGraph: Scalars['Json']['output'];
  ViewStats: ViewStatsType;
  apiKey?: Maybe<ApiKey>;
  apiKeys: Array<ApiKey>;
  balanceHistory: Array<Maybe<BalanceHistoryType>>;
  chainTags: Array<Tag>;
  getTagbyId?: Maybe<Tag>;
  healthCheck?: Maybe<Scalars['Json']['output']>;
  myProfile?: Maybe<User>;
  publisher?: Maybe<User>;
  recentData?: Maybe<Scalars['Json']['output']>;
  resource?: Maybe<Resource>;
  searchLibrary: Array<Resource>;
  searchLibraryCount?: Maybe<SearchLibraryCountType>;
  smartContractFunctions?: Maybe<Array<FunctionInfo>>;
  suggestions: Array<Suggestion>;
  topTags: Array<Tag>;
  user?: Maybe<User>;
  userBalance?: Maybe<UserBalanceType>;
  userFundedViews: Array<Maybe<UserFundedViewsType>>;
  viewFundLog: Array<Maybe<ViewFundLogType>>;
  viewsListedForGame?: Maybe<Array<Maybe<Scalars['Json']['output']>>>;
};


export type QuerySskGraphArgs = {
  range: RangeType;
  ssk: Scalars['String']['input'];
};


export type QuerySSkStatsArgs = {
  ssk: Scalars['String']['input'];
};


export type QueryUserGraphArgs = {
  range: RangeType;
  userId: Scalars['Int']['input'];
};


export type QueryUserStatsArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryViewGraphArgs = {
  range: RangeType;
  viewName: Scalars['String']['input'];
};


export type QueryViewStatsArgs = {
  viewName: Scalars['String']['input'];
};


export type QueryApiKeyArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  data: ApiKeyGetInput;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryApiKeysArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBalanceHistoryArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryGetTagbyIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryMyProfileArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPublisherArgs = {
  address: Scalars['String']['input'];
};


export type QueryRecentDataArgs = {
  request?: InputMaybe<ResourceRequest>;
};


export type QueryResourceArgs = {
  request?: InputMaybe<ResourceRequest>;
};


export type QuerySearchLibraryArgs = {
  filters?: InputMaybe<SearchFilters>;
};


export type QuerySearchLibraryCountArgs = {
  filters?: InputMaybe<SearchFilters>;
};


export type QuerySmartContractFunctionsArgs = {
  address: Scalars['String']['input'];
};


export type QuerySuggestionsArgs = {
  isTagOnly?: InputMaybe<Scalars['Boolean']['input']>;
  string?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserArgs = {
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserBalanceArgs = {
  sessionKey?: InputMaybe<Scalars['String']['input']>;
};


export type QueryUserFundedViewsArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryViewFundLogArgs = {
  viewName: Scalars['String']['input'];
};

export type QueryResult = {
  __typename?: 'QueryResult';
  data: Array<Array<Maybe<Scalars['String']['output']>>>;
  header: Array<Scalars['String']['output']>;
  schema: Array<Scalars['String']['output']>;
};

export enum RangeType {
  All = 'all',
  Month = 'month',
  Week = 'week'
}

export type Resource = SmartContract | View;

export type ResourceRequest = {
  identifier: Scalars['String']['input'];
  type?: SearchType;
};

export type SskStatsType = {
  __typename?: 'SSKStatsType';
  totalSskQuery: Scalars['Int']['output'];
  totalSskQueryFee: Scalars['String']['output'];
};

export type SearchFilters = {
  publisherAddress?: InputMaybe<Scalars['String']['input']>;
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  searchType?: InputMaybe<SearchType>;
  status?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum SearchType {
  All = 'all',
  SmartContracts = 'smartContracts',
  Views = 'views'
}

export type SmartContract = {
  __typename?: 'SmartContract';
  address: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  functions?: Maybe<Array<FunctionInfo>>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  network: Scalars['String']['output'];
  publisher: User;
  refs?: Maybe<Scalars['Int']['output']>;
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime']['output'];
  views?: Maybe<Array<Maybe<View>>>;
};

export type SmartContractFunctionsRequest = {
  address: Scalars['String']['input'];
};

export type SmartContractInput = {
  abi: Scalars['Json']['input'];
  address: Scalars['String']['input'];
  definition: Scalars['Json']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
  network: Scalars['String']['input'];
  publisherAddress: Scalars['String']['input'];
  tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type SponsorViewInputType = {
  /** Amount to withdraw */
  amount: Scalars['String']['input'];
  /** sponsor view name  */
  viewName: Scalars['String']['input'];
};

/** Sponsor View  ResponseType */
export type SponsorViewResponseType = {
  __typename?: 'SponsorViewResponseType';
  amount?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type Suggestion = {
  __typename?: 'Suggestion';
  count?: Maybe<Scalars['Int']['output']>;
  id: Scalars['Int']['output'];
  isTag: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Tag = {
  __typename?: 'Tag';
  id: Scalars['Int']['output'];
  isChainTag: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  smartContracts: Array<SmartContract>;
  views: Array<View>;
};

export type TagInput = {
  isNew?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  address: Scalars['String']['output'];
  apiKeys: Array<ApiKey>;
  id: Scalars['Int']['output'];
  pubKey: Scalars['String']['output'];
  smartContracts: Array<Maybe<SmartContract>>;
  views: Array<Maybe<View>>;
};

export type UserBalanceType = {
  __typename?: 'UserBalanceType';
  balance?: Maybe<Scalars['String']['output']>;
};

export type UserCreations = {
  __typename?: 'UserCreations';
  smartContracts: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
};

export type UserInput = {
  address: Scalars['String']['input'];
};

export type UserStatsType = {
  __typename?: 'UserStatsType';
  rewardPerDataCollector: Scalars['String']['output'];
  totalUserQuery: Scalars['Int']['output'];
  totalUserQueryFee: Scalars['String']['output'];
  totalUserRewards: Scalars['String']['output'];
  totalUserSponsor: Scalars['String']['output'];
};

export type View = {
  __typename?: 'View';
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  hashId: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  publisher: User;
  recentData?: Maybe<QueryResult>;
  refs?: Maybe<Scalars['Int']['output']>;
  smartContracts?: Maybe<Array<Maybe<SmartContract>>>;
  status?: Maybe<Scalars['String']['output']>;
  tags: Array<Tag>;
  updatedAt: Scalars['DateTime']['output'];
  vDefinition?: Maybe<ViewInfo>;
};

export type ViewCreateResult = {
  __typename?: 'ViewCreateResult';
  error?: Maybe<Scalars['String']['output']>;
  result?: Maybe<View>;
  status?: Maybe<MergeStatus>;
};

/** View information */
export type ViewInfo = {
  __typename?: 'ViewInfo';
  /** Wallet created the view */
  creator: Scalars['String']['output'];
  /** View description */
  description?: Maybe<Scalars['String']['output']>;
  /** View unique hash id */
  hashId: Scalars['String']['output'];
  /** View global identifier */
  identifier?: Maybe<Scalars['String']['output']>;
  /** View name in the user subgraph */
  name?: Maybe<Scalars['String']['output']>;
  /** Views and collection this view refers */
  references: Array<ViewReferenceInfo>;
  /** Sql expression */
  sql: Scalars['String']['output'];
};

export type ViewInput = {
  definition: Scalars['Json']['input'];
  description: Scalars['String']['input'];
  hashId?: InputMaybe<Scalars['String']['input']>;
  isListedForGame?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  smartContractIds: Array<Scalars['String']['input']>;
  tags: Array<TagInput>;
  useCases?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type ViewMergeResult = {
  __typename?: 'ViewMergeResult';
  data?: Maybe<Array<Array<Maybe<Scalars['String']['output']>>>>;
  /** Error message if error happens */
  error?: Maybe<Scalars['String']['output']>;
  header?: Maybe<Array<Scalars['String']['output']>>;
  /** Requested view name */
  name?: Maybe<Scalars['String']['output']>;
  /**
   * Merging status
   * can be Merged, Unchanged, Error
   */
  status: Scalars['String']['output'];
  /** The wallet created the view */
  view?: Maybe<ViewMinimalInfo>;
};

/** View mini information */
export type ViewMinimalInfo = {
  __typename?: 'ViewMinimalInfo';
  dryRun?: Maybe<ViewMinimalDryRunInfo>;
  /** View unique hash id */
  hashId: Scalars['String']['output'];
  /** View global identifier */
  identifier?: Maybe<Scalars['String']['output']>;
  /** View name in the user subgraph */
  name?: Maybe<Scalars['String']['output']>;
};

/** Reference to any view or collection */
export type ViewReferenceInfo = {
  __typename?: 'ViewReferenceInfo';
  /** Object kind */
  function: FunctionInfo;
  /** Object unique hash id */
  hashId: Scalars['String']['output'];
  /** Object kind */
  kind: Scalars['String']['output'];
};

/** View specification */
export type ViewSpec = {
  /** Description */
  description?: InputMaybe<Scalars['String']['input']>;
  /** View unique name */
  identifier?: InputMaybe<Scalars['String']['input']>;
  /** View name in the subgraph */
  name?: InputMaybe<Scalars['String']['input']>;
  /** Sql expression */
  sql: Scalars['String']['input'];
};

export type ViewStatsType = {
  __typename?: 'ViewStatsType';
  fundLockedInView: Scalars['String']['output'];
  minimumSponsor?: Maybe<MinimumSponsorType>;
  rewardPerView: Scalars['String']['output'];
  totalQueryPerView: Scalars['Int']['output'];
  uniqueUserQueryPerView: Scalars['Int']['output'];
  viewIndexingStatus?: Maybe<ViewIndexingStatusType>;
};

/** Withdraw Tokens ResponseType */
export type WithdrawTokensType = {
  __typename?: 'WithdrawTokensType';
  amount?: Maybe<Scalars['String']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

export type BalanceHistoryType = {
  __typename?: 'balanceHistoryType';
  amount?: Maybe<Scalars['String']['output']>;
  changeType?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
};

export type MinimumSponsorType = {
  __typename?: 'minimumSponsorType';
  amount?: Maybe<Scalars['String']['output']>;
  cycles?: Maybe<Scalars['Int']['output']>;
};

export type SearchLibraryCountType = {
  __typename?: 'searchLibraryCountType';
  all: Scalars['Int']['output'];
  smartContracts: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
};

export type UserFundedViewsType = {
  __typename?: 'userFundedViewsType';
  funded?: Maybe<Scalars['String']['output']>;
  fundedAt?: Maybe<Scalars['String']['output']>;
  hash?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  wallet?: Maybe<Scalars['String']['output']>;
};

export type ViewFundLogType = {
  __typename?: 'viewFundLogType';
  amount?: Maybe<Scalars['String']['output']>;
  sponsor?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  timestamp?: Maybe<Scalars['String']['output']>;
  view?: Maybe<Scalars['String']['output']>;
};

export type ViewIndexingStatusType = {
  __typename?: 'viewIndexingStatusType';
  leftClocks?: Maybe<Scalars['Int']['output']>;
  status?: Maybe<Scalars['String']['output']>;
};

/** View DryRun Status and Error */
export type ViewMinimalDryRunInfo = {
  __typename?: 'viewMinimalDryRunInfo';
  errors?: Maybe<Array<Maybe<Scalars['Json']['output']>>>;
  updates?: Maybe<Array<Maybe<Scalars['Json']['output']>>>;
};

export type WihdrawTokensInputType = {
  /** Amount to withdraw */
  amount: Scalars['String']['input'];
};

export type ViewInfoFragmentFragment = { __typename?: 'ViewInfo', hashId: string, name?: string | null, description?: string | null, identifier?: string | null, sql: string, creator: string, references: Array<{ __typename?: 'ViewReferenceInfo', hashId: string, function: { __typename?: 'FunctionInfo', name?: string | null, identifier: string, hashId: string, outputs: Array<{ __typename?: 'FunctionOutputInfo', name?: string | null, value?: string | null }>, inputs: Array<{ __typename?: 'FunctionInputInfo', value?: string | null, constant?: string | null }>, contract?: { __typename?: 'FunctionContractInfo', address: string } | null } }> };

export type FunctionInfoFragmentFragment = { __typename?: 'FunctionInfo', hashId: string, creator: string, name?: string | null, description?: string | null, network: string, identifier: string, inputs: Array<{ __typename?: 'FunctionInputInfo', value?: string | null, constant?: string | null }>, outputs: Array<{ __typename?: 'FunctionOutputInfo', value?: string | null, name?: string | null }>, contract?: { __typename?: 'FunctionContractInfo', address: string, abi: { __typename?: 'FunctionContractAbiInfo', name: string, inputs: Array<{ __typename?: 'ContractInOutInfo', type: string }>, outputs: Array<{ __typename?: 'ContractInOutInfo', type: string }> } } | null };

export type ApiKeyInfoFragment = { __typename?: 'KeyInfo', userId: number, key: string, cert: Array<number>, role: string, status: string };

export type ViewBuilderInfoFragment = { __typename?: 'SmartContract', address: string, name: string, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string }> };

export type SmartContractOverviewFragment = { __typename?: 'SmartContract', id: number, address: string, name: string, createdAt: any, description?: string | null, refs?: number | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> };

export type SmartContractDetailsFragment = { __typename?: 'SmartContract', address: string, network: string, id: number, name: string, createdAt: any, description?: string | null, refs?: number | null, functions?: Array<{ __typename?: 'FunctionInfo', hashId: string, creator: string, name?: string | null, description?: string | null, network: string, identifier: string, inputs: Array<{ __typename?: 'FunctionInputInfo', value?: string | null, constant?: string | null }>, outputs: Array<{ __typename?: 'FunctionOutputInfo', value?: string | null, name?: string | null }>, contract?: { __typename?: 'FunctionContractInfo', address: string, abi: { __typename?: 'FunctionContractAbiInfo', name: string, inputs: Array<{ __typename?: 'ContractInOutInfo', type: string }>, outputs: Array<{ __typename?: 'ContractInOutInfo', type: string }> } } | null }> | null, views?: Array<{ __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null> | null, tags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }>, publisher: { __typename?: 'User', id: number, address: string } };

export type ViewOverviewFragment = { __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> };

export type ViewDetailsFragment = { __typename?: 'View', hashId: string, id: number, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, recentData?: { __typename?: 'QueryResult', header: Array<string>, data: Array<Array<string | null>> } | null, vDefinition?: { __typename?: 'ViewInfo', name?: string | null, sql: string } | null, smartContracts?: Array<{ __typename?: 'SmartContract', address: string, createdAt: any, description?: string | null, name: string, refs?: number | null, publisher: { __typename?: 'User', address: string }, tags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }> } | null> | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> };

export type ApiKeyDetailsFragment = { __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null };

export type UserBasicsFragment = { __typename?: 'User', address: string, id: number };

export type UserDetailsFragment = { __typename?: 'User', id: number, address: string };

export type PublisherDetailsFragment = { __typename?: 'User', address: string, id: number, smartContracts: Array<{ __typename?: 'SmartContract', id: number, address: string, name: string, createdAt: any, description?: string | null, refs?: number | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null>, views: Array<{ __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null> };

export type MyProfileDetailsFragment = { __typename?: 'User', id: number, address: string, apiKeys: Array<{ __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null }>, smartContracts: Array<{ __typename?: 'SmartContract', id: number, address: string, name: string, createdAt: any, description?: string | null, refs?: number | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null>, views: Array<{ __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null> };

export type TagBasicsFragment = { __typename?: 'Tag', id: number, name: string, slug: string };

export type TagDetailsFragment = { __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string };

export type SuggestionDetailsFragment = { __typename?: 'Suggestion', name: string, value: string, isTag: boolean };

export type CreateUserMutationVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'User', address: string, id: number } | null };

export type WidthdrawTokensMutationVariables = Exact<{
  data: WihdrawTokensInputType;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type WidthdrawTokensMutation = { __typename?: 'Mutation', widthdrawTokensMutation: { __typename?: 'WithdrawTokensType', status?: string | null, error?: string | null, amount?: string | null } };

export type CreateApiKeyMutationVariables = Exact<{
  data: ApiKeyCreateInput;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateApiKeyMutation = { __typename?: 'Mutation', createApiKey?: { __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null } | null };

export type UpdateApiKeyMutationVariables = Exact<{
  data: ApiKeyUpdateInput;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type UpdateApiKeyMutation = { __typename?: 'Mutation', updateApiKey?: { __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null } | null };

export type RevokeApiKeyMutationVariables = Exact<{
  data: ApiKeyGetInput;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type RevokeApiKeyMutation = { __typename?: 'Mutation', revokeApiKey?: { __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null } | null };

export type EnableApiKeyMutationVariables = Exact<{
  data: ApiKeyGetInput;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type EnableApiKeyMutation = { __typename?: 'Mutation', enableApiKey?: { __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null } | null };

export type DryRunViewMutationVariables = Exact<{
  data: ViewSpec;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type DryRunViewMutation = { __typename?: 'Mutation', dryRunView?: Array<{ __typename?: 'ViewMergeResult', name?: string | null, status: string, error?: string | null, header?: Array<string> | null, data?: Array<Array<string | null>> | null, view?: { __typename?: 'ViewMinimalInfo', hashId: string, name?: string | null, identifier?: string | null, dryRun?: { __typename?: 'viewMinimalDryRunInfo', errors?: Array<any | null> | null, updates?: Array<any | null> | null } | null } | null }> | null };

export type CreateViewMutationVariables = Exact<{
  data: ViewInput;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type CreateViewMutation = { __typename?: 'Mutation', createView?: { __typename?: 'ViewCreateResult', status?: MergeStatus | null, error?: string | null, result?: { __typename?: 'View', hashId: string, id: number, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, recentData?: { __typename?: 'QueryResult', header: Array<string>, data: Array<Array<string | null>> } | null, vDefinition?: { __typename?: 'ViewInfo', name?: string | null, sql: string } | null, smartContracts?: Array<{ __typename?: 'SmartContract', address: string, createdAt: any, description?: string | null, name: string, refs?: number | null, publisher: { __typename?: 'User', address: string }, tags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }> } | null> | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null } | null };

export type EditViewMutationVariables = Exact<{
  data: EditMetadataInput;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type EditViewMutation = { __typename?: 'Mutation', editView?: { __typename?: 'View', hashId: string, id: number, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, recentData?: { __typename?: 'QueryResult', header: Array<string>, data: Array<Array<string | null>> } | null, vDefinition?: { __typename?: 'ViewInfo', name?: string | null, sql: string } | null, smartContracts?: Array<{ __typename?: 'SmartContract', address: string, createdAt: any, description?: string | null, name: string, refs?: number | null, publisher: { __typename?: 'User', address: string }, tags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }> } | null> | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null };

export type SponsorViewMutationVariables = Exact<{
  data: SponsorViewInputType;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type SponsorViewMutation = { __typename?: 'Mutation', SponsorViewMutation: { __typename?: 'SponsorViewResponseType', status?: string | null, error?: string | null, amount?: string | null } };

export type DryRunContractMutationVariables = Exact<{
  data: DryRunContractSpec;
  sessionKey: Scalars['String']['input'];
}>;


export type DryRunContractMutation = { __typename?: 'Mutation', dryRunContract: { __typename?: 'ContractCreateResult', status: string, error?: string | null, contract: { __typename?: 'ContractResult', identifier?: string | null }, functions: Array<{ __typename?: 'FunctionCreateResult', status: string, function?: { __typename?: 'FunctionMinimalInfo', name?: string | null, hashId: string, identifier: string, outputs: Array<{ __typename?: 'FunctionOutputInfo', name?: string | null, value?: string | null }>, inputs: Array<{ __typename?: 'FunctionInputInfo', value?: string | null, constant?: string | null }> } | null }> } };

export type MergeContractMutationVariables = Exact<{
  data: ContractSpec;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type MergeContractMutation = { __typename?: 'Mutation', MergeContract: { __typename?: 'ContractCreateResult', status: string, error?: string | null } };

export type OnboardingMutationVariables = Exact<{
  address: Scalars['String']['input'];
  answers: Scalars['Json']['input'];
}>;


export type OnboardingMutation = { __typename?: 'Mutation', onboarding?: boolean | null };

export type HealthCheckQueryVariables = Exact<{ [key: string]: never; }>;


export type HealthCheckQuery = { __typename?: 'Query', healthCheck?: any | null };

export type UserQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, address: string } | null };

export type MyProfileQueryVariables = Exact<{
  address: Scalars['String']['input'];
  sessionKey: Scalars['String']['input'];
}>;


export type MyProfileQuery = { __typename?: 'Query', myProfile?: { __typename?: 'User', address: string, id: number, smartContracts: Array<{ __typename?: 'SmartContract', id: number, address: string, name: string, createdAt: any, description?: string | null, refs?: number | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null>, views: Array<{ __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null> } | null, apiKeys: Array<{ __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null }> };

export type UserBalanceQueryVariables = Exact<{
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type UserBalanceQuery = { __typename?: 'Query', userBalance?: { __typename?: 'UserBalanceType', balance?: string | null } | null };

export type PublisherQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type PublisherQuery = { __typename?: 'Query', publisher?: { __typename?: 'User', address: string, id: number, smartContracts: Array<{ __typename?: 'SmartContract', id: number, address: string, name: string, createdAt: any, description?: string | null, refs?: number | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null>, views: Array<{ __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null> } | null };

export type PublisherItemsQueryVariables = Exact<{
  publisherAddress?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<SearchType>;
}>;


export type PublisherItemsQuery = { __typename?: 'Query', searchLibrary: Array<{ __typename?: 'SmartContract', id: number, address: string, name: string, createdAt: any, description?: string | null, refs?: number | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | { __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> }> };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', chainTags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }>, topTags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }> };

export type ResourceQueryVariables = Exact<{
  request?: InputMaybe<ResourceRequest>;
}>;


export type ResourceQuery = { __typename?: 'Query', resource?: { __typename?: 'SmartContract', address: string, network: string, id: number, name: string, createdAt: any, description?: string | null, refs?: number | null, functions?: Array<{ __typename?: 'FunctionInfo', hashId: string, creator: string, name?: string | null, description?: string | null, network: string, identifier: string, inputs: Array<{ __typename?: 'FunctionInputInfo', value?: string | null, constant?: string | null }>, outputs: Array<{ __typename?: 'FunctionOutputInfo', value?: string | null, name?: string | null }>, contract?: { __typename?: 'FunctionContractInfo', address: string, abi: { __typename?: 'FunctionContractAbiInfo', name: string, inputs: Array<{ __typename?: 'ContractInOutInfo', type: string }>, outputs: Array<{ __typename?: 'ContractInOutInfo', type: string }> } } | null }> | null, views?: Array<{ __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null> | null, tags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }>, publisher: { __typename?: 'User', id: number, address: string } } | { __typename?: 'View', hashId: string, id: number, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, recentData?: { __typename?: 'QueryResult', header: Array<string>, data: Array<Array<string | null>> } | null, vDefinition?: { __typename?: 'ViewInfo', name?: string | null, sql: string } | null, smartContracts?: Array<{ __typename?: 'SmartContract', address: string, createdAt: any, description?: string | null, name: string, refs?: number | null, publisher: { __typename?: 'User', address: string }, tags: Array<{ __typename?: 'Tag', id: number, isChainTag: boolean, name: string, slug: string }> } | null> | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | null };

export type RecentDataQueryVariables = Exact<{
  request?: InputMaybe<ResourceRequest>;
}>;


export type RecentDataQuery = { __typename?: 'Query', recentData?: any | null };

export type SearchLibraryQueryVariables = Exact<{
  filters?: InputMaybe<SearchFilters>;
}>;


export type SearchLibraryQuery = { __typename?: 'Query', searchLibrary: Array<{ __typename?: 'SmartContract', id: number, address: string, name: string, createdAt: any, description?: string | null, refs?: number | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> } | { __typename?: 'View', id: number, hashId: string, name: string, createdAt: any, description?: string | null, refs?: number | null, status?: string | null, publisher: { __typename?: 'User', id: number, address: string }, tags: Array<{ __typename?: 'Tag', id: number, name: string, slug: string, isChainTag: boolean }> }> };

export type SuggestionsQueryVariables = Exact<{
  string?: InputMaybe<Scalars['String']['input']>;
  isTagOnly?: InputMaybe<Scalars['Boolean']['input']>;
}>;


export type SuggestionsQuery = { __typename?: 'Query', suggestions: Array<{ __typename?: 'Suggestion', name: string, value: string, isTag: boolean }> };

export type ApiKeyQueryVariables = Exact<{
  data: ApiKeyGetInput;
  address?: InputMaybe<Scalars['String']['input']>;
  sessionKey?: InputMaybe<Scalars['String']['input']>;
}>;


export type ApiKeyQuery = { __typename?: 'Query', apiKey?: { __typename?: 'ApiKey', name: string, network: Network, createdAt: any, key: string, tg?: { __typename?: 'KeyInfo', userId: number, role: string, status: string } | null } | null };

export type SmartContractFunctionsQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type SmartContractFunctionsQuery = { __typename?: 'Query', smartContractFunctions?: Array<{ __typename?: 'FunctionInfo', hashId: string, creator: string, name?: string | null, description?: string | null, network: string, identifier: string, inputs: Array<{ __typename?: 'FunctionInputInfo', value?: string | null, constant?: string | null }>, outputs: Array<{ __typename?: 'FunctionOutputInfo', value?: string | null, name?: string | null }>, contract?: { __typename?: 'FunctionContractInfo', address: string, abi: { __typename?: 'FunctionContractAbiInfo', name: string, inputs: Array<{ __typename?: 'ContractInOutInfo', type: string }>, outputs: Array<{ __typename?: 'ContractInOutInfo', type: string }> } } | null }> | null };

export type GlobalStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalStatsQuery = { __typename?: 'Query', GlobalStats: { __typename?: 'GlobalStatsType', contractCount: number, functionCount: number, fundLocked: string, fundLockedInView: string, networkCount: number, totalQuery: number, totalQueryFee: string, viewCount: number } };

export type UserStatsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserStatsQuery = { __typename?: 'Query', UserStats: { __typename?: 'UserStatsType', rewardPerDataCollector: string, totalUserQuery: number, totalUserQueryFee: string, totalUserSponsor: string, totalUserRewards: string } };

export type UserGraphQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  range: RangeType;
}>;


export type UserGraphQuery = { __typename?: 'Query', UserGraph: any };

export type SSkStatsQueryVariables = Exact<{
  ssk: Scalars['String']['input'];
}>;


export type SSkStatsQuery = { __typename?: 'Query', SSkStats: { __typename?: 'SSKStatsType', totalSskQuery: number, totalSskQueryFee: string } };

export type SskGraphQueryVariables = Exact<{
  ssk: Scalars['String']['input'];
  range: RangeType;
}>;


export type SskGraphQuery = { __typename?: 'Query', SSKGraph: any };

export type ViewStatsQueryVariables = Exact<{
  viewName: Scalars['String']['input'];
}>;


export type ViewStatsQuery = { __typename?: 'Query', ViewStats: { __typename?: 'ViewStatsType', rewardPerView: string, totalQueryPerView: number, uniqueUserQueryPerView: number, fundLockedInView: string, minimumSponsor?: { __typename?: 'minimumSponsorType', cycles?: number | null, amount?: string | null } | null, viewIndexingStatus?: { __typename?: 'viewIndexingStatusType', status?: string | null, leftClocks?: number | null } | null } };

export type ViewGraphQueryVariables = Exact<{
  viewName: Scalars['String']['input'];
  range: RangeType;
}>;


export type ViewGraphQuery = { __typename?: 'Query', ViewGraph: any };

export type SearchLibraryCountQueryVariables = Exact<{
  filters?: InputMaybe<SearchFilters>;
}>;


export type SearchLibraryCountQuery = { __typename?: 'Query', searchLibraryCount?: { __typename?: 'searchLibraryCountType', all: number, smartContracts: number, views: number } | null };

export type UserFundedViewsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type UserFundedViewsQuery = { __typename?: 'Query', userFundedViews: Array<{ __typename?: 'userFundedViewsType', wallet?: string | null, name?: string | null, fundedAt?: string | null, funded?: string | null, hash?: string | null } | null> };

export type ViewFundLogQueryVariables = Exact<{
  viewName: Scalars['String']['input'];
}>;


export type ViewFundLogQuery = { __typename?: 'Query', viewFundLog: Array<{ __typename?: 'viewFundLogType', sponsor?: string | null, timestamp?: string | null, amount?: string | null } | null> };

export type BalanceHistoryQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type BalanceHistoryQuery = { __typename?: 'Query', balanceHistory: Array<{ __typename?: 'balanceHistoryType', changeType?: string | null, timestamp?: string | null, amount?: string | null } | null> };

export const ViewInfoFragmentFragmentDoc = gql`
    fragment ViewInfoFragment on ViewInfo {
  hashId
  name
  description
  identifier
  sql
  creator
  references {
    hashId
    function {
      name
      identifier
      hashId
      outputs {
        name
        value
      }
      inputs {
        value
        constant
      }
      contract {
        address
      }
    }
  }
}
    `;
export const ApiKeyInfoFragmentDoc = gql`
    fragment ApiKeyInfo on KeyInfo {
  userId
  key
  cert
  role
  status
}
    `;
export const TagBasicsFragmentDoc = gql`
    fragment TagBasics on Tag {
  id
  name
  slug
}
    `;
export const ViewBuilderInfoFragmentDoc = gql`
    fragment ViewBuilderInfo on SmartContract {
  address
  name
  tags {
    ...TagBasics
  }
}
    ${TagBasicsFragmentDoc}`;
export const SmartContractOverviewFragmentDoc = gql`
    fragment SmartContractOverview on SmartContract {
  id
  address
  name
  createdAt
  description
  refs
  publisher {
    id
    address
  }
  tags {
    id
    name
    slug
    isChainTag
  }
}
    `;
export const FunctionInfoFragmentFragmentDoc = gql`
    fragment FunctionInfoFragment on FunctionInfo {
  hashId
  creator
  name
  description
  network
  identifier
  inputs {
    value
    constant
  }
  outputs {
    value
    name
  }
  contract {
    address
    abi {
      name
      inputs {
        type
      }
      outputs {
        type
      }
    }
  }
}
    `;
export const ViewOverviewFragmentDoc = gql`
    fragment ViewOverview on View {
  id
  hashId
  name
  createdAt
  description
  refs
  publisher {
    id
    address
  }
  tags {
    id
    name
    slug
    isChainTag
  }
  status
}
    `;
export const SmartContractDetailsFragmentDoc = gql`
    fragment SmartContractDetails on SmartContract {
  ...SmartContractOverview
  address
  network
  functions {
    ...FunctionInfoFragment
  }
  views {
    ...ViewOverview
  }
  tags {
    id
    isChainTag
    name
    slug
  }
}
    ${SmartContractOverviewFragmentDoc}
${FunctionInfoFragmentFragmentDoc}
${ViewOverviewFragmentDoc}`;
export const ViewDetailsFragmentDoc = gql`
    fragment ViewDetails on View {
  ...ViewOverview
  hashId
  recentData {
    header
    data
  }
  vDefinition {
    name
    sql
  }
  smartContracts {
    address
    createdAt
    description
    name
    publisher {
      address
    }
    refs
    tags {
      id
      isChainTag
      name
      slug
    }
  }
}
    ${ViewOverviewFragmentDoc}`;
export const UserBasicsFragmentDoc = gql`
    fragment UserBasics on User {
  address
  id
}
    `;
export const PublisherDetailsFragmentDoc = gql`
    fragment PublisherDetails on User {
  ...UserBasics
  smartContracts {
    ...SmartContractOverview
  }
  views {
    ...ViewOverview
  }
}
    ${UserBasicsFragmentDoc}
${SmartContractOverviewFragmentDoc}
${ViewOverviewFragmentDoc}`;
export const UserDetailsFragmentDoc = gql`
    fragment UserDetails on User {
  id
  address
}
    `;
export const ApiKeyDetailsFragmentDoc = gql`
    fragment ApiKeyDetails on ApiKey {
  name
  network
  createdAt
  key
  tg {
    userId
    role
    status
  }
}
    `;
export const MyProfileDetailsFragmentDoc = gql`
    fragment MyProfileDetails on User {
  ...PublisherDetails
  ...UserDetails
  apiKeys {
    ...ApiKeyDetails
  }
}
    ${PublisherDetailsFragmentDoc}
${UserDetailsFragmentDoc}
${ApiKeyDetailsFragmentDoc}`;
export const TagDetailsFragmentDoc = gql`
    fragment TagDetails on Tag {
  id
  isChainTag
  name
  slug
}
    `;
export const SuggestionDetailsFragmentDoc = gql`
    fragment SuggestionDetails on Suggestion {
  name
  value
  isTag
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($address: String, $sessionKey: String) {
  createUser(address: $address, sessionKey: $sessionKey) {
    ...UserBasics
  }
}
    ${UserBasicsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const WidthdrawTokensDocument = gql`
    mutation WidthdrawTokens($data: wihdrawTokensInputType!, $address: String, $sessionKey: String) {
  widthdrawTokensMutation(data: $data, address: $address, sessionKey: $sessionKey) {
    status
    error
    amount
  }
}
    `;
export type WidthdrawTokensMutationFn = Apollo.MutationFunction<WidthdrawTokensMutation, WidthdrawTokensMutationVariables>;

/**
 * __useWidthdrawTokensMutation__
 *
 * To run a mutation, you first call `useWidthdrawTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWidthdrawTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [widthdrawTokensMutation, { data, loading, error }] = useWidthdrawTokensMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useWidthdrawTokensMutation(baseOptions?: Apollo.MutationHookOptions<WidthdrawTokensMutation, WidthdrawTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<WidthdrawTokensMutation, WidthdrawTokensMutationVariables>(WidthdrawTokensDocument, options);
      }
export type WidthdrawTokensMutationHookResult = ReturnType<typeof useWidthdrawTokensMutation>;
export type WidthdrawTokensMutationResult = Apollo.MutationResult<WidthdrawTokensMutation>;
export type WidthdrawTokensMutationOptions = Apollo.BaseMutationOptions<WidthdrawTokensMutation, WidthdrawTokensMutationVariables>;
export const CreateApiKeyDocument = gql`
    mutation CreateApiKey($data: ApiKeyCreateInput!, $address: String, $sessionKey: String) {
  createApiKey(data: $data, address: $address, sessionKey: $sessionKey) {
    ...ApiKeyDetails
  }
}
    ${ApiKeyDetailsFragmentDoc}`;
export type CreateApiKeyMutationFn = Apollo.MutationFunction<CreateApiKeyMutation, CreateApiKeyMutationVariables>;

/**
 * __useCreateApiKeyMutation__
 *
 * To run a mutation, you first call `useCreateApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createApiKeyMutation, { data, loading, error }] = useCreateApiKeyMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useCreateApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<CreateApiKeyMutation, CreateApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateApiKeyMutation, CreateApiKeyMutationVariables>(CreateApiKeyDocument, options);
      }
export type CreateApiKeyMutationHookResult = ReturnType<typeof useCreateApiKeyMutation>;
export type CreateApiKeyMutationResult = Apollo.MutationResult<CreateApiKeyMutation>;
export type CreateApiKeyMutationOptions = Apollo.BaseMutationOptions<CreateApiKeyMutation, CreateApiKeyMutationVariables>;
export const UpdateApiKeyDocument = gql`
    mutation UpdateApiKey($data: ApiKeyUpdateInput!, $address: String, $sessionKey: String) {
  updateApiKey(data: $data, address: $address, sessionKey: $sessionKey) {
    ...ApiKeyDetails
  }
}
    ${ApiKeyDetailsFragmentDoc}`;
export type UpdateApiKeyMutationFn = Apollo.MutationFunction<UpdateApiKeyMutation, UpdateApiKeyMutationVariables>;

/**
 * __useUpdateApiKeyMutation__
 *
 * To run a mutation, you first call `useUpdateApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateApiKeyMutation, { data, loading, error }] = useUpdateApiKeyMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useUpdateApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateApiKeyMutation, UpdateApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateApiKeyMutation, UpdateApiKeyMutationVariables>(UpdateApiKeyDocument, options);
      }
export type UpdateApiKeyMutationHookResult = ReturnType<typeof useUpdateApiKeyMutation>;
export type UpdateApiKeyMutationResult = Apollo.MutationResult<UpdateApiKeyMutation>;
export type UpdateApiKeyMutationOptions = Apollo.BaseMutationOptions<UpdateApiKeyMutation, UpdateApiKeyMutationVariables>;
export const RevokeApiKeyDocument = gql`
    mutation RevokeApiKey($data: ApiKeyGetInput!, $address: String, $sessionKey: String) {
  revokeApiKey(data: $data, address: $address, sessionKey: $sessionKey) {
    ...ApiKeyDetails
  }
}
    ${ApiKeyDetailsFragmentDoc}`;
export type RevokeApiKeyMutationFn = Apollo.MutationFunction<RevokeApiKeyMutation, RevokeApiKeyMutationVariables>;

/**
 * __useRevokeApiKeyMutation__
 *
 * To run a mutation, you first call `useRevokeApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeApiKeyMutation, { data, loading, error }] = useRevokeApiKeyMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useRevokeApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<RevokeApiKeyMutation, RevokeApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RevokeApiKeyMutation, RevokeApiKeyMutationVariables>(RevokeApiKeyDocument, options);
      }
export type RevokeApiKeyMutationHookResult = ReturnType<typeof useRevokeApiKeyMutation>;
export type RevokeApiKeyMutationResult = Apollo.MutationResult<RevokeApiKeyMutation>;
export type RevokeApiKeyMutationOptions = Apollo.BaseMutationOptions<RevokeApiKeyMutation, RevokeApiKeyMutationVariables>;
export const EnableApiKeyDocument = gql`
    mutation EnableApiKey($data: ApiKeyGetInput!, $address: String, $sessionKey: String) {
  enableApiKey(data: $data, address: $address, sessionKey: $sessionKey) {
    ...ApiKeyDetails
  }
}
    ${ApiKeyDetailsFragmentDoc}`;
export type EnableApiKeyMutationFn = Apollo.MutationFunction<EnableApiKeyMutation, EnableApiKeyMutationVariables>;

/**
 * __useEnableApiKeyMutation__
 *
 * To run a mutation, you first call `useEnableApiKeyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEnableApiKeyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [enableApiKeyMutation, { data, loading, error }] = useEnableApiKeyMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useEnableApiKeyMutation(baseOptions?: Apollo.MutationHookOptions<EnableApiKeyMutation, EnableApiKeyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EnableApiKeyMutation, EnableApiKeyMutationVariables>(EnableApiKeyDocument, options);
      }
export type EnableApiKeyMutationHookResult = ReturnType<typeof useEnableApiKeyMutation>;
export type EnableApiKeyMutationResult = Apollo.MutationResult<EnableApiKeyMutation>;
export type EnableApiKeyMutationOptions = Apollo.BaseMutationOptions<EnableApiKeyMutation, EnableApiKeyMutationVariables>;
export const DryRunViewDocument = gql`
    mutation DryRunView($data: ViewSpec!, $address: String, $sessionKey: String) {
  dryRunView(data: $data, address: $address, sessionKey: $sessionKey) {
    name
    status
    error
    header
    data
    view {
      hashId
      name
      identifier
      dryRun {
        errors
        updates
      }
    }
  }
}
    `;
export type DryRunViewMutationFn = Apollo.MutationFunction<DryRunViewMutation, DryRunViewMutationVariables>;

/**
 * __useDryRunViewMutation__
 *
 * To run a mutation, you first call `useDryRunViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDryRunViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dryRunViewMutation, { data, loading, error }] = useDryRunViewMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useDryRunViewMutation(baseOptions?: Apollo.MutationHookOptions<DryRunViewMutation, DryRunViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DryRunViewMutation, DryRunViewMutationVariables>(DryRunViewDocument, options);
      }
export type DryRunViewMutationHookResult = ReturnType<typeof useDryRunViewMutation>;
export type DryRunViewMutationResult = Apollo.MutationResult<DryRunViewMutation>;
export type DryRunViewMutationOptions = Apollo.BaseMutationOptions<DryRunViewMutation, DryRunViewMutationVariables>;
export const CreateViewDocument = gql`
    mutation CreateView($data: ViewInput!, $address: String, $sessionKey: String) {
  createView(data: $data, address: $address, sessionKey: $sessionKey) {
    status
    error
    result {
      ...ViewDetails
    }
  }
}
    ${ViewDetailsFragmentDoc}`;
export type CreateViewMutationFn = Apollo.MutationFunction<CreateViewMutation, CreateViewMutationVariables>;

/**
 * __useCreateViewMutation__
 *
 * To run a mutation, you first call `useCreateViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createViewMutation, { data, loading, error }] = useCreateViewMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useCreateViewMutation(baseOptions?: Apollo.MutationHookOptions<CreateViewMutation, CreateViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateViewMutation, CreateViewMutationVariables>(CreateViewDocument, options);
      }
export type CreateViewMutationHookResult = ReturnType<typeof useCreateViewMutation>;
export type CreateViewMutationResult = Apollo.MutationResult<CreateViewMutation>;
export type CreateViewMutationOptions = Apollo.BaseMutationOptions<CreateViewMutation, CreateViewMutationVariables>;
export const EditViewDocument = gql`
    mutation EditView($data: EditMetadataInput!, $address: String, $sessionKey: String) {
  editView(data: $data, address: $address, sessionKey: $sessionKey) {
    ...ViewDetails
  }
}
    ${ViewDetailsFragmentDoc}`;
export type EditViewMutationFn = Apollo.MutationFunction<EditViewMutation, EditViewMutationVariables>;

/**
 * __useEditViewMutation__
 *
 * To run a mutation, you first call `useEditViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editViewMutation, { data, loading, error }] = useEditViewMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useEditViewMutation(baseOptions?: Apollo.MutationHookOptions<EditViewMutation, EditViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<EditViewMutation, EditViewMutationVariables>(EditViewDocument, options);
      }
export type EditViewMutationHookResult = ReturnType<typeof useEditViewMutation>;
export type EditViewMutationResult = Apollo.MutationResult<EditViewMutation>;
export type EditViewMutationOptions = Apollo.BaseMutationOptions<EditViewMutation, EditViewMutationVariables>;
export const SponsorViewDocument = gql`
    mutation SponsorView($data: SponsorViewInputType!, $address: String, $sessionKey: String) {
  SponsorViewMutation(data: $data, address: $address, sessionKey: $sessionKey) {
    status
    error
    amount
  }
}
    `;
export type SponsorViewMutationFn = Apollo.MutationFunction<SponsorViewMutation, SponsorViewMutationVariables>;

/**
 * __useSponsorViewMutation__
 *
 * To run a mutation, you first call `useSponsorViewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSponsorViewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sponsorViewMutation, { data, loading, error }] = useSponsorViewMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useSponsorViewMutation(baseOptions?: Apollo.MutationHookOptions<SponsorViewMutation, SponsorViewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SponsorViewMutation, SponsorViewMutationVariables>(SponsorViewDocument, options);
      }
export type SponsorViewMutationHookResult = ReturnType<typeof useSponsorViewMutation>;
export type SponsorViewMutationResult = Apollo.MutationResult<SponsorViewMutation>;
export type SponsorViewMutationOptions = Apollo.BaseMutationOptions<SponsorViewMutation, SponsorViewMutationVariables>;
export const DryRunContractDocument = gql`
    mutation dryRunContract($data: DryRunContractSpec!, $sessionKey: String!) {
  dryRunContract(data: $data, sessionKey: $sessionKey) {
    status
    error
    contract {
      identifier
    }
    functions {
      status
      function {
        name
        outputs {
          name
          value
        }
        inputs {
          value
          constant
        }
        hashId
        identifier
      }
    }
  }
}
    `;
export type DryRunContractMutationFn = Apollo.MutationFunction<DryRunContractMutation, DryRunContractMutationVariables>;

/**
 * __useDryRunContractMutation__
 *
 * To run a mutation, you first call `useDryRunContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDryRunContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dryRunContractMutation, { data, loading, error }] = useDryRunContractMutation({
 *   variables: {
 *      data: // value for 'data'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useDryRunContractMutation(baseOptions?: Apollo.MutationHookOptions<DryRunContractMutation, DryRunContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DryRunContractMutation, DryRunContractMutationVariables>(DryRunContractDocument, options);
      }
export type DryRunContractMutationHookResult = ReturnType<typeof useDryRunContractMutation>;
export type DryRunContractMutationResult = Apollo.MutationResult<DryRunContractMutation>;
export type DryRunContractMutationOptions = Apollo.BaseMutationOptions<DryRunContractMutation, DryRunContractMutationVariables>;
export const MergeContractDocument = gql`
    mutation MergeContract($data: ContractSpec!, $address: String, $sessionKey: String) {
  MergeContract(data: $data, address: $address, sessionKey: $sessionKey) {
    status
    error
  }
}
    `;
export type MergeContractMutationFn = Apollo.MutationFunction<MergeContractMutation, MergeContractMutationVariables>;

/**
 * __useMergeContractMutation__
 *
 * To run a mutation, you first call `useMergeContractMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMergeContractMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mergeContractMutation, { data, loading, error }] = useMergeContractMutation({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useMergeContractMutation(baseOptions?: Apollo.MutationHookOptions<MergeContractMutation, MergeContractMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MergeContractMutation, MergeContractMutationVariables>(MergeContractDocument, options);
      }
export type MergeContractMutationHookResult = ReturnType<typeof useMergeContractMutation>;
export type MergeContractMutationResult = Apollo.MutationResult<MergeContractMutation>;
export type MergeContractMutationOptions = Apollo.BaseMutationOptions<MergeContractMutation, MergeContractMutationVariables>;
export const OnboardingDocument = gql`
    mutation Onboarding($address: String!, $answers: Json!) {
  onboarding(address: $address, answers: $answers)
}
    `;
export type OnboardingMutationFn = Apollo.MutationFunction<OnboardingMutation, OnboardingMutationVariables>;

/**
 * __useOnboardingMutation__
 *
 * To run a mutation, you first call `useOnboardingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOnboardingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [onboardingMutation, { data, loading, error }] = useOnboardingMutation({
 *   variables: {
 *      address: // value for 'address'
 *      answers: // value for 'answers'
 *   },
 * });
 */
export function useOnboardingMutation(baseOptions?: Apollo.MutationHookOptions<OnboardingMutation, OnboardingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OnboardingMutation, OnboardingMutationVariables>(OnboardingDocument, options);
      }
export type OnboardingMutationHookResult = ReturnType<typeof useOnboardingMutation>;
export type OnboardingMutationResult = Apollo.MutationResult<OnboardingMutation>;
export type OnboardingMutationOptions = Apollo.BaseMutationOptions<OnboardingMutation, OnboardingMutationVariables>;
export const HealthCheckDocument = gql`
    query HealthCheck {
  healthCheck
}
    `;

/**
 * __useHealthCheckQuery__
 *
 * To run a query within a React component, call `useHealthCheckQuery` and pass it any options that fit your needs.
 * When your component renders, `useHealthCheckQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHealthCheckQuery({
 *   variables: {
 *   },
 * });
 */
export function useHealthCheckQuery(baseOptions?: Apollo.QueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
      }
export function useHealthCheckLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HealthCheckQuery, HealthCheckQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HealthCheckQuery, HealthCheckQueryVariables>(HealthCheckDocument, options);
        }
export type HealthCheckQueryHookResult = ReturnType<typeof useHealthCheckQuery>;
export type HealthCheckLazyQueryHookResult = ReturnType<typeof useHealthCheckLazyQuery>;
export type HealthCheckQueryResult = Apollo.QueryResult<HealthCheckQuery, HealthCheckQueryVariables>;
export const UserDocument = gql`
    query User($address: String, $sessionKey: String) {
  user(address: $address, sessionKey: $sessionKey) {
    ...UserDetails
  }
}
    ${UserDetailsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const MyProfileDocument = gql`
    query MyProfile($address: String!, $sessionKey: String!) {
  myProfile(address: $address, sessionKey: $sessionKey) {
    ...PublisherDetails
  }
  apiKeys(address: $address, sessionKey: $sessionKey) {
    ...ApiKeyDetails
  }
}
    ${PublisherDetailsFragmentDoc}
${ApiKeyDetailsFragmentDoc}`;

/**
 * __useMyProfileQuery__
 *
 * To run a query within a React component, call `useMyProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyProfileQuery({
 *   variables: {
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useMyProfileQuery(baseOptions: Apollo.QueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
      }
export function useMyProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyProfileQuery, MyProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyProfileQuery, MyProfileQueryVariables>(MyProfileDocument, options);
        }
export type MyProfileQueryHookResult = ReturnType<typeof useMyProfileQuery>;
export type MyProfileLazyQueryHookResult = ReturnType<typeof useMyProfileLazyQuery>;
export type MyProfileQueryResult = Apollo.QueryResult<MyProfileQuery, MyProfileQueryVariables>;
export const UserBalanceDocument = gql`
    query UserBalance($sessionKey: String) {
  userBalance(sessionKey: $sessionKey) {
    balance
  }
}
    `;

/**
 * __useUserBalanceQuery__
 *
 * To run a query within a React component, call `useUserBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBalanceQuery({
 *   variables: {
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useUserBalanceQuery(baseOptions?: Apollo.QueryHookOptions<UserBalanceQuery, UserBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBalanceQuery, UserBalanceQueryVariables>(UserBalanceDocument, options);
      }
export function useUserBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBalanceQuery, UserBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBalanceQuery, UserBalanceQueryVariables>(UserBalanceDocument, options);
        }
export type UserBalanceQueryHookResult = ReturnType<typeof useUserBalanceQuery>;
export type UserBalanceLazyQueryHookResult = ReturnType<typeof useUserBalanceLazyQuery>;
export type UserBalanceQueryResult = Apollo.QueryResult<UserBalanceQuery, UserBalanceQueryVariables>;
export const PublisherDocument = gql`
    query Publisher($address: String!) {
  publisher(address: $address) {
    ...PublisherDetails
  }
}
    ${PublisherDetailsFragmentDoc}`;

/**
 * __usePublisherQuery__
 *
 * To run a query within a React component, call `usePublisherQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublisherQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublisherQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function usePublisherQuery(baseOptions: Apollo.QueryHookOptions<PublisherQuery, PublisherQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublisherQuery, PublisherQueryVariables>(PublisherDocument, options);
      }
export function usePublisherLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublisherQuery, PublisherQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublisherQuery, PublisherQueryVariables>(PublisherDocument, options);
        }
export type PublisherQueryHookResult = ReturnType<typeof usePublisherQuery>;
export type PublisherLazyQueryHookResult = ReturnType<typeof usePublisherLazyQuery>;
export type PublisherQueryResult = Apollo.QueryResult<PublisherQuery, PublisherQueryVariables>;
export const PublisherItemsDocument = gql`
    query PublisherItems($publisherAddress: String, $type: SearchType) {
  searchLibrary(filters: {searchType: $type, publisherAddress: $publisherAddress}) {
    ... on SmartContract {
      ...SmartContractOverview
    }
    ... on View {
      ...ViewOverview
    }
  }
}
    ${SmartContractOverviewFragmentDoc}
${ViewOverviewFragmentDoc}`;

/**
 * __usePublisherItemsQuery__
 *
 * To run a query within a React component, call `usePublisherItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublisherItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublisherItemsQuery({
 *   variables: {
 *      publisherAddress: // value for 'publisherAddress'
 *      type: // value for 'type'
 *   },
 * });
 */
export function usePublisherItemsQuery(baseOptions?: Apollo.QueryHookOptions<PublisherItemsQuery, PublisherItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PublisherItemsQuery, PublisherItemsQueryVariables>(PublisherItemsDocument, options);
      }
export function usePublisherItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PublisherItemsQuery, PublisherItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PublisherItemsQuery, PublisherItemsQueryVariables>(PublisherItemsDocument, options);
        }
export type PublisherItemsQueryHookResult = ReturnType<typeof usePublisherItemsQuery>;
export type PublisherItemsLazyQueryHookResult = ReturnType<typeof usePublisherItemsLazyQuery>;
export type PublisherItemsQueryResult = Apollo.QueryResult<PublisherItemsQuery, PublisherItemsQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  chainTags {
    ...TagDetails
  }
  topTags {
    ...TagDetails
  }
}
    ${TagDetailsFragmentDoc}`;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: Apollo.QueryHookOptions<TagsQuery, TagsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
      }
export function useTagsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TagsQuery, TagsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TagsQuery, TagsQueryVariables>(TagsDocument, options);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = Apollo.QueryResult<TagsQuery, TagsQueryVariables>;
export const ResourceDocument = gql`
    query Resource($request: ResourceRequest) {
  resource(request: $request) {
    ... on SmartContract {
      ...SmartContractDetails
    }
    ... on View {
      ...ViewDetails
    }
  }
}
    ${SmartContractDetailsFragmentDoc}
${ViewDetailsFragmentDoc}`;

/**
 * __useResourceQuery__
 *
 * To run a query within a React component, call `useResourceQuery` and pass it any options that fit your needs.
 * When your component renders, `useResourceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResourceQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useResourceQuery(baseOptions?: Apollo.QueryHookOptions<ResourceQuery, ResourceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ResourceQuery, ResourceQueryVariables>(ResourceDocument, options);
      }
export function useResourceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ResourceQuery, ResourceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ResourceQuery, ResourceQueryVariables>(ResourceDocument, options);
        }
export type ResourceQueryHookResult = ReturnType<typeof useResourceQuery>;
export type ResourceLazyQueryHookResult = ReturnType<typeof useResourceLazyQuery>;
export type ResourceQueryResult = Apollo.QueryResult<ResourceQuery, ResourceQueryVariables>;
export const RecentDataDocument = gql`
    query RecentData($request: ResourceRequest) {
  recentData(request: $request)
}
    `;

/**
 * __useRecentDataQuery__
 *
 * To run a query within a React component, call `useRecentDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecentDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecentDataQuery({
 *   variables: {
 *      request: // value for 'request'
 *   },
 * });
 */
export function useRecentDataQuery(baseOptions?: Apollo.QueryHookOptions<RecentDataQuery, RecentDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RecentDataQuery, RecentDataQueryVariables>(RecentDataDocument, options);
      }
export function useRecentDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RecentDataQuery, RecentDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RecentDataQuery, RecentDataQueryVariables>(RecentDataDocument, options);
        }
export type RecentDataQueryHookResult = ReturnType<typeof useRecentDataQuery>;
export type RecentDataLazyQueryHookResult = ReturnType<typeof useRecentDataLazyQuery>;
export type RecentDataQueryResult = Apollo.QueryResult<RecentDataQuery, RecentDataQueryVariables>;
export const SearchLibraryDocument = gql`
    query SearchLibrary($filters: SearchFilters) {
  searchLibrary(filters: $filters) {
    ... on SmartContract {
      ...SmartContractOverview
    }
    ... on View {
      ...ViewOverview
    }
  }
}
    ${SmartContractOverviewFragmentDoc}
${ViewOverviewFragmentDoc}`;

/**
 * __useSearchLibraryQuery__
 *
 * To run a query within a React component, call `useSearchLibraryQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchLibraryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchLibraryQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useSearchLibraryQuery(baseOptions?: Apollo.QueryHookOptions<SearchLibraryQuery, SearchLibraryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchLibraryQuery, SearchLibraryQueryVariables>(SearchLibraryDocument, options);
      }
export function useSearchLibraryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchLibraryQuery, SearchLibraryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchLibraryQuery, SearchLibraryQueryVariables>(SearchLibraryDocument, options);
        }
export type SearchLibraryQueryHookResult = ReturnType<typeof useSearchLibraryQuery>;
export type SearchLibraryLazyQueryHookResult = ReturnType<typeof useSearchLibraryLazyQuery>;
export type SearchLibraryQueryResult = Apollo.QueryResult<SearchLibraryQuery, SearchLibraryQueryVariables>;
export const SuggestionsDocument = gql`
    query Suggestions($string: String, $isTagOnly: Boolean) {
  suggestions(string: $string, isTagOnly: $isTagOnly) {
    ...SuggestionDetails
  }
}
    ${SuggestionDetailsFragmentDoc}`;

/**
 * __useSuggestionsQuery__
 *
 * To run a query within a React component, call `useSuggestionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSuggestionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSuggestionsQuery({
 *   variables: {
 *      string: // value for 'string'
 *      isTagOnly: // value for 'isTagOnly'
 *   },
 * });
 */
export function useSuggestionsQuery(baseOptions?: Apollo.QueryHookOptions<SuggestionsQuery, SuggestionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SuggestionsQuery, SuggestionsQueryVariables>(SuggestionsDocument, options);
      }
export function useSuggestionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SuggestionsQuery, SuggestionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SuggestionsQuery, SuggestionsQueryVariables>(SuggestionsDocument, options);
        }
export type SuggestionsQueryHookResult = ReturnType<typeof useSuggestionsQuery>;
export type SuggestionsLazyQueryHookResult = ReturnType<typeof useSuggestionsLazyQuery>;
export type SuggestionsQueryResult = Apollo.QueryResult<SuggestionsQuery, SuggestionsQueryVariables>;
export const ApiKeyDocument = gql`
    query ApiKey($data: ApiKeyGetInput!, $address: String, $sessionKey: String) {
  apiKey(data: $data, address: $address, sessionKey: $sessionKey) {
    ...ApiKeyDetails
  }
}
    ${ApiKeyDetailsFragmentDoc}`;

/**
 * __useApiKeyQuery__
 *
 * To run a query within a React component, call `useApiKeyQuery` and pass it any options that fit your needs.
 * When your component renders, `useApiKeyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useApiKeyQuery({
 *   variables: {
 *      data: // value for 'data'
 *      address: // value for 'address'
 *      sessionKey: // value for 'sessionKey'
 *   },
 * });
 */
export function useApiKeyQuery(baseOptions: Apollo.QueryHookOptions<ApiKeyQuery, ApiKeyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ApiKeyQuery, ApiKeyQueryVariables>(ApiKeyDocument, options);
      }
export function useApiKeyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ApiKeyQuery, ApiKeyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ApiKeyQuery, ApiKeyQueryVariables>(ApiKeyDocument, options);
        }
export type ApiKeyQueryHookResult = ReturnType<typeof useApiKeyQuery>;
export type ApiKeyLazyQueryHookResult = ReturnType<typeof useApiKeyLazyQuery>;
export type ApiKeyQueryResult = Apollo.QueryResult<ApiKeyQuery, ApiKeyQueryVariables>;
export const SmartContractFunctionsDocument = gql`
    query SmartContractFunctions($address: String!) {
  smartContractFunctions(address: $address) {
    ...FunctionInfoFragment
  }
}
    ${FunctionInfoFragmentFragmentDoc}`;

/**
 * __useSmartContractFunctionsQuery__
 *
 * To run a query within a React component, call `useSmartContractFunctionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSmartContractFunctionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSmartContractFunctionsQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useSmartContractFunctionsQuery(baseOptions: Apollo.QueryHookOptions<SmartContractFunctionsQuery, SmartContractFunctionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SmartContractFunctionsQuery, SmartContractFunctionsQueryVariables>(SmartContractFunctionsDocument, options);
      }
export function useSmartContractFunctionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SmartContractFunctionsQuery, SmartContractFunctionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SmartContractFunctionsQuery, SmartContractFunctionsQueryVariables>(SmartContractFunctionsDocument, options);
        }
export type SmartContractFunctionsQueryHookResult = ReturnType<typeof useSmartContractFunctionsQuery>;
export type SmartContractFunctionsLazyQueryHookResult = ReturnType<typeof useSmartContractFunctionsLazyQuery>;
export type SmartContractFunctionsQueryResult = Apollo.QueryResult<SmartContractFunctionsQuery, SmartContractFunctionsQueryVariables>;
export const GlobalStatsDocument = gql`
    query GlobalStats {
  GlobalStats {
    contractCount
    functionCount
    fundLocked
    fundLockedInView
    networkCount
    totalQuery
    totalQueryFee
    viewCount
  }
}
    `;

/**
 * __useGlobalStatsQuery__
 *
 * To run a query within a React component, call `useGlobalStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalStatsQuery(baseOptions?: Apollo.QueryHookOptions<GlobalStatsQuery, GlobalStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalStatsQuery, GlobalStatsQueryVariables>(GlobalStatsDocument, options);
      }
export function useGlobalStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalStatsQuery, GlobalStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalStatsQuery, GlobalStatsQueryVariables>(GlobalStatsDocument, options);
        }
export type GlobalStatsQueryHookResult = ReturnType<typeof useGlobalStatsQuery>;
export type GlobalStatsLazyQueryHookResult = ReturnType<typeof useGlobalStatsLazyQuery>;
export type GlobalStatsQueryResult = Apollo.QueryResult<GlobalStatsQuery, GlobalStatsQueryVariables>;
export const UserStatsDocument = gql`
    query UserStats($userId: Int!) {
  UserStats(userId: $userId) {
    rewardPerDataCollector
    totalUserQuery
    totalUserQueryFee
    totalUserSponsor
    totalUserRewards
  }
}
    `;

/**
 * __useUserStatsQuery__
 *
 * To run a query within a React component, call `useUserStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStatsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserStatsQuery(baseOptions: Apollo.QueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
      }
export function useUserStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserStatsQuery, UserStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserStatsQuery, UserStatsQueryVariables>(UserStatsDocument, options);
        }
export type UserStatsQueryHookResult = ReturnType<typeof useUserStatsQuery>;
export type UserStatsLazyQueryHookResult = ReturnType<typeof useUserStatsLazyQuery>;
export type UserStatsQueryResult = Apollo.QueryResult<UserStatsQuery, UserStatsQueryVariables>;
export const UserGraphDocument = gql`
    query UserGraph($userId: Int!, $range: RangeType!) {
  UserGraph(userId: $userId, range: $range)
}
    `;

/**
 * __useUserGraphQuery__
 *
 * To run a query within a React component, call `useUserGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserGraphQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      range: // value for 'range'
 *   },
 * });
 */
export function useUserGraphQuery(baseOptions: Apollo.QueryHookOptions<UserGraphQuery, UserGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserGraphQuery, UserGraphQueryVariables>(UserGraphDocument, options);
      }
export function useUserGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserGraphQuery, UserGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserGraphQuery, UserGraphQueryVariables>(UserGraphDocument, options);
        }
export type UserGraphQueryHookResult = ReturnType<typeof useUserGraphQuery>;
export type UserGraphLazyQueryHookResult = ReturnType<typeof useUserGraphLazyQuery>;
export type UserGraphQueryResult = Apollo.QueryResult<UserGraphQuery, UserGraphQueryVariables>;
export const SSkStatsDocument = gql`
    query SSkStats($ssk: String!) {
  SSkStats(ssk: $ssk) {
    totalSskQuery
    totalSskQueryFee
  }
}
    `;

/**
 * __useSSkStatsQuery__
 *
 * To run a query within a React component, call `useSSkStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSSkStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSSkStatsQuery({
 *   variables: {
 *      ssk: // value for 'ssk'
 *   },
 * });
 */
export function useSSkStatsQuery(baseOptions: Apollo.QueryHookOptions<SSkStatsQuery, SSkStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SSkStatsQuery, SSkStatsQueryVariables>(SSkStatsDocument, options);
      }
export function useSSkStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SSkStatsQuery, SSkStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SSkStatsQuery, SSkStatsQueryVariables>(SSkStatsDocument, options);
        }
export type SSkStatsQueryHookResult = ReturnType<typeof useSSkStatsQuery>;
export type SSkStatsLazyQueryHookResult = ReturnType<typeof useSSkStatsLazyQuery>;
export type SSkStatsQueryResult = Apollo.QueryResult<SSkStatsQuery, SSkStatsQueryVariables>;
export const SskGraphDocument = gql`
    query SSKGraph($ssk: String!, $range: RangeType!) {
  SSKGraph(ssk: $ssk, range: $range)
}
    `;

/**
 * __useSskGraphQuery__
 *
 * To run a query within a React component, call `useSskGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useSskGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSskGraphQuery({
 *   variables: {
 *      ssk: // value for 'ssk'
 *      range: // value for 'range'
 *   },
 * });
 */
export function useSskGraphQuery(baseOptions: Apollo.QueryHookOptions<SskGraphQuery, SskGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SskGraphQuery, SskGraphQueryVariables>(SskGraphDocument, options);
      }
export function useSskGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SskGraphQuery, SskGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SskGraphQuery, SskGraphQueryVariables>(SskGraphDocument, options);
        }
export type SskGraphQueryHookResult = ReturnType<typeof useSskGraphQuery>;
export type SskGraphLazyQueryHookResult = ReturnType<typeof useSskGraphLazyQuery>;
export type SskGraphQueryResult = Apollo.QueryResult<SskGraphQuery, SskGraphQueryVariables>;
export const ViewStatsDocument = gql`
    query ViewStats($viewName: String!) {
  ViewStats(viewName: $viewName) {
    rewardPerView
    totalQueryPerView
    uniqueUserQueryPerView
    fundLockedInView
    minimumSponsor {
      cycles
      amount
    }
    viewIndexingStatus {
      status
      leftClocks
    }
  }
}
    `;

/**
 * __useViewStatsQuery__
 *
 * To run a query within a React component, call `useViewStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewStatsQuery({
 *   variables: {
 *      viewName: // value for 'viewName'
 *   },
 * });
 */
export function useViewStatsQuery(baseOptions: Apollo.QueryHookOptions<ViewStatsQuery, ViewStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewStatsQuery, ViewStatsQueryVariables>(ViewStatsDocument, options);
      }
export function useViewStatsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewStatsQuery, ViewStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewStatsQuery, ViewStatsQueryVariables>(ViewStatsDocument, options);
        }
export type ViewStatsQueryHookResult = ReturnType<typeof useViewStatsQuery>;
export type ViewStatsLazyQueryHookResult = ReturnType<typeof useViewStatsLazyQuery>;
export type ViewStatsQueryResult = Apollo.QueryResult<ViewStatsQuery, ViewStatsQueryVariables>;
export const ViewGraphDocument = gql`
    query ViewGraph($viewName: String!, $range: RangeType!) {
  ViewGraph(viewName: $viewName, range: $range)
}
    `;

/**
 * __useViewGraphQuery__
 *
 * To run a query within a React component, call `useViewGraphQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewGraphQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewGraphQuery({
 *   variables: {
 *      viewName: // value for 'viewName'
 *      range: // value for 'range'
 *   },
 * });
 */
export function useViewGraphQuery(baseOptions: Apollo.QueryHookOptions<ViewGraphQuery, ViewGraphQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewGraphQuery, ViewGraphQueryVariables>(ViewGraphDocument, options);
      }
export function useViewGraphLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewGraphQuery, ViewGraphQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewGraphQuery, ViewGraphQueryVariables>(ViewGraphDocument, options);
        }
export type ViewGraphQueryHookResult = ReturnType<typeof useViewGraphQuery>;
export type ViewGraphLazyQueryHookResult = ReturnType<typeof useViewGraphLazyQuery>;
export type ViewGraphQueryResult = Apollo.QueryResult<ViewGraphQuery, ViewGraphQueryVariables>;
export const SearchLibraryCountDocument = gql`
    query searchLibraryCount($filters: SearchFilters) {
  searchLibraryCount(filters: $filters) {
    all
    smartContracts
    views
  }
}
    `;

/**
 * __useSearchLibraryCountQuery__
 *
 * To run a query within a React component, call `useSearchLibraryCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchLibraryCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchLibraryCountQuery({
 *   variables: {
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useSearchLibraryCountQuery(baseOptions?: Apollo.QueryHookOptions<SearchLibraryCountQuery, SearchLibraryCountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchLibraryCountQuery, SearchLibraryCountQueryVariables>(SearchLibraryCountDocument, options);
      }
export function useSearchLibraryCountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchLibraryCountQuery, SearchLibraryCountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchLibraryCountQuery, SearchLibraryCountQueryVariables>(SearchLibraryCountDocument, options);
        }
export type SearchLibraryCountQueryHookResult = ReturnType<typeof useSearchLibraryCountQuery>;
export type SearchLibraryCountLazyQueryHookResult = ReturnType<typeof useSearchLibraryCountLazyQuery>;
export type SearchLibraryCountQueryResult = Apollo.QueryResult<SearchLibraryCountQuery, SearchLibraryCountQueryVariables>;
export const UserFundedViewsDocument = gql`
    query UserFundedViews($userId: Int!) {
  userFundedViews(userId: $userId) {
    wallet
    name
    fundedAt
    funded
    hash
  }
}
    `;

/**
 * __useUserFundedViewsQuery__
 *
 * To run a query within a React component, call `useUserFundedViewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserFundedViewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserFundedViewsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserFundedViewsQuery(baseOptions: Apollo.QueryHookOptions<UserFundedViewsQuery, UserFundedViewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserFundedViewsQuery, UserFundedViewsQueryVariables>(UserFundedViewsDocument, options);
      }
export function useUserFundedViewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserFundedViewsQuery, UserFundedViewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserFundedViewsQuery, UserFundedViewsQueryVariables>(UserFundedViewsDocument, options);
        }
export type UserFundedViewsQueryHookResult = ReturnType<typeof useUserFundedViewsQuery>;
export type UserFundedViewsLazyQueryHookResult = ReturnType<typeof useUserFundedViewsLazyQuery>;
export type UserFundedViewsQueryResult = Apollo.QueryResult<UserFundedViewsQuery, UserFundedViewsQueryVariables>;
export const ViewFundLogDocument = gql`
    query ViewFundLog($viewName: String!) {
  viewFundLog(viewName: $viewName) {
    sponsor
    timestamp
    amount
  }
}
    `;

/**
 * __useViewFundLogQuery__
 *
 * To run a query within a React component, call `useViewFundLogQuery` and pass it any options that fit your needs.
 * When your component renders, `useViewFundLogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useViewFundLogQuery({
 *   variables: {
 *      viewName: // value for 'viewName'
 *   },
 * });
 */
export function useViewFundLogQuery(baseOptions: Apollo.QueryHookOptions<ViewFundLogQuery, ViewFundLogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ViewFundLogQuery, ViewFundLogQueryVariables>(ViewFundLogDocument, options);
      }
export function useViewFundLogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ViewFundLogQuery, ViewFundLogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ViewFundLogQuery, ViewFundLogQueryVariables>(ViewFundLogDocument, options);
        }
export type ViewFundLogQueryHookResult = ReturnType<typeof useViewFundLogQuery>;
export type ViewFundLogLazyQueryHookResult = ReturnType<typeof useViewFundLogLazyQuery>;
export type ViewFundLogQueryResult = Apollo.QueryResult<ViewFundLogQuery, ViewFundLogQueryVariables>;
export const BalanceHistoryDocument = gql`
    query BalanceHistory($userId: Int!) {
  balanceHistory(userId: $userId) {
    changeType
    timestamp
    amount
  }
}
    `;

/**
 * __useBalanceHistoryQuery__
 *
 * To run a query within a React component, call `useBalanceHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useBalanceHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBalanceHistoryQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBalanceHistoryQuery(baseOptions: Apollo.QueryHookOptions<BalanceHistoryQuery, BalanceHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BalanceHistoryQuery, BalanceHistoryQueryVariables>(BalanceHistoryDocument, options);
      }
export function useBalanceHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BalanceHistoryQuery, BalanceHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BalanceHistoryQuery, BalanceHistoryQueryVariables>(BalanceHistoryDocument, options);
        }
export type BalanceHistoryQueryHookResult = ReturnType<typeof useBalanceHistoryQuery>;
export type BalanceHistoryLazyQueryHookResult = ReturnType<typeof useBalanceHistoryLazyQuery>;
export type BalanceHistoryQueryResult = Apollo.QueryResult<BalanceHistoryQuery, BalanceHistoryQueryVariables>;