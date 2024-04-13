import { ApexOptions } from 'apexcharts';
// eslint-disable-next-line import/default
import Chart from 'react-apexcharts';
import '../../styles/chart.css';
import { RangeType, useViewGraphQuery, useViewStatsQuery, ViewStatsQuery } from 'gql';
import { useMemo, useState } from 'react';
import { Skeleton } from 'components';
import { classes } from 'utils';

const dataTime = [
  {
    range: 'week',
    label: '1w',
  },
  {
    range: 'month',
    label: '1m',
  },
  {
    range: 'all',
    label: 'All Time',
  },
];

function Stats({ viewName, stats }: { viewName: string; stats?: ViewStatsQuery }) {
  const [timePeriod, setTimePeriod] = useState<RangeType>(RangeType.Week);

  const { data: graphData } = useViewGraphQuery({
    variables: { viewName: viewName, range: timePeriod },
  });

  const formatDataArray = (arr: Array<{ date: Date; count: number }>) => {
    return arr.map((el) => ({
      x: Date.parse(el.date.toString()),
      y: el.count,
    }));
  };

  const formatRewardArray = (arr: Array<{ date: Date; balance: string }>) => {
    return arr.map((el) => ({
      x: Date.parse(el.date.toString()),
      y: +el.balance,
    }));
  };

  const series = useMemo(() => {
    const queryData = formatDataArray(graphData?.ViewGraph?.totalQueryPerView || []);
    const userData = formatDataArray(graphData?.ViewGraph?.uniqueUserQueryPerView || []);
    const rewardData = formatRewardArray(graphData?.ViewGraph?.rewardPerView || []);

    if (!queryData.length && !userData.length && !rewardData.length) {
      return [];
    }

    return [
      {
        name: 'Query',
        label: 'Queries Total',
        value: stats?.ViewStats?.totalQueryPerView,
        data: queryData,
        color: '#FFAD97',
      },
      {
        name: 'Users',
        label: 'Unique Users',
        value: stats?.ViewStats?.uniqueUserQueryPerView,
        data: userData,
        color: '#D83AFF',
      },
      {
        name: 'Total rewards',
        label: 'Total rewards',
        value: stats?.ViewStats?.rewardPerView,
        unit: '$TANLOG',
        data: rewardData,
        color: '#7CA1F6',
      },
      {
        name: 'Total funds',
        label: 'Total Funds Locked',
        value: 62,
        unit: '$TANLOG',
        data: [
          { x: 1704499200000, y: 10 },
          { x: 1704585600000, y: 20 },
          { x: 1704672000000, y: 10 },
        ],
        color: '#F7C5FF',
      },
    ];
  }, [graphData, stats]);

  const { min, max } = useMemo(() => {
    const min = Math.min(
      ...series.map(({ data }) => {
        data.sort((a, b) => a?.x - b?.x);
        return data[0]?.x;
      })
    );
    switch (timePeriod) {
      case RangeType.Week:
        return { min, max: min + 86400000 * 7 };
      case RangeType.Month:
        return { min, max: min + 86400000 * 31 };
      default:
        return { min, max: undefined };
    }
  }, [series, timePeriod]);

  const options: ApexOptions = useMemo(() => {
    return {
      chart: {
        type: 'line',
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
        min: min,
        max: max,
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
        intersect: false,
        shared: false,
        x: {
          format: 'MMM dd',
        },
        y: {
          formatter(val, opts) {
            return `${val} ${series[opts.seriesIndex].name}`;
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
      legend: {
        show: false,
        position: 'top',
        itemMargin: {
          horizontal: 10,
          vertical: 0,
        },
        horizontalAlign: 'left',
      },
      noData: {
        text: 'No Stats Available Yet',
        style: {
          color: '#FFF',
        },
      },
    };
  }, [series, min, max]);

  return (
    <div className="w-full justify-center p-4 items-center flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
      <div className="bg-black w-full min-h-[570px]">
        <div className="justify-between	flex sm:flex-row flex-wrap flex-col-reverse  gap-4">
          <div className="sm:flex grid w-auto grid-cols-2 sm:grid-cols-3 gap-4 text-start justify-items-start">
            {series.map(({ label, value, color, unit }) => (
              <div key={label}>
                <div>
                  <Skeleton.Loader isDarkTheme className="w-14 h-5">
                    {value || 0} {unit}
                  </Skeleton.Loader>
                </div>
                <div className="flex items-center gap-[6px] mt-1">
                  <Skeleton.Loader isDarkTheme className="w-20 h-4 mr-3">
                    <div className="h-2 w-2 rounded-full" style={{ background: color }} />
                    <div className="text-sm text-[#B2B3B8]">{label}</div>
                  </Skeleton.Loader>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-items-end">
            {dataTime.map(({ label, range }) => (
              <Skeleton.Loader isDarkTheme className="w-10 h-10 mr-3" key={label}>
                <button
                  className={classes(
                    'px-4 h-10 flex items-center cursor-pointer',
                    timePeriod === range && 'bg-[#141414] rounded-[32px] whitespace-pre'
                  )}
                  onClick={() =>
                    setTimePeriod((prev) => {
                      if (prev !== range) return range as RangeType;
                      return prev as RangeType;
                    })
                  }
                >
                  <div>{label}</div>
                </button>
              </Skeleton.Loader>
            ))}
          </div>
        </div>
        <Chart type="line" options={options} height={'100%'} width={'100%'} series={series} />
      </div>
    </div>
  );
}

export default Stats;
