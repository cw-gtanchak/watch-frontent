/* eslint-disable no-constant-condition */
import { RadioGroup } from '@headlessui/react';
import { Fragment, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CardIcon, ListIcon, Select, Skeleton, useSkeleton } from 'components';
import { useLibrary } from 'contexts';
import { SearchType } from 'gql';
import { Option, SortBy } from 'types';
import { classes } from 'utils';
import { useWindowSize } from 'hooks';

const TYPE_OPTIONS = [
  { label: 'All', value: SearchType.All },
  { label: 'Smart Contracts', value: SearchType.SmartContracts },
  { label: 'Views', value: SearchType.Views },
];

export const SORT_OPTIONS: Option<SortBy>[] = [
  { value: 'createdAt', label: 'Latest' },
  // { value: 'earnings', label: 'Earnings' },
  // { value: 'refs', label: 'References' },
  { value: 'status', label: 'Active' },
];

export function GroupSortBy() {
  const isLoading = useSkeleton();
  const { searchType, setSearchType, sortBy, setSortBy, isList, setIsList, resourcesCount } =
    useLibrary();
  const location = useLocation();
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (
      location.state?.tab === SearchType.SmartContracts ||
      location.state?.tab === SearchType.Views
    ) {
      setSearchType(location.state?.tab);
    }
  }, []);

  return (
    <div className="w-full flex mt-6 md:items-center items-start relative">
      <RadioGroup
        className="flex flex-1 gap-2 items-start w-full overflow-auto no-scrollbar"
        value={searchType}
        onChange={setSearchType}
      >
        {TYPE_OPTIONS.map(({ label, value }) => {
          return (
            <RadioGroup.Option as={Fragment} key={value} value={value}>
              {({ checked }) => (
                <div
                  className={classes(
                    'cursor-pointer md:text-base text-sm text-[#f7f8f8] border-y-2 py-2 pr-2 pl-3 border-transparent border-solid border-0 whitespace-pre',
                    checked && !isLoading && 'rounded-[32px] bg-[#ffffff1c]'
                  )}
                >
                  <Skeleton.Loader isDarkTheme className="w-20 h-6 !rounded-[32px]">
                    {label}{' '}
                    <span className="ml-1 md:text-sm text-xs px-2 py-1.5 bg-[#f7f8f814] rounded-full">
                      {resourcesCount[value]}
                    </span>
                  </Skeleton.Loader>
                </div>
              )}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
      {!isMobile && (
        <>
          <Skeleton.Loader isDarkTheme className="w-36 h-10 !rounded-[32px]">
            <div className="flex items-center whitespace-pre justify-end md:gap-2 gap-5">
              <div className="flex flex-row shrink-0 pl-4 md:justify-end justify-start items-center text-sm border border-[#ffffff14] rounded-3xl">
                <span className="text-[#B2B3B8]">
                  Sort by <span className="ml-1">·</span>
                </span>
                <Select
                  value={sortBy}
                  onChange={setSortBy}
                  options={SORT_OPTIONS}
                  isLibrary
                  classNames={{
                    valueContainer: () => '',
                    menu: () => '!w-44',
                  }}
                />
              </div>
            </div>
          </Skeleton.Loader>
          <RadioGroup
            className="flex flex-row gap-[2px] ml-3"
            defaultChecked
            defaultValue={isList ? 'list' : 'card'}
          >
            {[
              { svg: <ListIcon />, value: 'list' },
              { svg: <CardIcon />, value: 'card' },
            ].map(({ svg, value }) => (
              <RadioGroup.Option value={value} key={value}>
                {({ checked }) => {
                  return (
                    <Skeleton.Loader isDarkTheme className="h-10 w-10 !rounded-[32px]">
                      <button
                        className={classes(
                          'w-10 h-10 p-[10px]',
                          checked &&
                            'bg-[#1B1B1B] rounded-3xl border border-solid border-[#FFFFFF33]'
                        )}
                        onClick={() => {
                          setIsList(value === 'list');
                        }}
                      >
                        {svg}
                      </button>
                    </Skeleton.Loader>
                  );
                }}
              </RadioGroup.Option>
            ))}
          </RadioGroup>
        </>
      )}
    </div>
  );
}
