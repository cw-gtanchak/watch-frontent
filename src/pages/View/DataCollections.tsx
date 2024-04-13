import { QueryResult } from '@analog-labs/timegraph-js';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import pluralize from 'pluralize';
import { useEffect, useMemo, useState } from 'react';
import { Button, Cycle, NoRecentData, QueryDataTable, Skeleton } from 'components';
import { useView } from 'contexts';
import { useWindowSize } from 'hooks';
import { usePageFilter } from 'hooks/usePageFilter';
import { DOCS } from 'consts';
import { arrayOfSize, classes } from 'utils';
import { Link } from 'react-router-dom';

function SkeletonData({ rowCount }: { rowCount?: number }) {
  const { isMobile } = useWindowSize();
  if (isMobile) {
    return (
      <div className="flex flex-col gap-3">
        {arrayOfSize(rowCount || 3).map((el, index) => {
          return (
            <div className="flex flex-col text-sm text-white bg-[#0E0E0E] rounded-2xl p-4">
              <div className="flex flex-row items-center gap-2">
                <Skeleton.Loader isDarkTheme className="w-8 h-8 !rounded-[5px]" />
                <Skeleton.Loader isDarkTheme className="sm:h-[15px] h-6 w-[180px]" />
              </div>
              <div className="mt-4 mb-3 bg-[#1F1F1F] h-[1px]" />
              <div className="flex md:flex-row flex-col justify-between">
                <div className="flex flex-1 gap-[6px]">
                  <Skeleton.Loader
                    isDarkTheme
                    containerClassName="w-full"
                    className="h-[24px] w-[90%]"
                  />
                </div>
                <div className="flex flex-1 gap-[6px]">
                  <Skeleton.Loader
                    isDarkTheme
                    containerClassName="w-full"
                    className="h-[24px] w-[90%]"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div className="w-full p-6">
      <div className="grid grid-cols-3 pl-3">
        <Skeleton.Loader
          isLoading
          isDarkTheme
          className="max-w-[35px]"
          containerClassName="flex flex-row w-full justify-between"
        />
        <Skeleton.Loader
          isLoading
          isDarkTheme
          className="max-w-[35px]"
          containerClassName="flex flex-row w-full justify-between"
        />
        <Skeleton.Loader
          isLoading
          isDarkTheme
          className="max-w-[35px]"
          containerClassName="flex flex-row w-full justify-between"
        />
      </div>
      {arrayOfSize(rowCount || 3).map((el, index) => {
        return (
          <div className="border-x-0 border-y border-neutral-200 text-xs border-none bg-[#0E0E0E] my-4 rounded-2xl pl-3 h-[43px] flex items-center">
            <Skeleton.Loader
              isLoading
              className="max-w-[115px] !rounded-xl"
              containerClassName="flex flex-row w-full justify-between"
            />
            <Skeleton.Loader
              isLoading
              className="max-w-[115px] !rounded-xl"
              containerClassName="flex flex-row w-full justify-between"
            />
            <Skeleton.Loader
              isLoading
              className="max-w-[115px] !rounded-xl"
              containerClassName="flex flex-row w-full justify-between"
            />
          </div>
        );
      })}
    </div>
  );
}

export function DataCollections({ status }: { status: string | undefined | null }) {
  const { isMobile } = useWindowSize();
  const { isRecentDataLoading, recentData, refreshRecentData, isResourceLoading, resource } =
    useView();
  const [refreshed, setRefreshed] = useState(1);
  const { controller, currentPage } = usePageFilter(
    (recentData as unknown as QueryResult | undefined)?.data
    // status === 'Active' ? 3 : 6
  );

  const newData: QueryResult | undefined = useMemo(() => {
    if (recentData)
      return {
        ...(recentData as unknown as QueryResult),
        header: (recentData as unknown as QueryResult).header.map((el) => {
          if (el === '_clock' || el === '_index') {
            return el.replace('_', '');
          }
          return el;
        }),
      };

    return undefined;
  }, [recentData]);

  const tableContent = useMemo(() => {
    if (isMobile) {
      return (
        <div className="flex flex-col gap-4">
          {currentPage?.map((row, index) => {
            return (
              <div
                key={index}
                className="flex flex-col text-sm text-white bg-[#0E0E0E] rounded-2xl p-4"
              >
                <div className="flex flex-row items-center gap-2">
                  <Skeleton.Loader isDarkTheme className="w-8 h-8 !rounded-[5px]">
                    {typeof row[0] == 'string' && <Cycle />}
                  </Skeleton.Loader>
                  <Skeleton.Loader isDarkTheme className="sm:h-[15px] h-6 w-[180px]">
                    {row[0]}
                  </Skeleton.Loader>
                </div>
                <div className="mt-4 mb-3 bg-[#1F1F1F] h-[1px]" />
                <div className="flex md:flex-row flex-col justify-between">
                  {row?.map((value, index) => {
                    const headerItem = (recentData as unknown as QueryResult)?.header[index];
                    if (index == 0) return;
                    return (
                      <div key={index} className="flex flex-1 gap-[6px]">
                        <Skeleton.Loader
                          isDarkTheme
                          containerClassName="w-full"
                          className="h-[24px] w-[90%]"
                        >
                          <span className="text-[#B2B3B8] capitalize">
                            {headerItem === '_clock' || headerItem === '_index'
                              ? headerItem.replace('_', '')
                              : headerItem}
                            :
                          </span>
                          <span className="truncate">{value}</span>
                        </Skeleton.Loader>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {controller}
        </div>
      );
    } else {
      return (
        <QueryDataTable
          isLoading={isRecentDataLoading}
          rowIcon={<Cycle />}
          recentData={newData}
          // defaultPageSize={status === 'Active' ? 3 : 6}
          classNames={{
            base: 'scrollbar-white',
            table: 'border-spacing-y-2',
            row: 'border-none bg-[#0E0E0E]',
            rowItem:
              'text-sm border-none align-middle p-[14px] pl-[16px] first:rounded-l-2xl last:rounded-r-2xl',
            headItem: 'text-xs text-[#B2B3B8]',
          }}
          // showPagination={status === 'Active'}
        />
      );
    }
  }, [isMobile, currentPage, controller, isRecentDataLoading, newData, status]);

  useEffect(() => {
    const refreshedInterval = setInterval(() => {
      setRefreshed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(refreshedInterval);
  }, []);

  return (
    <Skeleton.Provider isLoading={isRecentDataLoading || isResourceLoading}>
      <div
        className={classes(
          'card sm:p-6 p-4 rounded-[24px] !bg-black !border-[#1F1F1F] border relative overflow-hidden'
        )}
      >
        <div className="flex flex-row justify-between items-center mb-5 gap-2">
          <Skeleton.Loader isDarkTheme className="w-[60px] h-[27px]">
            {/* @ts-ignore */}
            {recentData?.header?.length ? (
              <div className="text-lg text-[#FFF]">Cycles</div>
            ) : (
              <div></div>
            )}
          </Skeleton.Loader>
          <div className="flex items-center md:text-sm text-xs text-[#B2B3B8] flex-1 justify-end gap-2">
            <Skeleton.Loader
              isDarkTheme
              className="sm:h-[15px] h-10 sm:w-[161px] "
              containerClassName="flex-1"
            >
              Refreshed{' '}
              {refreshed < 60
                ? `${refreshed + pluralize(' Second', refreshed)}`
                : `${
                    Math.floor(refreshed / 60) + pluralize(' Minute', Math.floor(refreshed / 60))
                  }`}{' '}
              Ago
            </Skeleton.Loader>
            <Skeleton.Loader isDarkTheme className="h-10 w-10 rounded-full">
              <Button
                onClick={() => {
                  setRefreshed(1);
                  if (refreshRecentData) refreshRecentData();
                }}
                variant="plain"
                className="w-10 h-10 bg-[#141414] rounded-full p-[10px]  relative hover:opacity-50"
              >
                <ArrowPathIcon className="w-5 h-5" />
              </Button>
            </Skeleton.Loader>
          </div>
        </div>
        {/* {status !== 'Active' && isRecentDataLoading && isResourceLoading && (
          <div className="flex flex-col items-center justify-center gap-4 p-11 min-[600px]:h-80 h-[calc(100%_-_510px)] bg-[linear-gradient(0deg,_#000000_0%,_#000000a3_100%)] absolute bottom-0 left-0 w-full z-30">
            <h5 className="text-2xl">Sample Data</h5>
            <p className="text-base text-[#B2B3B8] text-center ">
              This View is not yet indexed due to insufficient funds. Add funds to get this View
              indexed and ready to be queried
            </p>
            <button className="py-2 mt-2 px-5 inline-flex w-auto text-[#010314] bg-white rounded-full text-sm font-normal">
              Add Funds
            </button>
          </div>
        )} */}
        {/* @ts-ignore */}
        {recentData?.data?.length ? (
          tableContent
        ) : isRecentDataLoading ? (
          <SkeletonData />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <Skeleton.Loader isDarkTheme className="!mb-5 h-[100px] w-[100px]">
              <NoRecentData />
            </Skeleton.Loader>
            <Skeleton.Loader isDarkTheme className="h-5 w-[200px] mb-2">
              <div className="mt-5 text-xl mb-2 text-center">
                {status === 'Active'
                  ? 'Your View is being indexed, please wait a moment.'
                  : 'This View has not been indexed.'}
              </div>
            </Skeleton.Loader>
            {/* <Skeleton.Loader isDarkTheme className="h-5 w-[150px]">
            <div className="text-sm text-[#B2B3B8]">Add funds to index this View!</div>
          </Skeleton.Loader> */}

            <Skeleton.Loader isDarkTheme className="h-5 w-[150px] mt-4">
              <Link
                target="_blank"
                to={`${DOCS}/developers/analog-watch/developers-guide/funding-views`}
              >
                <Button className="text-sm text-[#B2B3B8] mt-4" variant="darkThemeFilled">
                  Learn More
                </Button>
              </Link>
            </Skeleton.Loader>
          </div>
        )}
      </div>
    </Skeleton.Provider>
  );
}
