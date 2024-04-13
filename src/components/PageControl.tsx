import { useMemo } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';
import { classes } from 'utils';
import { ClassNames } from 'types';
import { Skeleton } from './Skeleton';

export type Props = {
  classNames?: ClassNames<'page' | 'btn' | 'btnActive' | 'result'>;
  isPreviousAble?: boolean;
  isNextAble?: boolean;
  onPrevious: () => void;
  onNext: () => void;
  pageCount: number;
  pageIndex: number;
  totalItems?: number;
  pageSize?: number;
  setPageIndex: React.Dispatch<number>;
};

export function PageControl({
  onPrevious,
  onNext,
  pageCount,
  pageIndex,
  totalItems,
  pageSize,
  classNames,
}: Props) {
  const endItemCount = useMemo(() => {
    const count = (pageSize || 0) * (pageIndex + 1);
    return count > (totalItems || 0) ? totalItems : count;
  }, [pageIndex, pageSize, totalItems]);
  return (
    <div
      className={classes(
        'flex items-baseline sm:space-x-4  whitespace-pre text-[#B2B3B8] flex-wrap sm:gap-0 gap-2',
        classNames?.base
      )}
    >
      <Skeleton.Loader
        isDarkTheme
        className="w-16 h-5 !bg-[#FFFFFF14]"
        containerClassName="self-center"
      >
        <div>
          Page {pageIndex + 1} of {pageCount}
        </div>
      </Skeleton.Loader>
      <div className="flex gap-2 items-center ">
        {onPrevious && (
          <Skeleton.Loader isDarkTheme className="w-10 h-10 !bg-[#FFFFFF14]">
            <button
              className="text-white w-10 h-10 bg-[#ffffff14] rounded-[50%] flex items-center justify-center"
              onClick={pageIndex > 0 ? onPrevious : () => {}}
            >
              <ChevronLeftIcon className={classes('h-4', pageIndex <= 0 && 'opacity-20')} />
            </button>
          </Skeleton.Loader>
        )}
        <Skeleton.Loader className="w-16 h-10 !bg-[#FFFFFF14]" isDarkTheme>
          <div className="h-10 sm:w-16 w-10 rounded-3xl border border-[#ffffff33] flex items-center justify-center">
            {pageIndex + 1}
          </div>
        </Skeleton.Loader>
        {onNext && (
          <Skeleton.Loader isDarkTheme className="w-10 h-10 !bg-[#FFFFFF14]">
            <button
              onClick={pageIndex + 1 < pageCount ? onNext : () => {}}
              className="text-white w-10 h-10 bg-[#ffffff14] rounded-[50%] flex items-center justify-center"
            >
              <ChevronRightIcon
                className={classes('h-4', pageIndex + 1 >= pageCount && 'opacity-20')}
              />
            </button>
          </Skeleton.Loader>
        )}
      </div>
      {pageSize && totalItems && (
        <Skeleton.Loader
          isDarkTheme
          className="w-[138px] h-5 !bg-[#FFFFFF14]"
          containerClassName="self-center"
        >
          <div className={classes('sm:block hidden', classNames?.result)}>
            {pageSize * pageIndex + 1} - {endItemCount} results of {totalItems} shown
          </div>
        </Skeleton.Loader>
      )}
    </div>
  );
}
