import { Combobox } from '@headlessui/react';
import { Fragment, useRef, useCallback } from 'react';
import reactStringReplace from 'react-string-replace';
import { Tag } from './Tag';
import { SearchTagIcon } from './svg';
import { Button } from './Button';
import { XMarkIcon } from './icons';
import { UseEditTags } from 'hooks';
import { ClassNames, HTMLAttributes, Suggestion, Tag as TagType } from 'types';
import { INPUT_BASE_CLASSNAME, classes } from 'utils';
import { TagInput } from 'gql';

interface Props extends HTMLAttributes<HTMLDivElement>, UseEditTags {
  classNames?: ClassNames<
    'input' | 'options' | 'option' | 'optionActive' | 'tags' | 'tagsUl' | 'tag' | 'tagBase'
  >;
  placeholder?: string;
  withCreate?: boolean;
  showSaveButton?: boolean;
  isClearable?: boolean;
  lengthLimit?: number;
  limit?: number;
}

export function InputTags({
  children,
  classNames,
  newTag,
  placeholder = 'Please type tag',
  tags,
  setTags,
  searchString,
  setSearchString,
  suggestions,
  withCreate,
  showSaveButton,
  isClearable,
  onFocus,
  lengthLimit = 30,
  limit,
  chainTags,
}: Props) {
  const input = useRef<HTMLInputElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Combobox<Suggestion>
        onChange={(s) => {
          if (searchString.length) {
            setTags((prev) => {
              if (limit && prev.length < limit) {
                if (!prev.some(({ slug }) => slug === s.value)) {
                  return [
                    ...prev,
                    {
                      name: s.name,
                      slug: s.value,
                      isNew: s.isNew,
                    },
                  ];
                }
              }

              return prev;
            });
            setSearchString('');
          }
        }}
      >
        <div
          className={classes(
            INPUT_BASE_CLASSNAME,
            'relative mb-2 pl-9 pr-2 h-10 border rounded-3xl shadow-[0px_8px_10px_0px_#000,0px_-2px_52px_0px_rgba(200,200,200,0.06)_inset] bg-gradient-to-r from-[#ffffff0f] via-[#ffffff09] to-[#ffffff00] border-white border-opacity-[0.08]',
            classNames?.base
          )}
        >
          <Combobox.Button ref={buttonRef} className="hidden" />
          <Combobox.Input
            className={classes(
              'w-full text-white placeholder:text-[#ffffff7a] text-sm',
              classNames?.input
            )}
            displayValue={() => ''}
            value={searchString}
            onChange={(e) => {
              if (e.target.value.length < lengthLimit) setSearchString(e.target.value);
            }}
            placeholder={placeholder}
            ref={input}
            onFocus={(e) => {
              buttonRef.current?.click();
              onFocus && onFocus(e);
            }}
          />
          {isClearable && searchString && searchString.length > 0 && (
            <button onClick={setSearchString ? () => setSearchString('') : undefined}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          {showSaveButton && (
            <div>
              <Button
                variant="primary"
                className="h-[30px] w-[42px] p-[5px] my-[5px] mr-[5px]"
                onClick={() => {
                  if (!!searchString && !!searchString.replaceAll(' ', ''))
                    setTags((prev) => {
                      if (limit && prev.length < limit) {
                        if (!prev.some(({ slug }) => slug === searchString)) {
                          return [
                            ...prev,
                            {
                              name: searchString,
                              slug: searchString,
                              isNew: true,
                            },
                          ];
                        }
                      }

                      return prev;
                    });
                  setSearchString('');
                }}
              >
                Save
              </Button>
            </div>
          )}
          {((withCreate && newTag) || (suggestions && suggestions.length > 0)) && (
            <Combobox.Options
              className={classes(
                ' rounded-2xl border border-[#ffffff1f] absolute top-14 z-10 w-full px-4 py-3 bg-[#060606] backdrop-blur-[27px]',
                classNames?.options
              )}
            >
              {withCreate && newTag && <p className="text-xs">Select an option or create one</p>}
              {withCreate && newTag && (
                <Combobox.Option key={newTag.value} value={newTag} as={Fragment}>
                  {() => (
                    <li
                      className={classes(
                        classNames?.option,
                        'flex items-center text-xs my-2 cursor-pointer'
                      )}
                    >
                      <div className="w-fit whitespace-pre flex flex-row gap-1 items-center">
                        <div>Create</div>
                        <div>•</div>
                      </div>
                      <div className="mt-0.5 -rotate-90 mx-2">
                        {' '}
                        <SearchTagIcon stroke="white" fill="transparent" />
                      </div>{' '}
                      <b className="uppercase text-sm break-all">{newTag.name}</b>
                    </li>
                  )}
                </Combobox.Option>
              )}
              {searchString.length <= 0 && <div className="text-xs">Popular Tags</div>}
              {suggestions?.map((s) => {
                return (
                  <Combobox.Option key={s.value} value={s} as={Fragment}>
                    {() => (
                      <li
                        className={classes(
                          'flex items-start whitespace-pre-line  cursor-pointer select-none relative text-sm my-1 font-medium',
                          classNames?.option,
                          'items-center'
                        )}
                        onClick={(e) => {
                          if (!searchString.length) {
                            setTags((prev) => {
                              if (limit && prev.length < limit) {
                                if (!prev.some(({ slug }) => slug === s.value)) {
                                  return [
                                    ...prev,
                                    {
                                      name: s.name,
                                      slug: s.value,
                                      isNew: s.isNew,
                                    },
                                  ];
                                }
                              }

                              return prev;
                            });
                            setSearchString('');
                            e.stopPropagation();
                          }
                        }}
                      >
                        {s.isTag && (
                          <div className="mr-1 -rotate-90">
                            <SearchTagIcon stroke="white" fill="transparent" />
                          </div>
                        )}
                        <div className="truncate">
                          {reactStringReplace(
                            s.name as string,
                            new RegExp(`\\b(${searchString?.toLowerCase()})`, 'i'),
                            (match) => (
                              <span className="font-bold">{match}</span>
                            )
                          )}
                        </div>
                        <div className="flex flex-row items-center whitespace-pre">
                          <div className="bg-[#ffffff52] w-1 h-1 rounded-3xl mx-2"></div>
                          <div className="text-xxs">10 repeats</div>
                        </div>
                      </li>
                    )}
                  </Combobox.Option>
                );
              })}
            </Combobox.Options>
          )}
          {children}
        </div>
      </Combobox>
      {tags.length > 0 && (
        <div
          className={classes(
            'mt-3 flex w-full flex-wrap items-baseline space-x-2',
            classNames?.tags
          )}
        >
          <ul
            className={classes(
              '-mb-2 flex flex-wrap items-center space-x-2 space-x-reverse text-xs text-neutral-500 ',
              classNames?.tagsUl
            )}
          >
            {tags?.map((tag, i) => {
              const isChainTag = !!chainTags?.find((el) => el.name === tag.name);

              return (
                <Tag
                  key={tag.slug}
                  className={classes(
                    'text-xxs bg-neutral-200 font-normal',
                    i === 0 && 'mr-2',
                    classNames?.tag
                  )}
                  classNames={{ base: classNames?.tagBase }}
                  onRemove={() => setTags((prev) => prev.filter(({ slug }) => slug !== tag.slug))}
                  value={tag as TagType}
                  isDarkTheme
                  {...(isChainTag
                    ? {
                        icon: (
                          <img src={`/logos/chain/${tag.name?.toLowerCase()}.svg`} alt={tag.slug} />
                        ),
                      }
                    : {})}
                >
                  {tag.name}
                </Tag>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
