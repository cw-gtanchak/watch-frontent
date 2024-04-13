import { useMemo } from 'react';
import { TgFunction } from '@watch/common';
import { CheckBox, Cog6ToothIcon, Skeleton } from 'components';
import { classes } from 'utils';
import { extractFunctionSpec } from 'utils/timegraph';
import { useNewViewBuilder } from 'contexts/NewViewBuilder';
import { Maybe, SearchType, SmartContractDetailsFragment, useResourceQuery } from 'gql';

interface Props {
  smartContractAddress: string;
}

export function FunctionList({ smartContractAddress }: Props) {
  const { functionSpecs, setFunctionSpecs } = useNewViewBuilder();

  const { data: resourceQuery } = useResourceQuery({
    variables: {
      request: {
        identifier: smartContractAddress || '',
        type: SearchType.SmartContracts,
      },
    },
    skip: !smartContractAddress,
  });

  const functions = useMemo(() => {
    try {
      return (resourceQuery?.resource as Maybe<SmartContractDetailsFragment>)?.functions?.filter(
        (fn) => fn.identifier
      );
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [resourceQuery]);

  return (
    <div className="border-r-solid flex flex-1  lg:max-w-[329px] h-full shrink-0 flex-col border-0 border-r-0 border-solid border-[#212121] ">
      <ul className="relative pl-6 before:absolute before:bg-[#000] before:border-l before:border-[#1E1E1E] after:flex after:bg-blue-300 before:h-[calc(100%_+_4px)] before:w-[21px] before:left-0 before:top-[-5px] before:z-10">
        {functions?.length ? (
          functions?.map((fn, index) => {
            const isIncluded =
              fn && functionSpecs.some(({ identifier }) => identifier === fn.identifier);
            const name = fn ? fn.identifier || fn.name : '';
            return (
              <li
                className="w-full relative before:absolute before:bg-[#1E1E1E] before:border-l before:border-[#1E1E1E] before:h-[1px] before:w-[14px] before:top-[50%] before:left-[-23px] before:z-20"
                key={fn ? `fn-${index}` : `placeholder-${index}`}
              >
                <button
                  className={classes('flex gap-2 w-full items-center py-4 text-sm')}
                  onClick={
                    fn
                      ? () => {
                          setFunctionSpecs((prev) => {
                            if (isIncluded) {
                              const removedFn = functionSpecs.filter(
                                ({ identifier }) => identifier !== fn.identifier
                              );
                              return removedFn;
                            }
                            return [...prev, extractFunctionSpec(fn as TgFunction)];
                          });
                        }
                      : undefined
                  }
                >
                  <Cog6ToothIcon className="h-6 w-6 shrink-0" color="grey" />
                  <div className="flex-1 break-words" style={{ wordBreak: 'break-word' }}>
                    <Skeleton.Loader containerClassName="w-full">
                      <div className="line-clamp-2">{name}</div>
                    </Skeleton.Loader>
                    <p className="text-[#ffffff80] text-xs">
                      {'(' +
                        fn?.outputs
                          .map((item) => {
                            return `${(item as { name: string }).name}: ${
                              (item as { value: string }).value
                            }`;
                          })
                          .join(', ') +
                        ')'}
                    </p>
                  </div>
                  {fn && (
                    <CheckBox
                      isChecked={isIncluded}
                      isDarkTheme
                      classNames={{ base: 'rounded-[4px] border-[#1E1E1E]' }}
                    />
                  )}
                </button>
              </li>
            );
          })
        ) : (
          <div className="flex-1 w-full h-full flex flex-col items-center justify-center text-sm text-[#ffffff80] my-2">
            No Functions Found
          </div>
        )}
      </ul>
    </div>
  );
}
