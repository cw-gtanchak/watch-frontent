import { HTMLAttributes } from 'types';
import { classes } from 'utils';

export function Child({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classes('border-0 border-l-2 border-solid border-[#ffffff1a] pl-6', className)}>
      {children}
    </div>
  );
}
