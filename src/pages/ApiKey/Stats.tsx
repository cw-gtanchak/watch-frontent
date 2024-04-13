import { ChartComponent } from 'components/ChartComponent';
import { useApi } from 'contexts';
import { RangeType, useSSkStatsQuery, useSskGraphLazyQuery } from 'gql';
import { useCallback, useMemo } from 'react';
interface Props {
  fetchChart: (_: RangeType) => Promise<unknown>;
  chartData: [];
  summary: { value: number | string | undefined; name: string; color?: string }[] | undefined;
}

export function Stats({ fetchChart, chartData, summary }: Props) {
  const { sessionKey } = useApi();

  return (
    <div className="card flex flex-col items-center justify-center !bg-black !border-0 !rounded-[20px]">
      <ChartComponent summary={summary} fetchChart={fetchChart} chartData={chartData} />
    </div>
  );
}
