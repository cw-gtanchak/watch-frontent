import { useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BigNumber from 'bignumber.js';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import QueryModal from './QueryModal';
import {
  Button,
  Description,
  FormatBalance,
  GradientArrow,
  Identicon,
  Publisher,
  ResourceLogo,
  Skeleton,
  Statistics,
  Status,
  Tag,
} from 'components';
import { useApi, useView } from 'contexts';
import { useWindowSize } from 'hooks';
import { arrayOfSize, classes, formatBalance, pathTo, truncate } from 'utils';
import { useSponsorViewMutation, useUserBalanceQuery, ViewIndexingStatusType } from 'gql';
import { FundExchangefn } from 'types';
import { FundsModal } from 'components/FundsModal';

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 420,
    backgroundColor: '#1A1A1A',
  },
});

export function Details({
  balance,
  minCost,
  minCycle,
  status,
}: {
  balance: string | undefined;
  minCost: string | undefined;
  minCycle?: number;
  status: ViewIndexingStatusType | undefined;
}) {
  const {
    windowSize: { width },
    isMobile,
  } = useWindowSize();
  const {
    account,
    sessionKey,
    chainProps: { tokenDecimals },
  } = useApi();
  const { resource: view, isResourceLoading, isRecentDataLoading } = useView();
  const [isFundModalOpen, setIsFundModalOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);

  const { data: accountBalanceData, refetch: refetchAccountBalance } = useUserBalanceQuery({
    variables: { sessionKey },
    skip: !account?.address,
  });
  const [sponsorView, { loading: isSponsorViewLoading }] = useSponsorViewMutation();

  const addFunds: FundExchangefn = useCallback(
    ({ amount, setFundRefAddress, setError }) => {
      sponsorView({
        variables: {
          data: {
            amount: new BigNumber(amount).multipliedBy(10 ** tokenDecimals).toString(),
            viewName: view?.name,
          },
          address: account?.address,
          sessionKey,
        },
        onCompleted: (data) => {
          if (data.SponsorViewMutation.status === 'Failed' && data.SponsorViewMutation.error) {
            setError(data.SponsorViewMutation.error);
            return;
          }
          setFundRefAddress(undefined);
          refetchAccountBalance();
        },
        onError: (error) => {
          setError(error.message);
        },
        refetchQueries: ['ViewStats'],
      });
    },
    [account?.address, refetchAccountBalance, sessionKey, sponsorView, tokenDecimals, view?.name]
  );

  useEffect(() => {
    const isModalOpen = sessionStorage.getItem('isAddFundsOpen') === 'true';
    setIsFundModalOpen(isModalOpen);
  }, []);

  useEffect(() => {
    sessionStorage.removeItem('isAddFundsOpen');
  }, [isFundModalOpen]);

  return (
    <>
      <div className="card grid xl:grid-cols-[2fr_442px] grid-cols-1 xl:gap-x-6 xl:gap-0 gap-2 items-start !mb-8 sm:mb-12 relative sm:p-6 p-4 !bg-[#000] rounded-[24px] border !border-[#1F1F1F] sm:!border-transparent xl:[grid-template-areas:'header_right'_'footer_footer'] [grid-template-areas:'header''right''footer']">
        <div className="flex w-full items-start justify-between xl:gap-3 gap-3  flex-col [grid-area:header]">
          <div className="flex justify-start sm:flex-row flex-col  xl:gap-x-3 gap-x-3 items-start break-all">
            <div className="flex sm:justify-between justify-start sm:w-auto w-full items-start gap-3 sm:gap-6">
              <div className="flex flex-col relative">
                <Skeleton.Loader
                  isDarkTheme
                  className="md:h-[128px] h-[65px] md:w-[128px] w-[65px]"
                >
                  <div className="absolute top-2/4 left-2/4 rounded-[59px] bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] filter blur-[25px] h-1/2 w-20 -translate-y-2/4 -translate-x-2/4"></div>
                  <ResourceLogo
                    value={view}
                    className={classes(
                      'relative mr-6 md:h-32 h-[72px]  sm:min-h-fit md:min-h-[65px] bg-[#d3cccc14] rounded-[16px] md:w-32 w-[72px]  m-0 '
                    )}
                  />
                  <div className="absolute bottom-0 right-0 sm:h-[18px] h-[10px] flex items-center justify-center uppercase bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] text-white sm:text-[8px] text-[4px] rounded-[16px_0px] p-[1px_10px]">
                    View
                  </div>
                </Skeleton.Loader>
              </div>
              <h2 className="flex sm:hidden text-white text-lg">
                <Skeleton.Loader isDarkTheme className="sm:w-60 w-[120px]">
                  {view?.name}
                </Skeleton.Loader>
              </h2>
            </div>
            <div className="flex w-full flex-col items-start space-y-2 text-white break-all">
              <h2 className="hidden sm:flex md:text-2xl text-lg">
                <Skeleton.Loader isDarkTheme className="sm:w-60 w-[120px]">
                  {view?.name}
                </Skeleton.Loader>
              </h2>
              <div className="w-full text-sm md:text-base text-[#B2B3B8] sm:!mt-[8px] !mt-0 xl:flex hidden">
                <Skeleton.Loader isDarkTheme className="sm:w-60 w-[200px]">
                  <Description value={view?.description} />
                </Skeleton.Loader>
              </div>
              <div className="flex-wrap items-center text-[0.66rem] text-sm sm:!mt-4 !mt-3 xl:flex hidden gap-2">
                {(isResourceLoading ? arrayOfSize(3).map(() => undefined) : view?.tags)?.map(
                  (tag, index) => {
                    if (index < 5)
                      return (
                        <Tag
                          isDarkTheme
                          {...(tag?.isChainTag
                            ? {
                                icon: (
                                  <img
                                    src={`/logos/chain/${tag.name?.toLowerCase()}.svg`}
                                    alt={tag.slug}
                                  />
                                ),
                              }
                            : {})}
                          classNames={{ name: 'text-[10px] pl-0', base: 'list-none' }}
                        >
                          {tag?.name}
                        </Tag>
                      );
                  }
                )}
                {!!view?.tags?.length && view?.tags?.length - 5 > 0 && (
                  <CustomWidthTooltip
                    placement="top"
                    title={
                      <div className="flex flex-wrap space-x-1">
                        {view?.tags?.map((tag, index) => {
                          if (index > 4)
                            return (
                              <Tag
                                isDarkTheme
                                {...(tag?.isChainTag
                                  ? {
                                      icon: (
                                        <img
                                          src={`/logos/chain/${tag.name?.toLowerCase()}.svg`}
                                          alt={tag.slug}
                                        />
                                      ),
                                    }
                                  : {})}
                                classNames={{ name: 'text-[10px] pl-0', base: 'list-none' }}
                              >
                                {tag?.name}
                              </Tag>
                            );
                        })}
                      </div>
                    }
                    arrow
                    children={
                      <div className="mb-2 bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] bg-clip-text text-transparent">
                        <Skeleton.Loader isDarkTheme>See More</Skeleton.Loader>
                      </div>
                    }
                  ></CustomWidthTooltip>
                )}
              </div>
            </div>
          </div>
          <div className="xl:hidden flex">
            <div className="flex w-full flex-col items-start space-y-2 text-white break-all">
              <div className="w-full text-sm sm:text-base text-[#B2B3B8]">
                <Skeleton.Loader isDarkTheme className="sm:w-60 w-[200px]">
                  <Description value={view?.description} />
                </Skeleton.Loader>
              </div>
              <div
                className={classes(
                  'flex-wrap items-center text-[0.66rem] text-sm sm:!mt-[10px] !mt-3 gap-2 flex-row flex'
                )}
              >
                {(isResourceLoading ? arrayOfSize(3).map(() => undefined) : view?.tags)?.map(
                  (tag, index) => {
                    if (index < 5)
                      return (
                        <Tag
                          isDarkTheme
                          {...(tag?.isChainTag
                            ? {
                                icon: (
                                  <img
                                    src={`/logos/chain/${tag.name?.toLowerCase()}.svg`}
                                    alt={tag.slug}
                                  />
                                ),
                              }
                            : {})}
                          classNames={{ name: 'text-[10px] pl-0', base: 'list-none' }}
                        >
                          {tag?.name}
                        </Tag>
                      );
                  }
                )}
                {!!view?.tags?.length && view?.tags?.length - 5 > 0 && (
                  <CustomWidthTooltip
                    title={
                      <div className="flex flex-wrap space-x-1">
                        {view?.tags?.map((tag, index) => {
                          if (index > 4)
                            return (
                              <Tag
                                isDarkTheme
                                {...(tag?.isChainTag
                                  ? {
                                      icon: (
                                        <img
                                          src={`/logos/chain/${tag.name?.toLowerCase()}.svg`}
                                          alt={tag.slug}
                                        />
                                      ),
                                    }
                                  : {})}
                                classNames={{ name: 'text-[10px] pl-0', base: 'list-none' }}
                              >
                                {tag?.name}
                              </Tag>
                            );
                        })}
                      </div>
                    }
                    arrow
                    children={
                      <div className="mb-2 bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] bg-clip-text text-transparent">
                        <Skeleton.Loader isDarkTheme>See More</Skeleton.Loader>
                      </div>
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {width > 767 ? (
          <Statistics
            value={[
              ...(!isMobile
                ? [
                    {
                      value: (
                        <Button
                          variant="darkThemeOutlined"
                          className=" lg:min-w-[77px] flex-1 !font-normal"
                          onClick={() => setIsQueryModalOpen(true)}
                        >
                          Query
                        </Button>
                      ),
                    },
                  ]
                : []),
              // {
              //   label: (
              //     <div className="flex items-center h-7 ">
              //       Estimated cost
              //       <ToolTip anchor="center-down" message={'Estimated cost for funding this view.'}>
              //         <CustomInfoIcon className="w-4 h-4 ml-1 text-white" />
              //       </ToolTip>
              //     </div>
              //   ),
              //   value: 0,
              // },
              // {
              //   label: (
              //     <div className="flex items-center">
              //       Estimated Rewards
              //       <ToolTip anchor="center-down" message={'Estimated rewards for funding this view.'}>
              //         <CustomInfoIcon className="w-4 h-4 ml-1 text-white" />
              //       </ToolTip>
              //     </div>
              //   ),
              //   value: 0,
              // },
              // { label: 'No. of user funding a view', value: 0 },
              {
                label: 'Publisher',
                value: (
                  <Publisher
                    withLink
                    isTruncated
                    value={view?.publisher}
                    className="sm:text-xl text-[18px] !text-white hover:underline"
                    classNames={{ span: 'text-[18px]' }}
                  />
                ),
              },
              {
                label: 'Index Status',
                value: (
                  <Status
                    color={status?.status === 'Active' ? 'green' : 'red'}
                    dotClassName="mr-3 top-[unset]"
                    className="flex flex-row-reverse gap-2 text-lg"
                  >
                    {status?.status}
                  </Status>
                ),
              },
            ]}
            isDarkTheme
            withBorder={width >= 640 ? true : false}
            classNames={{
              base: 'lg:h-auto h-full sm:flex grid auto-cols-max grid-cols-2 md:grid-cols-4 sm:!overflow-auto !overflow-visible !overflow-y-visible border-[#1F1F1F] border border-solid py-4 px-6 rounded-2xl xl:mt-4 mt-2 min-h-[88px] [grid-area:footer]',
              strings: 'flex-col-reverse gap-1 ',
              label:
                '!text-sm !text-[#B2B3B8] capitalize !overflow-visible break-words md:whitespace-pre whitespace-pre-line sm:max-w-[max-content] ',
              separator: 'h-[61px]',
              stat: 'sm:mr-auto m-0 break-words first:m-0',
            }}
          />
        ) : (
          <div className="rounded-[14px] border border-stone-900 pt-[10px] pb-4 px-4">
            <div className="py-[10px] border-b border-stone-900">
              <Skeleton.Loader isDarkTheme containerClassName="w-1/2 h-5">
                <Link
                  to={pathTo('Publisher', view?.publisher.address)}
                  className="flex gap-2 items-center"
                >
                  <Identicon value={view?.publisher.address} size={20} />
                  <div>{truncate(view?.publisher.address)}</div>
                </Link>
              </Skeleton.Loader>
              <Skeleton.Loader isDarkTheme className="mt-1 w-1/2">
                <div className="text-zinc-400 text-xs font-normal leading-tight">Publisher</div>
              </Skeleton.Loader>
            </div>
            <div className="py-[10px] border-b border-stone-900">
              <Skeleton.Loader isDarkTheme className="w-1/2">
                <Status
                  color={status?.status === 'Active' ? 'green' : 'red'}
                  dotClassName="m-0"
                  className="flex flex-row-reverse justify-end gap-2 text-lg "
                >
                  {status?.status}
                </Status>
              </Skeleton.Loader>
              <Skeleton.Loader isDarkTheme className="w-1/2 mt-1">
                <div className="text-zinc-400 text-xs font-normal font-['Neue Montreal'] leading-tight">
                  Index Status
                </div>
              </Skeleton.Loader>
            </div>
            <Skeleton.Loader isDarkTheme className="mt-2">
              <Button
                variant="darkThemeOutlined"
                className=" w-full flex-1 !font-normal mt-4"
                onClick={() => setIsQueryModalOpen(true)}
              >
                Query
              </Button>
            </Skeleton.Loader>
          </div>
        )}

        <div className="bg-[#0E0E0E] border border-[#1F1F1F] rounded-2xl overflow-hidden flex flex-col [grid-area:right]">
          <div className="md:px-6 px-4 xl:pt-5 pt-[10px] h-full flex justify-center flex-col">
            <div className="flex md:gap-[65px] gap-[10px]  md:items-center items-start md:mb-5 mb-4 md:flex-row flex-col">
              <div className="flex flex-col gap-[5px] flex-1 md:w-[unset] w-full">
                <Skeleton.Loader isDarkTheme className="h-[35px]">
                  <h4 className="text-sm font-normal leading-[22px] text-[#B2B3B8]">
                    <Skeleton.Loader isDarkTheme>View balance</Skeleton.Loader>
                  </h4>
                  <h5 className="text-white text-2xl font-normal leading-normal">
                    <Skeleton.Loader isDarkTheme>
                      <FormatBalance value={balance || ''} options={{ decimalPlaces: 5 }} />
                    </Skeleton.Loader>
                  </h5>
                </Skeleton.Loader>
              </div>
              <Skeleton.Loader isDarkTheme className="w-[150px] h-6">
                <Button
                  variant="darkThemeFilled"
                  className="w-full flex-1 !font-normal"
                  onClick={() => setIsFundModalOpen(true)}
                  isDisabled={!account?.address}
                >
                  Add funds
                </Button>
              </Skeleton.Loader>
            </div>
            {/* <div className="w-full border border-[#1F1F1F]"></div>
            <div className="flex md:gap-4 gap-3 justify-start md:py-[24px] py-3 md:flex-row flex-col">
              <div className="flex flex-col gap-[2px] flex-1">
                <h4 className="text-base font-normal leading-normal">
                  <Skeleton.Loader isDarkTheme>
                    <FormatBalance value={minCost || ''} />
                  </Skeleton.Loader>
                </h4>
                <h5 className="text-zinc-400 text-xs font-normal leading-tight flex items-center gap-1">
                  <Skeleton.Loader isDarkTheme className="w-[150px] mt-1 h-6">
                    Estimated Indexing Cost
                    <QuestionMarkCircleIcon className="text-text-zinc-400 h-[13px] w-[13px]" />
                  </Skeleton.Loader>
                </h5>
              </div>
              <div className="h-auto border border-[#1F1F1F]"></div>
              <div className="flex flex-col gap-[2px] flex-1">
                <h4 className="text-base font-normal leading-normal">
                  <Skeleton.Loader isDarkTheme>20 $TANLOG</Skeleton.Loader>
                </h4>
                <h5 className="text-zinc-400 text-xs font-normal leading-tight flex items-center gap-1">
                  <Skeleton.Loader isDarkTheme className="w-[150px] mt-1 h-6">
                    Estimated Rewards
                    <QuestionMarkCircleIcon className="text-zinc-400 h-[13px] w-[13px]" />
                  </Skeleton.Loader>
                </h5>
              </div>
            </div> */}
          </div>
          <Link
            to={pathTo('FundingActivity', view?.hashId)}
            className="bg-[linear-gradient(271deg,_#8d74f729_3%,_#ffad9700_95%)] md:h-[56px] h-[42px] md:px-6 px-[15px] md:py-4 py-3 flex items-center justify-between border-solid border-0 border-t border-[#1F1F1F] mt-auto"
          >
            <Skeleton.Loader isDarkTheme containerClassName="w-full">
              <h4 className="bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] text-transparent bg-clip-text text-sm font-normal leading-snug">
                Funding Activity
              </h4>
              <GradientArrow />
            </Skeleton.Loader>
          </Link>
        </div>
        {isFundModalOpen && (
          <FundsModal
            showBalance={false}
            onlyAccountBalance
            accountBalance={new BigNumber(accountBalanceData?.userBalance?.balance as string)}
            isOpen
            setIsOpen={setIsFundModalOpen}
            OnFundExchangeSubmit={addFunds}
            isLoading={isSponsorViewLoading}
            texts={{
              header: 'Add funds to index this View',
              headerSub:
                'To query this View, Analog Watch needs to index it first. You add the funds to cover the indexing fees, ensuring a minimum number of cycles while qualifying you for rewards when users query your View. Add funds now to index this View.',
              submit: 'Add Funds',
              inputLabel: 'Amount',
              inputPlaceHolder: formatBalance(new BigNumber(minCost || ''), {
                decimalPlaces: 5,
                symbol: '$TANLOG',
                tokenDecimals,
              }),
            }}
            successTexts={{
              header: "You've successfully funded the View!",
              submitToButton: 'View Funding Activity',
            }}
            successModalSubmitTo={pathTo('FundingActivity', view?.hashId)}
            accountBalanceText="Your Balance"
            isAddFunds
            minimumReq={minCost}
            minimumCycle={minCycle}
          />
        )}
        {isQueryModalOpen && <QueryModal isOpen setIsOpen={setIsQueryModalOpen} />}
      </div>
    </>
  );
}
