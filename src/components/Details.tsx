import { ChevronDownIcon, XMarkIcon } from './icons';
import { ClassNames, HTMLAttributes, VoidFn } from 'types';
import { classes } from 'utils';
import { Loader } from './Loader';
import { Skeleton } from './Skeleton';

export interface Props$Summary extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'removeButton' | 'removeIcon' | 'expandIcon'>;
  onRemove?: VoidFn;
  isLoading?: boolean;
}

export interface Props$Details extends HTMLAttributes<HTMLDetailsElement> {
  open?: boolean;
}

export function Details({ open = true, ...props }: Props$Details) {
  return (
    <details
      open={open}
      {...props}
      className={classes('group border border-[#ffffff1f] ', props.className)}
    >
      {props.children}
    </details>
  );
}

export function Summary({ classNames, children, onRemove, isLoading, ...props }: Props$Summary) {
  return (
    <summary
      {...props}
      className={classes(
        'text-md relative flex mt-[-1px] items-center border-0 border-b border-solid border-[#ffffff1f] py-3.5 text-base',
        classNames?.base
      )}
    >
      <div className="flex flex-1 items-center">{children}</div>
      {onRemove && (
        <button
          className={classes(
            'my-2 border-0 border-r border-solid border-neutral-200 px-3 text-black hover:text-neutral-600',
            classNames?.removeButton
          )}
          onClick={onRemove}
        >
          <XMarkIcon className={classes('h-5 w-5', classNames?.removeIcon)} color="white" />
        </button>
      )}
      <Skeleton.Loader isDarkTheme className="h-6 w-6">
        {isLoading ? (
          <Loader
            className="ml-3 h-5 w-5 text-white"
            classNames={{ outer: 'justify-end w-auto flex-none' }}
          />
        ) : (
          <ChevronDownIcon
            className={classes(
              'ml-3 h-5 w-5 text-white transition-transform group-open:rotate-180',
              classNames?.expandIcon
            )}
          />
        )}
      </Skeleton.Loader>
    </summary>
  );
}
