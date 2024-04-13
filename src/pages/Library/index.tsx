import { useState } from 'react';
import { TagFilters } from './TagFilters';
import { Search } from './Search';
import { ActiveTags } from './ActiveTags';
import { GroupSortBy } from './GroupSortBy';
import { useLibrary } from 'contexts';
import { ArrowRightIcon, Button, Image, PageControl, ResourceList, Skeleton } from 'components';
import { useBreadCrumbsRoot } from 'hooks/useBreadCrumbs';
import { PageSizeControl } from 'components/PageSizeControl';

export function Library() {
  const [isReadMoreExpanded, setIsReadMoreExpanded] = useState(false);
  useBreadCrumbsRoot([{ page: 'Library' }]);
  const {
    isLoading,
    isTagsLoading,
    reset,
    currentPage,
    pageIndex,
    setPageIndex,
    maxPageIndex,
    pageSize,
    setPageSize,
    resultCount,
    isList,
  } = useLibrary();

  const controls =
    currentPage?.length && resultCount > 3 ? (
      <div className="flex justify-between md:items-center items-start mt-4 mb-5 h-10 text-sm md:flex-row flex-col md:gap-0 gap-3">
        <PageControl
          isPreviousAble={pageIndex > 0}
          onPrevious={() => setPageIndex((prev) => Math.max(0, prev - 1))}
          isNextAble={pageIndex < maxPageIndex}
          onNext={() => setPageIndex((prev) => Math.min(maxPageIndex, prev + 1))}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageCount={maxPageIndex}
          totalItems={resultCount}
          pageSize={pageSize}
        />
        <PageSizeControl
          pageSize={pageSize}
          setPageSize={setPageSize}
          className="flex items-center justify-center gap-[6px]"
        />
      </div>
    ) : null;

  return (
    <Skeleton.Provider isLoading={isTagsLoading}>
      <div className="mb-4 lg:p-16 pt-2 px-0  text-white">
        <div className="md:mb-6 mb-3">
          <h1 className="mb-2 sm:text-[56px] text-[32px]">
            <Skeleton.Loader
              isDarkTheme
              className="sm:w-64 w-[30%] sm:h-12 h-[34px] !rounded-[53px]"
            >
              Library
            </Skeleton.Loader>
          </h1>
          <div className="sm:text-lg text-sm max-w-[800px] text-[#F3EAEC]">
            <Skeleton.Loader isDarkTheme className="sm:w-[90%] w-[50%] h-5">
              Welcome to the Library. You can think of the Library as The Watch Explorer.
              <button
                className={`text-white ${isReadMoreExpanded ? 'hidden' : 'inline'} sm:hidden`}
                onClick={() => setIsReadMoreExpanded(true)}
              >
                .. Read More
              </button>
              <span className={`${isReadMoreExpanded ? 'inline' : 'hidden'} sm:inline`}>
                {' '}
                It is your decentralized gateway into world of listed smart contracts and published
                collections and views.
              </span>
            </Skeleton.Loader>
            <Skeleton.Loader isDarkTheme className="sm:w-[80%] w-[100%] h-5" />
          </div>
        </div>
        <div className="flex w-full flex-col justify-start">
          <div className="relative p-1 flex w-full h-12 my-2 rounded-3xl border z-30 border-white border-opacity-[15%] backdrop-blur-lg bg-[linear-gradient(90deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.00)_100%)]">
            <TagFilters />
            <Search />
          </div>
          <ActiveTags />
          <GroupSortBy />
          <div className="w-full flex-1 md:min-w-0 mt-4 flex flex-col">
            <ResourceList
              isEmptyView={
                <div className="w-full">
                  <div className="flex flex-col items-center justify-center[&>*]:mb-3">
                    <Image alt="No results" src="/empty-library.svg" className="mb-6" />
                    <h3 className="text-center">Oops</h3>
                    <div className="text-center text-[#ffffff99] max-w-[600px] text-opacity-60 text-base font-normal leading-normal my-3">
                      The Artifact you’re looking for doesn’t exist. Check whether you’ve typed the
                      correct address or revisit the Library by clicking on the link below.
                    </div>
                    <Button className="flex item-center" onClick={reset} variant="plain">
                      <span>Back to the Library</span>{' '}
                      <ArrowRightIcon className="h-[14px] w-[14px] ml-2 mt-0.5" />
                    </Button>
                  </div>
                </div>
              }
              isLoading={isLoading}
              value={currentPage}
              // isLibrary
              isList={isList}
            />
            {controls}
          </div>
        </div>
      </div>
    </Skeleton.Provider>
  );
}
