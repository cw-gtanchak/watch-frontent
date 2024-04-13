import { useEffect, useMemo } from 'react';
import { FnInput } from './FnInput';
import { FnOutput } from './FnOutput';
import { Child } from './Child';
import {
  Button,
  Cog6ToothIcon,
  CustomInfoIcon,
  Details,
  Input,
  Select,
  SelectInline,
  Skeleton,
  Summary,
} from 'components';
import { HTMLAttributes } from 'types';
import { checkInputError, classes, getAlias, outputType, replaceIndex } from 'utils';
import { getAbiType } from 'utils/abi';
import { useNewViewBuilder } from 'contexts/NewViewBuilder';
import { TgFunctionInputSpec, TgFunctionSpec } from '@watch/common';

export function SpecControl(props: HTMLAttributes<HTMLDivElement>) {
  const {
    graphId,
    setGraphId,
    isGraphIdValid,
    isGraphIdTouched,
    functionSpecs,
    setFunctionSpecs,
    isManualMode,
    setIsManualMode,
    selectedTab,
    setSelectedTab,
    isDesc,
    setIsDesc,
    orderBy,
    setOrderBy,
    isFunctionsSpecError,
  } = useNewViewBuilder();

  const orderByOptions = useMemo(() => {
    return (functionSpecs || []).reduce(
      (options: { label: string; value: string }[], { outputs }, index) => [
        ...options,
        ...outputs
          .filter((el) => {
            const { name } = el as unknown as outputType;
            return !options.some((o) => o.value === name);
          })
          .map((el) => {
            const { name } = el as unknown as outputType;
            const column = `${getAlias(index)}.${name}`;
            return { label: column, value: column };
          }),
      ],
      []
    );
  }, [functionSpecs]);

  useEffect(() => {
    if (!orderByOptions.some(({ value }) => value === orderBy)) {
      setOrderBy((orderByOptions[0] || { value: undefined }).value);
    }
  }, [orderBy, orderByOptions, setOrderBy]);

  const content = useMemo(() => {
    if (!functionSpecs || functionSpecs?.length === 0) {
      return (
        <div className="flex-1 w-full h-full flex flex-col items-center justify-center text-sm text-white">
          <Skeleton.Loader isDarkTheme className="w-[123px] h-[123px] !bg-[#FFFFFF14] mb-4">
            <img
              alt="NoFunctionAdded"
              src="/NoFunctionAdded.png"
              className="mb-4 h-[123px] w-[123px]"
            />
          </Skeleton.Loader>
          <Skeleton.Loader isDarkTheme className="w-[174px] h-6">
            No Functions Added
          </Skeleton.Loader>
        </div>
      );
    }

    return (
      <>
        <div className="lg:px-6 px-4">
          <Input
            className="lg:mt-6 bg-black"
            isError={isGraphIdTouched && !isGraphIdValid}
            filter={/^[^a-zA-Z]|[^a-zA-Z0-9_]/g}
            placeholder="Enter the name of this query"
            onChange={(text) => {
              const temp = [...text];
              temp.splice(30);
              setGraphId(temp.join(''));
            }}
            value={graphId}
            isDarkTheme
          >
            {isGraphIdTouched && !isGraphIdValid && (
              <span className="text-[#FF6666] text-xs mr-4">Invalid Name</span>
            )}
          </Input>
        </div>
        <div
          id="spec-wrapper"
          className={classes(
            'mt-4 relative flex flex-col flex-1 overflow-y-auto scrollbar-white lg:px-6 px-4',
            (isManualMode || selectedTab === 1) && 'overflow-hidden'
          )}
        >
          {(isManualMode || selectedTab === 1) && (
            <div
              className={classes(
                'absolute bottom-0 left-0 right-0 top-0 z-[1] flex flex-col items-center justify-center space-y-8 bg-neutral-900/40 px-8 text-center font-medium text-white opacity-0 backdrop-blur-sm transition-opacity hover:opacity-100 overflow-y-hidden'
              )}
            >
              {isManualMode && (
                <div className="w-1/2">
                  {
                    'You are currently editing the view SQL in manual mode without assistance. If you exit, the auto-generated query will replace your changes.'
                  }
                </div>
              )}
              <Button
                variant={selectedTab === 1 ? 'darkThemeFilled' : 'darkThemeOutlined'}
                onClick={selectedTab === 0 ? () => setIsManualMode(false) : () => setSelectedTab(0)}
              >
                {selectedTab === 1 ? 'Modify Your Query' : 'Exit Manual Mode'}
              </Button>
            </div>
          )}
          <div className={classes((isManualMode || selectedTab === 1) && 'overflow-hidden')}>
            {functionSpecs.map((fnSpec, fnIndex) => {
              const isError = checkInputError(fnSpec);
              return (
                <Details
                  className={classes(
                    'lg:bg-[#080808] bg-[#060606] px-4 mt-3.5 rounded-[20px]',
                    isError && 'border-[#F66] !bg-[#ff66660a]'
                  )}
                  key={`fn-spec-${fnSpec.identifier}`}
                  id={`${fnIndex}-details`}
                >
                  <Summary
                    classNames={{
                      base: '!border-b-0',
                      removeButton: 'border-0 pr-0',
                      removeIcon: 'text-[#B2B3B8]',
                      expandIcon: 'text-[#B2B3B8] ml-1 h-6 w-6',
                    }}
                    onRemove={() =>
                      setFunctionSpecs((prev) => prev.filter((fn, index) => index !== fnIndex))
                    }
                  >
                    <Cog6ToothIcon className="h-6 w-6 shrink-0 mr-2" color="#ffffffd4" />
                    <div className="max-w-[320px] overflow-hidden whitespace-pre-line break-all line-clamp-1">
                      {fnSpec.identifier.replace(`_${fnSpec.contract.abi.name}`, '')} -{' '}
                      {fnSpec.contract.abi.name}
                    </div>
                    {isError && (
                      <CustomInfoIcon className="ml-1 min-w-5 min-h-5" stroke="#FF6666" />
                    )}
                  </Summary>
                  <div className="py-4 flex flex-col space-y-4 border-t border-solid border-[#ffffff1f]">
                    {fnSpec.inputs.length > 0 && (
                      <>
                        <div>Input</div>
                        <p className="!mt-1 text-xs font-normal text-[#B2B3B8]">
                          Please input the method arguments if required for your collection.
                        </p>
                        <Child className="flex flex-col space-y-4 py-2 ">
                          {fnSpec.inputs.map((inputSpec, inputIndex) => {
                            const abiInput = fnSpec.contract.abi.inputs[inputIndex];
                            const inputSignature = (
                              <span className="whitespace-pre leading-6 text-sm">
                                {inputIndex}:{' '}
                                <span className="text-[#B2B3B8]">{getAbiType(abiInput)}</span>
                              </span>
                            );

                            const id = `input-${fnSpec.name}-${inputIndex}`;

                            return (
                              <FnInput
                                id={id}
                                key={id}
                                inputSpec={inputSpec}
                                setter={(newInputSpec) =>
                                  setFunctionSpecs((prev) =>
                                    replaceIndex(prev, fnIndex, {
                                      inputs: replaceIndex(
                                        prev[fnIndex].inputs,
                                        inputIndex,
                                        newInputSpec
                                      ),
                                    })
                                  )
                                }
                                signature={inputSignature}
                              />
                            );
                          })}
                        </Child>
                      </>
                    )}
                    <div>Output</div>
                    <Child className="flex flex-col space-y-4 py-2 pl-4">
                      {fnSpec.outputs.map((outputSpec, outputIndex) => {
                        const { name } = outputSpec as unknown as outputType;
                        const abiOutput = ['_clock', '_index'].includes(name)
                          ? { type: 'unit256' }
                          : fnSpec.contract.abi.outputs[outputIndex] ||
                            fnSpec.contract.abi.outputs[0];
                        const outputSignature = (
                          <div className="flex flex-row flex-1">
                            <span className="whitespace-pre">{getAbiType(abiOutput)}</span>
                          </div>
                        );

                        if (fnIndex !== 0 && ['_clock', '_index'].includes(name)) {
                          return null;
                        }

                        return (
                          <FnOutput
                            key={`output-${outputIndex}`}
                            outputSpec={outputSpec}
                            setter={(newOutputSpec) =>
                              setFunctionSpecs((prev) =>
                                replaceIndex(prev, fnIndex, {
                                  outputs: replaceIndex(
                                    prev[fnIndex].outputs,
                                    outputIndex,
                                    newOutputSpec
                                  ),
                                })
                              )
                            }
                            signature={outputSignature}
                          />
                        );
                      })}
                    </Child>
                  </div>
                </Details>
              );
            })}
            {orderByOptions?.length > 0 && (
              <div className="relative mt-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="mb-0 md:text-xl text-base">Order By</h4>
                  <div className="whitepsace-pre  text-sm">
                    Sort
                    <SelectInline<boolean>
                      value={isDesc}
                      onChange={setIsDesc}
                      options={[
                        { label: 'Ascending', value: false },
                        { label: 'Descending', value: true },
                      ]}
                      classNames={{
                        valueContainer: () => 'text-white',
                        control: () => 'border-none bg-transparent',
                        menu: () => 'w-[120px] !top-[unset] !bottom-[100%] right-[1px]',
                      }}
                    />
                  </div>
                </div>
                <div className="flex w-full items-center space-x-3 bg-black">
                  <Select<string>
                    className="flex-1"
                    options={orderByOptions}
                    value={orderBy}
                    onChange={setOrderBy}
                    isDarkTheme
                    isSortByViewBuilder
                    classNames={{
                      control: () => 'bg-[#060606] rounded-[20px] border-[#ffffff1f]',
                      menu: () =>
                        'mb-[15px] mt-[15px] md:max-h-80 md:max-h-[320px] max-h-[unset] scrollbar-white',
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }, [
    functionSpecs,
    isGraphIdTouched,
    isGraphIdValid,
    setGraphId,
    graphId,
    setFunctionSpecs,
    isManualMode,
    selectedTab,
    isDesc,
    orderBy,
  ]);

  return (
    <div
      className={classes(
        'relative lg:pb-6 pb-4 flex flex-1 shrink-0 flex-col overflow-hidden rounded-2xl h-full min-h-[calc(100vh_-_310px)] z-10',
        !functionSpecs && 'h-[calc(100vh_-_310px)]'
      )}
      {...props}
    >
      <Skeleton.Loader isDarkTheme className="w-[90px] h-[22px] mt-2 !rounded-full">
        <div className="flex flex-row justify-between !pb-0 lg:p-6 p-4 lg:pt-4">
          <h5 className="lg:flex hidden">Your Query </h5>
          {isFunctionsSpecError && (
            <div className="text-[#FF6666] text-xs lg:flex hidden flex-row gap-1 items-center">
              <CustomInfoIcon className="w-5 h-5" stroke="#FF6666" />
              <p>View Error</p>
            </div>
          )}
        </div>
      </Skeleton.Loader>
      {content}
    </div>
  );
}
