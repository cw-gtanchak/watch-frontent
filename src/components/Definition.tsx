import { useIsMounted } from 'usehooks-ts';
import { useEffect, useState } from 'react';
import { Square2StackIcon } from './icons';
import { Button, Buttons } from './Button';
import { Header } from './Header';
import { Skeleton, useSkeleton } from './Skeleton';
import { copy, pluralize } from 'utils';
import { YAML_STRING } from 'consts';
import { HTMLAttributes } from 'types';

export function Definition({
  children,
  lineCount,
  copyString,
}: HTMLAttributes<HTMLDivElement> & { lineCount: number; copyString: string }) {
  const isMounted = useIsMounted();
  const isLoading = useSkeleton();

  const [mountCode, setMountCode] = useState(false);
  useEffect(() => {
    if (isMounted() && !isLoading) {
      setMountCode(true);
    }
  }, [isMounted, isLoading]);

  return (
    <Skeleton.Provider isLoading={!isMounted() && isLoading}>
      <div className="relative flex w-full items-stretch space-x-6 rounded-[20px] border border-solid border-[#1F1F1F] pt-4 overflow-hidden">
        <div className="w-full">
          <Header
            accessory={
              <Buttons>
                <Skeleton.Loader isDarkTheme heightFix containerClassName="h-9 w-9 !rounded-full">
                  <div className="h-[40px] w-[40px]  bg-neutral-900 rounded-[61px] flex items-center justify-center">
                    <Button className="!p-[5px] !border-0 " onClick={() => copy(copyString)}>
                      <Square2StackIcon color="#fff" className="w-6 h-6" />
                    </Button>
                  </div>
                </Skeleton.Loader>
              </Buttons>
            }
            tag="div"
            className="h-10 text-xl font-medium content-between px-5 sm:mb-4 mb-0"
            hClassName="text-[18px]"
            accessoryClassname="w-auto"
          >
            <Skeleton.Loader isDarkTheme isLoading={!lineCount} className="w-20 h-5">
              <div>
                {lineCount} {pluralize('line', lineCount)}
              </div>
            </Skeleton.Loader>
          </Header>
          <div className="relative">
            {/* {mountCode && (
              <Button
                className="sm absolute right-6 top-6 z-10 flex items-center"
                variant="primary"
              >
                <PlayIcon className="relative -top-0.5 mr-2 h-5 w-5" />
                Run
              </Button>
            )} */}

            {!mountCode ? (
              <div className="flex flex-row">
                <div>
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="w-4 h-[15px] ml-5 !rounded-full"
                  />
                </div>
                <div>
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-5 w-10 h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-5 w-10 h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-10 w-[139px] h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-10 w-[139px] h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-10 w-[65px] h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-10 w-[165px] h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-10 w-[67px] h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-10 w-10 h-[15px] !rounded-full"
                  />
                  <Skeleton.Loader
                    isDarkTheme
                    isLoading
                    className="ml-5 w-[103px] h-[15px] !rounded-full"
                  />
                </div>
              </div>
            ) : (
              children
            )}
          </div>
        </div>
        {/* <div className="flex flex-1 flex-col overflow-hidden">
          <Header className="h-10 w-full text-lg font-medium" tag="div">
            Results
          </Header>
          <Skeleton.Loader heightFix containerClassName="h-[500px] w-full">
            <Json className="w-full flex-1" value={JSON_STRING} />
          </Skeleton.Loader>
        </div> */}
      </div>
    </Skeleton.Provider>
  );
}
