import { forwardRef } from 'react';
import { HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  isSelected?: boolean;
}

export function radioButtonClassName(isSelected: boolean | undefined, className?: string): string {
  return classes(
    'h-full whitespace-nowrap p-1 px-4 py-2 text-xs font-medium uppercase',
    isSelected ? 'bg-black !text-white' : 'bg-white text-black',
    className
  );
}

export const RadioButtons = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <div {...rest} className={classes('flex w-min p-1 text-sm', className)} ref={ref}>
        {children}
      </div>
    );
  }
);

RadioButtons.displayName = 'RadioButtons';

export function RadioButton({ isSelected, children, className }: Props) {
  return <button className={radioButtonClassName(isSelected, className)}>{children}</button>;
}
