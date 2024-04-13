import { Image } from 'components';
import { classes } from 'utils';

export function Features() {
  const data = [
    {
      title: 'Build faster!',
      description:
        'Start exploring your own collections or views on the Analog Watch by publishing them with just a few clicks.',
      svgComponent: 'BuildFasterSVG.svg',
    },
    {
      title: 'Full functionality, low code!',
      description:
        'Structured schemas and data, combined with the ability to seamlessly switch between smart contracts across various chains, simplify the building process within any ecosystem.',
      svgComponent: 'FullFunctionalitySVG.svg',
    },
  ];

  return (
    <div className="flex justify-center">
      <div className="lg:gap-10 gap-6 flex md:flex-row w-full flex-col">
        {data.map((item, index) => (
          <div className="group w-full mt-12" key={index}>
            <div
              className={classes(
                'flex-1  relative border rounded-3xl border-solid border-[#2A2B3A]  group-hover:border-white transition-[border-color] duration-[450ms] ease-in-out overflow-hidden lg:px-[50px] lg:py-[40px] px-[23px] pt-[18px] pb-[50px] h-full ',
                index === 0 && 'bg-[url(/BuildFasterBG.webp)] bg-center bg-cover'
              )}
            >
              <div className="">
                <div className="lg:text-[32px] text-[24px] leading-8 bg-[linear-gradient(93deg,_var(--tw-gradient-stops))] from-[#FFF_0%] to-[#ffffff99_100%] bg-clip-text text-transparent w-fit ">
                  {item.title}
                </div>
                <div className="text-[#B2B3B8] mt-[9px] min-h-[100px]">{item.description}</div>
              </div>

              <div className="flex justify-center lg:w-full w-2/4 m-auto max-w-[325px]">
                <Image
                  src={item.svgComponent}
                  width={index === 0 ? '100%' : undefined}
                  classNames={{ base: 'w-full' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
