import { XMarkIcon } from './icons';
import { Skeleton, useSkeleton } from './Skeleton';
import { useLibrary } from 'contexts';
import { ClassNames, HTMLAttributes, VoidFn, Tag as TagBaseType, Maybe } from 'types';
import { arrayOfSize, classes } from 'utils';

type TagType = TagBaseType & {
  name?: Maybe<string> | undefined;
};
interface Props$Tags extends HTMLAttributes<HTMLUListElement> {
  onRemove?: (_: string) => void;
  value?: TagType[];
  isDarkTheme?: boolean;
  classNames?: ClassNames<'tagBase' | 'tagName'>;
}

interface Props$Tag extends HTMLAttributes<HTMLLIElement> {
  classNames?: ClassNames<'tag' | 'name'>;
  as?: React.ElementType;
  onRemove?: VoidFn;
  value?: TagType;
  isDarkTheme?: boolean;
  isActive?: boolean;
  icon?: React.ReactElement;
}

interface Props$TagButton extends HTMLAttributes<HTMLLIElement> {
  value: TagType;
  icon?: React.ReactElement;
  classNames?: ClassNames<'button' | 'icon'>;
  toggleTag: (_: TagBaseType) => void;
  isActive: boolean;
}

const tagClassName = classes(
  'flex h-6 h-full items-center justify-center bg-neutral-100 px-2 font-medium uppercase text-neutral-500'
);

export function Tags({ className, onRemove, value, classNames, ...props }: Props$Tags) {
  const isLoading = useSkeleton();

  return (
    <ul
      {...props}
      className={classes(
        '-mb-2 flex flex-wrap items-center space-x-2 space-x-reverse text-[0.66rem] ',
        className
      )}
    >
      {(isLoading || !value ? arrayOfSize(3).map(() => undefined) : value).map((tag, i) => {
        return (
          <Tag
            classNames={{
              base: classes('first:mr-2', classNames?.tagBase),
              name: classNames?.tagName,
            }}
            key={tag?.slug || `placeholder-${i}`}
            onRemove={onRemove ? () => tag?.slug && onRemove && onRemove(tag.slug) : undefined}
            value={tag}
            isDarkTheme={props.isDarkTheme}
          />
        );
      })}
    </ul>
  );
}

export function Tag({
  as: Component = 'li',
  className,
  classNames,
  onRemove,
  value,
  isDarkTheme,
  isActive,
  icon,
  ...props
}: Props$Tag) {
  return (
    <Component
      {...props}
      className={classes(
        'mb-2 h-6 max-w-[12rem]',
        isDarkTheme && 'rounded-2xl',
        classNames?.base,
        props.onClick && 'cursor-pointer'
      )}
    >
      <Skeleton.Loader
        isDarkTheme
        containerClassName="block h-full leading-none"
        heightFix
        isLoading={!value && !props.children}
        className="h-6 w-9"
      >
        <div
          data-tag={value?.slug}
          className={classes(
            tagClassName,
            classNames?.tag,
            className,
            isDarkTheme && 'rounded-2xl px-[8px] py-[4px] bg-[#f7f8f81f] text-[#F7F8F8]',
            isActive && isDarkTheme && 'bg-white text-[#00010A]',
            icon && 'pl-1'
          )}
        >
          {icon && (
            <div className="flex justify-center items-center h-5 w-5 rounded-full bg-[#343434]">
              {icon}
            </div>
          )}
          <div
            className={classes(
              'block pl-1 text-xs items-center overflow-hidden text-ellipsis whitespace-nowrap leading-none',
              classNames?.name
            )}
          >
            {props.children || value?.name}
          </div>
          {onRemove && (
            <button
              className="relative -top-[1px] cursor-pointer"
              data-tag={value?.slug}
              onClick={onRemove}
            >
              <XMarkIcon className="ml-1 h-4 w-4" />
            </button>
          )}
        </div>
      </Skeleton.Loader>
    </Component>
  );
}

export function TagButton({
  className,
  value,
  icon,
  classNames,
  toggleTag,
  isActive,
  ...props
}: Props$TagButton) {
  return (
    <li {...props} className={classes('text-xxs h-6', className, classNames?.base)}>
      <button
        data-tag={value}
        className={classes(
          tagClassName,
          'cursor-pointer rounded-2xl px-[8px] py-[4px] bg-[#f7f8f81f] text-[#F7F8F8]',
          icon && 'pl-1',
          classNames?.button,
          isActive && 'bg-white text-[#00010A]'
        )}
        onClick={() => toggleTag(value)}
      >
        {icon && (
          <div
            className={classes(
              'flex mr-1 justify-center items-center h-5 w-5 rounded-full bg-[#343434]',
              classNames?.icon
            )}
          >
            {icon}
          </div>
        )}
        {value.name}
      </button>
    </li>
  );
}
