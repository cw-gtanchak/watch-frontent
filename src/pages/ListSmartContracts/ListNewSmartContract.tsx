import { useSearchParams } from 'react-router-dom';
import { useListSmartContract } from './useListSmartContracts';
import { Button, EthereumLogo, Image, Input, Tag } from 'components';
import { classes } from 'utils';
import ListBox, { ListBoxOptionType } from 'components/ListBox';
import { useFormField } from 'hooks/useFormField';
import { useApi } from 'contexts';
import { InputTags } from 'components/InputTags';

type ListNewSmartContractProps = {
  onNext: () => void;
};

const instanceOption: ListBoxOptionType[] = [
  { id: 1, name: 'Testnet', value: 'testnet', unavailable: true },
  { id: 2, name: 'Mainnet', value: 'mainnet' },
];

function ListNewSmartContract({ onNext }: ListNewSmartContractProps) {
  const {
    smartContractAddress,
    dryRunContract,
    selectedChain,
    handleSmartContractInputChange,
    handleChainTagClick,
    smartContractIdentifier,
    setSmartContractIdentifier,
    smartContractDescription,
    setSmartContractDescription,
    smartContractInstance: selectedInstance,
    setSmartContractInstance: setSelectedInstance,
    editTags,
  } = useListSmartContract();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, isValid, isTouched, setSmartContractValue, setIsTouched] = useFormField(
    '',
    (s) => s.length > 0 && /^[a-fA-F0-9]{40}$/.test(s)
  );
  const isNextDisabled = !smartContractAddress || !selectedChain || !smartContractIdentifier;
  const { sessionKey, account } = useApi();

  const validateSmartContract = () => {
    setIsTouched(true);
    return setSmartContractValue(smartContractAddress);
  };

  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-2xl">List a new Smart Contract</p>
        </div>
        <div className="">
          <p className="text-sm mt-2 text-[#B2B3B8]">Insert the smart contract details.</p>
          <div className="flex md:gap-4 gap-[14px] w-full md:flex-row flex-col md:mt-5 mt-[14px] ">
            <div className="flex flex-col relative flex-1">
              <label htmlFor="smart-contract-input" className="text-white text-sm">
                Smart Contract Address
              </label>
              <Input
                classNames={{
                  base: 'dark mt-3 placeholder:text-[#ffffff7a] text-sm p-3 border rounded-3xl bg-[#0a0a0a] text-white border-[#1F1F1F] shadow-[0px_8px_10px_0px_#000,0px_-2px_52px_0px_rgba(200, 200, 200, 0.06)_inset]',
                  input: classes('text-white pl-0', !smartContractAddress && 'pl-2'),
                }}
                id="smart-contract-input"
                type="text"
                isError={isTouched && !isValid}
                placeholder="e.x. 484fhuiry7yrh8374393939"
                value={smartContractAddress}
                onChange={(text) => {
                  handleSmartContractInputChange(text);
                  setIsTouched(false);
                }}
                pre={
                  smartContractAddress && <div className="pl-2 text-sm text-[#FFFFFF7A]">0x</div>
                }
              >
                {isTouched && !isValid && (
                  <span className="text-[#FF6666] text-xs mr-2">
                    {/^.{40}$/.test(smartContractAddress)
                      ? 'Invalid address'
                      : 'Invalid address length'}
                  </span>
                )}
              </Input>
            </div>
            <div className="flex flex-col relative flex-1">
              <label htmlFor="smart-contract-identifier" className="text-white text-sm">
                Identifier
              </label>
              <Input
                classNames={{
                  base: 'dark mt-3 placeholder:text-[#ffffff7a] text-sm p-3 border rounded-3xl shadow-[0px_8px_10px_0px_#000,0px_-2px_52px_0px_rgba(200, 200, 200, 0.06)_inset] bg-gradient-to-r from-[#ffffff0a] via-[#ffffff05] to-[#ffffff00] text-white border-white border-opacity-5',
                  input: classes('text-white pl-2'),
                }}
                id="smart-contract-identifier"
                filter={/^[^a-zA-Z_]|[^a-zA-Z0-9_]/g}
                type="text"
                value={smartContractIdentifier}
                placeholder="Identifier for smart contract"
                onChange={(text) => {
                  const temp = [...text];
                  temp.splice(30);
                  setSmartContractIdentifier(temp.join(''));
                }}
              />
            </div>
          </div>
          <div className="md:mt-5 mt-[14px] flex flex-col relative">
            <label htmlFor="smart-contract-instance" className="text-white text-sm">
              Instance
            </label>
            <ListBox
              options={instanceOption}
              placeHolder="Select which instance"
              selected={selectedInstance as ListBoxOptionType}
              setSelected={setSelectedInstance}
              classNames={{ button: 'mt-3' }}
            />
          </div>
          <div className="md:mt-5 mt-[14px] flex flex-col relative">
            <p className="text-white text-sm">Select chain</p>
            <div className="mt-3">
              <ul className={classes('flex flex-wrap items-center gap-2')}>
                {[
                  { name: 'Ethereum', slug: 'ethereum', icon: <EthereumLogo /> },
                  {
                    name: 'Astar',
                    slug: 'astar',
                    icon: <Image src="/logos/chain/astar.svg" alt="astar logo" />,
                  },
                  // { name: 'Polygon', slug: 'polygon', icon: PolygonLogo },
                  // { name: 'Solana', slug: 'solana', icon: SolanaLogo },
                ].map((tag) => {
                  return (
                    <Tag
                      key={tag.slug}
                      className="select-none items-center"
                      isDarkTheme
                      value={tag}
                      isActive={selectedChain?.slug === tag.slug}
                      onClick={() => handleChainTagClick(tag)}
                      icon={tag.icon} // className="!h-4 !w-4"
                    >
                      {tag.name}
                    </Tag>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="mt-5">
            <div className="text-white text-sm mb-2">Tag</div>
            <InputTags
              placeholder="Please type tag"
              withCreate
              onFocus={() => {
                editTags.setIsFocused(true);
              }}
              limit={19}
              {...editTags}
              classNames={{
                options: 'left-0',
                base: 'md:pl-5 pl-4',
                tags: 'max-h-[66px] min-h-[26px] overflow-y-scroll scrollbar-white',
              }}
            />
          </div>
          <div className="mt-5 flex flex-col relative">
            <label htmlFor="smart-contract-identifier" className="text-white text-sm">
              Description
            </label>
            <Input
              type="textarea"
              className="relative mt-3 px-1.5 py-[11px] rounded-2xl resize-none"
              classNames={{ input: 'dark resize-none h-20 scrollbar-white break-all' }}
              placeholder="Description"
              value={smartContractDescription}
              onChange={(text) => {
                if (text.length <= 273) setSmartContractDescription(text);
              }}
              isDarkTheme
            >
              <div className="absolute right-[32px] bottom-[1px] w-[23px] h-4 text-xs leading-4 text-[#666666] ">
                {smartContractDescription.length}/273
              </div>
            </Input>
          </div>
        </div>
      </div>

      <Button
        className={classes(
          'px-5 rounded-full h-12 mx-auto block mt-6 w-32',
          !isNextDisabled ? 'bg-white' : 'bg-[#7a7a7a]'
        )}
        isDisabled={isNextDisabled}
        variant="plain"
        onClick={() => {
          if (!account?.address) {
            searchParams.set('connect', 'true');
            setSearchParams(searchParams);
            return;
          }
          if (validateSmartContract()) {
            onNext();
            dryRunContract({
              variables: {
                data: {
                  address: smartContractAddress,
                  chain: selectedInstance?.value || 'mainnet',
                  identifier: smartContractIdentifier,
                  network: selectedChain?.slug as string,
                },
                sessionKey: sessionKey as string,
              },
            });
          }
        }}
      >
        <span className="text-base text-black">Next</span>
      </Button>
    </>
  );
}

export default ListNewSmartContract;
