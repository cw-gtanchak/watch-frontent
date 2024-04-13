import BigNumber from 'bignumber.js';
import { FormatOptions } from 'types';

export const DEFAULT_OPTIONS = {
  decimalPlaces: 2,
};

export function formatBalance(
  value?: BigNumber,
  {
    decimalPlaces = 2,
    symbol = '$TANLOG',
    tokenDecimals = 0,
  }: FormatOptions | undefined = DEFAULT_OPTIONS
) {
  if (!value) {
    return '';
  }

  if (tokenDecimals) {
    value = value.dividedBy(10 ** tokenDecimals);
  }

  const temp = value.decimalPlaces(Math.min(decimalPlaces, value.decimalPlaces() as number));

  return `${temp.c?.length ? temp : 0}${symbol ? ` ${symbol}` : ''}`;
}
