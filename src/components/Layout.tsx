import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';
import { CookiesProvider, useCookies } from 'react-cookie';
import moment from 'moment';
import { NavBar } from './NavBar';
import { ScrollToTop } from './ScrollToTop';
import { HelpMe } from './HelpMe';
import { Footer } from './Footer';
import { classes } from 'utils';
import { ApiProvider, LibraryProvider, NewViewBuilderProvider } from 'contexts';
import { ClassNames } from 'types';
import { BreadCrumbsProvider } from 'contexts/BreadCrumbs';
import { useParmsState, useWindowSize } from 'hooks';
import { ListSmartContracts } from 'pages';
import { ListSmartContractsProvider } from 'pages/ListSmartContracts/useListSmartContracts';

const client = new QueryClient();

interface Props {
  classNames?: ClassNames<'inner'>;
  isOnboarding?: boolean;
  isLanding?: boolean;
}

export function Layout({ classNames, isOnboarding, isLanding }: Props) {
  const location = useLocation();
  const [isListSmartContract] = useParmsState('list-smart-contracts');
  const [cookies, setCookie, removeCookie] = useCookies([
    'cookieDate',
    'sessionKey',
    'account',
    'didOnboarding',
  ]);

  const isWide = useMemo(
    () => /(view-builder$)|(smart-contract\/.*\/collection$)/.test(location.pathname),
    [location]
  );

  const { isMobile } = useWindowSize();

  useEffect(() => {
    localStorage.clear();

    if (!cookies.cookieDate && cookies.account) {
      setCookie('cookieDate', Date.now(), { maxAge: 34560000 });
    } else {
      const a = moment(cookies.cookieDate);
      const b = moment(Date.now());

      const diff = b.diff(a, 'days');

      if (diff > 350) {
        const temp = [
          { key: 'cookieDate', value: Date.now() },
          { key: 'account', value: cookies.account },
          { key: 'sessionKey', value: cookies.sessionKey },
          { key: 'didOnboarding', value: cookies.didOnboarding },
        ];

        temp.map((cookie) => {
          return setCookie(
            cookie.key as 'cookieDate' | 'sessionKey' | 'account' | 'didOnboarding',
            cookie.value,
            {
              maxAge: 34560000,
              sameSite: 'strict',
              secure: false,
            }
          );
        });
      }
    }
  }, [cookies.account]);

  return (
    <BreadCrumbsProvider>
      <CookiesProvider>
        <ApiProvider>
          <ScrollToTop />
          <LibraryProvider>
            <NewViewBuilderProvider>
              <QueryClientProvider client={client}>
                <NavBar isOnboarding={isOnboarding} />
                <main
                  className={classes(
                    'relative flex w-full items-center  justify-center lg:px-6 sm:px-4 px-2 flex-col',
                    "bg-black font-['Neue_Montreal'] lg:px-2 px-0",
                    isOnboarding && 'justify-start',
                    classNames?.base
                  )}
                  style={{ minHeight: 'calc(100vh - 72px' }}
                >
                  <div
                    className={classes(
                      'md:min-h-[inherit] w-full pt-10 md:bg-contain sm:bg-contain bg-contain lg:bg-auto md:pt-5',
                      isWide || isLanding ? 'max-w-[1376px]' : 'max-w-[1250px]',
                      !isLanding &&
                        'max-w-[1392px] lg:px-6 px-4 lg:pt-8 pt-[30px] bg-[url("/appBackground.png")] rounded-3xl bg-no-repeat dark bg-contain bg-top',
                      !isLanding &&
                        isMobile &&
                        'bg-[url("/appBackgroundMobile.png")] bg-contain bg-top',
                      classNames?.inner,
                      isLanding && 'sm:pt-0 pt-10',
                      /(view-builder$)|(library$)|(smart-contract)|(view)|(profile)/.test(
                        location.pathname
                      ) && 'md:bg-contain sm:bg-contain bg-contain lg:bg-auto md:pt-5',
                      isOnboarding && 'md:pt-[30px] pt-[94px]'
                    )}
                  >
                    <Outlet />
                    {isListSmartContract && (
                      <ListSmartContractsProvider>
                        <ListSmartContracts />
                      </ListSmartContractsProvider>
                    )}
                  </div>
                  {!isOnboarding && <Footer className="px-4" />}
                </main>
              </QueryClientProvider>
            </NewViewBuilderProvider>
          </LibraryProvider>
          <Toaster
            position="bottom-right"
            toastOptions={{ className: '!bg-neutral-800 !text-white', duration: 2000 }}
          />
          {/* {!isLanding && !isMobile && <HelpMe />} */}
        </ApiProvider>
      </CookiesProvider>
    </BreadCrumbsProvider>
  );
}
