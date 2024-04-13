import { Link } from 'react-router-dom';
import {
  ArrowRightIcon,
  Button,
  Card,
  DocumentationIcon,
  EarningsIcon,
  Icon,
  Skeleton,
} from 'components';
import { DOCS } from 'consts';

const data = [
  {
    title: 'Query published collections or views',
    description:
      'Learn how to query published collections and views by following our detailed guides.',
    Svg: EarningsIcon,
    link: `${DOCS}/developer-guide`,
  },
  {
    title: 'Quick start guides',
    description:
      'Get familiar with deploying and querying your own collections and views on the Watch.',
    Svg: DocumentationIcon,
    link: `${DOCS}/quick-start`,
  },
];

export function GetStarted() {
  return (
    <div className="">
      <div className="flex md:flex-row flex-col md:gap-10 gap-6 w-full">
        {data.map(({ Svg, description, title, link }, index) => (
          <div
            key={index}
            className="md:max-w-[580px] max-w-[unset] w-full flex items-center flex-col min-h-[337px] rounded-3xl border border-solid border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] relative overflow-hidden"
          >
            <div className="absolute left-1/2 -translate-x-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="308"
                height="180"
                viewBox="0 0 308 180"
                fill="none"
              >
                <g filter="url(#filter0_f_3168_263563)">
                  <circle
                    cx="157"
                    cy="77"
                    r="90"
                    fill="url(#paint0_linear_3168_263563)"
                    fill-opacity="0.2"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_f_3168_263563"
                    x="-117"
                    y="-197"
                    width="548"
                    height="548"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feGaussianBlur stdDeviation="92" result="effect1_foregroundBlur_3168_263563" />
                  </filter>
                  <linearGradient
                    id="paint0_linear_3168_263563"
                    x1="67"
                    y1="-13"
                    x2="255.342"
                    y2="-3.80166"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop offset="0.0364583" stop-color="#DED1E1" />
                    <stop offset="0.911458" stop-color="#CA2CF1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            <div>
              <Skeleton.Loader isDarkTheme className="w-[128px] h-[128px] mb-5">
                <Svg />
              </Skeleton.Loader>
            </div>
            <div className="w-full text-white text-center flex gap-1 flex-col px-8">
              <Skeleton.Loader isDarkTheme className="h-[24px] !rounded-full">
                <div className="sm:text-[28px] text-[18px] ">{title}</div>
              </Skeleton.Loader>
              <Skeleton.Loader isDarkTheme className="h-[16px] w-[70%] !rounded-full !self-center">
                <div className="max-w-[412px] sm:text-base text-sm w-full !self-center">
                  {description}
                </div>
              </Skeleton.Loader>
            </div>
            <Skeleton.Loader isDarkTheme className="h-[16px] w-[120px] !rounded-full">
              <Link
                to={link}
                className="text-[#B15EBE] flex flex-row items-center gap-[2px] mt-[12px]"
              >
                Start Building
                <ArrowRightIcon className="h-[18px] w-[18px]" />
              </Link>
            </Skeleton.Loader>
          </div>
        ))}
      </div>
    </div>
  );
}
