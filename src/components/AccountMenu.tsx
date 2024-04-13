import { useEffect, useState } from 'react';
import { Popover } from '@headlessui/react';
import { ArrowRightIcon, ChevronDownIcon, EllipsisVerticalIcon } from './icons';
import { useModalState } from './Modal';
import { DisconnectModal } from './DisconnectModal';
import { Balance } from './Balance';
import { Avatar, DisconnectIcon } from './svg';
import { Input } from './Input';
import { Identicon } from './Identicon';
import { classes, getOS, isMobileOS, pathTo, truncate } from 'utils';
import { useApi } from 'contexts';
import { useWindowSize } from 'hooks';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { CopyButton } from './CopyButton';
import { Link } from 'react-router-dom';
import { Skeleton } from './Skeleton';

export function AccountMenu() {
  const { account } = useApi();
  const disconnectModal = useModalState();
  const [clicked, setClicked] = useState(false);
  const { windowSize } = useWindowSize();

  if (!account) {
    return null;
  }

  useEffect(() => {
    setClicked(false);
  }, [disconnectModal.isOpen]);

  return (
    <>
      <Popover className="relative flex lg:w-fit w-full lg:flex-col flex-col-reverse lg:gap-0 gap-3">
        {({ open }) => {
          useEffect(() => {
            if (!open) {
              setClicked(false);
            }
          }, [open]);
          return (
            <>
              <Popover.Button
                disabled={isMobileOS()}
                className="lg:bg-var-transparent bg-black flex w-full items-center  lg:rounded-[40px] px-2 py-1.5 lg:hover:bg-neutral-800 lg:focus:bg-neutral-800 border border-[#2A2B3A] rounded-[40px]"
              >
                <Identicon value={account.address} className="mr-2 h-6 w-6" />
                <div className="flex-1 pr-3">
                  <div className="text-xs font-medium uppercase text-white ">
                    {account.meta?.name}
                  </div>
                  <div className="text-xs text-neutral-400">{truncate(account.address)}</div>
                </div>
                <ChevronDownIcon
                  className={classes(
                    'w-5 h-5 text-white mr-2 transition-transform',
                    open && 'rotate-180 transform'
                  )}
                />
                <Link className="border-l border-[#ffffff33] pl-2" to={pathTo('MyProfile')}>
                  <Avatar />
                </Link>
              </Popover.Button>
              <Popover.Panel className="lg:absolute relative lg:top-[64px] lg:right-[35px] z-10 lg:w-[320px] w-full bg-black p-4 shadow-lg lg:border-none border border-[rgb(42,43,58)] rounded-[20px]">
                {!isMobileOS() && (
                  <>
                    <div className="h-4 w-4 bg-black border border-[#2A2B3A] rounded  border-b-0 border-l-0 absolute right-6 -rotate-45 top-[-8px]  flex"></div>
                    <div className="flex flex-col gap-4 ">
                      <div className=" flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full flex items-center justify-center ">
                          <Identicon value={account.address} className=" h-6 w-6" />
                        </div>
                        <div className="flex justify-between items-center flex-1 relative">
                          <div className="flex flex-col gap-1 text-white">
                            <h4 className=" m-0 text-base">{account.meta?.name}</h4>
                            <Link className="m-0 text-sm flex gap-1 items-center" to={'?connect'}>
                              Switch account <ArrowRightIcon className="h-[14px] w-[14px]" />
                            </Link>
                          </div>
                          <div
                            className="text-white cursor-pointer"
                            onClick={() => setClicked((prev) => !prev)}
                          >
                            <EllipsisVerticalIcon className="h-5 w-5" />
                          </div>
                          {clicked && (
                            <div
                              onClick={() => disconnectModal.setIsOpen(true)}
                              className="absolute bottom-[-40px] right-0 border bg-[#010101] z-10 border-[#141414] p-3 rounded-[36px] text-[#FF7070] text-xs cursor-pointer"
                            >
                              Disconnect
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="lg:text-xxs text-xs text-neutral-500 mb-1">
                          Wallet Address
                        </div>
                        <div className="text-sm bg-transaprent lg:rounded-none rounded-[25px]">
                          <Input
                            classNames={{
                              input: 'px-2 py-2 text-[#FFFFFF99]',
                              copyBtn: ' text-white',
                            }}
                            className="lg:border-[#141414] border-[#2A2B3A] rounded-[22px] text-[#FFFFFF99]"
                            isCopyOnly
                            value={
                              windowSize.width <= 768 ? truncate(account.address) : account.address
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <div className="lg:text-xxs text-xs text-neutral-500 mb-1">
                          Wallet Balance
                        </div>
                        <div className="text-sm font-medium text-white">
                          <Balance
                            address={account.address}
                            options={{ decimalPlaces: 5 }}
                            skProps={{ className: 'w-1/2', isDarkTheme: true }}
                          />
                        </div>
                      </div>
                      <div className="h-[1px] w-full hidden bg-neutral-200 " />
                      <button
                        className=" items-center hidden bg-transparent text-sm text-red-500 "
                        onClick={() => disconnectModal.setIsOpen(true)}
                      >
                        <DisconnectIcon className="mr-1 relative -t-2" />
                        Disconnect
                      </button>
                    </div>
                  </>
                )}
              </Popover.Panel>
            </>
          );
        }}
      </Popover>
      <DisconnectModal isDarkTheme {...disconnectModal} className="bg-black rounded-3xl" />
    </>
  );
}
