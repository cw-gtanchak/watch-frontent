import { Dialog } from '@headlessui/react';
import React, { ReactNode, useCallback, useState } from 'react';
import { XMarkIcon } from './icons';
import { ClassNames, HTMLAttributes, VoidFn } from 'types';
import { classes } from 'utils';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

interface ModalState {
  isOpen: boolean;
  setIsOpen?: (_: boolean) => void;
  onOpen?: VoidFn;
  onClose?: VoidFn;
  onBack?: VoidFn;
}

interface Callbacks {
  onOpen?: VoidFn;
  onClose?: VoidFn;
}

export interface ModalProps extends HTMLAttributes<HTMLDivElement>, ModalState {
  classNames?: ClassNames<'content'>;
  isDarkTheme?: boolean;
  isHidden?: boolean;
  modalTitle: string | undefined;
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

export function BottomModal({
  children,
  modalTitle,
  className,
  classNames,
  isOpen,
  setIsOpen,
  isDarkTheme,
  isHidden,
  onBack,
}: ModalProps) {
  const onClose = useCallback(() => !!setIsOpen && setIsOpen(false), [setIsOpen]);

  return (
    <Dialog
      open={isOpen}
      onClose={!isDarkTheme ? onClose : () => {}}
      className={classes('relative z-50', isHidden && 'hidden')}
    >
      <div className="fixed inset-0 bg-[rgb(2,1,19)]/80 backdrop-blur-sm" aria-hidden="true" />

      <div className={classes('fixed inset-0 flex items-center justify-end p-0')}>
        <Dialog.Panel
          className={classes(
            'bg-black relative flex self-end rounded-t-2xl flex-col w-full',
            className
          )}
        >
          <div className="flex flex-row items-center justify-between py-5 px-4 rounded-t-2xl border border-solid border-t-[#141414] border-b-[#141414] ">
            {modalTitle === 'Switch Account' && (
              <button onClick={onBack}>
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </button>
            )}

            <div className="flex items-center w-full justify-center text-base self-center text-white">
              {modalTitle}
            </div>
            {!!setIsOpen && (
              <button className="text-white" onClick={onClose}>
                <XMarkIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <div
            className={classes(
              'flex h-full w-full flex-1 flex-col items-center justify-center p-4',
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
