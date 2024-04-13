import { Maybe } from '@watch/common';
import { LinkProps, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { Resource } from './Resource';
import { HTMLAttributes, SearchResult } from 'types';
import { arrayOfSize, classes } from 'utils';

interface Props<T extends SearchResult> extends HTMLAttributes<HTMLDivElement> {
  isEmptyView?: React.ReactNode;
  linkProps?: Partial<LinkProps>;
  placeholderCount?: number;
  value?: Maybe<T[]>;
  isLoading?: boolean;
  withLocation?: boolean;
  isLibrary?: boolean;
  isDarkTheme?: boolean;
  isList?: boolean;
}

export function ResourceList<T extends SearchResult>({
  className,
  isEmptyView,
  isLoading,
  placeholderCount = 4,
  value,
  withLocation,
  isList = true,
  ...props
}: Props<T>) {
  const location = useLocation();

  const linkProps = useMemo(() => {
    return {
      ...props?.linkProps,
      ...(withLocation ? { state: { prev: location } } : {}),
    };
  }, [location, props?.linkProps, withLocation]);

  return (
    <div
      {...props}
      className={classes(
        'max-w-full flex flex-col',
        !isList && value?.length !== 0 && 'grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6',
        className
      )}
    >
      {isLoading && (
        <>
          {arrayOfSize(placeholderCount).map((i) => (
            <Resource key={`placeholder-${i}`} />
          ))}
        </>
      )}
      {!isLoading && (
        <>
          {!value || value?.length === 0
            ? isEmptyView
            : value.map((resource) => {
                return (
                  <Resource
                    isList={isList}
                    key={`${resource.__typename}-${resource.id}`}
                    linkProps={linkProps}
                    value={resource}
                  />
                );
              })}
        </>
      )}
    </div>
  );
}
