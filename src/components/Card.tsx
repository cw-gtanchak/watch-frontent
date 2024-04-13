import React from 'react';
import { HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<unknown> {
  as?: React.ElementType;
}

export function Card({ as: Component = 'div', children, className, ...props }: Props) {
  return (
    <Component
      {...props}
      className={classes(
        'border border-solid border-neutral-200 bg-white shadow-md flex-[2] flex-col',
        className
      )}
    >
      {children}
    </Component>
  );
}
