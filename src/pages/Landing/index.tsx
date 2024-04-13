import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import GetStarted from './GetStartedSection';
import { NextStep } from './NextStep';
import { AboutSection } from './AboutSection';
import { Features } from './Features';
import { Banner } from './Banner';
import {
  SectionHeaderChip,
  ArrowRightIcon,
  Button,
  AnalogClock,
  Image,
} from 'components';
import { pathTo } from 'utils';
import { useWindowSize } from 'hooks';

function HowItWorks() {
  const { windowSize } = useWindowSize();

  const svg = useMemo(() => {
    if (windowSize.width <= 991) {
      return 'MobileHowItWorks.svg';
    }
    return 'DiagramsHowItWorks.svg';
  }, [windowSize]);

  return (
    <div className="flex flex-col justify-center items-center lg:my-[80px] lg:py-[80px] my-[50px] py-[50px]">
      <SectionHeaderChip text="Learn More" />
      <div className="text-white lg:mt-9 mt-[18px] lg:text-[60px] text-[32px] lg:leading-[56px] leading-[42px]">
        How It Works
      </div>
      <Image
        src={svg}
        loading="lazy"
        classNames={{ image: 'lg:mt-[62px] mt-[28px] w-full', base: 'w-full' }}
      />
    </div>
  );
}

export function Landing() {
  const { windowSize, isMobile } = useWindowSize();

  const bg = useMemo(() => {
    if (windowSize.width <= 425) {
      return 'MainBannerBackground.webp';
    }
    return 'LeaveFeedback.webp';
  }, [windowSize]);

  return (
    <div className="bg-black">
      <div className="relative overflow-hidden rounded-b-3xl">
        <Banner
          title={
            <div className="text-white lg:py-6 py-[18px] text-center lg:text-[100px] text-[50px] font-normal leading-[60px] lg:leading-[100px] fadeInUp ">
              Analog Watch
            </div>
          }
          description={
            <div className="text-white lg:leading-9 lg:text-2xl text-lg max-w-[697px] text-center text-[#FFFFFFD9] fadeInUp">
              The most flexible, low-code, and developer friendly platform for deploying and
              querying blockchain data for your Web3 project
            </div>
          }
          sectionHeaderChip={
            <SectionHeaderChip
              text="Powered by Analog"
              className="bg-[#1A1A1A] gap-[6px] p-[6px_12px] h-8 flex items-center justify-center fadeInUp"
              icon={<AnalogClock className="w-4 h-[17px] inline-block " />}
              textClassName="text-[#F7F8F8] leading-[18.2px]"
            />
          }
          classNames={{
            main: ' flex  flex-col items-center lg:min-h-[675px] min-h-[700px]  lg:h-auto lg:px-0 px-4 lg:pt-0 pt-[7rem] justify-start lg:justify-center',
            base: 'relative z-10 ',
          }}
          button={
            <Link to={pathTo('ViewBuilder')} className="lg:mt-8 mt-5 fadeInUp">
              <Button
                className="p-[12px_24px] flex rounded-full h-[46px]"
                variant="plain"
                style={{
                  background:
                    'linear-gradient(0deg, #FFF 0%, #FFF 100%), linear-gradient(95deg, #5D3EF8 -12.23%, #BA4CD6 117.24%)',
                }}
              >
                <span className="text-[#010314] text-base leading-[22px]">Start Building</span>
                <ArrowRightIcon className="w-[24px] h-[24px] pl-[6px]" />
              </Button>
            </Link>
          }
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="rounded-b-3xl absolute sm:top-0 top-1/4 left-0 w-full object-cover h-full	"
        >
          <source
            src={windowSize.width <= 640 ? 'MobileBG.mp4' : 'DesktopBG.mp4'}
            type="video/mp4"
          />
        </video>
      </div>
      <Features />
      <AboutSection />
      <GetStarted />
      <div className="relative">
        <div className="absolute md:top-[-757px] top-[-500px] left-[0%] w-[100%] md:h-[1150px] h-[750px]  bg-[radial-gradient(68%_62%_at_50%_50%,_var(--tw-gradient-stops))] from-[#4f3bce33]  via-[#99162e11] to-transparent " />
        <HowItWorks />
      </div>
      <NextStep />
      <Banner
        classNames={{
          base: `mt-[83px] bg-[url(/${bg})] bg-center rounded-[25px] bg-no-repeat bg-cover`,
          main: 'text-center sm:min-h-[666px] flex flex-col items-center w-full lg:gap-8 gap-[20px] justify-center h-full p-[18px]',
        }}
        title={
          <div className="text-center max-w-[500px] lg:text-[60px] text-[32px] lg:leading-[80px] lg:max-w-[944px] bg-[radial-gradient(100%_100%_at_50%_100%,_var(--tw-gradient-stops))] to-[#FFF] from-[#ffffff99] bg-clip-text text-transparent">
            Analog Watch Beta version is launched for the partner’s testnet, we greatly value your
            input and feedback
          </div>
        }
        button={
          <Button
            className="p-[12px_24px] flex rounded-full"
            variant="plain"
            style={{
              background:
                'linear-gradient(0deg, #FFF 0%, #FFF 100%), linear-gradient(95deg, #5D3EF8 -12.23%, #BA4CD6 117.24%)',
            }}
            onClick={() => window.open('https://l5d87lam6fy.typeform.com/to/vIawULKc', '_blank')}
          >
            <span className="text-[#010314] text-base leading-[22px]">Leave Feedback</span>
            <ArrowRightIcon className="w-[18px] h-[18px] pl-[6px]" />
          </Button>
        }
      />
    </div>
  );
}
