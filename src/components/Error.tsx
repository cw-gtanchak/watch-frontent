import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { ClassNames, HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'icon'>;
  error?: ReactNode;
}

export function Error({ children, className, classNames, error, ...props }: Props) {
  return (
    <div
      {...props}
      className={classes(
        'p-2 w-full bg-red-100 text-red-500 mb-4 text-xs relative py-2.5 pl-9 pr-2 whitespace-pre-wrap',
        classNames?.base,
        className
      )}
    >
      {children || (
        <>
          <ExclamationCircleIcon
            className={classes('w-5 h-5 absolute left-2 top-2', classNames?.icon)}
          />
          {error || 'An unknown error occurred.'}
        </>
      )}
    </div>
  );
}
