import ListNewSmartContract from './ListNewSmartContract';
import SelectFunctions from './SelectFunctions';
import { useListSmartContract } from './useListSmartContracts';
import { DeploySuccess } from 'components/DeploySuccess';
import { ChevronLeftIcon, Modal } from 'components';
import { useTabs } from 'hooks';
import { classes, pathTo } from 'utils';

export function ListSmartContracts() {
  const {
    isConnect,
    isListSmartContract,
    setIsListSmartContract,
    smartContractAddress,
    isMergeContractError,
  } = useListSmartContract();

  const { selectedTab, setSelectedTab, tabs } = useTabs(
    [
      {
        child: <ListNewSmartContract onNext={() => handleSelectedTab(1)} />,
        label: 'List New Smart Contract',
        value: 'listNewSmartContract',
      },
      {
        child: <SelectFunctions handleSelectedTab={handleSelectedTab} />,
        label: 'Select Functions',
        value: 'selectFunctions',
      },
      {
        child: (
          <DeploySuccess
            submitTo={pathTo('SmartContract', smartContractAddress)}
            labels={{
              text: 'Your newly added Smart Contract is successfully listed!',
              button: 'See Smart Contract',
            }}
            isOpen
            isModal={false}
            isDarkTheme
          />
        ),
        label: 'Success',
        value: 'success',
        disabled: !!isMergeContractError,
      },
    ],
    0
  );
  function handleSelectedTab(tabIndex: number) {
    setSelectedTab(tabIndex);
  }

  if (!isListSmartContract) {
    return <></>;
  }
  return (
    <Modal
      className="p-0 max-w-[560px]"
      setIsOpen={() => setIsListSmartContract()}
      isOpen
      isDarkTheme
      isHidden={isConnect !== null}
      classNames={{
        dialog: 'z-[100]',
        baseWrapper: 'max-w-[unset] m-0 h-full',
        base: 'max-h-[95vh] overflow-auto scrollbar-white',
        close: classes(
          'bg-black sm:top-9 sm:right-8 top-[26px] right-[12px]',
          !!selectedTab && 'top-[15px] sm:top-[15px]'
        ),
      }}
    >
      {selectedTab === 1 && (
        <div className="px-8 pt-6 pb-4 w-full border border-[#1f1f1f] rounded-t-3xl">
          <button className="flex gap-2" onClick={() => setSelectedTab(0)}>
            <ChevronLeftIcon className="h-5 w-5" />
            <div>Back</div>
          </button>
        </div>
      )}
      <div
        className={classes(
          "w-full !font-['Neue_Montreal'] flex flex-col flex-1 sm:pr-3 sm:py-8 sm:pl-8 px-4 py-6 rounded-3xl border border-solid border-[#1C1C1C] shadow-[0px_4px_10px_0px_#ffffff08]",
          selectedTab === 1 && 'sm:pt-6',
          selectedTab > 0 && 'rounded-none rounded-b-3xl border-t-0'
        )}
      >
        {tabs[selectedTab].child}
      </div>
    </Modal>
  );
}
