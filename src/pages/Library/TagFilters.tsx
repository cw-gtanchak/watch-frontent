import { Popover } from '@headlessui/react';
import { ChevronDownIcon, SearchTagIcon, Skeleton, TagButton } from 'components';
  import { HTMLAttributes, ClassNames } from 'types';
  import { classes, isMobileOS } from 'utils';
import { useLibrary } from 'contexts';
import { BottomModal } from 'components/BottomModal';
import { useState } from 'react';

const isMobileOSBool = isMobileOS();

function FilterGroup({
  children,
  end,
  label,
  classNames,
}: HTMLAttributes<HTMLDivElement> & {
  label: React.ReactNode;
  end?: boolean;
  classNames?: ClassNames<'base' | 'inner'>;
}) {
  return (
    <div
      className={classes(
        !end && 'mb-4 border-0 border-b border-solid border-[#141414] pb-1',
        classNames?.base
      )}
    >
      <div className={classes('mb-3 text-xs  font-medium uppercase', classNames?.inner)}>
        {label}
      </div>
      {children}
    </div>
  );
}

export function TagFilters() {
  const { topTags, chains, tags, toggleTag } = useLibrary();
  const [isOpen, setIsOpen] = useState(false);

  return isMobileOSBool ? (
    <>
      <Skeleton.Loader
        isDarkTheme
        className="flex gap-2 w-[102px] h-[38px] items-center px-3 py-2 !rounded-[32px]"
      >
        <div
          className="flex gap-2 h-[38px] items-center px-3 py-2 bg-[#ffffff1a] rounded-[32px]"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <div className="mt-0.5 -rotate-90 [zoom:1.1]">
            <SearchTagIcon stroke="white" fill="transparent" />
          </div>
          <div>Tags</div>
          <ChevronDownIcon className={classes('h-4 w-4 text-white transition-transform')} />
        </div>
      </Skeleton.Loader>
      <BottomModal
        isOpen={isOpen}
        isDarkTheme
        setIsOpen={setIsOpen}
        className="w-full self-end !font-['Neue_Montreal']"
        modalTitle={'Select Tags'}
        classNames={{ content: 'items-start' }}
      >
        <FilterGroup
          label="Chain Tags"
          classNames={{ base: 'text-white w-full pb-4', inner: 'mb-1' }}
        >
          <ul className=" -top-2 flex flex-wrap space-x-2 space-x-reverse">
            {chains &&
              chains.map((tag) => {
                return (
                  <TagButton
                    className="mt-2 first:mr-2"
                    key={tag.slug}
                    value={tag}
                    icon={
                      <img src={`/logos/chain/${tag.name?.toLowerCase()}.svg`} alt={tag.slug} />
                    }
                    isActive={tags.some((el) => el.name === tag.name)}
                    toggleTag={toggleTag}
                  />
                );
              })}
          </ul>
        </FilterGroup>
        <FilterGroup label="Top Tags" end classNames={{ base: 'text-white w-full', inner: 'mb-1' }}>
          <ul className=" -top-2 flex flex-wrap space-x-2 space-x-reverse">
            {topTags &&
              topTags.map((tag) => {
                return (
                  <TagButton
                    className="mt-2 first:mr-2"
                    key={tag.slug}
                    value={tag}
                    isActive={tags.some((el) => el.name === tag.name)}
                    toggleTag={toggleTag}
                  />
                );
              })}
          </ul>
        </FilterGroup>
      </BottomModal>
    </>
  ) : (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Skeleton.Loader
            heightFix
            isDarkTheme
            className="sm:w-24 w-[89px] h-[38px] !rounded-[32px]"
          >
            <Popover.Button className={classes('flex-1 text-sm')}>
              <div className="flex gap-2 h-[38px] items-center px-3 py-2 bg-[#ffffff1a] rounded-[32px]">
                <div className="mt-0.5 -rotate-90 [zoom:1.1]">
                  <SearchTagIcon stroke="white" fill="transparent" />
                </div>
                <div>Tags</div>
                <ChevronDownIcon
                  className={classes(
                    'h-4 w-4 text-white transition-transform',
                    open && 'rotate-180'
                  )}
                />
              </div>
            </Popover.Button>
          </Skeleton.Loader>

          <Popover.Panel className="bg-black w-80 rounded-lg border border-[#ffffff14] absolute top-[125%] z-10 p-4">
            <FilterGroup label="Chain Tags" classNames={{ base: 'border-0 mb-0' }}>
              <ul className="relative -top-2 flex flex-wrap space-x-2 space-x-reverse">
                {chains &&
                  chains.map((tag) => {
                    return (
                      <TagButton
                        className="mt-2 first:mr-2"
                        key={tag.slug}
                        value={tag}
                        icon={
                          <img src={`/logos/chain/${tag.name?.toLowerCase()}.svg`} alt={tag.slug} />
                        }
                        isActive={tags.some((el) => el.name === tag.name)}
                        toggleTag={toggleTag}
                      />
                    );
                  })}
              </ul>
            </FilterGroup>
            {/* <FilterGroup label="Top Tags" end>
              <ul className="relative -top-2 flex flex-wrap space-x-2 space-x-reverse">
                {topTags &&
                  topTags.map((tag) => {
                    return (
                      <TagButton
                        className="mt-2 first:mr-2"
                        key={tag.slug}
                        value={tag}
                        isActive={tags.some((el) => el.name === tag.name)}
                        toggleTag={toggleTag}
                      />
                    );
                  })}
              </ul>
            </FilterGroup> */}
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
