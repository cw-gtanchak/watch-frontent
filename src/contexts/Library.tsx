import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Maybe } from '@watch/common';
import { useQuery } from '@apollo/client';
import {
  SearchFilters,
  SearchResult,
  SearchType,
  Setter,
  SortBy,
  Suggestion,
  Tag,
  VoidFn,
} from 'types';
import { useTagsQuery, useSuggestionsLazyQuery } from 'hooks';
import {
  SearchLibraryCountType,
  SearchLibraryDocument,
  useSearchLibraryCountQuery,
  useSearchLibraryLazyQuery,
} from 'gql';

type ResourceCount = {
  [SearchType.All]: number;
  [SearchType.SmartContracts]: number;
  [SearchType.Views]: number;
};

interface LibraryState {
  tags: Tag[];
  chains: Maybe<Tag[]>;
  topTags: Maybe<Tag[]>;
  isLoading: boolean;
  isTagsLoading: boolean;
  searchString: string;
  searchTerm: string | undefined;
  searchType: SearchType;
  sortBy: SortBy;
  pageIndex: number;
  maxPageIndex: number;
  setPageIndex: Setter<number>;
  pageSize: number;
  setPageSize: Setter<number>;
  suggestions: Maybe<Suggestion[]>;
  currentPage: Maybe<SearchResult[]>;
  resultCount: number;
  reset: VoidFn;
  toggleTag: (_: Tag) => void;
  setSearchString: React.Dispatch<string>;
  setSearchTerm: React.Dispatch<string | undefined>;
  setSearchType: React.Dispatch<SearchType>;
  setSortBy: Setter<SortBy>;
  clearFilters: VoidFn;
  invalidateSearchQuery: VoidFn;
  isList: boolean;
  setIsList: React.Dispatch<boolean>;
  resourcesCount: SearchLibraryCountType;
}

interface Props extends React.PropsWithChildren {
  initialValue?: Partial<Pick<SearchFilters, 'searchType' | 'tags'>>;
}

export const LibraryContext = createContext<LibraryState>({
  searchString: '',
  searchType: 'all',
  suggestions: [],
  tags: [],
} as unknown as LibraryState);

export function LibraryProvider({
  children,
  initialValue = { searchType: SearchType.All, tags: [] },
}: Props) {
  // const [isLoading, setIsLoading] = useState(true);
  const [searchString, setSearchString] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string | undefined>();
  const [isList, setIsList] = useState(true);
  const [searchType, setSearchType] = useState<SearchType>(
    initialValue?.searchType || SearchType.All
  );

  const [tags, setTags] = useState<Tag[]>([]);

  const { client } = useQuery(SearchLibraryDocument);

  const [executeSearch, { data: searchQuery, loading: isSearchLoading }] =
    useSearchLibraryLazyQuery({
      variables: {
        filters: {
          searchTerm,
          searchType,
          tags: tags.map(({ slug }) => slug),
        },
      },
    });

  const invalidateSearchQuery = useCallback(() => {
    executeSearch({
      variables: {
        filters: {
          searchTerm,
          searchType,
          tags: tags.map(({ slug }) => slug),
        },
      },
      fetchPolicy: 'cache-and-network',
      onCompleted: () => client.clearStore(),
    });
  }, [client, executeSearch, searchTerm, searchType, tags]);

  const { data: tagsQuery, loading: isTagsLoading } = useTagsQuery();

  const [getSuggestions, { data: suggestionsQuery }] = useSuggestionsLazyQuery({
    variables: { string: searchString },
  });

  const results = useMemo(
    () => (isSearchLoading ? null : searchQuery?.searchLibrary),
    [isSearchLoading, searchQuery?.searchLibrary]
  );

  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(3);
  const maxPageIndex = useMemo(
    () => (results?.length ? Math.ceil(results?.length / pageSize) : 0),
    [results, pageSize]
  );
  const { data: resourceQueryCount } = useSearchLibraryCountQuery({
    variables: {
      filters: {
        searchTerm,
        tags: tags.map(({ slug }) => slug),
      },
    },
    fetchPolicy: 'cache-and-network',
  });

  const resourcesCount: ResourceCount = useMemo(() => {
    return {
      all: resourceQueryCount?.searchLibraryCount?.all || 0,
      smartContracts: resourceQueryCount?.searchLibraryCount?.smartContracts || 0,
      views: resourceQueryCount?.searchLibraryCount?.views || 0,
    };
  }, [resourceQueryCount]);

  const currentPage = useMemo(() => {
    if (results) {
      const tempArray = [...results];
      switch (sortBy) {
        case 'refs':
          tempArray?.sort((a, b) => (b.refs && a.refs ? b.refs - a.refs : 0));
          break;
        case 'status':
          tempArray
            ?.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)))
            .sort((a, b) => {
              if (a.__typename === 'View' && b.__typename === 'View') {
                return a.status?.toLowerCase() === b.status?.toLowerCase()
                  ? 0
                  : a.status?.toLowerCase() === 'active'
                  ? -1
                  : 1;
              }
              if (a.__typename === 'SmartContract' && b.__typename === 'SmartContract') {
                return (b.refs || 0) - (a.refs || 0);
              }
              return a.__typename === 'View' ? 0 : 1;
            });
          break;
        default:
          tempArray?.sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt)));
          break;
      }
      return tempArray.slice(pageIndex * pageSize, (1 + pageIndex) * pageSize);
    }
  }, [results, sortBy, pageIndex, pageSize]);

  const [chains, topTags] = useMemo<[Maybe<Tag[]> | null, Maybe<Tag[]>]>(
    () => (isTagsLoading ? [null, null] : [tagsQuery?.chainTags, tagsQuery?.topTags]),
    [isTagsLoading, tagsQuery?.chainTags, tagsQuery?.topTags]
  );

  const suggestions = useMemo(() => suggestionsQuery?.suggestions, [suggestionsQuery?.suggestions]);

  const isLoading = useMemo(
    () => isTagsLoading || isSearchLoading,
    [isTagsLoading, isSearchLoading]
  );

  useEffect(() => {
    executeSearch({
      variables: {
        filters: {
          searchTerm,
          searchType,
          tags: tags.map(({ slug }) => slug),
        },
      },
      fetchPolicy: 'no-cache',
    });
  }, [executeSearch, searchTerm, searchType, tags]);

  useEffect(() => {
    setPageIndex(0);
  }, [pageSize, searchType, searchTerm, tags]);

  useEffect(() => {
    if (searchString && searchString.length > 0) {
      getSuggestions();
    }
  }, [searchString, getSuggestions]);

  useEffect(() => {
    setSearchString('');
  }, [searchTerm]);

  const toggleTag = useCallback((tag: Tag) => {
    setTags((prev) => {
      if (prev.find((t) => t.slug === tag.slug)) {
        return prev.filter((t) => t.slug !== tag.slug);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  const clearFilters = useCallback(() => {
    setTags([]);
  }, []);

  const reset = useCallback(() => {
    clearFilters();
    setSearchType(SearchType.All);
    setSearchTerm(undefined);
    setSearchString('');
  }, [clearFilters]);

  const value = useMemo(
    () => ({
      chains,
      topTags,
      clearFilters,
      isLoading,
      isTagsLoading,
      reset,
      currentPage,
      searchString,
      searchTerm,
      searchType,
      sortBy,
      pageIndex,
      pageSize,
      maxPageIndex,
      resultCount: results?.length || 0,
      setPageIndex,
      setPageSize,
      setSearchString,
      setSearchTerm,
      setSearchType,
      setSortBy,
      suggestions,
      tags,
      toggleTag,
      invalidateSearchQuery,
      isList,
      setIsList,
      resourcesCount,
    }),
    [
      chains,
      topTags,
      clearFilters,
      isLoading,
      isTagsLoading,
      reset,
      currentPage,
      searchString,
      searchTerm,
      searchType,
      sortBy,
      pageIndex,
      pageSize,
      maxPageIndex,
      results?.length,
      setPageSize,
      suggestions,
      tags,
      toggleTag,
      invalidateSearchQuery,
      isList,
      setIsList,
      resourcesCount,
    ]
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export const useLibrary = () => useContext(LibraryContext);
