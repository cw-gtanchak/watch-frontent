import { createRef, useEffect, useMemo, useRef, useState } from 'react';
import { Tab } from '@headlessui/react';
import { SmartContractList } from './SmartContractList';
import { SpecControl } from './SpecControl';
import { QueryDisplay } from './QueryDisplay';
import { Card, Header, Skeleton, useSkeleton } from 'components';
import { useNewViewBuilder } from 'contexts';
import { useTabs, useWindowSize } from 'hooks';
import { useBreadCrumbsRoot } from 'hooks/useBreadCrumbs';
import { checkInputError, classes } from 'utils';
const HEIGHT = 'calc(100vh - 236px)';

export const NewViewBuilder = () => {
  const {
    selectedTab,
    setSelectedTab,
    functionOptions,
    isSmartContractLoading: isLoading,
    isFunctionsSpecError,
    functionSpecs,
  } = useNewViewBuilder();
  useBreadCrumbsRoot([{ page: 'ViewBuilder' }]);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, []);

  const { windowSize } = useWindowSize();

  const myRef = useRef([]);

  const { tabPanels, tabSelector, tabs } = useTabs(
    [
      {
        child: <SmartContractList itemRef={myRef.current[0]} />,
        label: `Smart Contracts`,
        value: 'Smart Contracts',
      },
      {
        child: <SpecControl />,
        label: `Your Query`,
        value: 'yourQuery',
      },
      {
        child: (
          <QueryDisplay
            style={windowSize.width > 991 ? { height: HEIGHT } : {}}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ),
        label: `Console`,
        value: 'console',
      },
    ],
    undefined,
    {
      classNames: {
        base: classes(
          'w-full test flex items-center bg-transparent overflow no-scrollbar',
          isFunctionsSpecError && '[&>*:nth-child(2)]:text-[#F66]'
        ),
        tab: (selected) =>
          classes(
            'whitespace-pre py-[8px] md:px-[16px] px-[12px] flex-1 lg:text-[12px] text-sm',
            selected && 'bg-[#FFFFFF1A] text-white rounded-[32px] px-4'
          ),
      },
    }
  );

  myRef.current = useMemo(() => tabs.map((el, i) => myRef.current[i] ?? createRef()), []);

  const content = useMemo(() => {
    if (windowSize.width > 991) {
      return (
        <div className="flex h-full w-full min-w-full lg:flex-row flex-col gap-6">
          <Card
            style={{ height: HEIGHT }}
            className="relative flex lg:flex-row bg-[linear-gradient(180deg,#000_20.37%,#000_79.34%)] border shadow-[0px_-2px_52px_0px_rgba(200,200,200,0.06)_inset] rounded-[20px] border-solid border-[#ffffff1f] overflow-hidden"
          >
            <SmartContractList />
            <SpecControl />
          </Card>
          <QueryDisplay
            style={{ height: HEIGHT }}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      );
    }
    return (
      <div className="">
        <Tab.Group>
          {isLoading ? (
            <div className="flex flex-row w-full justify-between max-w-[350px] mb-[16px]">
              {tabs.map((tabnode, index) => (
                <Skeleton.Loader
                  isDarkTheme
                  isLoading
                  containerClassName="self-center"
                  className={classes(
                    'rounded-[32px] items-center',
                    !index ? 'w-[89px] h-10' : 'w-[61px] h-[22px] '
                  )}
                />
              ))}
            </div>
          ) : (
            <Header
              accessory={tabSelector}
              accessoryClassname=" w-full max-w-[350px] "
              className="mb-[16px] items-start justify-start block lg:overscroll-none overflow-auto no-scrollbar"
            />
          )}
          <Card
            className="bg-[#000] rounded-[25px]
          border-[#1F1F1F]"
          >
            {tabPanels}
          </Card>
        </Tab.Group>
      </div>
    );
  }, [windowSize.width, tabSelector, tabPanels, functionOptions, selectedTab, setSelectedTab]);

  return (
    <div className="dark mb-6 text-white">
      <Skeleton.Provider isLoading={isLoading}>
        <Skeleton.Loader isDarkTheme className="w-[173px] h-[42px]">
          <div className="lg:text-[32px] leading-10 text-[24px] bg-[radial-gradient(100%_100%_at_50%_100%,_var(--tw-gradient-stops))] from-[#ffffffd9_0%] to-[#fff_100%] bg-clip-text text-transparent w-fit">
            View Builder
          </div>
        </Skeleton.Loader>
        <div className="text-[#ffffffe6] lg:text-lg text-sm mt-1 mb-8 flex flex-row gap-[2px]">
          <Skeleton.Loader
            isDarkTheme
            className="h-[17px] !rounded-full"
            containerClassName="w-full max-w-[621px]"
          >
            <div className={classes('sm:w-[unset]', !isClicked && 'truncate w-[313px]')}>
              View Builder is the most powerful and optimized environment for publishing views.
            </div>
            {!isClicked && (
              <div
                className="cursor-pointer sm:hidden flex whitespace-pre"
                onClick={() => setIsClicked(true)}
              >
                See More
              </div>
            )}
          </Skeleton.Loader>
        </div>
        {content}
      </Skeleton.Provider>
    </div>
  );
};
