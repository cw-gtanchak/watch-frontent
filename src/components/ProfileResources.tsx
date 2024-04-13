/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { RadioGroup, Tab } from '@headlessui/react';
import reactStringReplace from 'react-string-replace';
import { Link, useLocation } from 'react-router-dom';
import { ChartComponent } from './ChartComponent';
import {
  Button,
  CardIcon,
  Header,
  ListIcon,
  NoDataDesign,
  ResourceList,
  Select,
  Skeleton,
} from 'components';
import { useTabs } from 'hooks';
import { classes, pathTo } from 'utils';
import {
  PublisherDetailsFragment,
  RangeType,
  SearchType,
  useUserGraphLazyQuery,
  useUserStatsLazyQuery,
} from 'gql';
import { HTMLAttributes, Maybe, SearchResult, SortBy, Tab as TabType } from 'types';
import { SORT_OPTIONS } from 'pages/Library/GroupSortBy';
import { usePageFilter } from 'hooks/usePageFilter';
import { useMyProfile, usePublisher } from 'contexts';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: Maybe<PublisherDetailsFragment>;
  apiComponent?: React.ReactNode;
  isDarkTheme?: boolean;
  additionalButton?: React.ReactNode;
  isLoading?: boolean;
  fundedViewComponent?: React.ReactNode;
}

interface Props$Panel<T> {
  placeholderCount?: number;
  searchType: SearchType;
  data?: Maybe<T[]>;
  isList?: boolean;
  isEmptyView?: React.ReactNode;
  isLoading?: boolean;
}
interface Props$DataDesign {
  data?: Maybe<PublisherDetailsFragment>;
  isLoading?: boolean;
  isPrivate?: boolean;
}

export function DataDesign<T extends SearchResult>({
  data,
  isLoading,
  isPrivate,
}: Props$DataDesign) {
  const [sortBy, setSortBy] = useState<SortBy>('createdAt');
  const [isList, setIsList] = useState(true);
  const [value, setValue] = useState<Maybe<unknown[]>>([]);

  useEffect(() => {
    switch (sortBy) {
      case 'earnings':
        // no earnings yet TODO
        break;
      case 'refs':
        // @ts-ignore
        setValue((prev) => [...prev]?.sort((a, b) => b.refs - a.refs));
        break;
      case 'status':
        setValue((prev) =>
          [...prev]
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
            })
        );
        break;
      default:
        setValue((prev) =>
          [...prev]?.sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
        );
        break;
    }
  }, [sortBy]);

  const { controller, currentPage, setPageIndex } = usePageFilter(value);

  const { tabPanels, tabSelector, selectedTab, setSelectedTab } = useTabs(
    [
      {
        child: (
          <ResourcesPanel<T>
            // @ts-ignore
            data={currentPage}
            isList={isList}
            isLoading={isLoading}
            searchType={SearchType.All}
            isEmptyView={
              !isLoading && (
                <div className="w-full py-[81px] justify-center items-center flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
                  <NoDataDesign className="mb-[18px]" />
                  <div className="flex gap-2 flex-col">
                    <span className="">
                      {isPrivate ? "You don't" : "This publisher doesn't"} have any data designed.
                    </span>
                    {isPrivate && <span>Build a view or list a Smart Contract to get started</span>}
                  </div>
                  {isPrivate && (
                    <div className="flex flex-col gap-2 mt-4 flex-1 items-center">
                      <Link to={pathTo('ViewBuilder')}>
                        <Button variant="darkThemeFilled">View Builder</Button>
                      </Link>
                      <Link to={'?list-smart-contracts=true'}>
                        <Button variant="darkThemeFilled">List Smart Contract</Button>
                      </Link>
                    </div>
                  )}
                </div>
              )
            }
          />
        ),
        label: (
          <div>
            All
            {!![...(data?.smartContracts || []), ...(data?.views || [])]?.length && (
              <span className="ml-1 md:text-sm text-xs px-2 py-1.5 bg-[#f7f8f814] rounded-full">
                {[...(data?.smartContracts || []), ...(data?.views || [])]?.length}
              </span>
            )}
          </div>
        ),
        value: 'all',
      },
      {
        child: (
          <ResourcesPanel<T>
            //@ts-ignore
            data={currentPage}
            isList={isList}
            isLoading={isLoading}
            searchType={SearchType.SmartContracts}
            isEmptyView={
              <div className="w-full py-[81px] justify-center items-center flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
                <NoDataDesign className="mb-[18px]" />
                <div className="flex gap-2 flex-col mb-4">
                  <span className="">
                    {isPrivate ? "You don't" : "This publisher doesn't"} have any Smart Contract.
                  </span>
                  {isPrivate && <span>List a Smart Contract to get started</span>}
                </div>
                {isPrivate && (
                  <Link to={'?list-smart-contracts=true'}>
                    <Button variant="darkThemeFilled">List Smart Contract</Button>
                  </Link>
                )}
              </div>
            }
          />
        ),
        label: (
          <div>
            Smart Contract
            {!!data?.smartContracts?.length && (
              <span className="ml-1 md:text-sm text-xs px-2 py-1.5 bg-[#f7f8f814] rounded-full">
                {data?.smartContracts?.length}
              </span>
            )}
          </div>
        ),
        value: 'smartContract',
      },
      {
        child: (
          <ResourcesPanel<T>
            //@ts-ignore
            data={currentPage}
            isList={isList}
            isLoading={isLoading}
            searchType={SearchType.Views}
            isEmptyView={
              <div className="w-full py-[81px] justify-center items-center flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
                <NoDataDesign className="mb-[18px]" />
                <div className="flex gap-2 flex-col mb-4">
                  <span className="">
                    {isPrivate ? "You don't" : "This publisher doesn't"} have any data designed.
                  </span>
                  {isPrivate && <span>Build a view to get started</span>}
                </div>
                {isPrivate && (
                  <Link to={pathTo('ViewBuilder')}>
                    <Button variant="darkThemeFilled">View Builder</Button>
                  </Link>
                )}
              </div>
            }
          />
        ),
        label: (
          <div>
            Views
            {!!data?.views?.length && (
              <span className="ml-1 md:text-sm text-xs px-2 py-1.5 bg-[#f7f8f814] rounded-full">
                {data?.views?.length}
              </span>
            )}
          </div>
        ),
        value: 'views',
      },
    ],
    0,
    {
      classNames: {
        base: 'justify-start text-start text-stone-50 text-base font-normal w-auto flex-wrap',
        tab: (selected) =>
          classes(
            'whitespace-pre px-3 py-2',
            selected &&
              ' bg-white bg-opacity-10 rounded-3xl   backdrop-blur-xl justify-center items-start gap-1 inline-flex flex-[unset] w-fit'
          ),
      },
    }
  );

  useEffect(() => {
    switch (selectedTab) {
      case 1:
        setValue(
          [...(data?.smartContracts || [])].sort(
            (a, b) => +new Date(b?.createdAt) - +new Date(a?.createdAt)
          )
        );
        break;

      case 2:
        setValue(
          [...(data?.views || [])].sort((a, b) => +new Date(b?.createdAt) - +new Date(a?.createdAt))
        );
        break;

      default:
        setValue(
          [...(data?.smartContracts || []), ...(data?.views || [])].sort(
            (a, b) => +new Date(b?.createdAt) - +new Date(a?.createdAt)
          )
        );
        break;
    }
  }, [selectedTab, data]);

  return (
    <div className="">
      <Tab.Group
        selectedIndex={selectedTab}
        onChange={(index) => {
          setPageIndex(0);
          setSelectedTab(index);
        }}
      >
        <Header
          accessory={
            <div className="flex md:flex-row flex-col justify-between ">
              <Skeleton.Loader
                isDarkTheme
                className="sm:w-[335px] w-[250px] h-[24px] !rounded-full "
              >
                {tabSelector}
              </Skeleton.Loader>
              <div className="md:flex hidden flex-row justify-center items-center">
                <Skeleton.Loader isDarkTheme className="w-[148px] h-10 !rounded-full  mr-3">
                  <div className="mr-[14px] flex flex-row shrink-0 pl-4 md:justify-end justify-start items-center text-sm border border-[#ffffff14] rounded-3xl">
                    <span className="text-[#B2B3B8]">
                      Sort by <span className="ml-1">·</span>
                    </span>
                    <Select
                      value={sortBy}
                      onChange={setSortBy}
                      options={SORT_OPTIONS}
                      isLibrary
                      classNames={{
                        control: () =>
                          'w-25 h-10 relative rounded-3xl shadow shadow-inner border border-white border-opacity-20 bg-transparent text-zinc-400 text-sm font-normal pl-2 pr-4 py-2',
                        dropdownIndicator: () => 'text-white',
                        menu: () => 'border-none',
                        option: () => 'flex justify-between items-center',
                      }}
                    />
                  </div>
                </Skeleton.Loader>
                <RadioGroup className="flex flex-row gap-[2px]" defaultChecked defaultValue="list">
                  {[
                    { svg: <ListIcon />, value: 'list' },
                    { svg: <CardIcon />, value: 'card' },
                  ].map(({ svg, value }) => (
                    <RadioGroup.Option value={value} key={value}>
                      {({ checked }) => {
                        return (
                          <Skeleton.Loader isDarkTheme className="w-10 h-10 !rounded-full">
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
              </div>
            </div>
          }
          accessoryClassname={classes('flex md:flex-1 flex-row w-full md:h-12 h-auto')}
          className="w-full"
        />

        {tabPanels}
      </Tab.Group>
      <div>{controller}</div>
    </div>
  );
}

export function ResourcesPanel<T extends SearchResult>({
  data,
  placeholderCount,
  isList = true,
  isEmptyView,
  isLoading,
}: Props$Panel<T>) {
  return (
    <ResourceList<T>
      placeholderCount={placeholderCount}
      value={data}
      isLoading={isLoading}
      isList={isList}
      isDarkTheme
      className={classes(
        'flex flex-col ',
        !isList && 'grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6',
        !data?.length && 'flex'
      )}
      isEmptyView={isEmptyView}
      withLocation
    />
  );
}

export function ProfileResources({
  value,
  apiComponent,
  isDarkTheme,
  additionalButton,
  isLoading,
  fundedViewComponent,
}: Props) {
  const { publisher } = usePublisher();
  const { myProfile } = useMyProfile();
  const location = useLocation();

  const isPrivate = useMemo(() => location.pathname.includes('profile'), [location]);

  const userId = useMemo(() => {
    let id = -1;
    if (isPrivate && myProfile?.id) {
      id = myProfile?.id;
    } else if (publisher?.id) {
      id = publisher?.id;
    }
    return id;
  }, [myProfile?.id, publisher?.id, isPrivate]);

  // commented out telemetry of private/public profile #582

  // const [getStats, { loading: isStatsLoading, data: stats }] = useUserStatsLazyQuery();

  // const [getGraph, { loading: isGraphLoading, data: graphData }] = useUserGraphLazyQuery();

  // const fetchStats = useCallback(() => {
  //   return getStats({
  //     variables: { userId },
  //   });
  // }, [userId]);

  // const fetchChart = useCallback(
  //   (graphRange: RangeType) => {
  //     return getGraph({ variables: { userId, range: graphRange } });
  //   },
  //   [userId]
  // );

  // const chartSummary = useMemo(() => {
  //   if (!isStatsLoading) {
  //     return [
  //       {
  //         value: stats?.UserStats?.totalUserQuery,
  //         name: 'Queries Total',
  //         color: '#FFAD97',
  //       },
  //       {
  //         value: stats?.UserStats.totalUserQueryFee,
  //         name: 'Queries Fees Total',
  //         color: '#F539B5',
  //       },
  //       {
  //         value:
  //           +(stats?.UserStats.totalUserQueryFee || 0) / (stats?.UserStats.totalUserQuery || 1),
  //         name: 'Average Query Cost',
  //         color: '#7CA1F6',
  //       },
  //     ];
  //   }
  // }, [stats, isStatsLoading]);

  // useEffect(() => {
  //   fetchStats();
  // }, [fetchStats]);

  const tabArray: TabType[] = useMemo(() => {
    const array: TabType[] = [
      {
        child: <DataDesign data={value} isLoading={isLoading} isPrivate={isPrivate} />,
        label: 'Data Design',
        value: 'dataDesign',
      },
    ];

    if (apiComponent) {
      array.push({
        child: apiComponent as ReactElement,
        label: 'API Keys',
        value: 'APIKeys',
      });
    }

    // array.push({
    //   child: (
    //     <div className="flex flex-col gap-5">
    //       <p className="text-[#B2B3B8] text-base leading-[22px]">
    //         This liveboard compiles essential metrics for the published View, such as overall query
    //         count, total query fees, and average query cost per query.
    //       </p>
    //       <ChartComponent
    //         summary={chartSummary}
    //         fetchChart={fetchChart}
    //         isLoading={isGraphLoading || isStatsLoading}
    //         chartData={graphData?.UserGraph}
    //       />
    //     </div>
    //   ),
    //   label: 'Stats',
    //   value: 'stats',
    //   alternateLabel: 'Query stats',
    // });

    if (fundedViewComponent) {
      array.push({
        child: fundedViewComponent as ReactElement,
        label: 'Funded Views',
        value: 'fundedViews',
      });
    }

    return array;
  }, [
    value,
    isLoading,
    apiComponent,
    // chartSummary,
    // graphData,
    // isStatsLoading,
    // isGraphLoading,
    fundedViewComponent,
  ]);

  const { selectedTab, setSelectedTab, tabPanels, tabSelector, tabs } = useTabs(tabArray, 0, {
    classNames: {
      base: classes('w-120 rounded-[25px] text-[#F7F8F8] text-[14px] border border-[#ffffff33]'),
      tab: (selected) =>
        classes(
          'whitespace-pre py-[7px] sm:px-[16px] flex-1 text-[14px]',
          selected && 'bg-[#1B1B1B] text-[#F7F8F8] rounded-[32px] px-4 backdrop-blur-md',
          tabArray.length === 3 && 'px-[10px]'
        ),
    },
  });

  return (
    <div>
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Header
          className="flex-col-reverse "
          accessory={
            apiComponent && (
              <Skeleton.Loader className="h-10 sm:w-[378px] w-[330px] !rounded-full !bg-[#FFFFFF1C] !backdrop:blur-md">
                {tabSelector}
              </Skeleton.Loader>
            )
          }
          additionalButton={selectedTab === 1 && additionalButton}
          hClassName={classes(
            isDarkTheme &&
              'text-white sm:text-[32px] text-[20px] sm:self-center self-start sm:order-1 order-2'
          )}
          accessoryClassname={classes('sm:order-2 order-3 h-auto')}
        >
          {tabs[selectedTab].alternateLabel ||
            reactStringReplace(tabs[selectedTab].label as string, /(\(\d+\))$/, (match) => (
              <Skeleton.Loader className="">
                <span key="parens" className="font-normal text-neutral-500">
                  {match}
                </span>
              </Skeleton.Loader>
            ))}
        </Header>
        {tabPanels}
      </Tab.Group>
    </div>
  );
}
