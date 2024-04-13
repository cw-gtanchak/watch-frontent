import { ContractAbi } from './ContractAbi';
import { Functions } from './Functions';
import {
  Button,
  CopyButton,
  Icon,
  ResourceList,
  Skeleton,
  ViewIcon,
} from 'components';
import { classes, copy } from 'utils';
import { useSmartContract } from 'contexts';
import { usePageFilter } from 'hooks/usePageFilter';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { View } from 'gql';

export function Contract({ type }: { type: 'view' | 'contract' | 'function' }) {
  const { smartContractAbi: abi, resource: smartContract } = useSmartContract();
  const { controller, currentPage } = usePageFilter(smartContract?.views as View[]);

  const content = useMemo(() => {
    switch (type) {
      case 'contract':
        return (
          <div className="!border-[#1F1F1F] border rounded-[24px] sm:p-6 p-4 sm:pt-4 sm:pb-6 pb-1 card  bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]  !shadow-[0_8px_10px_0px_#000,0px_-2px_52px_0px_#c8c8c80f]">
            <div className="flex items-center justify-between mb-4">
              <Skeleton.Loader isDarkTheme className="w-[99px] h-[27px]">
                <h5 className="m-0 md:text-lg text-lg font-normal font-['Neue Montreal'] leading-7 text-white ">
                  Contract ABI
                </h5>
              </Skeleton.Loader>
              <Skeleton.Loader isDarkTheme className="w-10 h-10 !rounded-full">
                <CopyButton
                  value={abi}
                  className="text-white rounded-[61px] bg-[#141414] p-[10px]"
                />
              </Skeleton.Loader>
            </div>
            <ContractAbi abi={abi} isLoading={!smartContract} />
          </div>
        );
      case 'view':
        return (
          <div>
            <ResourceList
              isEmptyView={
                <div className="w-full py-[81px] justify-center items-center flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
                  <Skeleton.Loader isDarkTheme className="w-[100px] h-[100px]">
                    <div className="flex flex-col relative sm:mb-5 mb-[14px] overflow-hidden">
                      <div className="absolute top-2/4 left-2/4 rounded-[59px] bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] filter blur-[25px] h-1/2 w-20 -translate-y-2/4 -translate-x-2/4"></div>
                      <Icon
                        classNames={{
                          base: classes(
                            'sm:h-[100px] h-20 bg-[#d3cccc14] rounded-[16px] sm:w-[100px] w-20'
                          ),
                          img: classes(''),
                        }}
                        icon={ViewIcon}
                      />
                    </div>
                  </Skeleton.Loader>
                  <div className="flex gap-2 flex-col mb-4">
                    <Skeleton.Loader isDarkTheme className="h-[27px] w-[200px] mt-5">
                      <span className="text-xl">
                        There are no Views created with this Smart Contract yet.
                      </span>
                    </Skeleton.Loader>
                    <Skeleton.Loader isDarkTheme className="h-5 w-[163px]">
                      <span className="text-sm text-[#B2B3B8]">Create a view to get started</span>
                    </Skeleton.Loader>
                  </div>
                  <Skeleton.Loader isDarkTheme className="h-10 w-[123px]">
                    <Link to={'/view-builder'}>
                      <Button
                        variant="darkThemeFilled"
                        onClick={() => {
                          sessionStorage.setItem('smartContactName', smartContract?.name);
                        }}
                      >
                        Create View
                      </Button>
                    </Link>
                  </Skeleton.Loader>
                </div>
              }
              value={currentPage}
              isList={true}
            />
            {controller}
          </div>
        );
      default:
        return <Functions />;
    }
  }, [currentPage, controller, abi]);

  return <div className="flex flex-col space-y-8">{content}</div>;
}
