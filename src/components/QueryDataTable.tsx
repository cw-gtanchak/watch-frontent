import { ReactNode, useMemo } from 'react';
import { QueryResult } from '@analog-labs/timegraph-js';
import { Maybe } from '@watch/common';
import { DataTable } from './Table';
import { ClassNames } from 'types';
import { Button, NoRecentData, Skeleton } from 'components';
import { DOCS } from 'consts';

const LABELS: Record<string, string> = {
  _clock: 'Clock',
  _index: 'Index #',
};

export function QueryDataTable({
  isLoading,
  rowIcon,
  recentData,
  classNames,
  defaultPageSize,
  showPagination,
}: {
  isLoading?: boolean;
  rowIcon?: ReactNode;
  recentData: Maybe<QueryResult>;
  classNames?: ClassNames<'table' | 'headRow' | 'row' | 'headItem' | 'rowItem'>;
  defaultPageSize?: number;
  showPagination?: boolean;
}) {
  const [columns, data] = useMemo(() => {
    if (!recentData) {
      return [[], []];
    }
    return [
      recentData.header.map((header) => ({
        id: header,
        label: LABELS[header] || header,
      })),
      recentData.data.map((row: Array<string | ReactNode>, index) => {
        const rowData = [...row];
        if (rowIcon && typeof rowData[0] == 'string') {
          rowData[0] = (
            <div className="flex flex-row items-center gap-2" key={index}>
              <Skeleton.Loader isDarkTheme className="w-8 h-8 !rounded-[5px]">
                {rowIcon}
              </Skeleton.Loader>
              <Skeleton.Loader isDarkTheme className="sm:h-[15px] h-6 w-[180px]">
                {rowData[0]}
              </Skeleton.Loader>
            </div>
          );
        }

        return rowData.reduce((prev, value, index) => {
          return {
            ...prev,
            [recentData.header[index]]: value,
          };
        }, {});
      }),
    ];
  }, [recentData]);

  if (!isLoading && data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Skeleton.Loader isDarkTheme className="!mb-5 h-[100px] w-[100px]">
          <NoRecentData />
        </Skeleton.Loader>
        <Skeleton.Loader isDarkTheme className="h-5 w-[200px] mb-2">
          <div className="mt-5 text-xl mb-2 text-center">This View has not been indexed.</div>
        </Skeleton.Loader>
        {/* <Skeleton.Loader isDarkTheme className="h-5 w-[150px]">
          <div className="text-sm text-[#B2B3B8]">Add funds to index this View!</div>
        </Skeleton.Loader> */}

        <Skeleton.Loader isDarkTheme className="h-5 w-[150px] mt-4">
          <Button className="text-sm text-[#B2B3B8] mt-4" variant="darkThemeFilled">
            <a href={`${DOCS}/developer-guide`} target="_blank" rel="noreferrer">
              Learn More
            </a>
          </Button>
        </Skeleton.Loader>
      </div>
    );
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      classNames={classNames}
      defaultPageSize={defaultPageSize}
      showPagination={showPagination}
    />
  );
}
