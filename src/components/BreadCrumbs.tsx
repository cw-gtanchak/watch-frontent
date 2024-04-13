import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { Fragment, ReactNode } from 'react';
import { ArrowLeftIcon } from './icons';
import { Skeleton } from './Skeleton';
import { ClassNames, HTMLAttributes, Page } from 'types';
import { classes, pathTo } from 'utils';
import { useBreadCrumbs } from 'contexts/BreadCrumbs';

type BreadCrumb = {
  page: Page;
  label?: ReactNode;
  props?: LinkProps;
};

interface Props extends HTMLAttributes<HTMLDivElement> {
  classNames?: ClassNames<'icon'>;
  value?: BreadCrumb[];
}

const LABELS: Partial<Record<Page, ReactNode>> = {
  Library: 'Library',
  SmartContract: 'Smart Contract',
  View: 'View',
  Collection: 'Collection',
  MyProfile: 'My Profile',
  Publisher: 'Publisher',
  ApiKey: 'API Key',
  FundingActivity: 'Funding Activity',
  BalanceHistory: 'Balance History',
};

export function BreadCrumbs({ className, classNames }: Props) {
  const [breadCrumbs] = useBreadCrumbs();
  const navigate = useNavigate();

  if (!breadCrumbs) {
    return null;
  }

  return (
    <div
      className={classes(
        'text-md md:mb-8 mb-4 flex flex-wrap items-center space-x-2 w-fit p-2 pl-0 select-none',
        classNames?.base,
        className
      )}
    >
        <Skeleton.Loader isDarkTheme className="w-16 h-5">
      <ArrowLeftIcon
        className={classes('mr-4 inline-block h-5 w-5 text-white cursor-pointer', classNames?.icon)}
        onClick={() => navigate(-1)}
      />
      {breadCrumbs.map(({ page, params }, index) => (
        <Fragment key={index}>
            <Link
              className="hyperlink !text-white"
              to={pathTo(page, ...(params || []))}
              state={{ bcIndex: index }}
            >
              {LABELS[page]}
            </Link>
          {index < breadCrumbs.length - 1 && <span className="text-white">/</span>}
        </Fragment>
      ))}
      </Skeleton.Loader>
    </div>
  );
}
