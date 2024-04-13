import { ReactNode, useState } from 'react';
import { ClassNames, HTMLAttributes } from 'types';
import { AnalogLogo } from './svg';
import { ChevronDownIcon } from './icons';
import { DOCS } from 'consts';
import { Button } from './Button';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'icon'>;
  error?: ReactNode;
}

const options = [
  {
    title: 'Build',
    list: [
      {
        name: 'Quick Start',
        link: `${DOCS}/developers/analog-watch/quickstart`,
      },
      { name: 'SDK Setup', link: `${DOCS}/quick-start/watch-sdk` },
      { name: 'Developer Guides', link: `${DOCS}/developers/analog-watch/developers-guide` },
    ],
  },
  {
    title: 'Learn',
    list: [
      { name: 'Analog Watch', link: `${DOCS}/developers/analog-watch` },
      { name: 'Partner’s Program', link: 'https://www.analog.one/partners-program' },
    ],
  },
  {
    title: 'Support',
    list: [
      { name: 'Contact Us', mailTo: 'support@analog.one' },
      { name: 'Discord', link: 'https://discord.com/invite/analog' },
      { name: 'Feedback', link: 'https://l5d87lam6fy.typeform.com/to/vIawULKc' },
      { name: 'FAQ', link: 'https://docs.analog.one/documentation/faqs' },
    ],
  },
];

export function Footer({ children, className, classNames, error, ...props }: Props) {
  const [expandedOption, setExpandedOption] = useState<number>();

  return (
    <div className={classes('flex w-full flex-col items-center', className)}>
      <div className="mb-[35px] md:mt-[35px] mt-[100px]  pt-4 px-0 sm:px-0 w-full max-w-[1200px]">
        <div>
          <div className="flex flex-col justify-between md:flex-row gap-5">
            <div>
              <AnalogLogo />
              <div className="mt-4 text-[#B2B3B8] lg:max-w-[407px]  sm:text-sm sm:leading-[22px]">
                A suite of developer toolkits that provide fast and scalable on-chain data through a
                unified API across a multi-chain ecosystem.
              </div>
            </div>
            <div className="flex  xl:gap-[100px] lg:gap-[50px] md:gap-4 sm:flex-row flex-col">
              {options.map((option, index) => (
                <div className="flex-1" key={option.title}>
                  <div className=" h-[1px] bg-[#ffffff14] my-3 sm:hidden" />
                  <div
                    className="text-white leading-[48px] w-full sm:w-fit flex items-center justify-between"
                    onClick={() =>
                      setExpandedOption((prev) => (prev === -1 || prev !== index ? index : -1))
                    }
                  >
                    {option.title}
                    <Button
                      variant="plain"
                      className={classes(
                        'w-6 h-6 sm:hidden transition-all ease-in-out duration-500',
                        index === expandedOption && '-rotate-180'
                      )}
                    >
                      <ChevronDownIcon />
                    </Button>
                  </div>
                  <div
                    className={classes(
                      'flex flex-col gap-[6px] sm:max-h-40 max-h-0 overflow-hidden transition-all ease-in-out duration-500',
                      index === expandedOption && 'max-h-40'
                    )}
                  >
                    {option.list.map((listItem) => (
                      <a
                        key={listItem.name}
                        href={listItem.link || `mailto:${listItem.mailTo}`}
                        target={listItem.link ? '_blank' : '_self'}
                        className="text-[#B2B3B8] text-sm leading-[22px] sm:w-[160px] cursor-pointer hover:text-white transition-[color]"
                        rel="noreferrer"
                      >
                        {listItem.name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[inherit] h-[1px] bg-[#ffffff14] sm:my-8 mt-3 mb-8" />
        <div className="text-[#B2B3B8] text-sm leading-6">
          © Copyright 2023 | All Rights Reserved
        </div>
      </div>
    </div>
  );
}
