import { useMemo } from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table';
import { Header } from './Header';
import { PageSizeControl } from './PageSizeControl';
import { Skeleton, useSkeleton } from './Skeleton';
import { PageControl } from './PageControl';
import { TABLE_COLS, TABLE_DATA, VIEW_AVG_MOCK_RESULT } from 'consts';
import { arrayOfSize, classes, toUSD } from 'utils';
import { ClassNames, TableCol } from 'types';
import { useIsMounted } from 'usehooks-ts';

export interface Props$Table<T = unknown> {
  data: T[] | null | undefined;
  columns: TableCol[];
  isLoading?: boolean;
  title?: React.ReactNode;
  classNames?: ClassNames<'table' | 'headRow' | 'row' | 'headItem' | 'rowItem'>;
  defaultPageSize?: number;
  showPagination?: boolean;
}

export function Table<T = unknown>({
  classNames,
  defaultPageSize,
  showPagination = true,
  ...props
}: Props$Table<T>) {
  const isParentLoading = useSkeleton();
  const isMounted = useIsMounted();

  const isLoading = useMemo(
    () => props.data?.length === 0 && (props.isLoading || isParentLoading || !isMounted()),
    [props.data?.length, props.isLoading, isParentLoading, isMounted]
  );

  const data = useMemo(
    () =>
      !props.isLoading && !!props.data
        ? props.data
        : arrayOfSize(6).map(() =>
            arrayOfSize(6).reduce((res, n) => ({ ...res, [`placeholder${n}`]: null }), {})
          ),
    [props.data, props.isLoading]
  );

  const columns: ColumnDef<T>[] = useMemo(
    () =>
      !props.isLoading
        ? props.columns.map(({ id: accessorKey, label: Header, format = (v) => v }) => ({
            cell: ({ getValue }) => (format ? format(getValue() as string) : getValue()),
            Header,
            accessorKey, // accessor is the "key" in the data
          }))
        : props.columns.map((_, i) => ({
            cell: () => (
              <Skeleton.Loader isDarkTheme heightFix className="w-[180px] h-[15px]">
                &nbsp;
              </Skeleton.Loader>
            ),
            header: () => (
              <Skeleton.Loader isDarkTheme heightFix className="w-[35px] h-[15px] text-xs">
                &nbsp;
              </Skeleton.Loader>
            ),
            accessorKey: `placeholder${i}`,
          })),
    [props.isLoading, props.columns]
  );

  const {
    getHeaderGroups,
    getRowModel,
    getState,
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    setPageIndex,
    previousPage,
    nextPage,
    setPageSize,
  } = useReactTable({
    columns,
    data: data as T[],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: defaultPageSize || 3 } },
  });

  const [pageCount, { pageIndex, pageSize }] = [getPageCount(), getState().pagination];

  return (
    <Skeleton.Provider isLoading={props.isLoading}>
      {props.title && (
        <Header className="mb-2" tag="h5" hClassName="font-medium">
          {props.title}
        </Header>
      )}
      <div className={classes('w-full overflow-x-auto', classNames?.base)}>
        <table
          className={classes(
            'w-full border-separate border-spacing-y-1 whitespace-nowrap',
            classNames?.table
          )}
        >
          <thead>
            {getHeaderGroups().map((headerGroup, i) => (
              <tr
                key={`thr-${i}`}
                className={classes('text-xxs uppercase text-neutral-500', classNames?.headRow)}
                {...headerGroup}
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={`th-${header.id}`}
                    className={classes('px-4 whitespace-pre', classNames?.headItem)}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className={classes(
                    'border-x-0 border-y border-solid border-neutral-200 text-xs',
                    classNames?.row
                  )}
                >
                  {row.getVisibleCells().map((cell, j) => {
                    return (
                      <td
                        key={`td-${j}`}
                        valign="middle"
                        className={classes(
                          'border-0 border-y border-solid border-neutral-200 p-4',
                          j === 0 && 'border-l',
                          j === row.getVisibleCells().length - 1 && 'border-r',
                          classNames?.rowItem
                        )}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}{' '}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {data.length > 3 && showPagination && (
        <div className="flex justify-between md:items-center items-start mt-4 mb-5 h-10 text-sm md:gap-0 gap-3">
          <PageControl
            isPreviousAble={getCanPreviousPage()}
            onPrevious={previousPage}
            isNextAble={getCanNextPage()}
            onNext={nextPage}
            pageCount={pageCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            totalItems={data?.length}
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
      )}
    </Skeleton.Provider>
  );
}

export function MockDataTable() {
  return <Table data={TABLE_DATA} columns={TABLE_COLS} />;
}

export function MockCollectionDataTable() {
  return (
    <Table
      columns={[
        { id: '_cycle', label: 'Cycle' },
        { id: '_block', format: (v: number) => v.toLocaleString(), label: 'Block #' },
        { id: 'SqrtPriceX96', label: 'SqrtPriceX96' },
        { id: 'Tick', label: 'Tick' },
        { id: 'ObservationIndex', label: 'ObservationIndex' },
        { id: 'ObservationCardinality', label: 'ObservationCardinality' },
        { id: 'ObservationCardinalityNext', label: 'ObservationCardinalityNext' },
        { id: 'FeeProtocol', label: 'FeeProtocol' },
      ]}
      data={arrayOfSize(10).map((_, index) => ({
        _cycle: 523 - index,
        _block: 17635823 - index,
        // eslint-disable-next-line @typescript-eslint/no-loss-of-precision
        SqrtPriceX96: 1830304579811426064520765733347549,
        Tick: 200963,
        ObservationIndex: 495,
        ObservationCardinality: 722,
        ObservationCardinalityNext: 722,
        FeeProtocol: 0,
      }))}
    />
  );
}

export function MockViewDataTable() {
  return (
    <Table
      columns={[
        { id: '_cycle', label: 'Cycle' },
        { id: '_block', format: (v: number) => v.toLocaleString(), label: 'Block #' },
        { id: 'Avg', format: toUSD, label: 'Avg' },
      ]}
      data={VIEW_AVG_MOCK_RESULT.data.map(({ Avg }, index) => ({
        Avg,
        _cycle: 523 - index,
        _block: 17635823 - index,
      }))}
    />
  );
}

export function DataTable({
  data,
  columns,
  title,
  isLoading,
  classNames,
  defaultPageSize,
  showPagination,
}: Props$Table) {
  return (
    <Table
      data={data}
      columns={columns}
      title={title}
      isLoading={isLoading}
      classNames={classNames}
      defaultPageSize={defaultPageSize}
      showPagination={showPagination}
    />
  );
}
