// import { PlayIcon } from '@heroicons/react/24/solid';
import { Tab } from '@headlessui/react';
import { useEffect, useMemo, useState } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ResultDisplay } from './ResultDisplay';
import {
  Button,
  Sql,
  Card,
  ConnectAccountPrompt,
  ToolTip,
  Skeleton,
  useSkeleton,
} from 'components';
import { useApi } from 'contexts';
import { useTabs, useWindowSize } from 'hooks';
import { HTMLAttributes, Setter } from 'types';
import { checkInputError, classes } from 'utils';
import { useNewViewBuilder } from 'contexts';
import { TgFunctionSpec } from '@watch/common';

interface Props extends HTMLAttributes<HTMLDivElement> {
  selectedTab: number;
  setSelectedTab: Setter<number>;
}

export function QueryDisplay(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { account } = useApi();
  const { windowSize } = useWindowSize();

  const {
    isManualMode,
    setIsManualMode,
    setIsDeployOpen,
    editorRef,
    validate,
    isDryRunValid,
    isTestable,
    isDryRunning,
    duplicateColumn,
    statusClassName,
    statusIcon,
    statusMessage,
    untouched,
    viewDef,
    setViewDef,
    generatedViewDef,
    functionSpecs,
    isGraphIdValid,
    isGraphIdTouched,
    setIsGraphIdTouched,
    isSmartContractLoading,
    dryRunError,
  } = useNewViewBuilder();

  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    if (scroll) {
      const top = document.getElementById(
        `${functionSpecs.findIndex(checkInputError)}-details`
      )?.offsetTop;
      document.getElementById('spec-wrapper')?.scrollTo({
        top,
        behavior: 'smooth',
      });
      setScroll(false);
    }
  }, [functionSpecs]);

  const { tabSelector, tabPanels, tabs } = useTabs(
    [
      {
        child: (
          <Sql
            className={`pt-0 flex-1 scroll h-full ${isSmartContractLoading ? 'loading' : ''}`}
            onChanges={(editor) => {
              if (editor.hasFocus()) {
                const latest = editor.getValue();
                setViewDef(latest);
                if (!isManualMode && latest !== generatedViewDef) {
                  setIsManualMode(true);
                }
              }
            }}
            value={viewDef}
            options={{ fixedGutter: false }}
            ref={editorRef}
          />
        ),
        label: 'Definition',
        value: 'definition',
      },
      {
        child: <ResultDisplay />,
        label: 'Test Run',
        value: 'testRun',
        disabled: !isTestable || !isGraphIdValid,
      },
    ],
    [props.selectedTab, props.setSelectedTab],
    {
      classNames: {
        base: 'h-full p-0 w-auto space-x-4 relative top-[1px]',
        tab: (isSelected) =>
          classes(
            'flex items-center whitespace-nowrap border-0 text-base py-2',
            isSelected && 'px-3 bg-[#ffffff1c] rounded-[32px] text-white'
          ),
      },
    }
  );
  useEffect(() => {
    if (!isManualMode) {
      editorRef.current && editorRef.current.editor.setValue(generatedViewDef);
    }
  }, [editorRef, generatedViewDef, isManualMode]);

  const Component = useMemo(() => {
    if (windowSize.width < 992) {
      return 'div';
    }
    return Card;
  }, [windowSize.width]);

  return (
    <Component
      {...props}
      className={classes(
        `flex h-full w-full flex-1 flex-col lg:pt-4 pt-4 overflow-x-hidden transition-colors shrink-0 bg-[linear-gradient(180deg,#000_20.37%,#000_79.34%)] border shadow-[0px_-2px_52px_0px_rgba(200,200,200,0.06)_inset] rounded-[20px] border-solid border-[#ffffff1f] scrollbar-white`,
        duplicateColumn && 'error',
        props.className
      )}
    >
      <div className="lg:px-6 px-4 lg:flex hidden justify-between items-center">
        <Skeleton.Loader isDarkTheme className="w-[89px] h-[22px]">
          <h5 className="lg:text-[20px] text-[18px] lg:flex hidden">Console</h5>
        </Skeleton.Loader>
      </div>

      <Tab.Group selectedIndex={props.selectedTab} onChange={props.setSelectedTab}>
        <div className={'relative lg:mt-4 flex h-full w-full flex-1 flex-col  '}>
          <div className="lg:px-6 px-3 flex h-10 w-full justify-start space-x-3">
            {isSmartContractLoading
              ? tabs.map((tabnode, index) => (
                  <Skeleton.Loader
                    isDarkTheme
                    containerClassName="self-center"
                    className={classes(
                      'rounded-[32px] items-center',
                      !index ? 'w-[89px] h-10' : 'w-[61px] h-[22px] '
                    )}
                  />
                ))
              : tabSelector}
          </div>
          <div
            className={classes(
              'xl:h-[calc(100vh_-_427px)] h-[calc(100vh_-_427px)] mt-4 overflow-y-auto scrollbar-white',
              props.selectedTab === 1 &&
                'lg:h-[calc(100vh_-_420px)] xl:h-[calc(100vh_-_420px)] h-[calc(100vh_-_450px)]'
            )}
          >
            <div
              className={`${
                duplicateColumn ||
                (account &&
                  !isDryRunning &&
                  statusMessage !== 'Success!' &&
                  props.selectedTab === 1) ||
                !!dryRunError
                  ? 'bg-[#ff5c5c14] dryRun-error'
                  : ''
              } lg:px-6 lg:pl-1 px-0 flex-1`}
            >
              {tabPanels}
            </div>
          </div>
          <div className="xl:max-h-[80px] max-h-[120px] bg-white flex shrink-0 justify-end mt-auto">
            <div
              className={`lg:px-6 lg:py-4 p-4 flex  xl:flex-row flex-col flex-1 gap-3 bg-black  border-0 border-t border-solid border-[#ffffff1f] ${
                duplicateColumn || (!isDryRunning && statusMessage && props.selectedTab === 1)
                  ? 'justify-between'
                  : 'justify-end'
              } `}
            >
              {isGraphIdTouched && !isGraphIdValid && props.selectedTab === 0 && (
                <div className="flex items-center text-[#DD0050] flex-1 gap-2 lg:hidden">
                  <div
                    key="circle-icon"
                    className="bg-[#DD0050] h-10 w-10 flex items-center justify-center rounded-full"
                  >
                    <ExclamationCircleIcon color="white" className="w-5 h-5" />
                  </div>
                  <span className="text-xs"> Please enter name of the view</span>
                </div>
              )}
              {(statusMessage?.toString().startsWith('Please ensure') ||
                props.selectedTab === 1) && (
                <div
                  className={classes(
                    'justify-start items-center flex-row flex',
                    !untouched && 'flex-1'
                  )}
                >
                  {statusMessage && (
                    <div className={classes(statusClassName)}>
                      {statusIcon}
                      <div className="flex-1 pl-[10px] text-xs">{statusMessage}</div>
                    </div>
                  )}
                </div>
              )}
              {props.selectedTab === 1 ? (
                <Button
                  className="h-[40px] sm:max-w-[311px] w-full text-black px-5 rounded-full block sm:w-32 bg-white"
                  variant="plain"
                  isDisabled={!isDryRunValid || !account}
                  onClick={() => {
                    if (isManualMode) {
                      if (isDryRunValid) {
                        setIsDeployOpen(true);
                      }
                    } else {
                      if (validate()) {
                        setIsDeployOpen(true);
                      }
                    }
                  }}
                >
                  Deploy View
                </Button>
              ) : (
                !duplicateColumn && (
                  <ToolTip
                    anchor={windowSize.width <= 1279 ? 'bottom-left' : 'bottom-right'}
                    classNames={{ base: 'sm:w-32', content: 'whitespace-nowrap top-9' }}
                    message={!account ? 'Please connect your wallet to continue.' : null}
                  >
                    <Button
                      // isDisabled={!isTestable}
                      variant="plain"
                      className="text-black px-5 rounded-full h-[40px] block sm:w-32 w-full bg-white"
                      isDisabled={
                        isManualMode
                          ? false
                          : !account || duplicateColumn || functionSpecs.length === 0
                      }
                      onClick={() => {
                        if (!isManualMode) {
                          if (validate() && isTestable) {
                            props.setSelectedTab(1);
                          } else {
                            setScroll(true);
                          }
                        } else {
                          setIsGraphIdTouched(true);
                          if (isGraphIdTouched && isGraphIdValid) props.setSelectedTab(1);
                        }
                      }}
                    >
                      <span className="text-base">Test Query</span>
                    </Button>
                  </ToolTip>
                )
              )}
            </div>
          </div>
        </div>
        <ConnectAccountPrompt isOpen={isOpen} setIsOpen={setIsOpen} />
      </Tab.Group>
    </Component>
  );
}
