import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { CopyButton, Image, Infinity, Skeleton, Statistics, Status } from 'components';
import { Network } from 'gql';
import { HTMLAttributes, ApiKey as Value } from 'types';
import { classes, format, pathTo } from 'utils';

interface Props extends HTMLAttributes<HTMLLinkElement> {
  value?: Value;
}

export function ApiKey({ value: propsValue }: Props) {
  const [isActive, linkContents, linkClassName] = useMemo(() => {
    const isActive = propsValue?.tg?.status === 'enabled';
    return [
      isActive,
      <>
        <Skeleton.Loader
          isDarkTheme
          className="sm:min-w-[60px] sm:min-h-[60px] min-w-[42px] min-h-[42px]"
        >
          <Infinity className="sm:min-w-[60px] sm:min-h-[60px] min-w-[42px] min-[42px]" />
        </Skeleton.Loader>
        <div className="relative top-[1px] mx-2 w-fit md:w-auto text-ellipsis whitespace-pre-line overflow-hidden font-normal">
          <Skeleton.Loader isDarkTheme className="sm:w-[200px] h-[24px] w-[100px]">
            API Key:
          </Skeleton.Loader>
          <Skeleton.Loader isDarkTheme className="sm:w-[300px] h-[24px] w-[150px]">
            <div className="text-white leading-6 truncate whitespace-pre-line">
              {propsValue?.key}
            </div>
          </Skeleton.Loader>
        </div>
      </>,
      classes(
        'relative flex items-center whitespace-pre-line sm:w-fit w-[calc(100%_-_40px)]',
        isActive && 'hover:underline'
      ),
    ];
  }, [propsValue?.tg?.status, propsValue?.key]);

  return (
    <Skeleton.Provider isLoading={!propsValue}>
      <div className="card mb-6 sm:p-6 p-4 rounded-3xl border !border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
        <div className="flex w-full items-center justify-start md:text-lg font-medium text-white">
          {isActive && propsValue ? (
            <Link
              to={pathTo('ApiKey', propsValue.key)}
              title={propsValue?.key}
              className={linkClassName}
            >
              {linkContents}
            </Link>
          ) : (
            <div className={linkClassName}>{linkContents}</div>
          )}
          <Skeleton.Loader isDarkTheme className="h-10 w-10 !rounded-full">
            <CopyButton
              className="bg-[#141414] h-10 w-10 rounded-full mt-auto"
              value={propsValue?.key || ''}
            />
          </Skeleton.Loader>
        </div>
        <div className="mt-[-6px] flex w-full">
          <Statistics
            withBorder
            isDarkTheme
            classNames={{
              base: 'grid-flow-col border-[#1F1F1F] gap-6 sm:h-[70px] sm:pt-5 sm:p-4 sm:mt-6 mt-4 p-0 !pt-4 h-auto sm:overflow-visible',
              label:
                'font-medium text-sm text-white text-[18px] font-normal mb-[3px] sm:text-[18px] text-[16px]',
              stat: ' text-white m-0 flex-1',
              value: '!text-[12px] !text-[#B2B3B8]',
            }}
            value={[
              {
                label: 'Date Created',
                value: propsValue?.createdAt ? format(propsValue?.createdAt, 'MM/dd/yyyy') : '',
              },
              // {
              //   label: 'Query URL',
              //   value: propsValue?.endpoint,
              // },
              {
                label: 'Status',
                value: (
                  <Status
                    color={isActive ? 'green' : 'red'}
                    dotClassName="self-center items-center top-0"
                  >
                    {isActive ? 'Active' : 'Inactive'}
                  </Status>
                ),
              },
              {
                label: 'Instance',
                value: propsValue?.network === Network.Testnet ? 'Testnet' : 'Mainnet',
              },
            ]}
          />
        </div>
      </div>
    </Skeleton.Provider>
  );
}
