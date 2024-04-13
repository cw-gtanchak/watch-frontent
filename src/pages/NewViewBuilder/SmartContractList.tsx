import { useCallback, useEffect, useMemo, useState } from 'react';
import { Tab } from '@headlessui/react';
import { FunctionList } from './FunctionList';
import {
  Button,
  Details,
  DocumentViewIcon,
  Header,
  Input,
  MagnifyingGlassIcon,
  Skeleton,
  Summary,
  TagButton,
} from 'components';
import { HTMLAttributes, Tag } from 'types';
import { arrayOfSize, classes, pluralize } from 'utils';
import { useNewViewBuilder } from 'contexts';
import { useTabs, useTagsQuery } from 'hooks';

export function SmartContractList(props: HTMLAttributes<HTMLDivElement>) {
  const {
    smartContracts,
    searchedSC,
    searchSC,
    setSelectedSmartContract,
    isSmartContractLoading: isLoading,
    setFunctionSpecs,
    isSearchLoading,
    isFunctionsLoading,
    selectedSmartContract,
    functionOptions,
  } = useNewViewBuilder();
  const [searchString, setSearchString] = useState('');
  const [openedSmartContracts, setOpenedSmartContracts] = useState<(string | undefined)[]>([]);
  const [selectedSmartContactName, setSelectedSmartContactName] = useState<string | null>('');
  const [activeTags, setActiveTags] = useState<Tag[]>([]);

  const data = useMemo(() => {
    return searchString || activeTags.length ? searchedSC : smartContracts;
  }, [searchString, smartContracts, activeTags, searchedSC]);

  useEffect(() => {
    if (searchString || activeTags.length) {
      searchSC(searchString, activeTags);
    }
  }, [searchString, activeTags]);

  useEffect(() => {
    const name = sessionStorage.getItem('smartContactName');
    setSelectedSmartContactName(name);
  }, []);

  useEffect(() => {
    if (!isLoading && selectedSmartContactName && smartContracts) {
      const smartContract = smartContracts?.find((sc) => sc.name === selectedSmartContactName);
      setSearchString(selectedSmartContactName);
      setSelectedSmartContract(smartContract);
      setOpenedSmartContracts((prev) => [...prev, smartContract?.address]);
      sessionStorage.removeItem('smartContactName');
    }
  }, [isLoading, selectedSmartContactName]);

  const { data: tags, loading: isTagsLoading } = useTagsQuery();

  const toggleTag = useCallback((tag: Tag) => {
    setActiveTags((prev) => {
      if (prev.find((t) => t.slug === tag.slug)) {
        return prev.filter((t) => t.slug !== tag.slug);
      } else {
        return [...prev, tag];
      }
    });
  }, []);

  const { tabSelector, tabPanels } = useTabs(
    [
      // {
      //   child: (
      //     <div className="flex flex-wrap gap-[6px]">
      //       {!(isLoading || isTagsLoading) &&
      //         tags?.topTags.map((tag, index) => {
      //           if (index < 5)
      //             return (
      //               <TagButton
      //                 value={tag}
      //                 className="list-none w-fit"
      //                 classNames={{
      //                   button:
      //                     'capitalize text-white text-sm font-normal leading-tight text-white text-sm font-normallowercase leading-tight select-none',
      //                 }}
      //                 toggleTag={toggleTag}
      //                 isActive={activeTags.some((t) => t.slug === tag.slug)}
      //               />
      //             );
      //         })}
      //       {(isLoading || isTagsLoading) &&
      //         arrayOfSize(10).map((el) => (
      //           <Skeleton.Loader isLoading isDarkTheme className="w-[30px] h-6" />
      //         ))}
      //     </div>
      //   ),
      //   label: 'Popular Tags',
      //   value: 'toptag',
      // },
      {
        child: (
          <div className="flex flex-wrap gap-[6px]">
            {tags?.chainTags.map((tag) => (
              <TagButton
                icon={<img src={`/logos/chain/${tag.name?.toLowerCase()}.svg`} alt={tag.slug} />}
                value={tag}
                className="list-none w-fit"
                classNames={{
                  button:
                    'capitalize text-white text-sm font-normal leading-tight text-white text-sm font-normallowercase leading-tight select-none',
                }}
                toggleTag={toggleTag}
                isActive={activeTags.some((t) => t.slug === tag.slug)}
              />
            ))}
          </div>
        ),
        label: 'Chain Tags',
        value: 'chaintag',
      },
    ],
    0,
    {
      classNames: {
        base: 'w-full whitespace-pre gap-4  !h-fit border-b border-stone-900 p-0 pb-[6px] mt-[17px]',
        tab: (_) =>
          classes(
            'text-white text-xs font-normal h-[22px] !flex-[unset]',
            _ &&
              'relative after:h-[1px] after:w-full after:bg-white  after:left-0 after:bottom-[-8px] after:w-full after:block after:absolute'
          ),
      },
    }
  );

  return (
    <div
      {...props}
      className="border-r-solid flex flex-1  lg:max-w-[329px] h-full shrink-0 flex-col overflow-y-auto overflow-x-hidden border-0 lg:border-r border-r-0 border-solid border-[#212121] no-scrollbar"
    >
      <div className="px-6 pt-4 flex-0">
        <Skeleton.Loader
          isDarkTheme
          containerClassName="lg:flex hidden"
          className="w-[126px] h-[22px]"
        >
          <h5 className="lg:flex hidden">Smart Contracts</h5>
        </Skeleton.Loader>
        <Skeleton.Loader isDarkTheme className="w-full h-10 mt-2 !rounded-full">
          <Input
            className="relative pl-8 pr-2 lg:mt-6 mt-0 lg:bg-[#0B0B0B] bg-[#060606]"
            isClearable
            value={searchString}
            onChange={setSearchString}
            placeholder="Search"
            isDarkTheme
          >
            <MagnifyingGlassIcon className="absolute left-4 top-2 h-5 w-5 text-neutral-400" />
          </Input>
        </Skeleton.Loader>
        <Tab.Group>
          <Header
            accessory={
              <Skeleton.Loader isDarkTheme className="mt-4" containerClassName="h-fit">
                {tabSelector}
              </Skeleton.Loader>
            }
            accessoryClassname="!w-full"
          ></Header>
          <div>{tabPanels}</div>
        </Tab.Group>

        <div className="flex justify-between border-b border-[#1E1E1E]">
          <Skeleton.Loader isDarkTheme className="w-[52px] h-[22px] mb-2">
            <p
              className={classes(
                'text-xs text-[#B2B3B8] lg:pt-4 pt-[14px] lg:pb-[13px] pb-[16px] ',
                !data?.length && 'border-b-0'
              )}
            >
              {`${data?.length || 0} ${pluralize('Result', data?.length || 0)}:`}
            </p>
          </Skeleton.Loader>
          <Skeleton.Loader isDarkTheme className="w-[52px] h-[22px] mb-2">
            <Button
              variant="plain"
              classNames={{
                base: 'lg:pt-4 pt-[14px] lg:pb-[13px] pb-[16px]',
                container: 'text-xs text-[#B15EBE]',
              }}
              onClick={() => setFunctionSpecs([])}
            >
              Clear all
            </Button>
          </Skeleton.Loader>
        </div>
      </div>
      <Skeleton.Provider isLoading={isLoading || isSearchLoading}>
        <ul className="w-full text-white flex-[3] overflow-auto scrollbar-white px-6 shrink-0">
          {(isLoading || isSearchLoading ? arrayOfSize(10).map(() => undefined) : data)?.map(
            (sc) => {
              return (
                <li key={sc?.address}>
                  <button
                    className={classes('flex gap-2 w-full items-center text-sm border-[#1E1E1E]')}
                    onClick={() => {
                      setSelectedSmartContract(sc);
                      setOpenedSmartContracts((prev) =>
                        !prev.includes(sc?.address) ? [...prev, sc?.address] : prev
                      );
                    }}
                  >
                    <Details
                      open={!!functionOptions?.length && searchString == sc?.name}
                      className="flex flex-1 border-none"
                    >
                      <Summary
                        isLoading={
                          isFunctionsLoading && selectedSmartContract?.address === sc?.address
                        }
                        className={'flex-1 flex border-none !bg-white'}
                      >
                        <Skeleton.Loader isDarkTheme className="w-6 h-6">
                          <DocumentViewIcon />
                        </Skeleton.Loader>
                        <div
                          className="flex-1  flex-row justify-between my-1 break-words line-clamp-2 ml-[14px] text-[14px]"
                          style={{ wordBreak: 'break-word' }}
                        >
                          <Skeleton.Loader isDarkTheme containerClassName="w-full max-w-[158px]">
                            {sc?.name}
                          </Skeleton.Loader>
                        </div>
                      </Summary>
                      {functionOptions && openedSmartContracts.includes(sc?.address) && (
                        <FunctionList smartContractAddress={sc?.address as string} />
                      )}
                    </Details>
                  </button>
                </li>
              );
            }
          )}
        </ul>
      </Skeleton.Provider>
    </div>
  );
}
