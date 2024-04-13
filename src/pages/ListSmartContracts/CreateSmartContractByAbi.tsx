import { useState } from 'react';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useListSmartContract } from './useListSmartContracts';
import { Button, Input } from 'components';
import { classes } from 'utils';
import { useApi } from 'contexts';

type CreateSmartContractByAbiProps = {
  handleSelectedTab: (tabIndex: number) => void;
};

export function CreateSmartContractByAbi({ handleSelectedTab }: CreateSmartContractByAbiProps) {
  const {
    dryRunContract,
    smartContractAddress,
    smartContractIdentifier,
    smartContractInstance: selectedInstance,
    selectedChain,
    abiContent,
    setAbiContent,
  } = useListSmartContract();
  const { sessionKey } = useApi();
  const isError = false; //TODO:remove while implementing functionality
  return (
    <>
      <div className="flex justify-between ">
        <p className="text-2xl">{"We couldn't find the smart contract"}</p>
      </div>
      <p className="text-sm mt-2 text-[#B2B3B8]">
        To proceed, please provide the ABI for the contract or double-check the address.
      </p>
      <div className="mt-6 flex flex-col relative">
        <Input
          className={classes(
            'relative px-1.5 py-1.5 resize-none bg-black bg-gradient-to-r from-transparent via-transparent to-transparent rounded-2xl shadow-none',
            isError && 'bg-[#ff5c5c14]'
          )}
          isDarkTheme
          type="textarea"
          placeholder="Paste the ABI here"
          classNames={{ input: 'dark resize-none h-60 text-[#ffffff7a] scrollbar-white' }}
          value={abiContent}
          onChange={setAbiContent}
          isError={isError}
        />
      </div>
      {isError && (
        <>
          <p className="text-[#ffffff99] mt-3 text-sm">
            {"We couldn't locate the requested smart contract."}
          </p>
          <p className="mt-2 text-[#ffffff99] text-sm">
            Please refer to our&nbsp;
            <a
              href="https://www.analog.one/contact-us"
              target="_blank"
              className="text-[#B15EBE]"
              rel="noreferrer"
            >
              documentation
            </a>
            &nbsp; for guidance on listing smart contracts or reach out to our support team for
            assistance.
          </p>
        </>
      )}
      <p className="flex items-center mt-3 text-sm">
        <QuestionMarkCircleIcon className="w-[18px] h-[18px] mr-1" />
        <span className="text-[#b2b3b87a]">Need help?&nbsp;</span>
        <a
          href="https://www.analog.one/contact-us"
          target="_blank"
          className="text-[#B15EBE]"
          rel="noreferrer"
        >
          Here
        </a>
        &nbsp;
        <span className="text-[#b2b3b87a]"> are a few tips for listing a Smart Contract.</span>
      </p>
      <div className="w-full flex gap-4">
        <Button
          className={classes('px-5 rounded-full h-12 mx-auto block mt-6 w-full border')}
          variant="plain"
          onClick={() => handleSelectedTab(0)}
        >
          <span className="text-base text-white">Cancel</span>
        </Button>
        <Button
          className={classes(
            'px-5 rounded-full h-12 mx-auto block mt-6 w-full',
            abiContent && !isError ? 'bg-white' : 'bg-[#7a7a7a]'
          )}
          isDisabled={!abiContent && !isError}
          variant="plain"
          onClick={() => {
            dryRunContract({
              variables: {
                data: {
                  address: smartContractAddress,
                  chain: selectedInstance?.value || 'mainnet',
                  identifier: smartContractIdentifier,
                  network: selectedChain?.slug as string,
                  abi: abiContent,
                },
                sessionKey: sessionKey as string,
              },
            });
          }}
        >
          <span className="text-base text-black">Next</span>
        </Button>
      </div>
    </>
  );
}
