import { ElementType, useMemo } from 'react';
import { Maybe } from '@watch/common';
import { Skeleton } from './Skeleton';
import { Icon } from './Icon';
import { SmartContractIcon, ViewIcon } from './svg';
import { ClassNames, HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLImageElement> {
  classNames?: ClassNames<'img'>;
  value?: Maybe<{ __typename?: string }>;
  isDarkTheme?: boolean;
}

export function ResourceLogo({ className, classNames, value, isDarkTheme }: Props) {
  const icon: ElementType<HTMLAttributes<HTMLOrSVGElement>> = useMemo(() => {
    switch (value?.__typename) {
      case 'SmartContract':
        return SmartContractIcon;
      default:
        return ViewIcon;
    }
  }, [value?.__typename]);

  return (
    <Skeleton.Loader heightFix className={className}>
      {value && (
        <Icon
          classNames={{
            base: classes(
              'flex h-32 w-32 shrink-0 items-center justify-center bg-lightGray fill-icon-purple',
              classNames?.base,
              className
            ),
            img: classes('h-[55%] w-[55%]', classNames?.img),
          }}
          icon={icon}
        />
      )}
    </Skeleton.Loader>
  );
}
