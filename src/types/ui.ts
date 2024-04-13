import { ReactNode } from 'react';
import { ClassNamesConfig, OptionProps, Props as ReactSelectProps } from 'react-select';
export type { Maybe } from '@watch/common';

export type Page =
  | 'Landing'
  | 'Library'
  | 'Onboarding'
  | 'SmartContract'
  | 'Collection'
  | 'View'
  | 'MyProfile'
  | 'Publisher'
  | 'CreateCollection'
  | 'ViewBuilder'
  | 'ApiKey'
  | 'FundingActivity'
  | 'BalanceHistory'
  | 'NotFound'
  | 'ContactUs';

export type BreadCrumb = {
  page: Page;
  params?: (string | undefined)[];
};

export type SimpleSpread<L, R> = R & Pick<L, Exclude<keyof L, keyof R>>;

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type ClassNames<T extends string | never = never> = Partial<
  { base?: string } & Record<T, string | undefined>
>;

export type SortBy = 'createdAt' | 'refs' | 'earnings' | 'status';

export type Option<T> = {
  label: ReactNode;
  value: T;
};

export type CheckBoxProps = HTMLAttributes<HTMLInputElement> & {
  classNames?: ClassNames<'checkMark' | 'checked:base' | 'checked:checkMark'>;
  isChecked?: boolean;
  isDisabled?: boolean;
  isDarkTheme?: boolean;
  variant?: 'default' | 'circle';
};

export type SelectionIndicator = (_: OptionProps) => React.ElementType;

export interface SelectOption<T> {
  value: T;
  label: React.ReactNode;
}

export type SelectProps<T> = SimpleSpread<
  React.HTMLAttributes<HTMLDivElement>,
  {
    checkboxProps?: CheckBoxProps;
    classNames?: Partial<ClassNamesConfig<unknown>>;
    value: T | undefined;
    onChange: (_: T) => void;
    customLabel?: React.ReactNode | null;
    ltr?: boolean;
    isLibrary?: boolean;
    isDarkTheme?: boolean;
    isSortByViewBuilder?: boolean;
  } & Pick<
    ReactSelectProps<SelectOption<T>, false>,
    | 'components'
    | 'formatOptionLabel'
    | 'isDisabled'
    | 'isSearchable'
    | 'menuIsOpen'
    | 'menuPlacement'
    | 'options'
    | 'placeholder'
  >
>;

export type HTMLAttributes<T> = React.HTMLAttributes<T> & {
  className?: string;
};

export interface FormatOptions {
  decimalPlaces?: number;
  symbol?: string | null;
  tokenDecimals?: number;
}

export interface Tab {
  label: React.ReactNode;
  alternateLabel?: React.ReactNode;
  child: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export interface UseTabs {
  selectedTab: number;
  setSelectedTab: Setter<number>;
  tabs: Tab[];
  tabSelector: React.ReactNode;
  tabPanels: React.ReactNode;
}

export interface TableCol {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  format?: (_: any) => React.ReactNode;
}

export type FundExchangefn = ({
  amount,
  setFundRefAddress,
  setError,
}: {
  amount: number;
  setFundRefAddress: React.Dispatch<string | undefined>;
  setError: React.Dispatch<string>;
}) => void;

export type MockRow = Record<string, unknown>;
