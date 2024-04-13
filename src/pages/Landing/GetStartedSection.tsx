import { Fragment, createRef, useMemo, useRef, useState } from 'react';
import { RadioGroup, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon, Button, Image, SectionHeaderChip } from 'components';
import { classes, pathTo } from 'utils';
import { DOCS } from 'consts';
import { SearchType } from 'gql';

const OPTIONS = [
  { label: 'Define Data', value: 'defineData' },
  { label: 'Query', value: 'query' },
];

const libraryDetailsList = [
  {
    libraryName: 'Smart Contracts',
    description: `Listing Smart Contracts and their functions only takes a few minutes—select your smart contract to get started now!`,
    image: (
      <Image
        src="Smart-contract-image.svg"
        loading="lazy"
        classNames={{ image: 'max-h-[306px]' }}
      />
    ),
    navigationState: SearchType.SmartContracts,
  },
  {
    libraryName: 'View',
    description:
      'Views allow you to define your business logic however you like, and Analog Watch makes this a breeze!',
    image: <Image src="View-image.svg" loading="lazy" classNames={{ image: 'max-h-[306px]' }} />,
    navigationState: SearchType.Views,
  },
];

const queryOptions = [
  { label: 'Install SDK’s', value: 'install_sdks' },
  { label: 'Authentication', value: 'authentication' },
  { label: 'Initialize', value: 'initialize' },
  { label: 'Query View / Collection', value: 'query_view_collection' },
];

const queryContents = {
  install_sdks: (
    <>
      {'// Authentication wasm client'}
      <br />
      <span className="text-[#E04B4B]">npm install</span> @analog-labs/timegraph-wasm or{' '}
      <span className="text-[#E04B4B]">yarn add </span>
      @analog-labs/timegraph-wasm
      <br />
      {' // timegraph javascript client'}
      <br />
      <span className="text-[#E04B4B]">npm install</span> @analog-labs/timegraph-js{' '}
      <span className="text-[#E04B4B]">yarn add </span>
      @analog-labs/timegraph-js
    </>
  ),
  authentication: (
    <>
      <span className="text-[#3487C0]">import</span> {'{ TimegraphClient, keygen }'}{' '}
      <span className="text-[#3487C0]">from</span>{' '}
      <span className="text-[#3AA057]">{'"@analog-labs/timegraph-js"'}</span>;
      <br /> {'// 1. Initialise Keygen'}
      <br /> <span className="text-[#3487C0]">const</span> _keygen ={' '}
      <span className="text-[#3487C0]">new </span>
      <span className="text-[#E04B4B]">Keygen</span>( ... );
      <br /> {'// 2. create api key'} <br />
      <span className="text-[#3487C0]">const</span> apiKey = _keygen.
      <span className="text-[#E04B4B]">createApiKey</span>( ... );
      <br /> {'// 3. create session key'}
      <br /> <span className="text-[#3487C0]">const</span> sessionKey = _keygen.
      <span className="text-[#E04B4B]">createSessionkey</span>( ... );
      <br /> {'// 4. init timegraph client'}
      <br /> <span className="text-[#3487C0]">const</span> timegraph ={' '}
      <span className="text-[#3487C0]">new</span>{' '}
      <span className="text-[#E04B4B]">TimegraphClient</span>( ... );
      <br /> {'// 5. create user on timegraph'}
      <br />
      timegraph.user.
      <span className="text-[#E04B4B]">create</span>( ... );
      <br /> {'// 6. certify your key on timegraph'}
      <br /> timegraph.apiKey.
      <span className="text-[#E04B4B]">certify</span>( ... );
    </>
  ),
  initialize: (
    <>
      <span className="text-[#3487C0]">import</span> {'{TimegraphClient}'}{' '}
      <span className="text-[#3487C0]">from</span>{' '}
      <span className="text-[#3AA057]">{'"@analog-labs/timegraph-js"'}</span>;
      <br />
      <span className="text-[#3487C0]">const</span> timegraph ={' '}
      <span className="text-[#3487C0]">new</span>{' '}
      <span className="text-[#E04B4B]">TimegraphClient</span>
      {'({'}
      <br />
      <span className="text-[#CE3281]">url:</span>{' '}
      <span className="text-[#3AA057]">{"'http://localhost:4000'"}</span>,
      <br />
      <span className="text-[#CE3281]">sessionKey:</span>{' '}
      <span className="text-[#3AA057]">{"'0;2Evg4riXZjyK3...'"}</span>
      <br />
      {'})'};
    </>
  ),
  query_view_collection: (
    <>
      {'// 1. collection query'}
      <br />
      <span className="text-[#3487C0]">const</span> response = timegraph.collection.
      <span className="text-[#CE3281]">data</span>
      {'({'}
      <br />
      <span className="text-[#CE3281]">hashId:</span>{' '}
      <span className="text-[#3AA057]">{'"<hash id of the collection>"'}</span>,
      <br />
      <span className="text-[#CE3281]">fields:</span>{' '}
      <span className="text-[#3AA057]">[{'"<fields to return>"'}]</span>,
      <br />
      <span className="text-[#CE3281]">limit:</span>{' '}
      <span className="text-[#3AA057]">{'"<no of records required>"'}</span>,
      <br />
      {'})'};<br />
      {'// 2. view query'}
      <br />
      <span className="text-[#3487C0]">const</span> response = timegraph.view.
      <span className="text-[#CE3281]">data</span>
      {'( ... )'}
    </>
  ),
};

const LibraryDetailsTab = () => {
  const [active, setActive] = useState(0);
  const [isShowing, setIsShowing] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setInterval>>();
  const activeLibrary = libraryDetailsList[active];

  const changeActive = (action: 'prev' | 'next') => {
    if (
      (action === 'prev' && active) ||
      (action === 'next' && active !== libraryDetailsList.length - 1)
    ) {
      setIsShowing(false);
    }
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsShowing(true);
      action === 'prev'
        ? setActive((prev) => prev && prev - 1)
        : setActive((prev) => (prev === libraryDetailsList.length - 1 ? prev : prev + 1));
    }, 150);
  };

  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-150"
      enterFrom="opacity-10"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-10"
    >
      <div className="flex justify-between gap-5 lg:flex-row flex-col items-center ">
        {activeLibrary.image}
        <div className="lg:w-[486px] sm:w-[556px]">
          <div className="normal-case md:text-[32px] text-2xl leading-[32px]">
            {activeLibrary.libraryName}
          </div>
          <p className="mt-4 text-[#ffffffc2]">{activeLibrary.description}</p>
          <div className="flex space-x-2 mt-4 lg:mt-8">
            <Link
              className="flex items-center font-normal text-base text-black bg-white p-[12px_24px] rounded-full"
              to={pathTo('Library')}
              state={{ tab: activeLibrary.navigationState }}
            >
              Get Started
              <ArrowRightIcon className="w-5 h-5 ml-2" />
            </Link>
          </div>
          <div className="flex lg:mt-12 mt-6 justify-between items-center">
            <div>
              {active + 1}
              <span className="opacity-50">/{libraryDetailsList.length}</span>
            </div>
            <div className="flex gap-6">
              <div className="group">
                <Button
                  className={classes(
                    'flex h-12 w-12 items-center justify-center rounded-full border border-[#ffffff4d] group-hover:bg-white',
                    active === 0 && 'opacity-50 '
                  )}
                  variant="plain"
                  onClick={() => changeActive('prev')}
                >
                  <ArrowLeftIcon className="w-5 h-5 group-hover:text-black " />
                </Button>
              </div>
              <div className="group">
                <Button
                  className={classes(
                    'flex h-12 w-12 items-center justify-center rounded-full border border-[#ffffff4d] group-hover:bg-white ',
                    active === libraryDetailsList.length - 1 && 'opacity-50'
                  )}
                  variant="plain"
                  onClick={() => changeActive('next')}
                >
                  <ArrowRightIcon className="w-5 h-5 group-hover:text-black " />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
};

const QueryTab = () => {
  const [selectedQueryTab, setSelectedQueryTab] = useState<
    'install_sdks' | 'authentication' | 'initialize' | 'query_view_collection'
  >('install_sdks');

  const myRef = useRef([]);

  myRef.current = useMemo(() => queryOptions.map((el, i) => myRef.current[i] ?? createRef()), []);

  return (
    <div>
      <RadioGroup
        className="flex grow md:gap-12 gap-4 items-start border-b border-[#212121] no-scrollbar overflow-auto whitespace-nowrap"
        value={selectedQueryTab}
        onChange={setSelectedQueryTab}
      >
        {queryOptions.map(({ label, value }, index) => {
          return (
            <RadioGroup.Option as={Fragment} key={value} value={value}>
              {({ checked }) => (
                <div
                  className={classes(
                    'cursor-pointer md:text-xl text-base font-normal py-4 text-white ',
                    checked &&
                      'bg-[linear-gradient(95deg,_var(--tw-gradient-stops))] from-[#5D3EF8_-12.23%] to-[#aa34c7_117.24%] bg-clip-text text-[#d8d8d89a] border-b-2 [border-image:linear-gradient(#CEC0F3,_#C38AF4)_30]'
                  )}
                  ref={myRef.current[index]}
                  onClick={() => {
                    // @ts-ignore
                    myRef.current[index].current.scrollIntoView({
                      behaviour: 'smooth',
                      block: 'nearest',
                    });
                  }}
                >
                  {index + 1}. {label}
                </div>
              )}
            </RadioGroup.Option>
          );
        })}
      </RadioGroup>
      <div className="border border-[#212121] md:rounded-3xl rounded-2xl mt-6 md:h-[296px] h-[304px] relative bg-[linear-gradient(180deg,_var(--tw-gradient-stops))] from-[#ffffff03] to-[#ffffff0a]">
        <div className="flex gap-1.5 items-center border-b border-[#212121] md:h-[52px] h-[38px] md:px-[30px] px-4">
          <div className="h-1.5 w-1.5 rounded bg-[#ffffff80]"></div>
          <div className="h-1.5 w-1.5 rounded bg-[#ffffff80]"></div>
          <div className="h-1.5 w-1.5 rounded bg-[#ffffff80]"></div>
        </div>
        <div className="bg-[radial-gradient(50%_50%_at_50%_50%,_var(--tw-gradient-stops))] z-[-1] from-[#c261fe26] to-[#FFFFFF00] absolute top-0 left-0 bottom-0 right-0 " />
        <div className="md:px-[30px] px-4 md:py-5 py-4 text-[#ffffffb3] md:text-lg text-base leading-[30px] font-normal overflow-auto md:h-4/5 h-[85%] scrollbar-dark w-[99%] absolute">
          {queryContents[selectedQueryTab]}
        </div>
      </div>
      <div className="flex space-x-2 mt-8 justify-center">
        <a
          className="flex items-center font-normal text-base text-black bg-white p-[12px_24px] h-12 rounded-full"
          href={`${DOCS}/developers/analog-watch/quickstart`}
          target="_blank"
          rel="noreferrer"
        >
          Get Started
          <ArrowRightIcon className="w-5 h-5 ml-2" />
        </a>
      </div>
    </div>
  );
};

const GetStarted = () => {
  const [selectedNav, setSelectedNav] = useState('defineData');

  return (
    <div className="w-full flex justify-start items-center flex-col">
      <div className="pt-20 text-white w-full max-w-[1200px]  z-10 relative lg:pb-[80px]">
        <div className="flex justify-center flex-col items-center">
          <SectionHeaderChip text="Get Started" />
          <div className="mt-[4%] normal-case md:text-5xl lg:text-6xl text-3xl">
            Lets Get Started
          </div>
        </div>
        <div className="mt-[33px]">
          <RadioGroup
            className="flex grow space-x-2 items-start"
            value={selectedNav}
            onChange={setSelectedNav}
          >
            {OPTIONS.map(({ label, value }, index) => {
              return (
                <RadioGroup.Option as={Fragment} key={value} value={value}>
                  {({ checked }) => (
                    <div
                      className={classes(
                        'relative cursor-pointer md:text-xl text-base font-normal py-4 px-3 text-white',
                        checked &&
                          'bg-[linear-gradient(95deg,_var(--tw-gradient-stops))] from-[#5D3EF8_-12.23%] to-[#aa34c7_117.24%] bg-clip-text text-[#d8d8d89a] px-8 border border-[#212121] rounded-t-3xl before:content-[" "] before:absolute before:bottom-[-2px] before:-left-10 before:h-10 before:w-10 before:rounded-[0_0_50%_0] before:border-r before:border-b before:border-[#212121] before:shadow-[15px_15px_0_#010101] after:content-[" "] after:absolute after:bottom-[-2px] after:-right-10 after:h-10 after:w-10 after:rounded-[0_0_0_50%] after:border-l after:border-b after:border-[#212121] after:shadow-[-15px_15px_0_#010101]',
                        !index &&
                          'before:rounded-none before:border-b-0 before:-bottom-6 before:shadow-[15px_0px_0_#010101]'
                      )}
                    >
                      {label}
                      {checked && (
                        <div className="absolute h-[3px] w-11/12 bottom-[-3px] left-0 bg-[#010101]" />
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
              );
            })}
          </RadioGroup>
          <div className="border border-[#212121] p-4 md:p-[50px] rounded-3xl">
            {selectedNav === 'defineData' && <LibraryDetailsTab />}
            {selectedNav === 'query' && <QueryTab />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
