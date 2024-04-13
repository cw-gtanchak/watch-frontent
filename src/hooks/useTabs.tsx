import { Tab } from '@headlessui/react';
import { useMemo, useState, Fragment } from 'react';
import { TabSelector, TabSelectorProps } from 'components';
import { Maybe, Setter, Tab as TabType, UseTabs } from 'types';
import { classes } from 'utils';

export function useTabs(
  tabs: TabType[],
  source?: Maybe<[number, Setter<number>] | number>,
  selectorProps?: Partial<TabSelectorProps>
): UseTabs {
  const [selectedTabState, setSelectedTabState] = useState(typeof source === 'number' ? source : 0);

  const isControlled = Array.isArray(source);

  const value = useMemo<UseTabs>(
    () => ({
      selectedTab: isControlled ? source[0] : selectedTabState,
      setSelectedTab: isControlled ? source[1] : setSelectedTabState,
      tabs,
      tabSelector: (
        <TabSelector
          {...selectorProps}
          classNames={{
            base: classes(
              `w-${20 * (1 + tabs.length)}`,
              selectorProps?.className,
              selectorProps?.classNames?.base
            ),
            tab: selectorProps?.classNames?.tab,
          }}
          tabs={tabs}
        />
      ),
      tabPanels: (
        <Tab.Panels as={Fragment}>
          {tabs.map(({ child, value }) => {
            return (
              <Tab.Panel key={value} as={Fragment}>
                {child}
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      ),
    }),
    [isControlled, selectedTabState, selectorProps, source, tabs]
  );

  return value;
}
