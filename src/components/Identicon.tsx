import { Hashicon, HashiconProps } from '@emeraldpay/hashicon-react';
import { Skeleton } from './Skeleton';
import { HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  size?: HashiconProps['size'];
  value?: string;
}

export function Identicon({ className, size, value, ...props }: Props) {
  return (
    <div className={classes('shrink-0 ', className)} {...props}>
      <Skeleton.Loader heightFix containerClassName="h-full" isDarkTheme isLoading={!value}>
        {value && <Hashicon size={size} value={value} />}
      </Skeleton.Loader>
    </div>
  );
}
