import { ReactNode, useCallback, useRef, useState } from 'react';
import { ArrowUpFilledIcon } from './svg';
import { classes } from 'utils';
import { ClassNames } from 'types';
import useOutsideClick from 'hooks/useOutSideClick';

interface Props {
  classNames?: ClassNames<'arrow' | 'content' | 'message' | 'childrenWrapper'>;
  children: ReactNode;
  message?: string | ReactNode | null;
  on?: 'hover' | 'click';
  anchor?: 'top-left' | 'bottom-right' | 'bottom-left' | 'center-down' | 'center-up';
  disabled?: boolean;
}
export function ToolTip({
  classNames,
  anchor = 'top-left',
  message,
  children,
  on = 'hover',
  disabled,
}: Props) {
  const [show, setShow] = useState(false);

  const impactRef: any = useRef();

  const displayTimed = useCallback(() => {
    setShow((prev) => !prev);
  }, []);

  useOutsideClick(impactRef, () => {
    if (on === 'click') setShow(false);
  });

  if (!message || disabled) {
    return children;
  }

  return (
    <div
      className={classes('relative flex flex-col items-start group', classNames?.base)}
      ref={impactRef}
    >
      <span
        className={classes('flex justify-center', classNames?.childrenWrapper)}
        {...(on === 'click'
          ? {
              onClick: displayTimed,
              onKeyDown: displayTimed,
            }
          : {
              onMouseEnter: () => setShow(true),
              onMouseLeave: () => setShow(false),
            })}
      >
        {children}
      </span>
      <div
        className={classes(
          'inline-flex absolute flex-col',
          anchor === 'top-left' && 'top-8 -left-[9px]',
          anchor === 'bottom-right' && 'top-8 -right-0',
          anchor === 'bottom-left' && 'top-8 -left-0',
          anchor === 'center-down' && 'top-8 left-1/2 -translate-x-1/2 z-50',
          anchor === 'center-up' && 'top-7 left-[-80px]',
          on === 'hover' && 'group-hover:flex',
          !show ? 'hidden' : null,
          classNames?.content
        )}
      >
        {/* <ArrowUpFilledIcon
          color="red"
          className={classes(
            'absolute !text-[#f5afaf] border-[#313131] border border-solid',
            anchor === 'top-left' && 'left-2 -top-2',
            anchor === 'bottom-right' && 'right-2 bottom-9 rotate-180',
            anchor === 'bottom-left' && 'left-2 bottom-9 rotate-180',
            classNames?.arrow
          )}
        /> */}
        <div
          className={classes(
            'absolute  z-10 !bg-[#1A1A1A] w-4 h-4 border border-[#313131] border-solid border-b border-r border-t-0 border-l-0',
            anchor === 'top-left' && 'left-2 -top-2',
            anchor === 'bottom-right' && 'right-5 top-[-56px] rotate-45',
            anchor === 'bottom-left' && 'left-[22px] top-[-56px] rotate-45',
            anchor === 'center-down' && 'left-1/2 -translate-x-1/2 top-[-56px] rotate-45',
            anchor === 'center-up' && ' top-[-8px] left-[80px] rotate-[220deg] z-[51]',
            classNames?.arrow
          )}
        />
        <div
          className={classes(
            'absolute px-3 pt-2.5 pb-2 bg-[#1A1A1A] text-[#F7F8F8] text-center text-sm justify-start items-start gap-2.5 max-w-[250px] w-fit !rounded-xl border-[#313131] border border-solid',
            anchor === 'top-left' && 'right-0 top-1',
            anchor === 'bottom-right' && 'right-0 bottom-12',
            anchor === 'bottom-left' && 'left-0 bottom-12',
            anchor === 'center-down' &&
              'left-1/2 -translate-x-1/2 bottom-12 sm:max-w-[max-content] max-w-[min-content] w-max normal-case',
            anchor === 'center-up' && 'min-w-[170px] z-50',
            classNames?.message
          )}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
