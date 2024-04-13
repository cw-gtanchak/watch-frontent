import { ClassNames, HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'outer'>;
  strokeWidth?: number;
}

export function Loader({ className, classNames, strokeWidth = 6 }: Props) {
  return (
    <div
      className={classes(
        'flex h-full w-full flex-1 items-center justify-center',
        classNames?.outer
      )}
    >
      <div className={classes('h-16 w-16 text-blue-500', classNames?.base, className)}>
        <svg className="circular" viewBox="25 25 50 50">
          <circle
            className={classes('path')}
            cx="100%"
            cy="100%"
            r="20"
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
          />
        </svg>
      </div>
    </div>
  );
}
