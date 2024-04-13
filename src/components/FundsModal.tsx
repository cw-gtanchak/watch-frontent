import { useState, useEffect, useCallback, useMemo } from 'react';
import BigNumber from 'bignumber.js';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { Modal, ModalProps } from './Modal';
import { Identicon } from './Identicon';
import { Input } from './Input';
import {
  BrokenExclamation,
  CustomExcalmationMark,
  GradientArrow,
  GradientQuestionMark,
  InformationIcon,
} from './svg';
import { Loader } from './Loader';
import { Button } from './Button';
import { DeploySuccess } from './DeploySuccess';
import { ToolTip } from './ToolTip';
import { FormatBalance } from './FormatBalance';
import { useApi } from 'contexts';
import { classes, formatBalance } from 'utils';
import { FundExchangefn } from 'types';
import { useBalance } from 'hooks';

interface Props extends ModalProps {
  OnFundExchangeSubmit: FundExchangefn;
  isLoading?: boolean;
  texts: {
    header: string;
    headerSub: string;
    submit: string;
    inputLabel: string;
    inputPlaceHolder: string;
  };
  successTexts: {
    header: string;
    submitToButton: string;
  };
  successModalSubmitTo?: string;
  showBalance: boolean;
  accountBalance?: BigNumber;
  onlyAccountBalance?: boolean;
  accountBalanceText?: string;
  isAddFunds?: boolean;
  minimumReq?: string;
  minimumCycle?: number;
}

export function FundsModal({
  showBalance,
  accountBalance,
  isOpen,
  setIsOpen,
  OnFundExchangeSubmit,
  isLoading,
  texts: { header, headerSub, submit, inputPlaceHolder, inputLabel },
  successTexts: { header: successHeader, submitToButton },
  successModalSubmitTo,
  onlyAccountBalance,
  accountBalanceText,
  isAddFunds,
  minimumReq,
  minimumCycle,
}: Props) {
  const {
    account,
    chainProps: { tokenDecimals },
  } = useApi();
  const [amount, setAmount] = useState<number | string>('');
  const [fundRefAddress, setFundRefAddress] = useState<string | null | undefined>(null);
  const [error, setError] = useState<string | undefined>('');
  const [amountError, setAmountError] = useState('');
  const walletBalance = useBalance(account?.address);

  const handleSubmit = () => {
    OnFundExchangeSubmit({ amount: Number(amount), setFundRefAddress, setError });
  };

  const format = useCallback(
    (balance: BigNumber) => {
      const x = formatBalance(balance, {
        symbol: '',
        decimalPlaces: 5,
        tokenDecimals,
      });
      return Number(x);
    },
    [tokenDecimals]
  );

  const numberOfCycle = useMemo(() => {
    if (minimumCycle && minimumReq) {
      return Math.floor((Number(amount) * minimumCycle) / format(new BigNumber(minimumReq || '')));
    }
    return 0;
  }, [amount, format, minimumCycle, minimumReq]);

  useEffect(() => {
    if (isAddFunds)
      if (amount) {
        const minReq = format(new BigNumber(minimumReq || ''));
        const accountBalanceTemp = format(accountBalance || new BigNumber(0));

        if (+amount < minReq) {
          setAmountError('Amount is below the limit');
        } else if (+amount > accountBalanceTemp) {
          setAmountError('Amount exceeds your account balance');
        } else {
          setAmountError('');
        }
      } else {
        setAmountError('');
      }
  }, [amount, accountBalance, minimumReq]);

  return fundRefAddress === null ? (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      classNames={{ base: 'p-0 bg-transparent', dialog: 'z-[100]' }}
      isDarkTheme
    >
      <div className="max-w-full sm:w-full flex flex-col md:gap-6 gap-5 md:p-[32px] px-[24px] py-[18px] relative bg-gradient-to-b from-black to-black rounded-3xl shadow border border-[#1C1C1C] font-['Neue_Montreal'] h-fit">
        {isLoading ? (
          <div className="w-[80vw] max-w-[510px]">
            <Loader className="h-[320px]  flex text-white" />
          </div>
        ) : (
          <>
            <div className="flex-col justify-start items-start md:gap-2 gap-[6px] flex">
              <div className="self-stretch text-white md:text-2xl text-xl font-normal">
                {header}
              </div>
              <div className=" text-[#B2B3B8] text-sm font-normal leading-tight">{headerSub}</div>
            </div>
            <div className="p-4 flex flex-col gap-3 rounded-[10px] border border-[#1F1F1F] bg-[#060606]">
              {!onlyAccountBalance && (
                <div className="flex items-center gap-2">
                  <Identicon
                    className="h-[32px] w-[32px] rounded-full"
                    value={account?.address || ''}
                  />
                  <div className="text-white text-base font-medium leading-none">
                    {account?.meta.name}
                  </div>
                </div>
              )}
              <div className="flex flex-row">
                {showBalance && !onlyAccountBalance && (
                  <div className="flex-1 justify-start gap-1 flex flex-col">
                    <div className="text-[#808080] text-xs font-normal leading-none">
                      Wallet Balance
                    </div>
                    <div className=" text-white text-sm font-medium leading-[18.20px]">
                      {tokenDecimals &&
                        formatBalance(walletBalance, {
                          symbol: '$TANLOG',
                          decimalPlaces: 5,
                          tokenDecimals,
                        })}
                    </div>
                  </div>
                )}
                {accountBalance && (
                  <div className="flex-1 justify-start gap-1 flex flex-col">
                    <div className="text-[#808080] text-xs font-normal  leading-none">
                      {accountBalanceText || 'Account Balance'}
                    </div>
                    <div className=" text-white text-sm font-medium  leading-[18.20px]">
                      {tokenDecimals &&
                        formatBalance(accountBalance, {
                          symbol: '$TANLOG',
                          decimalPlaces: 5,
                          tokenDecimals,
                        })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="text-[#808080] text-xs font-normal leading-none mb-[6px] flex gap-1">
                {inputLabel}{' '}
                {isAddFunds && (
                  <ToolTip
                    message={'Add minimum amount of funds needed to be deposited'}
                    anchor="center-up"
                  >
                    <QuestionMarkCircleIcon className="h-[14px] w-[14px]" />
                  </ToolTip>
                )}
              </div>
              <Input
                className={classes(
                  'text-white !border-[#1F1F1F] !bg-[#060606]',
                  error && '!border-[#FF6666]'
                )}
                value={amount.toString()}
                onChange={(text) => {
                  if (Number(text) >= 0) {
                    const [number1, decimals1] = [...text].join('').split('.');
                    if (text.includes('.')) {
                      decimals1.length < 6 && setAmount(number1 + '.' + decimals1);
                    } else {
                      setAmount(text);
                    }
                  }
                }}
                placeholder={inputPlaceHolder}
                filter={/[^\d.]/g}
                isDarkTheme
                classNames={{
                  base: 'shadow-[transparent]',
                  input: classes('rounded-3xl'),
                }}
              >
                <div className="gap-2 flex items-center text-sm">
                  {!isAddFunds && <div className="font-normal">$TANLOG</div>}
                  <button
                    className={classes(
                      'text-[10px] px-2 mr-3 bg-white rounded-2xl flex-col justify-center items-center gap-2.5 inline-flex text-slate-950 font-normal uppercase',
                      isAddFunds && 'text-white bg-[#FFFFFF14] px-3 py-2 mr-2 font-medium text-xs'
                    )}
                    onClick={() =>
                      setAmount(
                        formatBalance(accountBalance, {
                          symbol: '',
                          decimalPlaces: 5,
                          tokenDecimals,
                        })
                      )
                    }
                  >
                    max
                  </button>
                </div>
              </Input>
              {isAddFunds && !!amountError && (
                <div className="flex flex-row gap-1 my-2 text-[#FF6666] text-xs leading-[20px] items-center">
                  <BrokenExclamation />
                  {amountError}
                </div>
              )}
              <div className="w-full md:mt-3 mt-2 h-4 justify-between gap-2 inline-flex items-center">
                <div className="flex items-center flex-row gap-[6px] text-[#B2B3B8]">
                  <div className="text-sm font-normal  capitalize leading-none">
                    {isAddFunds ? (
                      <div className="text-zinc-400 text-xs sm:mt-0 mt-8 font-normal leading-none flex justify-between w-full gap-2 sm:flex-row flex-col">
                        <div className="flex">
                          Limit:
                          <div className="text-white text-xs font-normal leading-none flex flex-row ml-1">
                            <FormatBalance
                              value={minimumReq || ''}
                              options={{ decimalPlaces: 5 }}
                            />
                            <span className="mx-1">-</span>
                            <FormatBalance
                              value={accountBalance || ''}
                              options={{ decimalPlaces: 5 }}
                            />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-zinc-400 text-xs font-normal leading-none flex justify-between w-full">
                        <div>maximum balance amount: </div>
                        <div className="justify-start ml-1 items-baseline gap-0.5 flex">
                          <FormatBalance
                            value={accountBalance || ''}
                            options={{ decimalPlaces: 5 }}
                            className="text-right text-white text-[10px] font-normal capitalize leading-3"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  {/* {!isAddFunds && <InformationIcon className="h-4 w-4 text-[#B2B3B8]" />} */}
                </div>
              </div>
            </div>

            {!!error && (
              <p className="text-[#F66] text-sm font-normal capitalize min-h-5">{error}</p>
            )}

            {!!amount && isAddFunds && !amountError && !error && (
              <div className="rounded-3xl flex items-center justify-between bg-[linear-gradient(271deg,_#8D74F729_3%,_#D285F729_45%,_#FFAD9729_95%)] px-5 py-3">
                <div className="flex items-center text-[#FFFFFFA3]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M9.69967 14.4466C12.5597 13.6933 14.6663 11.0933 14.6663 7.99992C14.6663 4.31992 11.7063 1.33325 7.99967 1.33325C3.55301 1.33325 1.33301 5.03992 1.33301 5.03992M1.33301 5.03992V1.99992M1.33301 5.03992H2.67301H4.29301"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.33301 8C1.33301 11.68 4.31967 14.6667 7.99967 14.6667"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-dasharray="3 3"
                    />
                  </svg>
                  <div className="ml-2 mr-1 md:text-sm text-xxs">Cycles Gained</div>

                  <ToolTip
                    message={`This amount funds ${numberOfCycle} cycles`}
                    anchor="center-down"
                    classNames={{ content: 'top-[35px]' }}
                  >
                    <QuestionMarkCircleIcon className="h-[13px] w-[13px]" />
                  </ToolTip>
                </div>
                <div className="md:text-sm text-xxs">{numberOfCycle} Cycles</div>
              </div>
            )}

            <Button
              variant="plain"
              className={classes(
                'md:min-w-[168px] min-w-[94px] m-auto md:h-12 h-11 px-5 pt-[7px] pb-[9px] bg-white rounded-[61px] border border-gray-800 justify-center items-center gap-2 inline-flex text-slate-950 text-base font-normal'
              )}
              onClick={handleSubmit}
              isDisabled={!!amountError || !Number(amount) || !!error}
            >
              {submit}
            </Button>
          </>
        )}
      </div>
    </Modal>
  ) : (
    <DeploySuccess
      submitTo={successModalSubmitTo as string}
      labels={{
        text: successHeader,
        button: submitToButton,
      }}
      // renderContent={
      //   (fundRefAddress as undefined) && (
      //     <div className="text-center">
      //       <Input
      //         className="w-full rounded bg-neutral-50"
      //         isCopyOnly
      //         isDarkTheme
      //         amount={fundRefAddress}
      //         classNames={{
      //           input: 'max-w-[285px] truncate text-[16px]',
      //         }}
      //       />
      //     </div>
      //   )
      // }
      isOpen
      isModal
      isDarkTheme
      setIsOpen={setIsOpen}
    />
  );
}
