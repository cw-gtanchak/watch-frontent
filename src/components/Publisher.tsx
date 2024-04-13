import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Identicon } from './Identicon';
import { ClassNames, HTMLAttributes } from 'types';
import { User } from 'types/gql';
import { classes, pathTo, truncate } from 'utils';

interface Props extends HTMLAttributes<unknown> {
  withLink?: boolean;
  value?: Pick<User, 'id' | 'address'>;
  isTruncated?: boolean;
  classNames?: ClassNames<'span'>;
}

export function Publisher({
  className: cN,
  value,
  withLink,
  isTruncated = false,
  classNames,
  ...props
}: Props) {
  const content = useMemo(() => {
    return value?.address ? (
      <>
        <Identicon size={20} value={value?.address} className="relative -top-[1px] mr-1" />
        <span className={classes(classNames?.span)}>
          {isTruncated ? truncate(value.address, 12) : value.address}
        </span>
      </>
    ) : null;
  }, [value?.address, isTruncated, classNames?.span]);

  const className = classes(
    'flex items-center gap-[5px] md:text-base text-xs',
    withLink && 'hyperlink',
    cN
  );

  return withLink && value?.address ? (
    <Link to={pathTo('Publisher', value.address)} className={className} {...props}>
      {content}
    </Link>
  ) : (
    <div className={className} {...props}>
      {content}
    </div>
  );
}
