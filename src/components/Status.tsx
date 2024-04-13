import { HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  color: 'green' | 'red';
  dotClassName?: string;
}

export function Status({ children, className, dotClassName, color = 'red' }: Props) {
  return (
    <div className={classes('flex items-center font-normal', className)}>
      <div
        className={classes(
          'relative top-[-1px] mr-2 h-[5px] w-[5px] rounded-lg outline outline-1 outline-offset-2',
          color === 'red' && 'bg-red-500 outline-red-500',
          color === 'green' && 'bg-green-500 outline-green-500 ',
          dotClassName
        )}
      />
      {children}
    </div>
  );
}
