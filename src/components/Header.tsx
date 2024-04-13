import { Skeleton } from './Skeleton';
import { HTMLAttributes, Network } from 'types';
import { classes } from 'utils';
import { Select } from './Select';
import React from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  accessory?: React.ReactNode;
  tag?: string | React.ComponentType<HTMLAttributes<unknown>>;
  hClassName?: string;
  accessoryClassname?: string;
  additionalButton?: React.ReactNode;
}

export function Header({
  accessory,
  children,
  className,
  hClassName,
  tag: Tag = 'h3',
  accessoryClassname,
  additionalButton,
  ...props
}: Props) {
  return (
    <div
      className={classes('mb-4 flex  items-center flex-wrap flex-col sm:flex-row gap-4', className)}
    >
      {!!children && (
        <Tag className={classes('flex-1 whitespace-nowrap', hClassName)} {...props}>
          <Skeleton.Loader isDarkTheme className="w-[111px] h-[27px] sm:w-[124px] sm:h-10">{children}</Skeleton.Loader>
        </Tag>
      )}
      {additionalButton}
      {accessory && (
        <div
          className={classes(
            'flex h-12 space-x-3 [&>*]:h-full w-full sm:w-auto [&>*]:flex-1',
            accessoryClassname
          )}
        >
          {accessory}
        </div>
      )}
    </div>
  );
}
