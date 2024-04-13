import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useOnClickOutside } from 'usehooks-ts';
import { AccountMenu } from './AccountMenu';
import { AnalogLogo } from './svg';
import { classes, isMobileOS, pathTo, truncate } from 'utils';
import { useApi } from 'contexts';
import { DOCS } from 'consts';
import { Identicon } from './Identicon';
import { ChevronDownIcon } from './icons';
import MobileAccountMenu from './MobileAccountMenu';
import { useWindowSize } from 'hooks';

const navClassName =
  'sticky top-0 z-40 h-[72px] w-full border-gray-200 bg-black font-["Neue_Montreal"] z-[99]';

const isMobileOSBool = isMobileOS();

export function NavBar({ isOnboarding }: { isOnboarding?: boolean }) {
  const location = useLocation();
  const ref = useRef(null);
  const { account, onConnect } = useApi();
  const [isMobileAccountModalOpen, setIsMobileAccountModalOpen] = useState(false);
  const { windowSize } = useWindowSize();

  const navBarLinks = useMemo(
    () => ({
      [pathTo('Library')]: 'Library',
      [pathTo('ViewBuilder')]: 'View Builder',
      [location.pathname + '?list-smart-contracts=true']: 'Smart Contracts',
      ...(account && windowSize.width < 992 ? { [pathTo('MyProfile')]: 'My Profile' } : {}),
    }),
    [account, location, windowSize]
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const page = useMemo(() => location.pathname, [location]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useOnClickOutside(ref, () => setIsMenuOpen(false));


  useEffect(() => {
    if (isMenuOpen) {
      document.querySelector('body')?.classList.add('stop-scrolling');
    } else {
      document.querySelector('body')?.classList.remove('stop-scrolling');
    }
  }, [isMenuOpen]);

  if (isOnboarding) {
    return (
      <nav className={navClassName}>
        <div className="container mx-auto flex h-full w-full max-w-[1250px] flex-wrap items-center justify-center px-4 xl:w-auto xl:px-0">
          <AnalogLogo />
        </div>
      </nav>
    );
  }

  return (
    <nav
      ref={ref}
      className={classes(
        navClassName,
        page === '/' && 'border-b border-solid border-b-[#ffffff26] bg-[#010101] w-full'
      )}
    >
      <div
        className={classes(
          ' m-auto flex h-full max-w-[1200px] items-center relative px-4 xl:px-0 justify-between lg:flex-row flex-col bg-',
          page === '/' && 'px-[16px] md:px-[60px]'
        )}
      >
        <div className="flex items-center left-0 z-10 lg:w-auto w-full lg:justify-normal justify-between lg:h-auto h-full">
          <Link to={pathTo('Landing')} className="flex items-center lg:mr-4 mr-2">
            <AnalogLogo />
          </Link>

          <div className="flex items-center">
            {isMobileOSBool ? (
              account ? (
                <div
                  className="border border-solid border-[#2A2B3A] rounded-[40px] mr-2 w-[145px] px-2 py-[6px] flex items-center justify-between lg:hidden "
                  onClick={() => setIsMobileAccountModalOpen(true)}
                >
                  <div className="flex items-center">
                    <Identicon value={account.address} className="h-6 w-6" />
                    <div className="text-white flex flex-col text-[10px] ml-[6px]">
                      <p className="text-xs">{account.meta?.name}</p>
                      <p>{truncate(account.address)}</p>
                    </div>
                  </div>
                  <ChevronDownIcon className="h-[18px] w-[18px] text-white" />
                </div>
              ) : (
                <div
                  className="flex font-normal text-sm text-black bg-white px-4 rounded-full items-center h-8 normal-case m-0 w-[117px] min-w-fit mr-2 whitespace-nowrap"
                  onClick={() => {
                    onConnect();
                    setIsMobileAccountModalOpen(true);
                  }}
                >
                  Connect Wallet
                </div>
              )
            ) : undefined}
            <button
              className="relative -top-[2px] block h-6 w-6 cursor-pointer lg:hidden"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              <div
                className={classes(
                  "transition-menu-button before:transition-menu-button after:transition-menu-button absolute h-[2px] w-5 bg-white duration-300 ease-in-out before:absolute before:-top-2 before:block before:h-[2px] before:w-5 before:bg-white before:duration-300 before:ease-in-out before:content-[''] after:absolute after:top-2 after:block after:h-[2px] after:w-5 after:bg-white after:duration-300 after:ease-in-out after:content-['']",
                  isMenuOpen &&
                    'bg-transparent before:top-0 before:rotate-45 after:top-0 after:-rotate-45'
                )}
              />
            </button>
          </div>
        </div>
        <div
          className={classes(
            `lg:relative fixed bg-black lg:h-auto  w-full lg:w-auto  left-0 flex flex-1 justify-end lg:flex-row flex-col lg:mt-0 lg:max-h-full max-h-0 mt-[72px]`,
            isMenuOpen &&
              ' before:top-0 before:rotate-45 after:top-0 after:-rotate-45 h-[calc(100%_-_72px)] justify-start max-h-full lg:px-0 px-4 pb-4 lg:pb-0'
          )}
        >
          <div
            className={classes(
              'overflow-hidden uppercase border-none border-[#ffffff33] lg:rounded-full transition-all duration-300 ease-in-out xl:max-w-[343px] lg:block lg:h-12 lg:max-h-12 lg:w-auto lg:transition-none lg:m-auto m-0 w-full max-w-full'
            )}
            id="navbar-default"
          >
            <ul className="xl:absolute xl:left-1/4 lg:left-0 xl:-translate-x-1/4 flex h-full flex-col items-center rounded-[100px] lg:border border-[#ffffff33] lg:mt-0 lg:flex-row  lg:font-normal lg:bg-[#000] ">
              {Object.entries(navBarLinks).map(([to, label]) => (
                <li
                  key={to}
                  className="w-full lg:border-none lg:w-auto lg:overflow-hidden lg:overflow-ellipsis lg:whitespace-nowrap border-b border-[#ffffff1f]"
                >
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      classes(
                        'block p-3 text-white lg:py-2 px-5 normal-case text-[14px] lg:text-base m-1',
                        isActive &&
                          label !== 'Smart Contracts' &&
                          'text-white focus:text-white bg-opacity-10 bg-white border-r-0 rounded-[32px]'
                      )
                    }
                    aria-current="page"
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div
            className={classes(
              'flex h-full items-center  mt-auto lg:mt-0 lg:w-auto sm:w-2/4 w-full lg:mx-0 mx-auto',
              isMenuOpen
                ? 'h-auto max-h-full overflow-visible  gap-2 flex-col-reverse '
                : 'lg:overflow-visible overflow-hidden gap-4'
            )}
          >
            <Link className=" w-full lg:w-auto" to={DOCS} rel="noopener noreferrer" target="_blank">
              <button className="hover:bg-var-transparent focus:bg-var-transparent flex items-center justify-center h-[40px] rounded-full   bg-transparent px-4 py-2.5 font-normal normal-case text-white w-full lg:w-auto text-center">
                Documentation
              </button>
            </Link>
            {!isMobileOSBool ? (
              account?.address ? (
                <AccountMenu />
              ) : (
                <Link
                  className="flex items-center justify-center font-normal text-base text-black bg-white px-4 h-[40px] rounded-full  text-center normal-case m-0 w-full lg:w-auto"
                  to={'?connect'}
                >
                  Connect Wallet
                </Link>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
        <div
          className={classes(
            'm-auto flex justify-center',
            isMenuOpen ? 'h-auto max-h-full overflow-auto m-0 justify-start' : ' overflow-hidden '
          )}
        ></div>
        {isMobileOSBool && (
          <MobileAccountMenu
            isOpen={isMobileAccountModalOpen}
            setIsOpen={setIsMobileAccountModalOpen}
          />
        )}
      </div>
    </nav>
  );
}
