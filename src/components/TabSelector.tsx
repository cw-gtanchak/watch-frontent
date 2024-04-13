import { Tab } from '@headlessui/react';
import { radioButtonClassName, RadioButtons } from './RadioButton';
import { useSkeleton } from './Skeleton';
import { ClassNames, HTMLAttributes, Tab as TabType } from 'types';
import { classes } from 'utils';

export interface TabSelectorProps extends HTMLAttributes<HTMLUListElement> {
  classNames?: ClassNames & { tab?: (_: boolean) => string };
  tabs: TabType[];
}

export function TabSelector({ className, tabs, ...props }: TabSelectorProps) {
  const isLoading = useSkeleton();

  const classNames = Object.assign({}, { tab: radioButtonClassName }, props.classNames);

  if (isLoading) {
    return null;
  }

  return (
    <Tab.List as={RadioButtons} className={classes(classNames.base, className)}>
      {({ selectedIndex }) => {
        return (
          <>
            {tabs.map(({ label, value, disabled }, index) => {
              return (
                <Tab
                  className={classes(
                    (classNames.tab || radioButtonClassName)(selectedIndex === index),
                    'flex-1 text-center'
                  )}
                  disabled={disabled}
                  key={value}
                >
                  {label}
                </Tab>
              );
            })}
          </>
        );
      }}
    </Tab.List>
  );
}
