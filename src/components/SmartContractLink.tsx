import { Link, LinkProps } from 'react-router-dom';
import { SmartContractIcon } from './svg';
import { ClassNames, HTMLAttributes } from 'types';
import { classes, resourceLink } from 'utils';
import { SmartContract } from 'gql';

interface Props extends HTMLAttributes<HTMLAnchorElement> {
  classNames?: ClassNames<'icon'>;
  value: Pick<SmartContract, '__typename' | 'id' | 'address' | 'name'>;
  linkProps?: Partial<LinkProps>;
}

export function SmartContractLink({ className, classNames, linkProps, value }: Props) {
  if (!value) {
    return null;
  }

  return (
    <Link
      to={resourceLink(value)}
      className={classes(
        'hyperlink flex md:text-base text-xs items-center text-blue-500',
        classNames?.base,
        className
      )}
      {...linkProps}
    >
      <SmartContractIcon className={classes('mr-2 h-4 w-4', classNames?.icon)} />
      {value.name}
    </Link>
  );
}
