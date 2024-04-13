const compact = Intl.NumberFormat('en', { notation: 'compact' });

export function formatNumber(n: number) {
  return compact.format(n);
}
