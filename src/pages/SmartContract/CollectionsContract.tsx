import { Tab } from '@headlessui/react';
import reactStringReplace from 'react-string-replace';
import { Contract } from './Contract';
import { Header, Skeleton } from 'components';
import { useTabs } from 'hooks';
import { classes } from 'utils';
import { useSmartContract } from 'contexts';

export function CollectionsContract() {
  const { resource: smartContract } = useSmartContract();

  const { selectedTab, setSelectedTab, tabPanels, tabSelector, tabs } = useTabs(
    [
      {
        alternateLabel: `Views (${smartContract?.views?.length})`,
        child: <Contract type="view" />,
        label: `Views ${smartContract?.views?.length}`,
        value: 'views',
      },
      {
        alternateLabel: `Function (${smartContract?.functions?.length})`,
        child: <Contract type="function" />,
        label: `Functions ${smartContract?.functions?.length}`,
        value: 'functions',
      },
      {
        alternateLabel: 'Contract Metadata',
        child: <Contract type="contract" />,
        label: 'Contract',
        value: 'contract',
      },
    ],
    0,
    {
      classNames: {
        base: 'card text-xs md:w-80 sm:w-[18rem] w-full !bg-transparent rounded-[32px] backdrop-blur-[12px] !border-[#ffffff33] sm:max-w-[284px] max-h-[40px]',
        tab: (_) => classes(' text-white text-sm', _ && 'bg-[#1B1B1B] rounded-[32px] '),
      },
    }
  );

  return (
    <div>
      <Tab.Group selectedIndex={selectedTab} onChange={setSelectedTab}>
        <Header
          accessory={
            <Skeleton.Loader isDarkTheme className="h-10 sm:w-[280px] w-full">
              {tabSelector}
            </Skeleton.Loader>
          }
          className="text-white sm:flex-row flex-col-reverse sm:items-center items-start gap-4 sm:mb-6 mb-3 "
          hClassName="sm:text-[32px] text-[20px]"
        >
          {tabs[selectedTab].alternateLabel ||
            reactStringReplace(tabs[selectedTab].label as string, /(\(\d+\))$/, (match) => (
              <Skeleton.Loader isDarkTheme className="h-5 w-[500px]">
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
