import { ReactNode, useMemo, useState, useEffect } from 'react';
import { Maybe } from '@watch/common';
import { PageControl } from '../components/PageControl';
import { PageSizeControl } from '../components/PageSizeControl';
import { classes } from 'utils';

/**
 * @param data [List data to be paginated]
 * @param defaultPageSize [Default size of each page]
 * @returns [Pagination controller JSX, Filtered data to be rendered]
 */

export function usePageFilter<T>(
  data: Maybe<T[]>,
  defaultPageSize = 3
): { controller: ReactNode; currentPage: T[]; setPageIndex: React.Dispatch<number> } {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(defaultPageSize);
  const results = useMemo(() => data || [], [data]);
  const maxPageIndex = useMemo(
    () => (results?.length ? Math.ceil(results?.length / pageSize) : 0),
    [results, pageSize]
  );
  const currentPage = useMemo(() => {
    if (results) {
      const tempArray = [...results];
      return tempArray.slice(pageIndex * pageSize, (1 + pageIndex) * pageSize);
    }
    return [];
  }, [results, pageIndex, pageSize]);

  useEffect(() => {
    if (maxPageIndex && pageIndex > maxPageIndex - 1) {
      setPageIndex(maxPageIndex - 1);
    }
  }, [maxPageIndex]);

  if (!currentPage?.length || results?.length <= defaultPageSize) {
    return { controller: null, currentPage, setPageIndex };
  }

  return {
    controller: (
      <div className="flex justify-between sm:items-center items-start mt-4 mb-5 h-auto sm:h-10 text-sm md:gap-0 gap-3">
        <PageControl
          isPreviousAble={pageIndex > 0}
          onPrevious={() => setPageIndex((prev) => Math.max(0, prev - 1))}
          isNextAble={pageIndex < maxPageIndex}
          onNext={() => setPageIndex((prev) => Math.min(maxPageIndex, prev + 1))}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          pageCount={maxPageIndex}
          totalItems={results?.length}
          pageSize={pageSize}
          classNames={{
            result: classes('block'),
            base: classes('flex sm:space-x-4'),
          }}
        />
        <PageSizeControl
          pageSize={pageSize}
          setPageSize={setPageSize}
          className="flex items-center justify-center gap-[6px]"
        />
      </div>
    ),
    currentPage,
    setPageIndex,
  };
}
