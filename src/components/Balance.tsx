import { Skeleton, SkeletonProps } from './Skeleton';
import { FormatBalance, FormatBalanceProps } from './FormatBalance';
import { useBalance } from 'hooks';

interface Props extends Omit<FormatBalanceProps, 'value'> {
  address: string;
  skProps?: Partial<SkeletonProps>;
}

export function Balance({ address, skProps, ...props }: Props) {
  const value = useBalance(address);

  return (
    <Skeleton.Provider isLoading={value === undefined}>
      <Skeleton.Loader {...skProps}>
        {value && <FormatBalance value={value} {...props} />}
      </Skeleton.Loader>
    </Skeleton.Provider>
  );
}
