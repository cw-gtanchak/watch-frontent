import { MagnifyingGlassIcon, Tag } from 'components';
import { useLibrary } from 'contexts';

export function ActiveTags() {
  const { reset, searchTerm, setSearchTerm, tags, toggleTag } = useLibrary();

  const isDisplayed = !!searchTerm || tags.length > 0;

  if (!tags || !isDisplayed) {
    return null;
  }

  return (
    <div className="flex w-full flex-wrap items-baseline space-x-2 mt-4">
      <ul className="-mb-2 flex flex-wrap items-baseline gap-2 text-sm">
        <li className="mb-2 text-[#F7F8F8]">Active Search:</li>
        {searchTerm && (
          <Tag className="bg-[#f7f8f81f]" onRemove={() => setSearchTerm(undefined)} isDarkTheme>
            <div className="flex justify-center item">
              <MagnifyingGlassIcon className="h-4 w-4 mr-2 -mt-1.5 translate-y-1" />
              <div>&quot;{searchTerm}&quot;</div>
            </div>
          </Tag>
        )}
        {tags?.map((tag) => {
          return (
            <Tag
              key={tag.slug}
              className="bg-[#f7f8f81f] relative"
              classNames={{ tag: 'pl-8' }}
              onRemove={() => toggleTag(tag)}
              value={tag}
              isDarkTheme
            >
              {/* {tagIcon } */}
              {tag.name}
            </Tag>
          );
        })}
        <li className="mb-2">
          <button className="text-[#f7f8f8]" onClick={() => reset()}>
            Clear All
          </button>
        </li>
      </ul>
    </div>
  );
}
