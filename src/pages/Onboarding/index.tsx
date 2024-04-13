import { ElementType, useCallback, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Question } from './Question';
import {
  ArbitrumLogo,
  Button,
  Card,
  EthereumLogo,
  Input,
  PolkaJSYellowIcon,
  PolygonLogo,
  SolanaLogo,
} from 'components';
import {
  Chain,
  DappType,
  Plan,
  ProjectType,
  Response,
  ResponseOption,
  BillingDetailsType,
} from 'types';
import { arrayOfSize, classes, pathTo } from 'utils';
import { useOnboardingMutation } from 'gql';
import { useApi } from 'contexts';
import { useDidOnboarding } from 'hooks';
import PlanDetails from './PlanDetails';
import { useCookies } from 'react-cookie';

const chains: ResponseOption<Chain>[] = [
  ...(
    [
      ['ethereum', 'Ethereum', EthereumLogo],
      ['polygon', 'Polygon', PolygonLogo],
      ['arbitrum', 'Arbitrum', ArbitrumLogo],
      ['solana', 'Solana', SolanaLogo],
      ['polkadot', 'Polkadot', PolkaJSYellowIcon],
    ] as [Chain, string, ElementType][]
  ).map(([chain, name, Logo]: [Chain, string, ElementType]) => {
    return {
      label: (
        <div className="flex items-center leading-none space-x-2">
          <Logo
            className={classes(
              chain === 'polygon' && 'rotate-[290deg]',
              chain === 'polkadot' && 'rounded-full'
            )}
          />
          <span>{name}</span>
        </div>
      ),
      value: chain,
    };
  }),
  {
    label: 'Other',
    value: 'other',
  },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { account } = useApi();
  const [didOnboarding, setDidOnboarding] = useState({});
  const [cookies, setCookie] = useCookies(['didOnboarding']);
  const [page, setPage] = useState(0);
  const [dappType, setDappType] = useState<Response<DappType>>({});
  const [chain, setChain] = useState<Response<Chain>>({});
  const [projectType, setProjectType] = useState<Response<ProjectType>>({});
  const [plan, setPlan] = useState<Response<Plan>>({});
  const [billingDetails, setBillingDetails] = useState<BillingDetailsType>({
    firstName: '',
    lastName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    address: '',
  });

  const handleBillingDetailsChange = (e: string, name: string) => {
    setBillingDetails((prevState) => {
      return {
        ...prevState,
        [name]: e,
      };
    });
  };

  const plans: ResponseOption<Plan>[] = useMemo(() => {
    return [
      ...([['free'], ['standard'], ['business']] as [Plan][]).map(([planOption]: [Plan]) => {
        switch (planOption) {
          case 'free':
            return {
              label: <PlanDetails planOption={planOption} selected={plan.value} />,
              value: planOption,
            };
          case 'standard':
            return {
              label: <PlanDetails planOption={planOption} selected={plan.value} />,
              value: planOption,
            };
          default:
            return {
              label: <PlanDetails planOption={planOption} selected={plan.value} />,
              value: planOption,
            };
        }
      }),
    ];
  }, [plan]);

  const [submit] = useOnboardingMutation();

  const [contents, isAnswered]: [React.ReactNode, boolean] = useMemo(() => {
    switch (page) {
      case 0:
        return [
          <Question<ProjectType>
            key="project-type"
            header="What type of project are you building?"
            text="Select the category of project from the list below that perfectly describes your dApp."
            value={projectType}
            onChange={setProjectType}
            options={[
              { label: 'NFT', value: 'nft' },
              { label: 'DeFi', value: 'defi' },
              { label: 'Analytics', value: 'analytics' },
              { label: 'DAO', value: 'dao' },
              { label: 'Other', value: 'other' },
            ]}
          />,
          !!projectType.value,
        ];

      case 1:
        return [
          <Question<Chain>
            key="chain"
            header="What chain are you building on?"
            text="Which blockchain do you prefer to use for your dApp?"
            value={chain}
            onChange={setChain}
            options={chains}
          />,
          !!chain.value, // && (chain.value !== 'other' || !!chain.extra),
        ];

      default: // TODO : change this to case 2 when implementing
        return [
          <Question<DappType>
            key="dapp-type"
            header="What kind of dApp do you intend to build?"
            text="Solo chain dApps are designed to run on a single chain. Cross-chain dApps, in contrast, share data and messages across multiple blockchains."
            value={dappType}
            onChange={setDappType}
            options={[
              { label: 'Solo-Chain', value: 'solo-chain' },
              { label: 'Cross-Chain', value: 'cross-chain' },
            ]}
          />,
          !!dappType.value,
        ];
      // case 3:
      //   return [
      //     <Question<Plan>
      //       key="plans"
      //       header="Choose your plan"
      //       text="Get access to the entire Analog Watch platform, start querying any data from any connected chain, and pay only for what you use."
      //       value={plan}
      //       onChange={setPlan}
      //       options={plans}
      //       classNames={{
      //         optionContainer:
      //           'sm:h-[135px] !sm:w-[153px] !w-full h-full p-0 justify-start items-start py-[9px] px-4 relative',
      //       }}
      //     />,
      //     !!plan.value,
      //   ];
      // default:
      //   return [
      //     <div className="mt-[24px]">
      //       <h4 className="text-left text-2xl font-normal leading-[32px]">Add payment details</h4>
      //       <div className="text-base leading-6 font-normal text-[#B2B3B8] text-left w-full mt-2">
      //         Add a payment method that you’ll use to curate and query data from your favorite
      //         blockchains.
      //       </div>
      //       <div className="flex sm:flex-row flex-col mt-[24px] gap-4">
      //         <Input
      //           className="border border-solid  w-full h-12 border-[#1F1F1F] rounded-full text-white px-2"
      //           placeholder="First Name"
      //           classNames={{ input: 'text-white ' }}
      //           type="text"
      //           name="firstName"
      //           label={<span className="mx-2">First Name</span>}
      //           labelType="interior"
      //           value={billingDetails.firstName}
      //           onChange={(e) => {
      //             // let value = e;
      //             // value = value.replace(/[^A-Za-z]/gi, '');
      //             handleBillingDetailsChange(e, 'firstName');
      //           }}
      //           filter={/[^A-Za-z]/gi}
      //         />
      //         <Input
      //           className="border border-solid  w-full h-12 border-[#1F1F1F] rounded-full text-white px-2"
      //           placeholder="Last Name"
      //           type="text"
      //           name="lastName"
      //           label={<span className="mx-2">Last Name</span>}
      //           labelType="interior"
      //           classNames={{ input: 'text-white ' }}
      //           value={billingDetails.lastName}
      //           onChange={(e) => handleBillingDetailsChange(e, 'lastName')}
      //           filter={/[^A-Za-z]/gi}
      //         />
      //       </div>
      //       <div className="flex sm:flex-row flex-col mt-4 gap-4">
      //         <Input
      //           className="border border-solid w-full h-12 border-[#1F1F1F] rounded-full text-white px-2"
      //           placeholder="Card Number"
      //           type="text"
      //           name="cardNumber"
      //           label={<span className="mx-2">Card Number</span>}
      //           labelType="interior"
      //           classNames={{ input: 'text-white' }}
      //           value={billingDetails.cardNumber}
      //           onChange={(e) => {
      //             if (e.replaceAll(' ', '').length < 17) {
      //               let str = e.replaceAll(' ', '');

      //               if (str.length > 0) {
      //                 str = str.split('').reduce((seed, next, index) => {
      //                   if (index !== 0 && !(index % 4)) seed += ' ';
      //                   return seed + next;
      //                 });
      //               }
      //               handleBillingDetailsChange(str, 'cardNumber');
      //             }
      //           }}
      //           filter={/[^\d]/}
      //         />
      //         <div className="flex gap-4 w-full">
      //           <Input
      //             className="border border-solid h-12 w-full border-[#1F1F1F] rounded-full text-white px-2"
      //             placeholder="MM/YY"
      //             type="text"
      //             name="expiryDate"
      //             label={<span className="mx-2">MM/YY</span>}
      //             labelType="interior"
      //             classNames={{ input: 'text-white ' }}
      //             value={billingDetails.expiryDate}
      //             onChange={(e) => {
      //               if (e.length < 5) {
      //                 let str;
      //                 if (e.length < 3) {
      //                   str = e;
      //                 } else {
      //                   str = e.slice(0, 2) + '/' + e.slice(2);
      //                 }

      //                 handleBillingDetailsChange(str, 'expiryDate');
      //               }
      //             }}
      //             filter={/[^\d]/g}
      //           />
      //           <Input
      //             className="border border-solid h-12 w-full border-[#1F1F1F] rounded-full text-white px-2"
      //             placeholder="CVV"
      //             type="text"
      //             name="cvv"
      //             label={<span className="mx-2">CVV</span>}
      //             labelType="interior"
      //             classNames={{ input: 'text-white' }}
      //             value={billingDetails.cvv}
      //             onChange={(e) => {
      //               if (e.length < 4) handleBillingDetailsChange(e, 'cvv');
      //             }}
      //             filter={/[^\d]/g}
      //           />
      //         </div>
      //       </div>
      //       <Input
      //         className="border border-solid w-full h-12 border-[#1F1F1F] rounded-full text-white px-2 mt-4"
      //         placeholder="Billing Address"
      //         type="text"
      //         name="address"
      //         label={<span className="mx-2">Billing Address</span>}
      //         labelType="interior"
      //         classNames={{ input: 'text-white ' }}
      //         value={billingDetails.address}
      //         onChange={(e) => handleBillingDetailsChange(e, 'address')}
      //       />
      //     </div>,
      //     // !!plan.value,
      //     !Object.values(billingDetails).some((el) => el === ''),
      //   ];
    }
  }, [chain, dappType, page, projectType, plan, billingDetails]);

  const onSubmit = useCallback(() => {
    if (page < 2) {
      // TODO: change to 4
      setPage((prev) => prev + 1);
    } else {
      if (account?.address) {
        submit({
          variables: { address: account?.address, answers: { projectType, dappType, chain } },
        }).then(() => {
          setDidOnboarding((prev) => ({ ...prev, [account.address]: true }));
        });
      }
      searchParams?.get('redirect') ? navigate(searchParams?.get('redirect') || '') : navigate(-1);
    }
  }, [
    account?.address,
    chain,
    dappType,
    navigate,
    page,
    projectType,
    searchParams,
    setDidOnboarding,
    submit,
  ]);

  useEffect(() => {
    if (!account?.address || didOnboarding[account.address as keyof {}]) {
      navigate(pathTo('Landing'));
    }
  }, [account?.address, didOnboarding, navigate]);

  useEffect(() => {
    setDidOnboarding(cookies.didOnboarding || {});
  }, []);

  useEffect(() => {
    setCookie('didOnboarding', didOnboarding, {
      maxAge: 34560000,
      sameSite: 'strict',
      secure: false,
    });
  }, [didOnboarding]);

  const goBack = useCallback(() => {
    if (account?.address) {
      setDidOnboarding((prev) => ({ ...prev, [account.address]: true }));
    }
    navigate(-1);
  }, [account]);

  return (
    <div className="w-full h-full flex flex-col items-center flex-1">
      <Card className="md:p-10 px-4 py-5 max-w-[573px] flex flex-col rounded-3xl border border-solid border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] shadow-3xl text-white">
        <div className="flex w-full h-1 items-center justify-center space-x-2">
          {/* TODO: change to 5 */}
          {arrayOfSize(3).map((_, i) => {
            return (
              <div
                className={classes(
                  'flex-1 h-full rounded',
                  i <= page
                    ? 'bg-[linear-gradient(92deg,_var(--tw-gradient-stops))] from-[#CEC0F3_0.3%] to-[#C38AF4_53.07%]'
                    : 'bg-[#2A2B3A]'
                )}
                key={`pill-${i}`}
              />
            );
          })}
        </div>

        {contents}
        <div
          className={classes(
            'grid md:grid-cols-3 grid-cols-2 min-h-12 md:mt-8 mt-6 gap-3 btn-group-wrap',
            !!page && 'justify-between'
          )}
        >
          <Button
            className="h-[48px] md:w-[140px] w-full font-normal group back-btn-wrap m-0"
            variant="darkThemeOutlined"
            onClick={() => {
              if (page > 0) {
                setPage((prev) => Math.max(0, prev - 1));
              } else {
                goBack();
              }
            }}
            classNames={{
              container:
                'leading-6 text-base group-hover:text-[#000000] leading-6 text-[#F7F8F8] font-normal',
            }}
          >
            Back
          </Button>
          {!page && (
            <div className="flex-1 md:h-[48px] h-full flex lg:justify-end justify-start a-developer-btn-wrap m-0">
              <Button
                variant="link"
                className="h-full !text-white !normal-case md:p-2 !p-0"
                onClick={goBack}
              >
                I&apos;m not a developer
              </Button>
            </div>
          )}
          <Button
            isDisabled={!isAnswered}
            variant="darkThemeFilled"
            onClick={onSubmit}
            className="md:w-[140px] w-full h-[48px] next-btn-wrap m-0"
            classNames={{ container: 'text-base leading-6 font-normal' }}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
