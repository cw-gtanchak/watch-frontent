import { Link } from 'react-router-dom';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { Skeleton, ViewIcon } from 'components';
import { usePageFilter } from 'hooks/usePageFilter';
import { classes, formatBalance, pathTo } from 'utils';
import { SearchType, UserFundedViewsType, useUserFundedViewsQuery } from 'gql';
import { useApi, useMyProfile } from 'contexts';

// TODO: uncomment remaining fields while integrating new fields

function FundDetails({
  view,
  tokenDecimals,
}: {
  tokenDecimals: number;
  view: UserFundedViewsType | null;
}) {
  return (
    // TODO change: lg:grid-cols-[35%_18%_8%_10%_14%_7%_8%]
    <div className="grid lg:grid-cols-[20%_20%_20%_20%_20%] md:grid-cols-[100%] grid-cols-[100%] lg:h-[60px] md:h-full h-full bg-[#0E0E0E] items-center rounded-2xl mb-2 lg:px-2 md:px-4 px-4 lg:pl-5 md:py-[14px] py-[14px]  w-full ">
      <div className="flex flex-row gap-2 items-center lg:pb-0 md:pb-4 pb-4  lg:border-0 md:border-b border-b border-[#1F1F1F]">
        <Skeleton.Loader isDarkTheme className="h-8 w-8 !rounded-lg">
          <div className="bg-[#222121] p-[6px] rounded-md">
            <ViewIcon className="h-5 w-5" />
          </div>
        </Skeleton.Loader>
        <div className="truncate w-[calc(100%-45px)] lg:pr-2">
          <Skeleton.Loader isDarkTheme className="h-4">
            {view?.name}
          </Skeleton.Loader>
        </div>
      </div>
      <div className="lg:pt-0 md:pt-3 pt-3 flex items-center gap-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[113px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Deposit amount:</div>
          {formatBalance(new BigNumber(view?.funded as string), {
            symbol: '$TANLOG',
            tokenDecimals,
            decimalPlaces: 5,
          })}
        </Skeleton.Loader>
      </div>
      {/* <div className="lg:pt-0 md:pt-[5px] pt-[5px] flex items-center gap-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="lg:w-4 w-[80px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Cycles:</div> {cycle}
        </Skeleton.Loader>
      </div> */}
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] flex items-center gap-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[63px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Date:</div>
          {moment(view?.fundedAt || '').format('DD.MM.yyyy')}
        </Skeleton.Loader>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] flex items-center gap-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[101px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Earnings:</div>
          {'0'} $TANLOG
        </Skeleton.Loader>
      </div>

      {/* <div className="flex gap-2 justify-start items-center lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[50px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Status:</div>
          <Status
            color={isActive ? 'green' : 'red'}
            dotClassName={classes(
              "bg-[#3FFF2E] w-[5px] h-[5px] rounded-full flex justify-center items-center relative after:'#' after:absolute after:w-[11px] after:h-[11px] after:rounded-full  after:border-[#3FFF2E33] after:border top-0",
              !isActive && 'bg-[#B2B3B8] after:border-[#B2B3B833] outline-[#B2B3B833]'
            )}
          >
            {isActive ? 'Active' : 'Inactive'}
          </Status>
        </Skeleton.Loader>
      </div> */}

      <Link
        to={pathTo('View', view?.hash || '')}
        className="flex justify-start items-center gap-2 "
      >
        <Skeleton.Loader isDarkTheme className="w-[50px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Balance:</div>
          <div className="text-sm  bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] bg-clip-text text-transparent cursor-pointer">
            Funding Activity
          </div>
        </Skeleton.Loader>
      </Link>
    </div>
  );
}
export function FundedView() {
  const { myProfile } = useMyProfile();
  const {
    chainProps: { tokenDecimals },
  } = useApi();

  const { data, loading: isLoading } = useUserFundedViewsQuery({
    variables: {
      userId: myProfile?.id || 0,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { controller, currentPage } = usePageFilter(
    (data?.userFundedViews || []) as UserFundedViewsType[]
  );

  return data?.userFundedViews?.length !== 0 ? (
    <Skeleton.Provider isLoading={isLoading}>
      <div className="card mb-6 sm:p-6  p-0 rounded-3xl lg:!border lg:!border-solid !border-[#1F1F1F] !border-none  bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
        <div className="lg:block md:hidden hidden">
          {/* TODO change: grid-cols-[35%_18%_8%_10%_14%_7%_8%] */}
          <div className="grid grid-cols-[20%_20%_20%_20%_20%] text-white text-xs lg:px-2 md:px-4 px-4 lg:pl-5 ">
            <Skeleton.Loader isDarkTheme className="w-14 h-3">
              <div>View name</div>
            </Skeleton.Loader>
            <Skeleton.Loader isDarkTheme className="w-[81px] h-3 !rounded-full">
              <div>Amount</div>
            </Skeleton.Loader>
            {/* <Skeleton.Loader isDarkTheme className="w-[35px] h-3 !rounded-full">
              <div>Cycles</div>
            </Skeleton.Loader> */}
            <Skeleton.Loader isDarkTheme className="w-[24px] h-3 !rounded-full">
              <div>Date</div>
            </Skeleton.Loader>
            <Skeleton.Loader isDarkTheme className="w-[68px] h-3 !rounded-full">
              <div>Rewards</div>
            </Skeleton.Loader>
            {/* <Skeleton.Loader isDarkTheme className="w-[37px] h-3 !rounded-full">
              <div>Status</div>
            </Skeleton.Loader> */}
            <Skeleton.Loader isDarkTheme className="w-[37px] h-3 !rounded-full">
              <div>Balance</div>
            </Skeleton.Loader>
          </div>
        </div>
        <div className="text-white lg:pt-[10px] md:pt-[0px] pt-0">
          {(isLoading ? new Array(10).fill(null) : currentPage).map((view, index) => (
            <FundDetails view={view} tokenDecimals={tokenDecimals} key={index} />
          ))}
        </div>
        {controller}
      </div>
    </Skeleton.Provider>
  ) : (
    <div className="flex flex-col items-center justify-center pb-6">
      <div className="relative w-full py-[81px] justify-center items-center inline-flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
        <div className="relative mb-4 lg:h-[108px] h-full w-fit lg:w-[108px] overflow-hidden">
          <div className="absolute top-2/4 left-2/4  rounded-[59px] bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] filter blur-[35px] h-1/2 w-20 -translate-y-2/4 -translate-x-2/4"></div>
          <ViewIcon
            className={classes(
              'relative lg:h-[108px] md:w-[108px] lg:min-h-fit min-h-[108px] p-6 w-full bg-[#d3cccc14] md:rounded-lg rounded-[20px]'
            )}
          />
        </div>
        <div className="text-xl mb-3 text-center">
          <Skeleton.Loader className="w-[440px]">
            {"You don't have any funded Views"}
          </Skeleton.Loader>
        </div>

        <div className="text-sm mb-3 text-[#B2B3B8]">
          <Skeleton.Loader className="w-50">Browse Views in the Library</Skeleton.Loader>
        </div>
        <Skeleton.Loader className="h-12 sm:w-48">
          <Link
            className="flex items-center justify-center font-normal text-base text-black bg-white px-4 h-[40px] rounded-full text-center normal-case m-0 w-fit lg:w-auto"
            to={pathTo('Library')}
            state={{ tab: SearchType.Views }}
          >
            Library
          </Link>
        </Skeleton.Loader>
      </div>
    </div>
  );
}
