import { SearchLibraryQuery, SuggestionDetailsFragment, TagDetailsFragment } from '../gql';

export type {
  ApiKeyDetailsFragment as ApiKey,
  PublisherDetailsFragment as Publisher,
  TagDetailsFragment as TagDetails,
  Resource,
  SearchFilters,
  SmartContract,
  User,
  View,
} from '../gql';

export type SearchResult = SearchLibraryQuery['searchLibrary'][0];

export { Network, SearchType } from 'gql';

export type Suggestion = SuggestionDetailsFragment & {
  isNew?: boolean;
};

export type Tag = Pick<TagDetailsFragment, 'name' | 'slug'>;
