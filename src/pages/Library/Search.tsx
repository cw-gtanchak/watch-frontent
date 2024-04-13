import { Combobox } from '@headlessui/react';
import { Fragment, useRef } from 'react';
import reactStringReplace from 'react-string-replace';
import { Button, MagnifyingGlassIcon, TagIcon, Skeleton } from 'components';
import { useLibrary } from 'contexts';
import { Suggestion } from 'types';
import { classes } from 'utils';

export const menuGroupClassName = 'text-xs py-2 px-3 uppercase';
export const menuOptionClassName =
  'flex items-start whitespace-pre-line break-all cursor-pointer select-none relative text-sm p-3 hover:bg-gray-100';

export function Search() {
  const input = useRef<HTMLInputElement | null>(null);
  const { searchString, setSearchString, setSearchTerm, suggestions, toggleTag } = useLibrary();

  return (
    <Combobox<Suggestion>
      onChange={(s) => {
        if (s.isTag) {
          toggleTag({ name: s.name, slug: s.value });
        } else {
          setSearchTerm(s.value);
        }
        setSearchString('');
        input.current && input.current.blur();
      }}
    >
      <div className={classes('relative h-10 flex-1 md:max-w-full md:min-w-[288px] lg:max-w-full')}>
        <Skeleton.Loader heightFix isDarkTheme containerClassName="w-full flex justify-end items-center" className="h-10 w-10 !rounded-[32px]">
          <Combobox.Input
            className={classes(
              'w-full flex-1 border-gray-200 pb-2 pl-3 pr-4 pt-2 placeholder:text-neutral-400 text-sm'
            )}
            displayValue={() => ''}
            onChange={(e) => setSearchString(e.target.value)}
            placeholder="Search..."
            ref={input}
          ></Combobox.Input>
          <div className="absolute right-0 top-0 h-full shrink-0 p-0.5">
            <Button
              isIcon
              variant="darkThemeFilled"
              className="aspect-square shrink-0"
              onClick={() => setSearchTerm(searchString)}
            >
              <MagnifyingGlassIcon className="h-5 w-5" color="black" />
            </Button>
          </div>
        </Skeleton.Loader>
        <Combobox.Options className="bg-black rounded-lg border border-[#ffffff14] absolute left-0 top-full z-10 w-full">
          <div className={menuGroupClassName}>
            {searchString.length <= 0 ? 'Popular Tags' : 'Results'}
          </div>
          {searchString.length > 0 && (
            <Combobox.Option
              key={searchString}
              value={{ label: searchString, value: searchString, isTag: false }}
              as={Fragment}
            >
              {() => (
                <li className={classes(menuOptionClassName, 'items-center')}>
                  <MagnifyingGlassIcon className="mr-1 h-4 w-4" />
                  <div>Search for &apos;{searchString}&apos;</div>
                </li>
              )}
            </Combobox.Option>
          )}
          {suggestions?.map((s) => {
            return (
              <Combobox.Option key={s.value} value={s} as={Fragment}>
                {({ active }) => (
                  <li
                    className={classes(
                      menuOptionClassName,
                      'items-center',
                      active && 'bg-[#101010]'
                    )}
                  >
                    {s.isTag ? (
                      <TagIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <MagnifyingGlassIcon className="mr-1 h-4 w-4" />
                    )}
                    <div>
                      {reactStringReplace(
                        s.name as string,
                        new RegExp(`\\b(${searchString?.toLowerCase()})`, 'i'),
                        (match) => (
                          <span className="font-bold">{match}</span>
                        )
                      )}
                    </div>
                  </li>
                )}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
