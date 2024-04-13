import { format } from 'sql-formatter';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';
import { Tab } from '@headlessui/react';
import { Details } from './Details';
import { DataCollections } from './DataCollections';
import Stats from './Stats';
import ViewSmartContractList from './ViewSmartContractList';
import { BreadCrumbs, Definition, Header, Skeleton, Sql } from 'components';
import { useView } from 'contexts';
import { classes, countLines } from 'utils';
import { useBreadCrumbsChild } from 'hooks/useBreadCrumbs';
import { useTabs } from 'hooks';
import { SmartContract, useViewStatsQuery, ViewIndexingStatusType } from 'gql';

export function View() {
  const { id: hashId } = useParams<{ id?: string }>();
  useBreadCrumbsChild({ page: 'View', params: [hashId] }, []);

  const { resource: view, isResourceLoading } = useView();
  const { data: stats, loading: isStatsLoading } = useViewStatsQuery({
    variables: { viewName: view?.name },
    fetchPolicy: 'cache-and-network',
    skip: !view?.name,
  });

  const sql = useMemo(() => format(view?.vDefinition?.sql || ''), [view?.vDefinition?.sql]);

  const { selectedTab, setSelectedTab, tabPanels, tabSelector, tabs } = useTabs(
    [
      {
        child: <DataCollections status={stats?.ViewStats.viewIndexingStatus?.status} />,
        label: `Data`,
        value: 'data',
      },
      {
        child: <ViewSmartContractList smartContracts={view?.smartContracts as SmartContract[]} />,
        label: 'Smart Contract',
        value: 'stats',
      },
      {
        child: (
          <>
            <Definition lineCount={countLines(sql)} copyString={sql}>
              <Sql
                className="bg-black pt-0 sm:max-h-[572px] max-h-[420px] overflow-y-scroll scrollbar-white"
                options={{ readOnly: true }}
                value={sql}
              />
            </Definition>
          </>
        ),
        label: `Definition`,
        value: 'definition',
      },

      // Views details need info  #564 (removed tasks only)

      // {
      //   child: <TaskLists />,
      //   label: `Tasks`,
      //   value: 'tasks',
      // },
      {
        alternateLabel: 'Query Stats',
        child: <Stats viewName={view?.name} stats={stats} />,
        label: 'Stats',
        value: 'stats',
      },
    ],
    0,
    {
      classNames: {
        base: 'card text-xs w-full !bg-transparent rounded-[32px] backdrop-blur-[12px] !border-[#ffffff33] sm:max-w-[404px] max-h-[40px]',
        tab: (_) =>
          classes(
            ' text-white text-sm !whitespace-pre sm:px-4 px-2 ',
            _ && 'bg-[#1B1B1B] rounded-[32px]'
          ),
      },
    }
  );

  return (
    <Skeleton.Provider isLoading={isResourceLoading || isStatsLoading}>
      <div className="mb-20 lg:p-16 !pt-0 px-0  w-full justify-start text-white">
        <BreadCrumbs />
        <div className="[&>*]:mb-16">
          <Details
            balance={stats?.ViewStats.fundLockedInView}
            minCost={stats?.ViewStats.minimumSponsor?.amount as string}
            minCycle={stats?.ViewStats.minimumSponsor?.cycles as number}
            status={stats?.ViewStats.viewIndexingStatus as ViewIndexingStatusType | undefined}
          />
          <div>
            <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
              <Header
                accessory={
                  <Skeleton.Loader isDarkTheme className="sm:w-[221px] w-full h-10 !rounded-full ">
                    {tabSelector}
                  </Skeleton.Loader>
                }
                className="text-white sm:flex-row flex-col-reverse sm:items-center items-start gap-4 sm:mb-6 mb-3 "
                hClassName="sm:text-[32px] text-[20px]"
              >
                {tabs[selectedTab].alternateLabel ||
                  reactStringReplace(tabs[selectedTab].label as string, /(\(\d+\))$/, (match) => (
                    <span key="parens" className="font-normal text-neutral-500">
                      {match}
                    </span>
                  ))}
              </Header>
              {tabPanels}
            </Tab.Group>
          </div>
        </div>
      </div>
    </Skeleton.Provider>
  );
}
