import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { useEffect, useMemo } from 'react';
import {
  BreadCrumbs,
  Button,
  DepositIcon,
  Identicon,
  Skeleton,
  WalletWithTimeIcon,
  useSkeleton,
} from 'components';
import { useBreadCrumbsChild } from 'hooks/useBreadCrumbs';
import { usePageFilter } from 'hooks/usePageFilter';
import { useWindowSize } from 'hooks';
import { useView, useApi } from 'contexts';
import { ViewFundLogType, useViewFundLogLazyQuery } from 'gql';
import { classes, formatBalance, pathTo } from 'utils';

function FundDetail({
  data,
  tokenDecimals = 12,
}: {
  data: ViewFundLogType | null;
  tokenDecimals: number;
  key: number;
}) {
  const {
    windowSize: { width },
  } = useWindowSize();

  if (width < 992) {
    return (
      <div className="w-full p-4 rounded-2xl mb-4 last:pb-0 bg-[#0E0E0E]">
        <div className="flex justify-between border-[#1F1F1F] border-b pb-4 mb-4">
          <div className="flex sm:w-1/2 w-1/2 flex-row gap-[6px] items-center text-sm">
            <Skeleton.Loader isDarkTheme className="h-8 w-[50px] !rounded-lg">
              <DepositIcon style={{ height: '32px', width: '32px' }} />
              Deposit
            </Skeleton.Loader>
            {/* <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="h-4 md:w-20 w-16">
                {data?.fund}
              </Skeleton.Loader>
            </div> */}
          </div>
          <div className="flex sm:w-1/2 w-1/2 flex-row gap-[6px] items-center">
            <Skeleton.Loader isDarkTheme className="h-8 w-8 !rounded-lg">
              <Identicon value={data?.sponsor as string} className="h-5 w-5" />
            </Skeleton.Loader>
            <div className="text-sm truncate w-full">
              <Skeleton.Loader isDarkTheme className="h-4 md:w-52 w-20">
                {data?.sponsor}
              </Skeleton.Loader>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between pb-3">
          {width > 991 && (
            <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
              <div className="text-xs text-[#B2B3B8]">
                <Skeleton.Loader isDarkTheme className="w-[50px] h-4">
                  Type:
                </Skeleton.Loader>
              </div>

              {/* <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="w-[80px] h-4">
                {data?.fund}
              </Skeleton.Loader>
            </div> */}
            </div>
          )}
          <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
            <div className="text-xs  text-[#B2B3B8]">
              <Skeleton.Loader isDarkTheme className="w-[60px] h-4">
                Timestamp:
              </Skeleton.Loader>
            </div>
            <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="w-[80px] h-4">
                {moment(data?.timestamp).format('DD/MM/YYYY・hh:mmA')}
              </Skeleton.Loader>
            </div>
          </div>
          <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
            <div className="text-xs  text-[#B2B3B8]">
              <Skeleton.Loader isDarkTheme className="w-[70px] h-4">
                Total Amounts:
              </Skeleton.Loader>
            </div>
            <div className="text-sm truncate">
              <Skeleton.Loader isDarkTheme className="w-[85px] h-4">
                {formatBalance(new BigNumber(data?.amount as string), {
                  symbol: '$TANLOG',
                  tokenDecimals,
                  decimalPlaces: 5,
                })}
              </Skeleton.Loader>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between pb-4">
          <div className="flex sm:w-1/2 w-1/2 flex-col gap-[6px]">
            <div className="text-xs  text-[#B2B3B8]">
              <Skeleton.Loader isDarkTheme className="w-[70px] h-4">
                Total Rewards:
              </Skeleton.Loader>
            </div>
            <div className="text-sm">
              <Skeleton.Loader isDarkTheme className="w-[101px] h-4">
                {'0 $TANLOG'}
              </Skeleton.Loader>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-[15%_35%_20%_20%_10%] md:grid-cols-[100%] grid-cols-[100%] lg:h-[60px] md:h-full h-full bg-[#0E0E0E] items-center rounded-2xl mb-2 md:px-4 px-4 lg:pr-6 lg:pl-5 md:py-[14px] py-[14px] w-full ">
      <div className="flex flex-row gap-[6px] items-center lg:pb-0 md:pb-4 pb-4 text-sm lg:border-0 md:border-b border-b border-[#1F1F1F]">
        <Skeleton.Loader isDarkTheme className="h-8 w-[50px] !rounded-lg">
          <DepositIcon style={{ height: '32px', width: '32px' }} />
          Deposit
        </Skeleton.Loader>
        {/* <div className="text-sm truncate w-[calc(100%-45px)] lg:pr-2">
          <Skeleton.Loader isDarkTheme className="h-4 w-[80%]">
            {data?.fund}
          </Skeleton.Loader>
        </div> */}
      </div>
      <div className="flex flex-row gap-[6px] items-center lg:pb-0 md:pb-4 pb-4  lg:border-0 md:border-b border-b border-[#1F1F1F]">
        <Skeleton.Loader isDarkTheme className="h-8 w-8 !rounded-lg">
          <Identicon value={data?.sponsor as string} className="h-5 w-5" />
        </Skeleton.Loader>
        <div className="text-sm truncate w-[calc(100%-45px)] lg:pr-2">
          <Skeleton.Loader isDarkTheme className="h-4 w-[80%]">
            {data?.sponsor}
          </Skeleton.Loader>
        </div>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[170px] h-4">
          {moment(data?.timestamp).format('DD/MM/YYYY・hh:mmA')}
        </Skeleton.Loader>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[63px] h-4">
          {formatBalance(new BigNumber(data?.amount as string), {
            symbol: '$TANLOG',
            tokenDecimals,
            decimalPlaces: 5,
          })}
        </Skeleton.Loader>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[101px] h-4">
          {'0 $TANLOG'}
        </Skeleton.Loader>
      </div>
    </div>
  );
}

export function FundingActivity() {
  const isSkLoading = useSkeleton();
  const { id: hashId } = useParams<{ id?: string }>();
  useBreadCrumbsChild({ page: 'FundingActivity', params: [hashId] }, []);
  const {
    chainProps: { tokenDecimals },
  } = useApi();

  const { resource: view } = useView();
  const [getFundHistory, { data: fundingHistory, loading }] = useViewFundLogLazyQuery();

  const navigate = useNavigate();

  const { controller, currentPage } = usePageFilter(fundingHistory?.viewFundLog, 10);

  const isLoading = useMemo(() => {
    if (!view || loading || isSkLoading) return true;
    return false;
  }, [view, loading, isSkLoading]);

  useEffect(() => {
    if (view?.name)
      getFundHistory({
        variables: { viewName: view?.name },
        fetchPolicy: 'no-cache',
      });
  }, [view, getFundHistory]);

  return (
    <Skeleton.Provider isLoading={isLoading}>
      <div className="w-full justify-start lg:p-16 !pt-0 px-0 ">
        <BreadCrumbs />

        <div className="text-white md:text-[32px] text-2xl md:mb-4 mb-3 md:leading-10 leading-9">
          <Skeleton.Loader isDarkTheme className="sm:w-64 w-[30%] sm:h-12 h-[34px] !rounded-[53px]">
            Funding Activity
          </Skeleton.Loader>
        </div>
        <div
          className={classes(
            'card sm:p-5 p-4 sm:rounded-3xl rounded-2xl lg:!border lg:!border-solid !border-[#1F1F1F] !border-none lg:!bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] !bg-transparent',
            !fundingHistory?.viewFundLog?.length &&
              !isLoading &&
              'md:min-h-[410px] min-h-[225px] flex items-center justify-center bg-gradient-to-b from-black to-black shadow-inner !border-solid !border-[#1F1F1F]'
          )}
        >
          {(!!fundingHistory?.viewFundLog?.length || isLoading) && (
            <div className="lg:block md:hidden hidden">
              <div className="grid grid-cols-[15%_35%_20%_20%_10%] text-[#B2B3B8] text-xs sm:pl-5 sm:pr-6 px-4">
                <Skeleton.Loader isDarkTheme className="w-14 h-3">
                  <div>Type</div>
                </Skeleton.Loader>
                <Skeleton.Loader isDarkTheme className="w-[81px] h-3 !rounded-full">
                  <div>Publisher</div>
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

          {!fundingHistory?.viewFundLog?.length && !isLoading && (
            <div className="flex items-center justify-center flex-col">
              <WalletWithTimeIcon />
              <div className="text-center text-white text-xl font-normal  leading-7 md:mt-[18px] mt-[14px] mb-[14px]">
                This View is currently not funded.
              </div>
              <Button
                className=""
                variant="darkThemeFilled"
                onClick={() => {
                  navigate(pathTo('View', hashId));
                  sessionStorage.setItem('isAddFundsOpen', true.toString());
                }}
              >
                Add Funds
              </Button>
            </div>
          )}
          {(!!fundingHistory?.viewFundLog?.length || isLoading) && (
            <>
              <div className="text-white lg:pt-[10px] md:pt-[0px] pt-0">
                {(isLoading ? new Array(10).fill(null) : currentPage).map((fund, index) => (
                  <FundDetail data={fund} key={index} tokenDecimals={tokenDecimals} />
                ))}
              </div>
              {controller}
            </>
          )}
        </div>
      </div>
    </Skeleton.Provider>
  );
}
