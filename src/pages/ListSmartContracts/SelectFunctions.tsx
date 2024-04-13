import { useEffect, useState } from 'react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { useSearchParams } from 'react-router-dom';
import { CreateSmartContractByAbi } from './CreateSmartContractByAbi';
import { useListSmartContract } from './useListSmartContracts';
import { Button, CheckBox, Input, Loader, MagnifyingGlassIcon } from 'components';
import { classes, removeIdentifier } from 'utils';
import { useApi } from 'contexts';

type SelectFunctionsProps = {
  handleSelectedTab: (tabIndex: number) => void;
};

function SelectFunctions({ handleSelectedTab }: SelectFunctionsProps) {
  const [searchString, setSearchString] = useState('');
  const [selectedFunctionsSpecs, setSelectedFunctionsSpecs] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const { account } = useApi();
  const {
    isDryRunContractLoading,
    isMergeContractLoading,
    functionOptions,
    isDryRunContractError,
    listSmartContract,
    mergeContractResult,
    isMergeContractError,
    smartContractIdentifier,
  } = useListSmartContract();

  const isLoading = isDryRunContractLoading || isMergeContractLoading;

  useEffect(() => {
    if (mergeContractResult && !isMergeContractError) {
      handleSelectedTab(2);
    } else if (isMergeContractError) {
      handleSelectedTab(0);
    }
  }, [isMergeContractError, mergeContractResult]);

  const handleClick = (functionHashId: string) => {
    if (selectedFunctionsSpecs.includes(functionHashId)) {
      setSelectedFunctionsSpecs((prev) => prev.filter((item) => item !== functionHashId));
    } else {
      setSelectedFunctionsSpecs((prev) => [...prev, functionHashId]);
    }
  };

  const handleListSmartContract = () => {
    if (account) {
      listSmartContract(selectedFunctionsSpecs);
    } else {
      searchParams.set('connect', 'true');
      setSearchParams(searchParams);
    }
  };

  if (isLoading) {
    return <Loader className="h-[320px] flex text-white" />;
  }

  if (!isLoading && isDryRunContractError) {
    return <CreateSmartContractByAbi handleSelectedTab={handleSelectedTab} />;
  }

  return (
    <>
      <div className="flex justify-between ">
        <p className="text-2xl w-full whitespace-pre-line text-ellipsis break-all">
          Smart Contract: {smartContractIdentifier}
        </p>
      </div>
      <p className="text-sm mt-2 text-[#B2B3B8]">Please select the functions</p>
      <div className="mt-6 flex flex-col relative">
        <Input
          className="relative px-5"
          classNames={{ input: 'dark' }}
          isDarkTheme
          isClearable
          placeholder="Search"
          value={searchString}
          onChange={setSearchString}
        >
          <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-neutral-400" />
        </Input>
      </div>
      <div className="mt-4 text-[#808080] text-xs flex flex-row justify-between">
        <div>
          {selectedFunctionsSpecs.length === 0
            ? 'No selected function'
            : `${selectedFunctionsSpecs.length} selected functions`}
        </div>
        <button className="text-white cursor-pointer" onClick={() => setSelectedFunctionsSpecs([])}>
          Clear
        </button>
      </div>
      <ul className="flex gap-4 flex-col w-[100%] max-h-[266px] !mt-2 overflow-auto scrollbar-white">
        {(searchString
          ? functionOptions?.filter((fnOption) =>
              fnOption?.name.toLowerCase().match(searchString.toLowerCase())
            )
          : functionOptions
        )?.map((functionOption) => {
          const isActive = selectedFunctionsSpecs.includes(
            removeIdentifier(functionOption?.identifier, smartContractIdentifier) as string
          );
          const name = removeIdentifier(functionOption?.identifier, smartContractIdentifier);

          return (
            <li className="w-full" key={`collection-${functionOption?.identifier}`}>
              <button
                className={classes(
                  'flex items-center py-1 px-4 text-sm relative w-full rounded-2xl border border-[#ffffff1f] hover:bg-[#ffffff0d] hover:border-[#ffffff0d] flex-row-reverse ',
                  isActive && 'bg-[#ffffff0d] border-[#ffffff0d]'
                )}
                onContextMenu={() => handleClick(name)}
                onClick={() => handleClick(name)}
              >
                <div className="w-full flex gap-2 items-center">
                  <Cog6ToothIcon className="h-6 w-6 shrink-0" color="grey" />
                  <div className="flex-1 my-1 break-words" style={{ wordBreak: 'break-word' }}>
                    {name}(
                    {(functionOption?.inputs as { value: string }[])
                      .map(({ value }) => value)
                      .join(', ')}
                    )
                    <p className="text-[#ffffff80] text-xs">
                      (
                      {(functionOption?.outputs as { name: string; value: string }[])
                        .map(({ name, value }) => `${name}:${value}`)
                        .join(', ')}
                      )
                    </p>
                  </div>
                </div>
                <div className="w-8 ml-2">
                  <CheckBox isChecked={isActive} isDarkTheme />
                </div>
              </button>
            </li>
          );
        })}
      </ul>
      <Button
        className={classes(
          'px-5 rounded-full h-12 mx-auto block mt-6 w-32',
          selectedFunctionsSpecs.length > 0 ? 'bg-white' : 'bg-[#7a7a7a]'
        )}
        variant="plain"
        onClick={handleListSmartContract}
        isDisabled={selectedFunctionsSpecs.length === 0}
      >
        <span className="text-base text-black">List</span>
      </Button>
    </>
  );
}

export default SelectFunctions;
