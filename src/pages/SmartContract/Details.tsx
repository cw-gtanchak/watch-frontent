import {
  Button,
  CopyButton,
  Description,
  Publisher,
  ResourceLogo,
  Skeleton,
  Statistics,
  Tag,
  TimeAgo,
} from 'components';
import { useSmartContract } from 'contexts';
import { useWindowSize } from 'hooks';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { arrayOfSize, classes } from 'utils';
import Tooltip from '@mui/material/Tooltip';

export function Details() {
  const {
    windowSize: { width },
  } = useWindowSize();
  const { resource: smartContract, isResourceLoading } = useSmartContract();
  const address = `0x${smartContract?.address.replace(/^0x/, '')}`;

  const ref = useRef(null);

  return (
    <div className="card !mb-8 sm:mb-12 relative sm:p-6 p-4 !bg-[#000] rounded-[24px] border !border-[#1F1F1F] sm:!border-transparent">
      <div className="flex w-full items-start gap-3 sm:gap-6 sm:flex-row flex-col">
        <div className="flex justify-start sm:flex-row flex-col gap-3 sm:gap-6 items-start w-full">
          <div className="flex sm:justify-between justify-start sm:w-auto w-full items-center gap-3 sm:gap-6">
            <Skeleton.Loader isDarkTheme className="sm:h-[128px] h-[65px] sm:w-[128px] w-[65px]">
              <div className="flex flex-col relative overflow-hidden rounded-2xl">
                <div className="absolute top-2/4 left-2/4 rounded-[59px] bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] filter blur-[25px] h-1/2 w-20 -translate-y-2/4 -translate-x-2/4"></div>
                <ResourceLogo
                  value={smartContract}
                  className={classes(
                    'relative mr-6 sm:h-32 h-16 sm:min-h-fit min-h-[65px] bg-[#d3cccc14] rounded-[16px] sm:w-32 w-full m-0'
                  )}
                />
                <div className="absolute bottom-0 right-0 sm:h-[18px] h-[10px] sm:flex hidden items-center justify-center uppercase bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] text-white sm:text-[8px] text-[4px] rounded-[16px_0px] p-[1px_10px]">
                  Smart Contract
                </div>
              </div>
            </Skeleton.Loader>
            <Skeleton.Loader isDarkTheme containerClassName="w-full" className="h-[18px] w-[100%]">
              <h2 className="flex sm:hidden text-white text-lg">{smartContract?.name}</h2>
            </Skeleton.Loader>
          </div>
          <div className="flex w-full max-w-[600px] flex-col items-start space-y-2 text-white">
            <Skeleton.Loader
              isDarkTheme
              containerClassName="w-full"
              className="sm:w-[70%] w-full sm:h-7 h-[18px] mt-3"
            >
              <h2 className="hidden sm:flex text-2xl">{smartContract?.name}</h2>
            </Skeleton.Loader>
            <div className="w-full text-sm sm:text-base text-[#B2B3B8] sm:!mt-[6px] !mt-0 whitespace-pre-line break-all">
              <Skeleton.Loader isDarkTheme className="h-[19px] sm:w-[35%] w-[50%]">
                <Description value={smartContract?.description} />
              </Skeleton.Loader>
            </div>
            <div
              className={classes(
                'flex-wrap items-center text-[0.66rem] text-sm flex sm:!mt-4 !mt-3 gap-2',
                isResourceLoading && 'flex-row'
              )}
            >
              {(isResourceLoading ? arrayOfSize(3).map(() => undefined) : smartContract?.tags)?.map(
                (tag, index) => {
                  if (index < 5)
                    return (
                      <Tag
                        isDarkTheme
                        {...(tag?.isChainTag
                          ? {
                              icon: (
                                <img
                                  src={`/logos/chain/${tag.name?.toLowerCase()}.svg`}
                                  alt={tag.slug}
                                />
                              ),
                            }
                          : {})}
                        classNames={{ name: 'text-[10px] pl-0', base: 'list-none' }}
                      >
                        {tag?.name}
                      </Tag>
                    );
                }
              )}
              {!!smartContract?.tags?.length && smartContract?.tags?.length - 5 > 0 && (
                <Tooltip
                  placement="bottom"
                  classes={{ tooltip: '!max-w-[420px]' }}
                  title={
                    <div className="flex flex-wrap space-x-1">
                      {smartContract?.tags?.map((tag, index) => {
                        if (index > 4)
                          return (
                            <Tag
                              isDarkTheme
                              {...(tag?.isChainTag
                                ? {
                                    icon: (
                                      <img
                                        src={`/logos/chain/${tag.name?.toLowerCase()}.svg`}
                                        alt={tag.slug}
                                      />
                                    ),
                                  }
                                : {})}
                              classNames={{ name: 'text-[10px] pl-0', base: 'list-none' }}
                            >
                              {tag?.name}
                            </Tag>
                          );
                      })}
                    </div>
                  }
                  arrow
                  children={
                    <div className="mb-2 bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] bg-clip-text text-transparent cursor-default select-none">
                      <Skeleton.Loader isDarkTheme>See More</Skeleton.Loader>
                    </div>
                  }
                />
              )}
            </div>
          </div>
        </div>
        <Skeleton.Loader
          isDarkTheme
          containerClassName="sm:w-[auto] w-full"
          className="sm:w-[150px] w-full h-[40px]"
        >
          <Link className="sm:w-auto w-full min-w-[150px]" to={'/view-builder'}>
            <Button
              className="w-full"
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

      <Statistics
        value={[
          {
            label: 'Publisher',
            value: smartContract && (
              <Publisher
                isTruncated
                withLink
                value={smartContract.publisher}
                className="sm:text-xl text-[18px] !text-white hover:underline"
              />
            ),
          },
          {
            label: 'Contract address',
            value: smartContract && (
              <div className="flex items-center md:text-base leading-none sm:text-xl text-[18px] !text-white">
                {address}
                <CopyButton className="ml-2" value={address} />
              </div>
            ),
          },
          {
            label: 'Date Created',
            value: smartContract && (
              <TimeAgo
                date={smartContract.createdAt}
                className="sm:text-xl text-[18px] !text-white"
              />
            ),
          },
        ]}
        withBorder={width >= 640 ? true : false}
        isDarkTheme
        classNames={{
          base: '!pt-3 sm:!pt-3 border-t border-[#1F1F1F] sm:mt-6 mt-4 sm:flex-row flex-col sm:h-20 h-auto sm:items-center items-start',
          strings: 'flex-col-reverse gap-1 sm:gap-2',
          label: '!text-sm !text-[#B2B3B8] capitalize',
          separator: 'h-[61px]',
          stat: 'sm:mr-auto m-0 break-all',
        }}
      />
    </div>
  );
}
