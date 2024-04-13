import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { DOCS } from 'consts';
import { SectionHeaderChip, Image, TwitterLogo, TelegramLogo } from 'components';

export function NextStep() {
  const data = [
    {
      icon: 'BuildIcon.svg',
      title: 'Build',
      description:
        'Visit our Docs to learn more about how to build on Analog Watch through quick start and developer guides.',
      buttonText: 'Learn more',
      buttonLink: `${DOCS}/developers/analog-watch`,
    },
    {
      icon: 'TutorialIcon.svg',
      title: 'Tutorials',
      description: 'Watch our tutorials and walkthroughs to learn more about Analog Watch.',
      buttonText: 'Watch videos',
      buttonLink: `https://www.youtube.com/@AnalogOneOfficial`,
    },
    {
      icon: 'ConnectWithUsIcon.svg',
      title: 'Connect With Us',
      description: (
        <div>
          Join our tech community on{' '}
          <a
            className="cursor-pointer text-[#C38AF4]"
            target="_blank"
            href="https://discord.com/invite/analog"
            rel="noreferrer"
          >
            Discord{' '}
          </a>
          to ask any questions.
        </div>
      ),
      buttons: (
        <div className="absolute bottom-[38px] flex flex-row justify-center w-full gap-4 ">
          <a
            href="https://twitter.com/OneAnalog"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 border border-solid rounded-lg border-[#2A2B3A] flex justify-center items-center hover:border-white transition-[border-color] duration-[450ms] ease-in-out "
          >
            <TwitterLogo />
          </a>
          <a
            target="_blank"
            href="https://t.me/analogtimer"
            rel="noreferrer"
            className="w-9 h-9 border border-solid rounded-lg border-[#2A2B3A] flex justify-center items-center hover:border-white transition-[border-color] duration-[450ms] ease-in-out "
          >
            <TelegramLogo />
          </a>
        </div>
      ),
    },
  ];

  return (
    <div className="md:mt-[220px] mt-[50px] flex flex-col justify-center items-center w-full">
      <SectionHeaderChip text="What’s Next ?" className="whitespace-nowrap" />
      <div className="mt-[4%] text-white md:text-5xl lg:text-6xl text-3xl">Take the Next Step</div>
      <div className="text-[#B2B3B8] lg:text-2xl text-xl leading-9 max-w-[660px] text-center mt-[29px] ">
        Whether you’re a DApp developer or Web3 enthusiast, here’s what you need to start building
        on the Analog Watch.
      </div>
      <div className="flex flex-row xl:justify-center items-center gap-4 sm:gap-10 w-full flex-nowrap no-scrollbar overflow-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="sm:w-[373px] w-[310px] md:h-[488px] h-[440px] rounded-[22px] relative overflow-hidden border border-solid shrink-0 border-[#2A2B3A] mt-[47px] hover:border-white transition-[border-color] duration-[450ms] ease-in-out "
          >
            <Image src={item.icon} className="absolute z-10" loading="lazy" />
            {index === 1 && (
              <Image
                src="/TutorialBG.webp"
                loading="lazy"
                className="absolute bottom-0 h-full w-full"
              />
            )}
            <div className="bg-[linear-gradient(93deg,_var(--tw-gradient-stops))] from-[#00000033_3.65%] to-[#ca2cf136_91.15%] blur-[92px] w-[258px] h-[258px] top-0 flex left-[30px] absolute"></div>
            <div className="flex flex-col justify-center items-center absolute top-[54%]">
              <div className=" text-[28px] leading-[40px] text-center bg-[linear-gradient(93deg,_var(--tw-gradient-stops))] from-[#FFF_0%] to-[#ffffff99_100%] bg-clip-text text-transparent">
                {item.title}
              </div>
              <div
                className={`${
                  index !== 1 ? 'text-[#B2B3B8]' : ' text-[#B4BCD0]'
                } mt-4 w-5/6 text-center`}
              >
                {item.description}
              </div>
            </div>
            {item.buttonText ? (
              <a
                className="flex flex-row justify-center items-center gap-1 w-fit absolute bottom-9 left-[50%] -translate-x-1/2"
                href={item.buttonLink}
                target="_blank"
                rel="noreferrer"
              >
                <span className="text-white w-fit leading-6">{item.buttonText}</span>
                <ArrowRightIcon color="white" className="w-[18px] h-[18px]" />
              </a>
            ) : (
              item.buttons
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
