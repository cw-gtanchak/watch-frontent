import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import useBalanceHistory from './useBalanceHistory';
import {
  BreadCrumbs,
  Button,
  DepositIcon,
  FormatBalance,
  Skeleton,
  WalletWithTimeIcon,
} from 'components';
import { useBreadCrumbsChild } from 'hooks/useBreadCrumbs';
import { usePageFilter } from 'hooks/usePageFilter';
import { useWindowSize } from 'hooks';
import { BalanceHistoryType } from 'gql';
import { classes, pathTo } from 'utils';
import { useApi } from 'contexts';

function BalanceHistoryRow({ row, key }: { row: BalanceHistoryType | null; key: number }) {
  const {
    windowSize: { width },
  } = useWindowSize();

  if (width < 992) {
    return (
      <div
        key={key}
        className="w-full md:p-0 p-4 md:rounded-none rounded-2xl md:mb-0 mb-4 md:bg-transparent bg-[#0E0E0E]"
      >
        <div className="flex justify-between border-[#1F1F1F] border-b pb-4 mb-4">
          <div className="flex sm:w-1/2 w-1/2 flex-row gap-[6px] items-center">
            <Skeleton.Loader isDarkTheme className="h-8 w-8 !rounded-lg">
              <DepositIcon style={{ height: '32px', width: '32px' }} />
            </Skeleton.Loader>
            <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="h-4 md:w-20 w-16">
                {row?.changeType}
              </Skeleton.Loader>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between pb-3">
          <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
            <div className="text-xs text-[#B2B3B8]">
              <Skeleton.Loader isDarkTheme className="w-[50px] h-4">
                Type:
              </Skeleton.Loader>
            </div>
            <div className="text-sm capitalize">
              <Skeleton.Loader isDarkTheme className="w-[80px] h-4">
                {row?.changeType}
              </Skeleton.Loader>
            </div>
          </div>
          <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
            <div className="text-xs  text-[#B2B3B8]">
              <Skeleton.Loader isDarkTheme className="w-[60px] h-4">
                Timestamp:
              </Skeleton.Loader>
            </div>
            <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="w-[80px] h-4">
                {moment(row?.timestamp).format('DD/MM/YYYY・hh:mmA')}
              </Skeleton.Loader>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between md:pb-4 pb-0">
          <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
            <div className="text-xs  text-[#B2B3B8]">
              <Skeleton.Loader isDarkTheme className="w-[70px] h-4">
                Total Amounts:
              </Skeleton.Loader>
            </div>
            <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="w-[85px] h-4">
                <FormatBalance value={row?.amount as string} options={{ decimalPlaces: 5 }} />
              </Skeleton.Loader>
            </div>
          </div>
          <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
            <div className="text-xs  text-[#B2B3B8]">
              <Skeleton.Loader isDarkTheme className="w-[70px] h-4">
                Total Rewards:
              </Skeleton.Loader>
            </div>
            <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="w-[101px] h-4">
                0
              </Skeleton.Loader>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      key={key}
      className="grid lg:grid-cols-[18%_26%_26%_18%_12%] md:grid-cols-[100%] grid-cols-[100%] lg:h-[60px] md:h-full h-full bg-[#0E0E0E] items-center rounded-2xl mb-2 md:px-4 px-4 lg:pr-6 lg:pl-5 md:py-[14px] py-[14px] w-full "
    >
      <div className="flex flex-row gap-[6px] items-center lg:pb-0 md:pb-4 pb-4  lg:border-0 md:border-b border-b border-[#1F1F1F]">
        <Skeleton.Loader isDarkTheme className="h-8 w-8 !rounded-lg">
          <DepositIcon style={{ height: '32px', width: '32px' }} />
        </Skeleton.Loader>
        <div className="text-sm truncate w-[calc(100%-45px)] lg:pr-2 capitalize">
          <Skeleton.Loader isDarkTheme className="h-4 w-[80%]">
            {row?.changeType}
          </Skeleton.Loader>
        </div>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[170px] h-4">
          {moment(row?.timestamp).format('DD/MM/YYYY・hh:mmA')}
        </Skeleton.Loader>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[63px] h-4">
          <FormatBalance value={row?.amount as string} options={{ decimalPlaces: 5 }} />
        </Skeleton.Loader>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[101px] h-4">
          {/* static value */}
          <FormatBalance value={'0'} />
        </Skeleton.Loader>
      </div>
    </div>
  );
}

export function BalanceHistory() {
  useBreadCrumbsChild({ page: 'BalanceHistory' }, [{ page: 'MyProfile' }]);
  const { balanceHistoryData, isBalanceHistoryLoading: isLoading } = useBalanceHistory();

  const { controller, currentPage } = usePageFilter(balanceHistoryData);
  const navigate = useNavigate();
  const { account } = useApi();

  return (
    <div className="w-full justify-start">
      <BreadCrumbs />
      <div className=" text-white md:text-[32px] text-2xl md:mb-4 mb-3 md:leading-10 leading-9">
        Balance History
      </div>
      <Skeleton.Provider isLoading={isLoading}>
        <div
          className={classes(
            'card md:p-5 p-0 sm:rounded-3xl rounded-2xl lg:!border lg:!border-solid !border-[#1F1F1F] !border-none lg:bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] md:!bg-[#0E0E0E] !bg-[unset] ',
            !balanceHistoryData?.length &&
              !isLoading &&
              'md:min-h-[410px] min-h-[225px] flex items-center justify-center bg-gradient-to-b from-black to-black shadow-inner !border-solid !border-[#1F1F1F]'
          )}
        >
          {!!balanceHistoryData?.length && !isLoading && (
            <div className="lg:block md:hidden hidden">
              <div className="grid grid-cols-[18%_26%_26%_18%_12%] text-[#B2B3B8] text-xs sm:pl-5 sm:pr-6 px-4">
                <Skeleton.Loader isDarkTheme className="w-14 h-3">
                  <div>Type</div>
                </Skeleton.Loader>
                <Skeleton.Loader isDarkTheme className="w-[75px] h-3 !rounded-full">
                  <div>Timestamp</div>
                </Skeleton.Loader>
                <Skeleton.Loader isDarkTheme className="w-[70px] h-3 !rounded-full">
                  <div>Total Amounts</div>
                </Skeleton.Loader>
                <Skeleton.Loader isDarkTheme className="w-[70px] h-3 !rounded-full">
                  <div>Total Rewards</div>
                </Skeleton.Loader>
              </div>
            </div>
          )}

          {!balanceHistoryData?.length && !isLoading && (
            <div className="flex items-center justify-center flex-col">
              <WalletWithTimeIcon />
              <div className="text-center text-white text-xl font-normal flex flex-col gap-1 leading-7 md:mt-[18px] mt-[14px] mb-[14px]">
                We haven't recorded any transaction history yet.
                <span className="text-base text-[#B2B3B8]">
                  To add funds, simply click on 'Deposit'.
                </span>
              </div>
              <Button
                variant="darkThemeFilled"
                onClick={() => {
                  navigate(pathTo('MyProfile'));
                  sessionStorage.setItem('isModalOpen', true.toString());
                }}
                isDisabled={!account?.address}
              >
                Deposit
              </Button>
            </div>
          )}
          {(!!balanceHistoryData?.length || isLoading) && (
            <>
              <div className="text-white lg:pt-[10px] md:pt-[0px] pt-0">
                {(isLoading ? new Array(10).fill(null) : currentPage).map(
                  (balanceHistory, index) => (
                    <BalanceHistoryRow row={balanceHistory} key={index} />
                  )
                )}
              </div>
              {controller}
            </>
          )}
        </div>
      </Skeleton.Provider>
    </div>
  );
}
