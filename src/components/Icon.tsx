import { Skeleton } from './Skeleton';
import { classes } from 'utils';
import { ClassNames, HTMLAttributes } from 'types';

export interface IconProps extends HTMLAttributes<HTMLOrSVGElement> {
  classNames?: ClassNames<'img' | "skeleton">;
  icon: React.ElementType<HTMLAttributes<HTMLOrSVGElement>>;
}

export function Icon({ className, classNames, icon: Svg, ...props }: IconProps) {
  return (
    <div
      className={classes(
        'flex aspect-square h-12 w-12 shrink-0 items-center justify-center bg-neutral-200 leading-none',
        className,
        classNames?.base
      )}
    >
      <Skeleton.Loader
        heightFix
        isDarkTheme
        containerClassName="w-full h-full"
        className={classes(className,classNames?.skeleton, 'opacity-100')}
      >
        <Svg className={classes('w-[55%] h-[55%]', classNames?.img)} {...props} />
      </Skeleton.Loader>
    </div>
  );
}
