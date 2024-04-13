import { newTagSlug } from '@watch/common/dist/utils';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { TagBasicsFragment, TagInput, useSuggestionsLazyQuery, useTagsQuery } from 'gql';
import { Setter, Suggestion, VoidFn } from 'types';

type TagInitial = Pick<TagBasicsFragment, 'slug' | 'name'>;

export interface UseEditTags {
  searchString: string;
  setSearchString: Setter<string>;
  tags: TagInput[];
  setTags: Setter<TagInput[]>;
  resetTags: VoidFn;
  suggestions: Suggestion[] | undefined;
  newTag?: Suggestion;
  chainTags?: TagInput[];
  topTags?: TagInput[];
  isFocused: boolean;
  setIsFocused: Setter<boolean>;
}

function tagInputsFromInitial(initial: TagInitial[]): TagInput[] {
  const tags: TagInput[] = [];
  initial.forEach(({ name, slug }) => {
    if (!tags.some((tag) => tag.name === name)) {
      tags.push({ name, slug, isNew: false });
    }
  });
  return tags;
}

export function useEditTags(initial?: TagInitial[]): UseEditTags {
  const [searchString, setSearchString] = useState('');
  const [tags, setTags] = useState<TagInput[]>(tagInputsFromInitial(initial || []));
  const [isFocused, setIsFocused] = useState(false);

  const [getSuggestions, { data: suggestionsQuery }] = useSuggestionsLazyQuery({
    variables: { string: searchString, isTagOnly: true },
  });

  // fetch Chain Tags and Top Tags
  const { data: tagsQuery } = useTagsQuery();

  const [suggestions, newTag] = useMemo(() => {
    const fromQuery = suggestionsQuery?.suggestions;

    if (searchString.length === 0) {
      return [fromQuery, undefined];
    }

    const newSlug: string = newTagSlug(searchString);

    const isValid =
      newSlug.length > 0 &&
      searchString.length > 0 &&
      (!fromQuery || !fromQuery.some(({ value, isTag }) => isTag && newSlug === value));

    return [
      fromQuery,
      isValid
        ? {
            isNew: true,
            isTag: true,
            value: newSlug,
            name: searchString,
          }
        : undefined,
    ];
  }, [searchString, suggestionsQuery?.suggestions]);

  const resetTags = useCallback(() => {
    if (initial) {
      setTags(tagInputsFromInitial(initial));
    }
  }, [initial]);

  useEffect(() => {
    if ((searchString && searchString.length > 0) || isFocused) {
      getSuggestions();
    }
  }, [searchString, getSuggestions, isFocused]);

  useEffect(() => {
    resetTags();
  }, [resetTags]);

  return useMemo(
    () => ({
      searchString,
      setSearchString,
      tags,
      setTags,
      resetTags,
      suggestions,
      newTag,
      isFocused,
      setIsFocused,
      ...tagsQuery,
    }),
    [searchString, tags, suggestions, resetTags, newTag, tagsQuery, isFocused, setIsFocused]
  );
}
