import { Select } from './Select';
import { HTMLAttributes } from 'types';
import { classes } from 'utils';
import { Skeleton } from './Skeleton';

interface Props extends HTMLAttributes<HTMLDivElement> {
  pageSize: number;
  setPageSize: (_: number) => void;
}

export function PageSizeControl({ className, pageSize, setPageSize }: Props) {
  return (
    <div
      className={classes(
        'relative whitespace-pre flex items-center gap-[10px] text-[#B2B3B8]',
        className
      )}
    >
      <Skeleton.Loader
        isDarkTheme
        className="w-[34px] h-5 !bg-[#FFFFFF14]"
        containerClassName="self-center"
      >
        Rows
      </Skeleton.Loader>
      <Skeleton.Loader isDarkTheme className="w-[53px] h-10 !bg-[#FFFFFF14]">
        <Select<number>
          className="inline-block text-xs"
          classNames={{
            control: () =>
              `sm:px-4 px-2 sm:min-w-[auto] items-center min-w-[54px] py-2 text-xs text-white bg-black border border-[#ffffff14] hover:border-[#ffffff14] rounded-3xl`,
            option: () => 'p-1 text-xs',
            menu: () => 'w-16',
            dropdownIndicator: (_) => classes('m-0'),
          }}
          ltr
          menuPlacement="top"
          value={pageSize}
          onChange={setPageSize}
          options={[3, 10, 15, 20].map((n) => ({ value: n, label: n }))}
        />
      </Skeleton.Loader>
    </div>
  );
}
