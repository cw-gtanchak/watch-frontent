import { Link } from 'react-router-dom';
import { Button, Buttons } from './Button';
import { Identicon } from './Identicon';
import { Modal, ModalProps as Props } from './Modal';
import { useApi } from 'contexts';
import { classes, pathTo } from 'utils';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { CustomExcalmationMark } from './svg';
import { useEffect } from 'react';

export function DisconnectModal({ isOpen, setIsOpen, className, isDarkTheme }: Props) {
  const { account, onDisconnect } = useApi();

  if (!account) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className={classes('max-w-md', className)}
      isConnectWallet
      isDarkTheme={isDarkTheme}
    >
      {isDarkTheme ? (
        <>
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
        </>
      ) : (
        <>
          <div className="mb-3 text-center">
            <h5>Are you sure you want to disconnect this account?</h5>
            <div className="mt-2 text-sm text-neutral-500">
              If you choose to disconnect, you’ll lose the platform’s functionality.
            </div>
          </div>
          <div className="card mb-5 flex w-full items-center p-3">
            <Identicon value={account.address} className="mr-2 h-6 w-6" />
            <div className="text-sm font-bold uppercase">{account.meta.name}</div>
          </div>
          <Buttons className="w-full flex">
            <Link to={pathTo('Landing')} className="w-full">
              <Button
                onClick={() => {
                  onDisconnect();
                  setIsOpen && setIsOpen(false);
                }}
                className="w-full"
              >
                Yes
              </Button>
            </Link>
            <Button
              variant="primary"
              onClick={() => {
                setIsOpen && setIsOpen(false);
              }}
            >
              Cancel
            </Button>
          </Buttons>
        </>
      )}
    </Modal>
  );
}
