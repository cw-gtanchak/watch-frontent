import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import '../styles/chart.css';
import { classes, formatChartArray } from 'utils';
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from './Skeleton';
import { RangeType } from 'gql';

const dataTime = [
  {
    value: RangeType.Week,
    label: '1w',
  },
  {
    value: RangeType.Month,
    label: '1m',
  },
  {
    value: RangeType.All,
    label: 'All Time',
  },
];

export function ChartComponent<T>({
  chartData,
  isLoading,
  summary,
  fetchChart,
}: {
  chartData?: [];
  summary: { value: number | string | undefined; name: string; color?: string }[] | undefined;
  isLoading?: boolean;
  fetchChart: (_: RangeType) => Promise<T>;
}) {
  const [timePeriod, setTimePeriod] = useState<RangeType>(RangeType.Week);

  const data = useMemo(() => {
    const temp = formatChartArray(chartData?.length ? chartData : [], timePeriod);

    return temp;
  }, [chartData, timePeriod]);
  const options: ApexOptions = useMemo(
    () => ({
      chart: {
        type: 'area',
        foreColor: '#CCC',
        zoom: { enabled: false },
        dropShadow: {
          enabled: true,
          enabledOnSeries: [0],
          top: -2,
          left: 2,
          blur: 5,
          opacity: 0.06,
        },
        toolbar: { show: false },
      },
      colors: ['#8D74F7'],
      stroke: {
        curve: 'straight',
        width: 1,
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        colors: '#B569EC',
        strokeColors: '#C682F773',
        strokeWidth: 6,
        radius: 10,
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: 'datetime',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          format: 'MMM d',
          showDuplicates: false,
        },
        tooltip: {
          enabled: false,
        },
        crosshairs: {
          show: true,
          opacity: 1,
          position: 'front',
          stroke: {
            color: '#8d74f759',
            width: 1,
            dashArray: 0,
          },
        },
      },
      yaxis: {
        min: summary && summary[0]?.value !== 0 ? 0 : 1,
        labels: {
          offsetX: -17,
        },
        tooltip: {
          enabled: false,
        },
      },
      grid: {
        show: true,
        borderColor: '#1F1F1F',
        strokeDashArray: 0,
        position: 'back',
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
        row: {
          colors: undefined,
          opacity: 0.5,
        },
        column: {
          colors: undefined,
          opacity: 0.5,
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      tooltip: {
        shared: false,
        x: {
          format: 'MMM dd',
        },
        y: {
          formatter(val) {
            return `${val} Query`;
          },
          title: {
            formatter() {
              return '';
            },
          },
        },
        style: {
          fontSize: '14px',
          fontFamily: 'Neue Montreal',
        },
        marker: {
          show: false,
        },
      },
      fill: {
        colors: ['#D285F7'],
        // fillOpacity: 0.1,
        opacity: 0.1,
        type: 'gradient',
        gradient: {
          shade: 'dark',
          shadeIntensity: 0.4,
          opacityFrom: 0.4,
          opacityTo: 0.2,
          stops: [0, 90, 100],
        },
      },
    }),
    [summary]
  );

  useEffect(() => {
    fetchChart(timePeriod);
  }, [timePeriod]);

  return (
    <div className="w-full justify-center p-4 items-center flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
      <div className="bg-black w-full min-h-[570px]">
        <div className="justify-between	flex sm:flex-row flex-wrap flex-col-reverse  gap-4">
          <div className="grid w-auto grid-cols-2 sm:grid-cols-3 gap-4 text-start justify-items-start">
            {summary?.map(({ name, value, color }, index) => (
              <div>
                <Skeleton.Loader isDarkTheme className="w-5 h-5">
                  <div className="text-white text-[20px]">
                    {index == 0 ? value || '0' : value || '0.0'}
                  </div>
                </Skeleton.Loader>
                <div className="flex items-center gap-[6px] mt-1">
                  <Skeleton.Loader isDarkTheme className="w-20 h-4 mr-3">
                    <div className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <div className="text-sm text-[#B2B3B8]">{name}</div>
                  </Skeleton.Loader>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-items-end">
            {dataTime.map(({ label, value }) => (
              <Skeleton.Loader isDarkTheme className="w-10 h-10 mr-3">
                <div
                  className={classes(
                    'px-4 h-10 flex items-center cursor-pointer',
                    timePeriod === value && 'bg-[#141414] rounded-[32px] whitespace-pre'
                  )}
                  onClick={() =>
                    setTimePeriod((prev) => {
                      if (prev !== value) return value;
                      return prev;
                    })
                  }
                >
                  <div>{label}</div>
                </div>
              </Skeleton.Loader>
            ))}
          </div>
        </div>
        <Chart
          type="area"
          options={options as any}
          series={[{ name: 'Query Data', data }] as ApexAxisChartSeries}
          height={'100%'}
          width={'100%'}
        />
      </div>
    </div>
  );
}
