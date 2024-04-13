import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useCallback, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useCookies } from 'react-cookie';
import { Modal } from './Modal';
import { Identicon } from './Identicon';
import { Loader } from './Loader';
import { CustomExcalmationMark, MagicPen } from './svg';
import { Button } from './Button';
import { classes, pathTo } from 'utils';
import { HTMLAttributes, Setter } from 'types';
import { useApi } from 'contexts';
import { useDidOnboarding } from 'hooks';

interface Props extends HTMLAttributes<HTMLDivElement> {
  options?: InjectedAccountWithMeta[] | null;
  walletOption?: InjectedAccountWithMeta[] | null;
  selected: InjectedAccountWithMeta | null;
  setSelected: Setter<InjectedAccountWithMeta | null>;
  renderConnectAccount: boolean;
  showRefresh: boolean;
}

function hasOptions(
  options: InjectedAccountWithMeta[] | undefined | null
): options is InjectedAccountWithMeta[] {
  return options ? options.length > 0 : false;
}

const desktopWallet = [
  {
    name: 'Polkadot',
    value: 'polkadot-js',
    img: '/polkadot.js.svg',
  },
  {
    name: 'SubWallet',
    value: 'subwallet-js',
    img: '/subwallet.svg',
  },
  {
    name: 'Enkrypt',
    value: 'enkrypt',
    img: '/enkrypt.svg',
  },
  {
    name: 'Talisman',
    value: 'talisman',
    img: '/talisman.svg',
  },
];

export function ConnectAccount({
  options,
  selected,
  setSelected,
  renderConnectAccount,
  walletOption,
  showRefresh,
}: Props) {
  const {
    isConnecting,
    onConnect,
    onConfirm,
    selectedWallet,
    setSelectedWallet,
    setShowRefresh,
    account,
    isConfirming,
    setIsConfirming,
    setIsConnecting,
  } = useApi();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const doesHaveOptions = hasOptions(options);
  const [didOnboarding] = useDidOnboarding();
  const [isOpen, redirect] = useMemo(
    () => [searchParams.get('connect') !== null, searchParams.get('redirect')],
    [searchParams]
  );
  const [cookies] = useCookies(['didOnboarding']);

  const setIsOpen = useCallback(
    (isOpen: boolean) => {
      if (isOpen) {
        searchParams.set('connect', '');
      } else {
        searchParams.delete('connect');
        searchParams.delete('redirect');
      }
      setSearchParams(searchParams);
      setShowRefresh(false);
      setIsConfirming(false);
      setSelectedWallet('');
    },
    [searchParams, setSearchParams]
  );

  const onSubmit = useCallback(
    (selected: InjectedAccountWithMeta) => {
      onConfirm(selected, (account) => {
        setIsOpen(false);
        if (!cookies?.didOnboarding || !cookies?.didOnboarding[account.address]) {
          navigate({
            pathname: pathTo('Onboarding'),
            search: redirect ? `?redirect=${redirect}` : undefined,
          });
        } else {
          redirect && navigate(redirect);
        }
      });
    },
    [didOnboarding, navigate, onConfirm, redirect, selected, setIsOpen]
  );

  return (
    <Modal
      isOpen={searchParams.get('connect') !== null || renderConnectAccount}
      setIsOpen={setIsOpen}
      className={classes('w-[450px] max-h-[90%] overflow-auto z-50', isConnecting && 'p-0')}
      isDarkTheme
      isConnectWallet
      classNames={{
        dialog: 'z-[99]',
        // close: classes(isConnecting && 'top-[35px] right-[32px] bg-transparent h-4 w-4'),
      }}
    >
      {showRefresh ? (
        <div className="flex flex-col items-center justify-center text-center p-6">
          <CustomExcalmationMark />
          <span className="text-2xl mt-[31px] mb-5">Something went wrong</span>
          <Button
            className="p-[12px_24px] flex rounded-full h-[46px]"
            variant="plain"
            style={{
              background:
                'linear-gradient(0deg, #FFF 0%, #FFF 100%), linear-gradient(95deg, #5D3EF8 -12.23%, #BA4CD6 117.24%)',
            }}
            onClick={() => {
              window.location?.reload();
            }}
          >
            <span className="text-[#010314] text-base leading-[22px]">Refresh</span>
          </Button>
        </div>
      ) : (
        <div className="w-full !font-['Neue_Montreal']">
          {!selectedWallet && !isConnecting && (
            <div className="flex justify-between ">
              <p className="text-2xl">Connect a Wallet</p>
            </div>
          )}
          {selectedWallet && (
            <div
              className={classes(
                'flex flex-row items-center gap-[6px]',
                isConnecting && 'px-[32px] pt-[26px]'
              )}
            >
              <ChevronLeftIcon
                width={24}
                height={24}
                className="text-white cursor-pointer"
                onClick={() => {
                  if (!isConfirming && selectedWallet) setSelectedWallet('');
                  setIsConfirming(false);
                  setIsConnecting(false);
                }}
              />
              <p className="text-white text-2xl font-normal leading-8">Connect Account</p>
            </div>
          )}
          {!selectedWallet && !isConnecting && (
            <p className="text-sm mt-2 text-[#B2B3B8]">
              Select the subtrate based account you want to connect.
            </p>
          )}
          {isConnecting || isConfirming ? (
            <div className={'text-center text-base'}>
              <div className="py-14 px-8">
                <Loader className="flex  items-center text-white mb-4" />
                <div className="text-center text-white text-base font-normal leading-relaxed">
                  Loading...
                </div>
              </div>
              {isConnecting && (
                <div className="border-t border-stone-900 text-sm text-[#B2B1B8] leading-[normal] p-8 flex gap-3 items-center justify-start">
                  <div className="w-10 h-10 p-2.5 bg-white bg-opacity-10 rounded-md justify-start items-start ">
                    <MagicPen />
                  </div>
                  <div className=" text-zinc-400 text-sm font-normal font-['Neue Montreal'] leading-tight text-left">
                    Please check your wallet browser extension to ensure you've finished the
                    relevant steps to connect your wallet.
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-full mt-6 flex-1 overflow-y-auto">
              {selectedWallet ? (
                <div className="max-h-96 overflow-auto no-scrollbar">
                  {walletOption?.length ? (
                    walletOption?.map((option) => {
                      const { address, meta } = option;
                      return (
                        <button
                          key={address}
                          className={classes(
                            ' mb-2 flex max-w-full items-center overflow-hidden text-ellipsis px-4 py-2 rounded-2xl border border-[#ffffff1f] hover:bg-[#ffffff0d] hover:border-[#ffffff0d] last:mb-0',
                            account?.address === address && 'bg-[#ffffff0d] cursor-not-allowed'
                          )}
                          onClick={() => onSubmit(option)}
                          disabled={account?.address === address}
                        >
                          <Identicon className="mr-3 h-8 w-8" value={address} />
                          <div className="flex-1 overflow-hidden">
                            <div className="text-lg font-medium">{meta.name}</div>
                            <div className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-neutral-500">
                              {address}
                            </div>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <CustomExcalmationMark />
                      <span className="text-2xl mt-[31px]">
                        {"You don't have any account for this wallet"}
                      </span>
                      <span className="text-[#999999] mt-3">
                        Try another wallet or install the browser extension to connect.
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {desktopWallet.map(({ value, img, name }) => {
                    return (
                      <button
                        key={value}
                        className={classes(
                          ' mb-2 flex max-w-full items-center overflow-hidden text-ellipsis px-4 py-2 rounded-2xl border border-[#ffffff1f] hover:bg-[#ffffff0d] hover:border-[#ffffff0d] h-[88px] w-[496px] gap-4 last:mb-0'
                        )}
                        onClick={() => {
                          setSelectedWallet(value);
                          onConnect(null, value);
                        }}
                      >
                        <img src={img} alt={value} width={56} height={56} className="rounded-lg" />
                        <span>{name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
