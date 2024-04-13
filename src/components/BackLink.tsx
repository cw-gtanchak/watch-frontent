import { Link, LinkProps } from 'react-router-dom';
import { ArrowLeftIcon } from './icons';
import { ClassNames, HTMLAttributes, Maybe } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'icon'>;
  to?: Maybe<LinkProps['to']>;
}

export function BackLink({ children, className, classNames, to }: Props) {
  return (
    <Link
      to={to || '..'}
      className={classes('text-md mb-8 flex w-fit p-2 pl-0', classNames?.base, className)}
    >
      <ArrowLeftIcon
        className={classes('mr-4 inline-block h-5 w-5 text-blue-500', classNames?.icon)}
      />
      {children}
    </Link>
  );
}
