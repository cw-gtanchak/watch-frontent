import { useMemo } from 'react';
import { XMarkIcon } from './icons';
import { Skeleton } from './Skeleton';
import { CopyButton } from './CopyButton';
import { ClassNames, SimpleSpread } from 'types';
import { INPUT_BASE_CLASSNAME, INPUT_CLASSNAME, classes } from 'utils';

export type Props$Input = SimpleSpread<
  React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  {
    classNames?: ClassNames<'input' | 'label' | 'copyBtn'>;
    isCopyOnly?: boolean;
    isDisabled?: boolean;
    isError?: boolean;
    isClearable?: boolean;
    isPlain?: boolean;
    isDarkTheme?: boolean;
    label?: React.ReactNode;
    labelType?: 'interior' | 'exterior';
    onChange?: (_: string) => void;
    pre?: React.ReactNode;
    filter?: RegExp;
    value?: string | null;
  }
>;

export function Input({
  children,
  className,
  classNames,
  filter,
  isClearable = false,
  isCopyOnly = false,
  isDisabled = false,
  isError = false,
  isPlain = false,
  isDarkTheme = false,
  label,
  labelType = 'interior',
  onChange: _onChange,
  onFocus: _onFocus,
  onInput: _onInput,
  placeholder,
  pre,
  type = 'text',
  value,
}: Props$Input) {
  const [isInterior, props, onInput] = useMemo(() => {
    const isInterior = labelType === 'interior';
    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      _onChange && _onChange(e.target.value);
    };

    const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
      if (isCopyOnly) {
        e.target.select();
      }

      _onFocus && _onFocus(e);
    };

    const onInput =
      filter || _onInput
        ? (e: React.ChangeEvent<HTMLInputElement>) => {
            if (filter) {
              e.target.value = e.target.value.replace(filter, '');
            }

            _onInput && _onInput(e);
          }
        : undefined;

    return [
      isInterior,
      {
        className: isPlain
          ? className
          : classes(
              INPUT_CLASSNAME,
              isDarkTheme && 'text-white',
              isError && 'placeholder:text-red-300',
              isCopyOnly && 'cursor-pointer',
              isDisabled && 'dark:text-gray-500',
              isInterior && !!label && '!px-2',
              isInterior && !!label && value && value.length > 0 && '!pb-1 !pt-4',
              classNames?.input
            ),
        onChange,
        onFocus,
        placeholder,
        type,
        value: value || '',
        ...(isDisabled ? { disabled: true } : {}),
      },
      onInput,
    ];
  }, [
    labelType,
    filter,
    _onInput,
    isPlain,
    className,
    isError,
    isCopyOnly,
    isDisabled,
    label,
    value,
    classNames?.input,
    placeholder,
    type,
    _onChange,
    _onFocus,
  ]);

  if (isPlain) {
    return type === 'textarea' ? <textarea {...props} /> : <input {...props} onInput={onInput} />;
  }

  return (
    <>
      {!isInterior && !!label && (
        <div className={classes('mb-1 w-full text-xs', classNames?.label)}>
          <Skeleton.Loader containerClassName="flex-1 leading-none" className="h-full w-1/2">
            {label}
          </Skeleton.Loader>
        </div>
      )}
      <div
        className={classes(
          INPUT_BASE_CLASSNAME,
          'relative border border-solid border-neutral-200',
          isDarkTheme &&
            'text-white placeholder:text-[#ffffff7a] text-sm border rounded-3xl shadow-[0px_8px_10px_0px_#000,0px_-2px_52px_0px_rgba(200,200,200,0.06)_inset] border-white border-opacity-[0.08]',
          isDisabled && 'bg-neutral-100',
          isError && '!border-red-500 bg-black',
          isCopyOnly && isDarkTheme && '!bg-black bg-none border-none shadow-none gap-3',
          type !== 'textarea' && 'h-10',
          classNames?.base,
          className
        )}
      >
        <Skeleton.Loader
          containerClassName="flex-1 leading-none"
          isDarkTheme
          className="w-full sm:h-[28px] h-[18px] mr-3"
        >
          {pre}
          {type === 'textarea' ? <textarea {...props} /> : <input {...props} onInput={onInput} />}
          {isClearable && value && value.length > 0 && (
            <button onClick={_onChange ? () => _onChange('') : undefined}>
              <XMarkIcon className="h-5 w-5" />
            </button>
          )}
          {isInterior && label && value && value.length > 0 && (
            <div className="absolute left-2 top-[3px] text-[10px] text-neutral-500">{label}</div>
          )}
        </Skeleton.Loader>
        {children}
        <Skeleton.Loader
          containerClassName="flex-1 leading-none"
          className="sm:h-10 h-6 sm:w-10 w-6 !rounded-full !bg-[#141414]"
        >
          {isCopyOnly && (
            <CopyButton
              value={value}
              className={classes(
                isDarkTheme && 'text-white rounded-[61px] bg-[#141414] p-[10px]',
                classNames?.copyBtn
              )}
            />
          )}
        </Skeleton.Loader>
      </div>
    </>
  );
}
