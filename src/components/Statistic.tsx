import React from 'react';
import { Skeleton, useSkeleton } from './Skeleton';
import { ClassNames, HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Stat {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  value: React.ReactNode;
}

interface SubProps extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'label' | 'value' | 'strings'>;
  icon?: React.ReactNode;
  isLoading?: boolean;
  label?: React.ReactNode;
  isDarkTheme?: boolean;
}

interface Props extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'stat' | 'label' | 'value' | 'separator'> & SubProps['classNames'];
  isGrid?: boolean;
  subProps?: SubProps;
  value: Stat[];
  withBorder?: boolean;
  isDarkTheme?: boolean;
}

export function Statistic({
  className,
  classNames,
  children,
  isLoading,
  label,
  icon,
  isDarkTheme,
}: SubProps) {
  const isSkLoading = useSkeleton();
  return (
    <div className={classes('flex items-center shrink-0', className, classNames?.base)}>
      {icon}
      <div className={classes('flex flex-col', classNames?.strings)}>
        {label && (
          <div
            className={classes(
              'mb-2 text-xs font-medium uppercase text-black/60',
              classNames?.label,
              isDarkTheme && 'text-white'
            )}
          >
            <Skeleton.Loader
              isLoading={isSkLoading || isLoading}
              isDarkTheme
              className="sm:w-[76px] w-[78px] mt-2 sm:h-[14px] h-[14px]"
            >
              {label}
            </Skeleton.Loader>
          </div>
        )}
        <div className={classes(classNames?.value)}>{children}</div>
      </div>
    </div>
  );
}

export function Statistics({
  className,
  classNames,
  isGrid = false,
  value,
  withBorder = false,
  isDarkTheme,
}: Props) {
  return (
    <div
      className={classes(
        'relative w-full gap-6 overflow-auto no-scrollbar',
        withBorder && 'mt-6 h-20 border-0 border-t border-solid border-neutral-200 pt-6',
        isGrid
          ? 'grid auto-cols-max grid-cols-2 md:grid-cols-4'
          : 'flex items-center justify-between ',
        className,
        classNames?.base,
        isDarkTheme && 'border-[#1F1F1F] pt-5'
      )}
    >
      {value.map(({ icon, label, value: children }, i) => {
        return (
          <React.Fragment key={`statistic-${i}`}>
            <Statistic
              isDarkTheme={isDarkTheme}
              classNames={{
                base: classes(
                  'mr-2 flex-initial m-auto first:m-0 first:mr-auto shrink-0',
                  classNames?.stat
                ),
                label: classes(
                  'uppercase',
                  classNames?.label,
                  isDarkTheme &&
                    'text-[#B2B3B8] items-start mt-2 m-0 flex-[1] truncate lg:max-w-[100%] sm:max-w-[120px]'
                ),
                strings: classes(classNames?.strings),
                value: classes(
                  classNames?.value,
                  isDarkTheme && 'text-white lg:text-[24px] sm:text-[20px] text-[20px]'
                ),
              }}
              icon={icon}
              label={label}
            >
              <Skeleton.Loader
                containerClassName="flex-1 leading-none"
                className="sm:w-[108px] w-[89px] h-7 !rounded-full !bg-[#141414]"
              >
                {children}
              </Skeleton.Loader>
            </Statistic>
            {withBorder && i < value.length - 1 && (
              <div
                className={classes(
                  'relative h-[61px] w-[1px] bg-neutral-200 shrink-0',
                  isDarkTheme && 'bg-[#1F1F1F] sm:block hidden h-[45px]',
                  classNames?.separator
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
