import { useMemo, useRef } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useIntersectionObserver } from 'usehooks-ts';
import Tooltip from '@mui/material/Tooltip';
import { Publisher } from './Publisher';
import {
  Description,
  FormatBalance,
  ResourceLogo,
  Skeleton,
  Tags,
  Status,
  TimeAgo,
  RefrenceSVG,
  useSkeleton,
  Tag,
} from 'components';
import { SearchResult as ResourceType } from 'types';
import { arrayOfSize, classes, getIsCollection, getIsView, pluralize, resourceLink } from 'utils';
import { useApi } from 'contexts';
import { useWindowSize } from 'hooks';
import { Tag as TagType } from 'gql';

interface Props<T extends ResourceType> {
  value?: T;
  linkProps?: Partial<LinkProps>;
  isList?: boolean;
}

export function Resource<T extends ResourceType>({ linkProps, value, isList = true }: Props<T>) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { isReady } = useApi();
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true, threshold: 0.1 });
  const isVisible = !!entry?.isIntersecting;
  const { windowSize } = useWindowSize();

  const isCard = useMemo(() => !isList || windowSize.width < 768, [isList, windowSize.width]);

  const [to, linkedContent] = useMemo(() => {
    return [
      value ? resourceLink(value) : '#',
      <>
        <div
          className={classes(
            'lg:mb-1 mb-2 flex h-auto flex-col items-baseline md:space-x-2',
            isCard ? 'm-0 h-auto' : 'md:h-auto md:flex-row'
          )}
        >
          <div className=" flex flex-row justify-between w-full">
            <div className="gap-[6px] flex-[2] flex flex-col">
              <h4
                className={classes(
                  'hyperlink flex items-center lg:text-xl text-[16px] text-white',
                  isCard && 'justify-center truncate md:pt-6 mt-4 pb-3 m-0'
                )}
              >
                <Skeleton.Loader
                  isDarkTheme
                  containerClassName={classes('flex flex-1', isCard && 'justify-center')}
                  className={classes('w-[40%]', isCard && 'h-[26px] w-48')}
                >
                  {value?.name}
                  {value && getIsCollection(value) && false && (
                    <Status
                      color="green"
                      className="ml-3 text-xs font-normal text-green-500"
                      dotClassName="mr-1"
                    >
                      Indexed
                    </Status>
                  )}
                </Skeleton.Loader>
              </h4>
              {!isCard && (
                <div className="lg:mb-2 mb-4  w-full ">
                  <div className="flex">
                    <div
                      className={classes(
                        'max-w-full flex-1 leading-none lg:text-base text-[14px] text-[#B2B3B8] break-all '
                      )}
                    >
                      <Skeleton.Loader isDarkTheme className="w-[70%]">
                        <Description value={value?.description} className="line-clamp-1" />
                      </Skeleton.Loader>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {!isCard && (
              <div className="text-[#B2B3B8] flex flex-1 items-start justify-end">
                {value?.__typename === 'SmartContract' && (
                  <Skeleton.Loader isDarkTheme className="w-24 h-[18px] mr-5">
                    <div className="flex items-center justify-center gap-[4px] text-xs">
                      <RefrenceSVG />
                      <div className="whitespace-nowrap">
                        {value?.refs || 0} {pluralize('Reference', value?.refs || 0)}
                      </div>
                    </div>
                  </Skeleton.Loader>
                )}
                <Skeleton.Loader isDarkTheme className="w-16 h-[18px]">
                  <div className="flex items-center ml-2 justify-center gap-2 text-xs ">
                    {value?.__typename === 'SmartContract' && (
                      <span className="md:inline hidden">{' • '}</span>
                    )}
                    <TimeAgo
                      date={value?.createdAt}
                      showIcon
                      className="text-xs flex gap-1 whitespace-nowrap"
                    />
                  </div>
                </Skeleton.Loader>
              </div>
            )}
          </div>
        </div>
      </>,
    ];
  }, [value, isCard]);

  const typeLabel = useMemo(() => {
    let label;
    if (getIsView(value)) {
      label = 'View';
    } else {
      label = 'Smart Contract';
    }

    return (
      <div
        className={classes(
          'md:px-[10px] md:py-[1px] py-1 px-[10px] uppercase text-[10px] lg:w-fit w-fit text-center min-h-[18px] leading-[18px] flex items-center justify-center md:text-[8px] font-[450] text-white bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] rounded-[16px_0]',
          isCard && ' sm:rounded-[20px] rounded-[16px_0] whitespace-pre'
        )}
        key={label}
      >
        {label}
      </div>
    );
  }, [value, isCard]);

  return (
    <div
      className={classes(
        'card h-full relative mb-6 flex w-full last:mb-0 lg:p-5 p-[20px] lg:gap-0 gap-4 border border-solid !border-[#1F1F1F] rounded-3xl !bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] shadow-[0_8px_10px_0px_rgba(0,0,0,0)]',
        !isCard ? 'lg:flex-row' : 'flex-col'
      )}
      ref={ref}
    >
      <Skeleton.Provider isLoading={!value || !isVisible}>
        <Link to={to} {...linkProps}>
          <div
            className={classes(
              'relative lg:mr-4 mr-2 lg:h-32 h-fit w-full',
              !isCard ? 'lg:w-32' : 'w-full'
            )}
          >
            <Skeleton.Loader
              isDarkTheme
              className={classes(
                'h-[123px] w-[123px] !rounded-2xl',
                isCard && 'w-[100%] h-[128px] mb-4'
              )}
            >
              <div className="absolute top-2/4 left-2/4  rounded-[59px] bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] filter blur-[35px] h-1/2 w-20 -translate-y-2/4 -translate-x-2/4"></div>
              <ResourceLogo
                className={classes(
                  'relative mr-6 lg:h-32  lg:min-h-fit min-h-[189px] w-full bg-[#d3cccc14] md:rounded-lg rounded-[20px]',
                  !isCard ? 'lg:w-32' : 'w-full m-0'
                )}
                value={value}
              />

              <div
                className={classes(
                  'absolute bottom-0  right-0 lg:w-fit w-fit',
                  isCard && 'sm:right-1/2 translate-x-2/4 sm:translate-y-2/4 bottom-0 right-[22px]',
                  value?.__typename === 'SmartContract' && isCard && 'right-[55px]'
                )}
              >
                {typeLabel}
              </div>
            </Skeleton.Loader>
          </div>
        </Link>
        <div
          className={classes(
            ' w-full  py-[11px]  overflow-hidden flex  justify-between  items-center flex-col',
            isCard && 'p-0'
          )}
        >
          {value ? (
            <Link to={to} {...linkProps} className="w-full">
              {linkedContent}
            </Link>
          ) : (
            <div className="w-full">{linkedContent}</div>
          )}
          <div
            className={classes(
              'flex w-full gap-[5px] text-xs text-neutral-500 pointer-events-auto break-all flex-row items-center  whitespace-pre-line flex-wrap'
            )}
          >
            <div
              className={classes(
                'flex gap-[5px] flex-[1_0_100%] md:flex-[0_0_auto] w-full justify-between items-center',
                isCard && 'justify-center'
              )}
            >
              {/* <Tags
                className={classes('m-0 flex-1 gap-2 space-x-0', isCard && 'justify-center')}
                isDarkTheme
                value={value?.tags}
                classNames={{
                  tagBase: 'h-[unset] m-0 first:m-0 ',
                  tagName: 'px-[8px] py-[4px]',
                }}
              /> */}
              <ul
                className={classes(
                  'flex flex-wrap items-center space-x-reverse text-[0.66rem] m-0 flex-1 gap-2 space-x-0',
                  isCard && 'justify-center'
                )}
              >
                {(!value ? arrayOfSize(3).map(() => undefined) : value.tags).map((tag, index) => {
                  if (index < 3)
                    return (
                      <Tag
                        isDarkTheme
                        key={tag?.id}
                        classNames={{ base: 'h-[unset] m-0', name: 'px-[8px] py-[4px]' }}
                        {...(tag?.isChainTag
                          ? {
                              icon: (
                                <img
                                  src={`/logos/chain/${tag?.name?.toLowerCase()}.svg`}
                                  alt={tag?.slug}
                                />
                              ),
                            }
                          : {})}
                      >
                        {tag?.name}
                      </Tag>
                    );
                })}
                {!!value?.tags?.length && value.tags.length - 3 > 0 && (
                  <Tooltip
                    placement="top"
                    classes={{
                      tooltip: '!max-w-[420px]',
                    }}
                    title={
                      <div className="flex flex-wrap space-x-1">
                        {value?.tags?.map((tag, index) => {
                          if (index > 2)
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
                      <div
                        className={classes(
                          'text-sm bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] bg-clip-text text-transparent cursor-default'
                        )}
                      >
                        <Skeleton.Loader isDarkTheme>See More</Skeleton.Loader>
                      </div>
                    }
                  />
                )}
              </ul>
              {!isCard && (
                <div className="flex gap-[8px] items-center">
                  <Skeleton.Loader isDarkTheme className="w-64 h-[18px] !rounded-2xl">
                    <div className="whitespace-pre">Publisher:</div>{' '}
                    <Publisher
                      value={value?.publisher}
                      withLink
                      isTruncated={windowSize.width <= 657}
                      className="md:text-xs !text-[#B15EBE]"
                    />
                  </Skeleton.Loader>
                </div>
              )}
            </div>
          </div>
          {value && isVisible && isReady && (
            <>
              {getIsCollection(value) && (
                <div className="lg:absolute  bottom-4 right-4 flex lg:items-baseline items-end lg:mt-0 mt-4 justify-start text-xs leading-none">
                  <Skeleton.Loader
                    isDarkTheme
                    containerClassName="flex flex-1"
                    className="h-full w-full"
                  >
                    Earnings:
                    <FormatBalance className="ml-2 text-sm font-medium leading-none" value={'0'} />
                  </Skeleton.Loader>
                </div>
              )}
            </>
          )}
        </div>
      </Skeleton.Provider>
    </div>
  );
}
