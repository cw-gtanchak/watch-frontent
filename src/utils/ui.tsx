import copyToClipboard from 'copy-to-clipboard';
import { toast } from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { Maybe, TgFunctionInputSpec, TgFunctionSpec } from '@watch/common';
import { Statuses, getIsSmartContract } from './types';
import { pathTo } from './routes';
import { Square2StackIcon } from 'components';
import {
  Resource,
  View,
  SmartContract,
  SskGraphQuery,
  UserGraphQuery,
  ViewGraphQuery,
  RangeType,
} from 'gql';
import { isConstantInput } from './timegraph';

export { default as pluralize } from 'pluralize';

export function arrayOfSize(size: number): number[] {
  return new Array(size).fill(null).map((_, i) => i);
}

export const INPUT_BASE_CLASSNAME = classes(
  'flex items-center border shadow-sm focus-within:border-white focus:border-white'
);

export const INPUT_CLASSNAME = classes(
  'w-full flex-1 border-gray-200 pb-2 pl-4 pr-4 pt-2 text-sm text-black placeholder:text-neutral-400'
);

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function NOOP() {}

export function classes(...classLists: (string | null | undefined | false)[]) {
  return twMerge(...classLists.map((classList) => (!classList ? null : classList)));
}

export function imgUrl(url: string): string {
  const baseUrl = import.meta.env.VITE_BASE_PATH || '';

  return `${baseUrl}${url}`;
}

export function notify(
  message: React.ReactNode,
  Icon: React.ComponentType<{ className?: string }>
) {
  toast(
    <div className="flex items-center">
      <Icon className="relative -top-[2px] mr-2 h-5 w-5 text-blue-200" />
      {message}
    </div>
  );
}

export function copy(value: string) {
  copyToClipboard(value);
  notify('Copied to clipboard', Square2StackIcon);
}

export function resourceLink(
  r?: Maybe<
    Partial<Pick<Resource, '__typename'> & (Pick<View, 'hashId'> | Pick<SmartContract, 'address'>)>
  >
) {
  if (!r || !r?.__typename) {
    return '#';
  }

  return pathTo(r.__typename, getIsSmartContract(r) ? r.address : (r as View).hashId);
}

export function toUSD(s: string | number): string {
  let n: number;
  if (typeof s === 'string') {
    n = parseFloat(s);
  } else {
    n = s;
  }
  return `${n < 0 ? '-' : ''}$${Math.abs(n).toLocaleString()}`;
}

export function replaceIndex<T>(arr: T[], index: number, fields: Partial<T>): T[] {
  return [
    ...arr.slice(0, index),
    {
      ...arr[index],
      ...fields,
    },
    ...arr.slice(index + 1),
  ];
}

export function capitalize(str: string): string {
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

export function getOS() {
  const userAgent = window.navigator.userAgent,
    // @ts-ignore
    platform = window.navigator?.userAgentData?.platform || window.navigator.platform,
    macosPlatforms = ['macOS', 'Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
    windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
    iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  let os = null;

  if (macosPlatforms.indexOf(platform) !== -1) {
    os = 'Mac OS';
  } else if (iosPlatforms.indexOf(platform) !== -1) {
    os = 'iOS';
  } else if (windowsPlatforms.indexOf(platform) !== -1) {
    os = 'Windows';
  } else if (/Android/.test(userAgent) || /Android/.test(platform)) {
    os = 'Android';
  } else if (/Linux/.test(platform)) {
    os = 'Linux';
  }

  return os;
}

export function isMobileOS() {
  const os = getOS();
  return os === 'Android' || os === 'iOS';
}

export function removeIdentifier(fnname = '', identifier: string) {
  return fnname.replace(identifier + '_', '');
}

export function formatChartArray(
  arr: Array<SskGraphQuery | UserGraphQuery | ViewGraphQuery>,
  timePeriod?: RangeType
) {
  if (!arr?.length) {
    let i = 1;
    const array = [];
    let max;
    switch (timePeriod) {
      case RangeType.Week:
        max = 7;
        break;

      default:
        max = 31;
        break;
    }

    while (i <= max) {
      array.push({ x: Date.now() - i * 86400000, y: 0 });
      i++;
    }
    return array;
  }
  return arr?.map((el: any) => ({
    x: Date.parse(el.date),
    y: el.count,
  }));
}

export const statusColor = (type: string) => {
  if (!type) {
    return;
  }
  type = type.toLowerCase();
  let colors = '';
  switch (type) {
    case Statuses.Completed:
    case Statuses.Finalized:
    case Statuses.Created:
    case Statuses.Success:
      colors = 'bg-[#00CD5E0D] text-[#00CD5E]';
      break;
    case Statuses.Done:
      colors = 'bg-[#3FFF2E12] text-[#3FFF2E]';
      break;

    case Statuses.Initiated:
    case Statuses.Pending:
    case Statuses.Unfinalized:
    case Statuses.Initialization:
    case Statuses.Updating:
      colors = 'bg-[#CDB80012] text-[#CDB800]';
      break;

    case Statuses.Failed:
      colors = 'bg-[#FC383814] text-[#FC3838]';
      break;

    default:
      break;
  }
  return colors;
};

export const checkInputError = (fnSpec: TgFunctionSpec): boolean => {
  return fnSpec?.inputs.some((inputSpec: TgFunctionInputSpec) => {
    const isConst = isConstantInput(inputSpec);
    // @ts-ignore
    return !isConst && inputSpec.isTouched && inputSpec.isError;
  });
};