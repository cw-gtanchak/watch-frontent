import { createContext, useCallback, useContext, useMemo } from 'react';
import {
  default as ReactSelect,
  components,
  DropdownIndicatorProps,
  GroupBase,
  OptionProps,
  Props as ReactSelectProps,
  SingleValueProps,
  ClassNamesConfig,
  StylesConfig,
} from 'react-select';
import { ChevronDownIcon } from './icons';
import { CheckBox } from './CheckBox';
import { classes } from 'utils';
import type { SelectProps, SelectOption, CheckBoxProps } from 'types';

interface Customizations {
  label?: React.ReactNode;
  ltr?: boolean;
  checkboxProps?: CheckBoxProps;
}

const CLASS_NAMES: Partial<ClassNamesConfig<unknown>> = {
  clearIndicator: () => '',
  control: ({ isFocused }) =>
    classes(
      'relative flex h-full min-h-0 w-full cursor-pointer items-center rounded-none border border-solid border-neutral-400 bg-white p-3 text-left text-sm shadow-sm hover:border-neutral-500 focus:border-blue-500 focus:outline-none',
      isFocused ? 'border-blue-500 hover:border-white' : 'border-neutral-300 hover:border-white'
    ),

  valueContainer: () => classes('block min-w-0 flex-1 truncate'),
  dropdownIndicator: () => classes('ml-1 text-[#f7f8f8]'),
  indicatorSeparator: () => 'hidden',
  input: () => 'm-0',
  menu: () =>
    '!z-[101] py-2 absolute w-full max-h-80 overflow-y-auto absolute min-w-full overflow-y-auto bg-black border border-[#141414] border-solid text-sm rounded-lg',
  option: ({ isSelected }) =>
    classes(
      'flex cursor-pointer items-center space-x-2 px-4 py-2 text-[#B2B3B8] ',
      isSelected && 'text-white'
    ),
};

function mergeClassNames<T, U extends boolean, V extends GroupBase<T>>(
  extra: Partial<ClassNamesConfig<T, U, V>>
): Partial<ClassNamesConfig<T, U, V>> {
  return Object.entries(CLASS_NAMES).reduce((res, [key, fn]) => {
    const k = key as keyof StylesConfig<T, U, V>;
    return {
      ...res,
      [key]:
        extra[k] !== undefined
          ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (state: any) => classes(fn(state), (extra[k] as typeof fn)(state))
          : fn,
    };
  }, {}) as unknown as ClassNamesConfig<T, U, V>;
}

const CustomizeContext = createContext<Customizations>({});

function isGroupedOptions<T>(
  options: ReactSelectProps<SelectOption<T>, false>['options']
): options is GroupBase<SelectOption<T>>[] {
  try {
    return !!options && (options as GroupBase<SelectOption<T>>[])[0].options !== undefined;
  } catch (e) {
    return false;
  }
}

function SingleValue<T>(props: SingleValueProps<SelectOption<T>, false>) {
  const { label } = useContext(CustomizeContext);
  return <components.SingleValue {...props}>{label || props.children}</components.SingleValue>;
}

function Option<T>(props: OptionProps<SelectOption<T>, false>) {
  const { ltr, checkboxProps = {} } = useContext(CustomizeContext);
  const children = [
    <div className="flex-1" key="content">
      {props.children}
    </div>,
    <div key="checkbox">
      <CheckBox
        isChecked={props.isSelected}
        {...checkboxProps}
        classNames={{
          base: `${
            props.isSelected ? 'bg-white' : 'bg-black'
          } border border-[#47484A] rounded-full`,
          checkMark: 'text-black',
        }}
      />
    </div>,
  ];
  return (
    <components.Option {...props} className={classes(props.className)}>
      {ltr ? children.reverse() : children}
    </components.Option>
  );
}

function DropdownIndicator<T>(props: DropdownIndicatorProps<SelectOption<T>, false>) {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon
        className={classes(
          'h-4 w-4 transition-transform',
          props.selectProps.menuIsOpen && 'rotate-180'
        )}
      />
    </components.DropdownIndicator>
  );
}

export function Select<T>({
  checkboxProps = {},
  className = '',
  classNames: propsClassNames = {},
  components = {},
  customLabel,
  formatOptionLabel,
  ltr = false,
  isDisabled = false,
  isSearchable = false,
  menuIsOpen,
  menuPlacement = 'auto',
  onChange: _onChange,
  options = [],
  placeholder,
  value: _value,
  isLibrary = false,
  isSortByViewBuilder = false,
}: SelectProps<T>) {
  const onChange = useCallback(
    (option: SelectOption<T> | null): void => {
      option && _onChange(option.value);
    },
    [_onChange]
  );

  const value = useMemo(() => {
    if (isGroupedOptions(options)) {
      return options
        .reduce((result: SelectOption<T>[], { options }) => [...result, ...options], [])
        .find(({ value }) => value === _value);
    }

    return (options as SelectOption<T>[]).find(({ value }) => value === _value);
  }, [options, _value]);

  const classNames = useMemo(
    () =>
      mergeClassNames(propsClassNames) as ClassNamesConfig<
        SelectOption<T>,
        false,
        GroupBase<SelectOption<T>>
      >,
    [propsClassNames]
  );

  return (
    <CustomizeContext.Provider value={{ label: customLabel, ltr, checkboxProps }}>
      <ReactSelect<SelectOption<T>, false, GroupBase<SelectOption<T>>>
        className={classes('relative cursor-pointer', className)}
        classNames={{
          ...classNames,
          menuList: () =>
            classes(isSortByViewBuilder && 'scrollbar-white md:!max-h-[300px] !max-h-[unset]'),
        }}
        components={{ DropdownIndicator, Option, SingleValue, ...components }}
        formatOptionLabel={formatOptionLabel}
        isDisabled={isDisabled}
        isSearchable={isSearchable}
        menuIsOpen={menuIsOpen}
        menuPlacement={menuPlacement}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={{
          control: (provided) => {
            const tempObj = { ...provided, minHeight: 'auto', cursor: 'pointer' };
            if (isLibrary) {
              tempObj.border = 0;
              tempObj.color = '#F7F8F8';
              tempObj.backgroundColor = 'transparent';
              tempObj.boxShadow = 'none';
            }
            return tempObj;
          },
          input: (provided) => ({ ...provided, color: 'unset' }),
          menu: (provided) => {
            // delete provided.width;
            if (isLibrary) {
              provided.width = '128px';
              provided.position = 'absolute';
              provided.right = 0;
              provided.marginTop = '11px';
            } else {
              delete provided.width;
            }
            return provided;
          },
          option: () => ({}),
        }}
        unstyled
        value={value}
      />
    </CustomizeContext.Provider>
  );
}

export function SelectInline<T>(props: SelectProps<T>) {
  return (
    <Select<T>
      checkboxProps={{
        classNames: {
          base: 'hidden',
        },
      }}
      className="ml-2 inline-block"
      classNames={{
        control: () => `!bg-transparent text-blue-500 text-right p-0 text-sm border-0`,
        option: () => 'px-1 py-2 text-xs text-right',
        menu: () => 'right-0 w-24',
      }}
      components={{
        DropdownIndicator: (props) => (
          <components.DropdownIndicator {...props}>
            <ChevronDownIcon className={classes('ml-1 h-3 text-neutral-500')} />
          </components.DropdownIndicator>
        ),
      }}
      {...props}
    />
  );
}
