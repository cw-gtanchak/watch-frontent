import { SearchType } from 'gql/graphql';

export const SEARCH_TYPE: Record<SearchType, string> = {
  [SearchType.All]: 'All',
  [SearchType.SmartContracts]: 'Smart Contracts',
  [SearchType.Views]: 'Views',
};

export const DOCS = 'https://docs.analog.one/documentation';

export const COLUMN_NAME_REGEX = /^[a-zA-Z_][a-zA-Z0-9_]*$/;
