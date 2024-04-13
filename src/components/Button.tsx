import { forwardRef } from 'react';
import { ClassNames, HTMLAttributes } from 'types';
import { classes } from 'utils';

type Variant =
  | 'default'
  | 'primary'
  | 'plain'
  | 'negative'
  | 'link'
  | 'darkThemeOutlined'
  | 'darkThemeFilled';

export interface Props$Button extends HTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
  isIcon?: boolean;
  isLoading?: boolean;
  isNegative?: boolean;
  isSubmit?: boolean;
  ref?: React.MutableRefObject<HTMLButtonElement | null>;
  variant?: Variant;
  isDarkTheme?: boolean;
  classNames?: ClassNames<'container'>;
}

export function Buttons({ children, className }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classes('flex space-x-2 [&>*]:flex-1', className)}>{children}</div>;
}

export const Button = forwardRef<HTMLButtonElement, Props$Button>((props, ref) => {
  const {
    children,
    variant = 'secondary',
    className,
    isDisabled,
    isIcon,
    isLoading,
    isNegative,
    isSubmit = false,
    classNames,
    ...rest
  } = props;

  return (
    <button
      type={isSubmit ? 'submit' : 'button'}
      className={classes(
        'btn relative h-10 max-h-full',
        isIcon && 'icon',
        isNegative && 'negative',
        variant,
        className,
        variant === 'darkThemeOutlined' && '',
        classNames?.base
      )}
      {...(isSubmit ? {} : { ref })}
      {...(isDisabled || isLoading ? { disabled: true } : {})}
      {...rest}
    >
      {isLoading && (
        <div
          style={{
            borderTopColor: 'transparent',
            left: 'calc(50% - 7px)',
          }}
          className="absolute h-3.5 w-3.5 animate-spin rounded-full border border-solid border-white"
        />
      )}
      <div
        className={classes(
          'flex items-center justify-center whitespace-pre text-sm',
          isLoading ? 'invisible' : '',
          classNames?.container
        )}
      >
        {children}
      </div>
    </button>
  );
});

Button.displayName = 'Button';
