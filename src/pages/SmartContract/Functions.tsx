import { Card, Icon, MethodGearIcon, Skeleton } from 'components';
import { useSmartContract } from 'contexts';
import { getAbiType } from 'utils/abi';
import { usePageFilter } from 'hooks/usePageFilter';

export function Functions() {
  const { resource: smartContract } = useSmartContract();
  const { controller, currentPage } = usePageFilter(smartContract?.functions);

  return (
    <ul className="flex flex-col sm:gap-2 gap-4 !border-[#1F1F1F] card !border-none sm:!border sm:!border-solid rounded-[24px] sm:px-5 sm:py-5   bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]  !shadow-[0_8px_10px_0px_#000,0px_-2px_52px_0px_#c8c8c80f]">
      {currentPage &&
        currentPage.length > 0 &&
        currentPage.map((fn, index) => {
          const name =
            fn.contract?.abi.name ||
            (fn.name && fn.name.indexOf(':') >= 0 ? fn.name.split(':')[1] : fn.name) ||
            fn.identifier ||
            fn.hashId;
          return (
            <Card
              as="li"
              key={`${name}-${index}`}
              className="flex sm:px-5 px-[14px] py-[14px] flex-row shadow-sm text-sm break-words bg-[#0E0E0E] rounded-[16px] !border-none items-center gap-2"
            >
              <Icon
                classNames={{
                  base: 'flex item-center justify-center h-8 w-8 bg-[#222121] fill-blue-500 rounded-[6px]',
                  img: 'w-full h-full rotate-90 text-white',
                  skeleton: '!rounded-lg',
                }}
                className="bg-red"
                icon={MethodGearIcon}
              />
              <div className="text-white text-sm font-normal leading-normal break-all !items-center sm:flex sm:slex-row">
                <Skeleton.Loader isDarkTheme className="w-[90px] h-5">
                  <span className="font-medium whitespace-pre">{name}</span>
                  <span className="text-white whitespace-pre-line break-all">
                    (
                    {fn.contract &&
                      fn.contract?.abi.inputs.map((input, inputIndex) => {
                        return (
                          <span className="text-white" key={`input-${inputIndex}`}>
                            {input.__typename && input.__typename.length > 0
                              ? `${input.__typename}: `
                              : ''}
                            {getAbiType(input) || ''}
                            {fn.contract && inputIndex < fn.contract.abi.inputs.length - 1
                              ? ', '
                              : ''}
                          </span>
                        );
                      })}
                    )
                  </span>
                  <span className="text-white px-1">: </span>
                </Skeleton.Loader>
                <Skeleton.Loader isDarkTheme className="sm:ml-2 w-[164px] h-5">
                  <span className="text-[#ffffff7a] text-xs font-normal leading-none">
                    (
                    {fn.contract &&
                      fn.contract.abi.outputs.map((output, outputIndex) => {
                        return (
                          <span key={`output-${outputIndex}`}>
                            {output?.__typename && output.__typename.length > 0
                              ? `${output.__typename}: `
                              : ''}
                            {getAbiType(output)}
                            {fn.contract && outputIndex < fn.contract.abi.outputs.length - 1
                              ? ', '
                              : ''}
                          </span>
                        );
                      })}
                    )
                  </span>
                </Skeleton.Loader>
              </div>
            </Card>
          );
        })}
      {controller}
    </ul>
  );
}
