import React from 'react';
import { Modal } from './Modal';

interface props {
  isOpen: boolean;
  setIsOpen?: (_: boolean) => void;
}

const supportedWallets = ['Polkadot.JS', 'SubWallet', 'Enkrypt', 'Talisman'];

export function ConnectAccountPrompt({ isOpen, setIsOpen }: props) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="bg-gradient-to-b from-[#EBEBFF] to-[#FFF] p-[30px]"
    >
      <div>
        <div className="text-lg text-center uppercase leading-6 text-black font-bold">
          Connect wallet
        </div>
        <div className="mt-2 font-normal mb-4">Please connect your wallet to proceed.</div>
        {supportedWallets.map((wallet) => {
          return (
            <div className="flex flex-row w-[390px] h-[45px] bg-white border-[#ECEDEE] border p-[10px] mb-2">
              <img src={`/${wallet.toLowerCase()}.svg`} className="w-6 h-6" />
              <span className="ml-2">{wallet}</span>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}
