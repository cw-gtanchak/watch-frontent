import { default as BigNumber } from 'bignumber.js';
import { Link } from 'react-router-dom';
import {
  Button,
  Download,
  FormatBalance,
  Icon,
  Identicon,
  InformationIcon,
  Input,
  ResourceLogo,
  RewardsIcon,
  Skeleton,
  SpentIcon,
  Statistic,
  Statistics,
  ToolTip,
} from 'components';
import { PublisherDetailsFragment } from 'gql';
import { ClassNames, HTMLAttributes, Maybe } from 'types';
import { classes, formatBalance, pathTo } from 'utils';
import { Tooltip } from '@mui/material';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: Maybe<PublisherDetailsFragment>;
  classNames?: ClassNames<'input' | 'label' | 'identicon'>;
  showIcon?: boolean;
  isDarkTheme?: boolean;
  showAccountOptions?: boolean;
  handleClick?: (_: boolean) => void;
  accountBalance?: BigNumber;
  tokenDecimals?: number;
  isLoading?: boolean;
  sessionKey?: string;
  onDownload?: () => void;
  totalRewardEarned?: string;
  totalSpent?: string;
}

export function ProfileDetails({
  value,
  className,
  classNames,
  showIcon = true,
  isDarkTheme,
  showAccountOptions = false,
  handleClick,
  accountBalance,
  tokenDecimals,
  totalRewardEarned,
  totalSpent,
  sessionKey,
  isLoading,
  onDownload,
}: Props) {
  return (
    <div className={classes('card relative p-6', className, classNames?.base)}>
      <div
        className={classes(
          'flex w-full  items-center',
          isDarkTheme && 'gap-[18px] lg:flex-row md:flex-row sm:flex-col flex-col'
        )}
      >
        <div
          className={classes(
            'flex gap-[18px] flex-1 ',
            isDarkTheme &&
              'w-full lg:gap-[18px] md:gap-[18px] sm:gap-[12px] gap-[12px] lg:items-start md:items-start sm:items-center items-center'
          )}
        >
          <Identicon
            className={classes('h-20 w-20 ', classNames?.identicon)}
            value={value?.address}
          />
          <Statistic
            classNames={{
              base: 'flex-1',
              strings: classes(
                'w-fit',
                isDarkTheme && 'flex-col-reverse lg:gap-[8px] sm:gap-[3px] gap-[3px]',
                isLoading && 'w-full'
              ),
              label: classes(
                classNames?.label,
                isDarkTheme && '!text-[#B2B3B8] normal-case mb-0 text-[12px]'
              ),
              value: 'flex item-center gap-3',
            }}
            label="Wallet Address"
            isDarkTheme={isDarkTheme}
          >
            <Input
              className="w-full max-w-[500px] rounded bg-neutral-50"
              isCopyOnly
              isDarkTheme={isDarkTheme}
              value={value?.address || ''}
              classNames={{
                input: classes(
                  '',
                  isDarkTheme &&
                    'max-w-[285px] mr-3 truncate p-0  lg:text-[28px] md:text-[28px] sm:text-[16px] text-[16px]'
                ),
              }}
            />
            {sessionKey && (
              <Skeleton.Loader isDarkTheme className="min-h-10 min-w-10 !rounded-full">
                <button
                  onClick={onDownload}
                  className="btn relative max-h-full plain h-auto hover:text-blue-300 text-white rounded-[61px] bg-[#141414] p-[10px]"
                >
                  <ToolTip
                    anchor="top-left"
                    message={'Download Session Key'}
                    classNames={{
                      arrow: 'rotate-[225deg] top-3 left-[20px] z-20',
                      message: 'w-fit whitespace-nowrap	-right-[50px] top-5 z-10',
                    }}
                  >
                    <Download className="w-5 h-5" />
                  </ToolTip>
                </button>
              </Skeleton.Loader>
            )}
          </Statistic>
        </div>
        {showAccountOptions && (
          <div className="flex-1 pt-6 md:border-none border-t border-[#1F1F1F] border-solid  md:pt-0 flex lg:items-center md:items-center sm:items-start items-start w-full  font-['Neue_Montreal'] font-normal lg:flex-row md:flex-row sm:flex-col flex-col md:ml-6 ml-0 gap-3">
            <div className="flex items-center flex-1 justify-center">
              <div className="flex flex-col lg:gap-[10px] sm:gap-[8px] gap-[8px] lg:mb-[0px] md:mb-[0px] sm:mb-[16px] mb-[16px] ">
                <div
                  className={classes(
                    'flex items-baseline flex-wrap',
                    (!accountBalance || !tokenDecimals) && 'items-center'
                  )}
                >
                  <Skeleton.Loader
                    isLoading={!accountBalance || !tokenDecimals}
                    isDarkTheme
                    className="sm:w-[123px] w-[28px] sm:h-[28px]"
                  >
                    {/* <span className="text-white text-[28px] leading-10 mr-2">
                      {formatBalance(accountBalance, {
                        decimalPlaces: 2,
                        symbol: '',
                        tokenDecimals,
                      })}
                    </span>
                    <span className="text-white text-[22px] leading-10 mr-[10px]">$TANLOG</span> */}
                    <FormatBalance
                      value={accountBalance || ''}
                      options={{ decimalPlaces: 5 }}
                      className="text-white text-[22px] leading-10 mr-[10px]"
                    />
                  </Skeleton.Loader>
                  <Skeleton.Loader
                    isLoading={!accountBalance || !tokenDecimals}
                    isDarkTheme
                    className="sm:w-[98px] w-[55px] ml-2 sm:h-[16px] !self-baseline"
                  >
                    <Link to={pathTo('BalanceHistory')}>
                      <span className="text-purple-500 text-sm leading-none">Balance History</span>
                    </Link>
                  </Skeleton.Loader>
                </div>
                <Skeleton.Loader isDarkTheme className="w-20">
                  <div className="text-xs font-medium normal-case text-[#B2B3B8]">
                    Account Balance
                  </div>
                </Skeleton.Loader>
              </div>
            </div>
            <div className="flex items-center flex-1 w-full">
              <div className="flex lg:flex-col md:flex-col flex-row  w-full gap-[10px] items-end font-['Neue_Montreal']">
                <Skeleton.Loader isDarkTheme className="h-10 w-full" containerClassName="w-full">
                  <Button
                    variant="darkThemeFilled"
                    className="md:min-w-[160px] flex-1 !font-normal"
                    onClick={() => handleClick && handleClick(false)}
                  >
                    Deposit
                  </Button>
                </Skeleton.Loader>
                <Skeleton.Loader isDarkTheme className="w-full h-10" containerClassName="w-full">
                  <Button
                    variant="darkThemeOutlined"
                    className="md:min-w-[160px] flex-1 !font-normal"
                    onClick={() => handleClick && handleClick(true)}
                  >
                    Withdraw
                  </Button>
                </Skeleton.Loader>
              </div>
            </div>
          </div>
        )}
      </div>
      <Statistics
        withBorder
        classNames={{
          stat: classes('space-x-3', isDarkTheme && 'm-0 mr-auto h-full'),
          strings: 'flex-col-reverse justify-between space-y-2 h-full',
          value: 'text-2xl font-medium',
          base: classes(
            'lg:h-full  h-full ',
            isDarkTheme && 'sm:flex grid auto-cols-max grid-cols-2 md:grid-cols-4'
          ),
          label: 'whitespace-pre-line !text-[#B2B3B8] normal-case',
        }}
        isDarkTheme={isDarkTheme}
        value={[
          {
            icon: showIcon && (
              <ResourceLogo className="h-12 w-12" value={{ __typename: 'SmartContract' }} />
            ),
            label: 'Smart Contracts',
            value: value?.smartContracts.length || 0,
          },
          {
            icon: showIcon && <ResourceLogo className="h-12 w-12" value={{ __typename: 'View' }} />,
            label: 'Created Views',
            value: value?.views.length || 0,
          },
          {
            icon: showIcon && <Icon className="h-12 w-12" icon={RewardsIcon} />,
            label: 'Total Rewards',
            value: (
              <div className="flex flex-row items-center gap-1">
                <FormatBalance value={totalRewardEarned || ''} />
                <Tooltip
                  title={
                    <FormatBalance
                      value={totalRewardEarned || '0'}
                      options={{ decimalPlaces: 12 }}
                    />
                  }
                  arrow
                  placement="top"
                  classes={{ tooltip: '!min-w-[200px] justify-center !text-sm' }}
                >
                  <div>
                    <InformationIcon />
                  </div>
                </Tooltip>
              </div>
            ),
          },
          {
            icon: showIcon && <Icon className="h-12 w-12" icon={SpentIcon} />,
            label: 'Total Spent',
            value: (
              <div className="flex flex-row items-center gap-1">
                <FormatBalance value={totalSpent || '0'} />
                <Tooltip
                  title={
                    <FormatBalance value={totalSpent || '0'} options={{ decimalPlaces: 12 }} />
                  }
                  arrow
                  placement="top"
                  classes={{ tooltip: '!min-w-[200px] justify-center !text-sm' }}
                >
                  <div>
                    <InformationIcon />
                  </div>
                </Tooltip>
              </div>
            ),
          },
        ]}
      />
    </div>
  );
}
