import { SectionHeaderChip } from 'components';

export function AboutSection() {
  return (
    <div className=" flex justify-center items-center">
      <div className="pt-[90px] w-full flex items-center flex-col">
        <SectionHeaderChip text="About Analog Watch" className="h-8 flex items-center" />
        <div className="text-[#FFFFFF] lg:max-w-[844px] max-w-[500px] text-center lg:text-[60px] text-[32px] lg:leading-[70px] lg:my-6 mb-3 mt-[18px] z-10">
          Analog Watch is your universal gateway to on-chain data
        </div>
        <div className="text-[#B2B3B8] lg:max-w-[600px] max-w-[500px] lg:text-2xl text-lg lg:leading-9 text-center z-10">
          Access data from multiple blockchains through one interface with Analog Watch,
          revolutionizing decentralized applications with seamless, trust-free data queries.
        </div>
        <video autoPlay loop muted playsInline className="md:-mt-[50px]  w-full">
          <source src="/AnalogWatch.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
