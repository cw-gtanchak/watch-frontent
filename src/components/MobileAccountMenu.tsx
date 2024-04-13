import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Identicon } from './Identicon';
import { getOS, pathTo, truncate } from 'utils';
import { CopyButton } from './CopyButton';
import { useApi } from 'contexts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowRightIcon } from './icons';
import { CustomExcalmationMark, DisconnectMobileIcon } from './svg';
import { BottomModal } from './BottomModal';
import { InjectedAccountWithMeta, Setter } from 'types';
import { Button } from './Button';
import { Loader } from './Loader';
import { useBalance, useDidOnboarding } from 'hooks';
import MobileAccountOption from './MobileAccountOption';
import { FormatBalance } from './FormatBalance';

interface Props {
  isOpen: boolean;
  setIsOpen: Setter<boolean>;
}

const os = getOS();

const wallets = [
  {
    name: 'Subwallet',
    component: 'SubWallet',
    description:
      'SubWallet is the comprehensive non-custodial wallet solution for Polkadot, Substrate & Ethereum ecosystems.',
    link:
      os === 'Android'
        ? 'https://play.google.com/store/apps/details?id=app.subwallet.mobile&pcampaignid=web_share'
        : os === 'iOS'
        ? 'https://apps.apple.com/us/app/subwallet-polkadot-wallet/id1633050285'
        : '',
  },
  {
    name: 'Polkawallet',
    component: 'PolkaWallet',
    description: 'Polkawallet is the most complete crypto wallet of Polkadot and Kusama network.',
    link:
      os === 'Android'
        ? 'https://play.google.com/store/apps/details?id=io.polkawallet.www.polka_wallet&hl=en&gl=US'
        : os === 'iOS'
        ? 'https://apps.apple.com/tr/app/polkawallet/id1520301768'
        : '',
  },
  {
    name: 'Nova',
    component: 'NovaWallet',
    description: 'Nova Wallet is next gen application for Polkadot and Kusama ecosystem.',
    link:
      os === 'Android'
        ? 'https://play.google.com/store/apps/details?id=io.novafoundation.nova.market&pcampaignid=web_share'
        : os === 'iOS'
        ? 'https://apps.apple.com/us/app/nova-polkadot-kusama-wallet/id1597119355'
        : '',
  },
];

function MobileAccountMenu({ isOpen, setIsOpen }: Props) {
  const { account, accountOptions, onDisconnect, isConnecting, onConnect, onConfirm } = useApi();

  const balance = useBalance(account?.address);

  const [subPage, setSubPage] = useState<'SwitchAccount' | 'DisconnectAccount' | ''>('');
  const [didOnboarding] = useDidOnboarding();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!isOpen) {
      setSubPage('');
    }
  }, [isOpen]);

  const redirect = useMemo(() => searchParams.get('redirect'), [searchParams]);

  const onSubmit = useCallback(
    (selected: InjectedAccountWithMeta) => {
      onConfirm(selected, (account) => {
        setIsOpen(false);

        if (!didOnboarding[account.address]) {
          navigate({
            pathname: pathTo('Onboarding'),
            search: redirect ? `?redirect=${redirect}` : undefined,
          });
        } else {
          redirect && navigate(redirect);
        }
      });
    },
    [didOnboarding, navigate, onConfirm, redirect, setIsOpen]
  );

  const [title, content] = useMemo(() => {
    if (isConnecting) {
      return [
        '',
        <div className="text-center text-base text-white">
          <Loader className="flex h-[190px] items-center text-white" />
          Loading...
        </div>,
      ];
    }

    if (!(accountOptions?.length || 0) && !account) {
      return [
        'Connect a Wallet',
        <div className="text-white w-full">
          <div className="text-2xl leading-8 mb-2">Connect to Mobile Wallet</div>
          <div className="text-[#B2B3B8]">
            To connect Analog Watch from your mobile device, you must first connect to one of the
            mobile wallets below. Be sure to store your seed phrase/private keys securely. Never
            share them with anyone.
          </div>
          <div className="flex flex-row gap-3 justify-center items-center mt-4">
            {wallets.map(({ component, name, link }) => (
              <div
                className="bg-[#141414] p-4  items-center w-[104px] rounded-2xl flex flex-col"
                onClick={() => window.open(link)}
              >
                <img src={`${component}.svg`} />
                <div className="text-xs text-[#B2B3B8] mt-3">{name}</div>
              </div>
            ))}
          </div>
        </div>,
      ];
    }

    if (!account) {
      return ['Connect Account', <MobileAccountOption onSubmit={onSubmit} />];
    }
    let Component = (
      <div className="w-full bg-[#141414] mt-4 h-[125px] rounded-2xl">
        <div className="p-4 flex flex-row justify-between">
          <div className="flex items-center">
            <Identicon value={account?.address || ''} className="text-white h-9 w-9 " />
            <div className="ml-3">
              <div className="text-white">{account?.meta.name}</div>
              <div className="text-xs text-neutral-400 flex justify-center items-center ">
                {truncate(account?.address)}
                <CopyButton value={account?.address} className="text-white" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-center ">
            <div className="text-xs text-[#FFFFFF99]">Wallet Balance</div>
            <FormatBalance value={balance || ''} className="text-sm text-white" />
          </div>
        </div>
        <div className="h-[1px] mx-4 bg-[#FFFFFF1F]" />
        <div className="flex flex-row w-full text-white">
          <div className="flex flex-row justify-between w-full text-sm p-4">
            <button
              className="flex items-center gap-1"
              onClick={() => {
                setSubPage('SwitchAccount');
                !accountOptions?.length && onConnect();
              }}
            >
              Switch Account
              <ArrowRightIcon className="h-[14px] w-[14px]" />
            </button>
            <button
              className="flex items-center gap-1"
              onClick={() => setSubPage('DisconnectAccount')}
            >
              <DisconnectMobileIcon className="h-[14px] w-[14px]" />
              Disconnect
            </button>
          </div>
        </div>
      </div>
    );

    if (subPage === 'DisconnectAccount') {
      Component = (
        <div className=" flex flex-col  items-center text-center text-white gap-4">
          <CustomExcalmationMark />
          <div className="mx-4 text-base text-[#FFFFFF99]">
            Are you sure you want to disconnect this wallet?
          </div>
          <div className="flex my-6 gap-4">
            <Button
              variant="plain"
              className="border border-solid border-white px-5 rounded-full"
              onClick={() => {
                onDisconnect();
                setIsOpen && setIsOpen(false);
              }}
            >
              Disconnect
            </Button>
            <Button
              variant="plain"
              className="border border-solid bg-white text-black border-white px-5 rounded-full"
              onClick={() => {
                setIsOpen && setIsOpen(false);
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
      return ['Disconnect Wallet', Component];
    }

    if (subPage === 'SwitchAccount') {
      Component = (
        <div className="w-full !font-['Neue_Montreal']">
          {isConnecting ? (
            <div className="text-center text-base text-white">
              <Loader className="flex h-[190px] items-center text-white" />
              Loading...
            </div>
          ) : (
            <MobileAccountOption onSubmit={onSubmit} isSwitchAccount />
          )}
        </div>
      );
      return ['Switch Account', Component];
    }
    return ['Account Settings', Component];
  }, [subPage, account, accountOptions, isConnecting]);

  return (
    <BottomModal
      isOpen={isOpen}
      isDarkTheme
      setIsOpen={setIsOpen}
      className="w-full self-end !font-['Neue_Montreal']"
      modalTitle={title}
      onBack={() => setSubPage('')}
    >
      {content}
    </BottomModal>
  );
}

export default MobileAccountMenu;
