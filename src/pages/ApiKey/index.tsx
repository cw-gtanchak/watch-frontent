import { Tab } from '@headlessui/react';
import { Stats } from './Stats';
import { Details } from './Details';
import { BreadCrumbs, Header, Skeleton } from 'components';
import { useApi, useApiKey } from 'contexts';
import { useTabs } from 'hooks';
import { classes } from 'utils';
import { RangeType, useSSkStatsQuery, useSskGraphLazyQuery } from 'gql';
import { useCallback, useMemo } from 'react';

export function ApiKey() {
  const { apiKey } = useApiKey();
  const { sessionKey } = useApi();

  const { loading: isStatsLoading, data: stats } = useSSkStatsQuery({
    variables: { ssk: sessionKey || '' },
    skip: !sessionKey,
  });

  const chartSummary = useMemo(() => {
    if (!isStatsLoading) {
      return [
        {
          value: stats?.SSkStats?.totalSskQuery,
          name: 'Queries Total',
          color: '#FFAD97',
        },
        {
          value: stats?.SSkStats.totalSskQueryFee,
          name: 'Queries Fees Total',
          color: '#F539B5',
        },
        {
          value: +(stats?.SSkStats?.totalSskQueryFee || 0) / (stats?.SSkStats?.totalSskQuery || 1),
          name: 'Average Query Cost',
          color: '#7CA1F6',
        },
      ];
    }
  }, [stats, isStatsLoading]);

  const [getGraph, { loading: isGraphLoading, data: graphData }] = useSskGraphLazyQuery();

  const fetchChart = useCallback(
    (graphRange: RangeType) => {
      return getGraph({ variables: { ssk: sessionKey || '', range: graphRange } });
    },
    [getGraph, sessionKey]
  );

  const { selectedTab, setSelectedTab, tabSelector, tabPanels } = useTabs(
    [
      { child: <Details />, label: 'Details', value: 'details' },
      // {
      //   child: (
      //     <Stats chartData={graphData?.SSKGraph} fetchChart={fetchChart} summary={chartSummary} />
      //   ),
      //   label: 'Stats',
      //   value: 'stats',
      // },
    ],
    0,
    {
      classNames: {
        tab: (_) => classes('h-[32px]', _ && 'bg-[#FFFFFF1A] rounded-[32px]'),
        base: 'bg-black rounded-[32px] text-white text-[14px] w-[145px] max-h-[42px] border-solid !border-[#ffffff1a] border',
      },
    }
  );
  return (
    <Skeleton.Provider isLoading={!apiKey}>
      <div className="sm:mb-20 max-w-[1200px] m-auto w-full justify-start">
        <BreadCrumbs />
        <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
          <div className="flex w-full flex-col">
            <Header
              className="mb-8 "
              tag="h2"
              accessory={!!apiKey && tabSelector}
              hClassName="text-white sm:text-[2rem] !leading-10 w-full text-[24px] truncate"
              accessoryClassname="items-center"
            >
              API Key: {apiKey?.name}
            </Header>
            {tabPanels}{' '}
          </div>
        </Tab.Group>
      </div>
    </Skeleton.Provider>
  );
}
