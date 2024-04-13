import { Dialog } from '@headlessui/react';
import { useCallback, useState } from 'react';
import { XMarkIcon } from './icons';
import { ClassNames, HTMLAttributes, VoidFn } from 'types';
import { classes } from 'utils';

interface ModalState {
  isOpen: boolean;
  setIsOpen?: (_: boolean) => void;
  onOpen?: VoidFn;
  onClose?: VoidFn;
}

interface Callbacks {
  onOpen?: VoidFn;
  onClose?: VoidFn;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement>, ModalState {
  classNames?: ClassNames<'content' | 'close' | 'dialog' | 'baseWrapper'>;
  isDarkTheme?: boolean;
  isHidden?: boolean;
  isConnectWallet?: boolean;
}

export function useModalState(initial = false, { onOpen, onClose }: Callbacks = {}) {
  const [isOpen, _setIsOpen] = useState(initial);

  const setIsOpen = useCallback(
    (newValue: boolean) => {
      _setIsOpen(newValue);
      if (!newValue) {
        onClose && onClose();
      } else {
        onOpen && onOpen();
      }
    },
    [onClose, onOpen]
  );

  return { isOpen, setIsOpen };
}

export function Modal({
  children,
  className,
  classNames,
  isOpen,
  setIsOpen,
  isDarkTheme,
  isHidden,
  isConnectWallet,
}: ModalProps) {
  const onClose = useCallback(() => !!setIsOpen && setIsOpen(false), [setIsOpen]);

  window.onhashchange = function () {
    setIsOpen && setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onClose={!isDarkTheme ? onClose : () => {}}
      className={classes('relative z-50', isHidden && 'hidden', classNames?.dialog)}
    >
      <div className="fixed inset-0 bg-[rgb(2,1,19)]/80 backdrop-blur-sm" aria-hidden="true" />

      <div
        className={classes(
          'fixed inset-0 flex items-center justify-center p-4 scrollbar-white',
          classNames?.baseWrapper
        )}
      >
        <Dialog.Panel
          className={classes(
            'relative mx-auto flex max-w-xl flex-col bg-neutral-100 p-6',
            isDarkTheme &&
              'bg-black border rounded-3xl text-white border-white border-opacity-5 shadow-[0px_4px_6px_0px_rgba(255,255,255,0.05)] w-full',
            isConnectWallet && 'overflow-y-visible !overflow-visible',
            classNames?.base,
            className
          )}
        >
          {!!setIsOpen && (
            <button
              className={classes(
                'absolute -top-8 right-0 flex h-6 w-6 items-center justify-center rounded-xl bg-gray-600/50 text-neutral-400 hover:bg-gray-500/50',
                isDarkTheme && '-top-12 right-0 text-white bg-[#1C191C] w-8 h-8 rounded-full',
                isConnectWallet && '-top-11 right-0 bg-[#1C1C1C]',
                classNames?.close
              )}
              onClick={onClose}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          <div
            className={classes(
              'flex h-full w-full flex-1 flex-col items-center justify-center',
              classNames?.content
            )}
          >
            {children}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
