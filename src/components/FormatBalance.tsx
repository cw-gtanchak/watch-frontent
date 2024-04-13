import BigNumber from 'bignumber.js';
import React, { useMemo } from 'react';
import { useApi } from 'contexts';
import { FormatOptions, HTMLAttributes } from 'types';
import { DEFAULT_OPTIONS, formatBalance } from 'utils';

export interface FormatBalanceProps extends HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
  options?: FormatOptions;
  value: BigNumber | string;
}

export function FormatBalance({
  as: Component = 'span',
  options: propsOptions,
  value: passedValue,
  ...props
}: FormatBalanceProps) {
  const {
    chainProps: { tokenDecimals },
  } = useApi();

  const value = new BigNumber(passedValue).div(10 ** tokenDecimals);

  const options = useMemo(
    () =>
      Object.assign(
        {},
        DEFAULT_OPTIONS,
        { symbol: '$TANLOG' /* chainProps.tokenSymbol */ },
        propsOptions
      ),
    [propsOptions]
  );

  return <Component {...props}>{formatBalance(value, options)}</Component>;
}
