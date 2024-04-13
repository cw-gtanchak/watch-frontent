import { CheckIcon } from './icons';
import { CheckBoxProps, ClassNames, HTMLAttributes, SimpleSpread } from 'types';
import { classes } from 'utils';

type Props = SimpleSpread<
  HTMLAttributes<HTMLInputElement>,
  {
    classNames?: ClassNames<'label' | 'checkBox' | 'checkMark'>;
    checkBoxProps?: Omit<Partial<CheckBoxProps>, 'classNames'>;
    isChecked?: boolean;
    isDisabled?: boolean;

    label: React.ReactNode;
    onChange: (_: boolean) => void;
    value?: string;
  }
>;

export function CheckBox({
  className,
  classNames,
  isChecked,
  isDisabled,
  isDarkTheme,
  variant = 'default',
  ...props
}: CheckBoxProps) {
  const [containerClassName] =
    variant === 'default' ? ['w-5 h-5', 'w-4 h-4 basis-4'] : ['rounded-lg w-3 h-3', 'w-2 h-2'];

  return (
    <div
      className={classes(
        'flex shrink-0 items-center justify-center border border-solid',
        containerClassName,
        isChecked ? 'border-transparent bg-blue-500' : 'border-gray-200',
        isDarkTheme && (isChecked ? 'border-transparent bg-white' : 'border-[#ffffff1f]'),
        isDisabled && 'opacity-60',
        className,
        classNames?.base
      )}
      {...props}
    >
      {isChecked && (
        <CheckIcon
          className={classes(
            'h-3/4 w-3/4 text-white',
            isDarkTheme && 'h-full w-full text-black',
            classNames?.checkMark
          )}
        />
      )}
    </div>
  );
}

export function InputCheckBox({
  checkBoxProps,
  className,
  classNames,
  id,
  isChecked,
  isDisabled,
  label,
  onChange,
  value,
}: Props) {
  return (
    <div
      className={classes('flex items-center', className, classNames?.base)}
      role="checkbox"
      aria-checked={isChecked}
    >
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        disabled={isDisabled}
        onChange={(e) => {
          onChange(!e.target.checked);
        }}
        className="peer hidden"
        value={value}
      />
      <label
        htmlFor={id}
        className={classes('flex cursor-pointer items-center', classNames?.label)}
      >
        <CheckBox
          classNames={{
            base: classes('mr-1', classNames?.checkBox),
            checkMark: classNames?.checkMark,
          }}
          isChecked={isChecked}
          isDisabled={isDisabled}
          {...checkBoxProps}
        />
        {label}
      </label>
    </div>
  );
}
