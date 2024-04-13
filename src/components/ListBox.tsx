import { Listbox } from '@headlessui/react';
import { HTMLProps } from 'react';
import { ChevronUpDownIcon } from './icons';
import { CheckBox } from './CheckBox';
import { classes } from 'utils';

export interface ListBoxOptionType {
  id: number | string;
  name: string;
  value: string;
  unavailable?: boolean;
}

interface Props {
  options: ListBoxOptionType[];
  placeHolder?: string;
  selected: ListBoxOptionType;
  setSelected?: React.Dispatch<React.SetStateAction<ListBoxOptionType | undefined>>;
  classNames?: {
    button?: HTMLProps<HTMLElement>['className'];
    option?: HTMLProps<HTMLElement>['className'];
  };
}

function ListBox({ options, placeHolder, selected, setSelected, classNames }: Props) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1">
        <Listbox.Button
          className={classes(
            'relative w-full cursor-default placeholder:text-[#ffffff7a] text-sm pl-5 pr-2 py-[9px] border rounded-3xl shadow-[0px_8px_10px_0px_#000,0px_-2px_52px_0px_rgba(200, 200, 200, 0.06)_inset] bg-gradient-to-r from-[#ffffff0a] via-[#ffffff05] to-[#ffffff00] text-white border-white border-opacity-5',
            classNames?.button
          )}
        >
          <span className="block truncate">
            {selected?.name || <span className="text-[#ffffff7a]">{placeHolder}</span>}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute flex gap-4 flex-col mt-1 max-h-60 w-full overflow-auto border rounded-3xl p-4 text-sm shadow-[0px 4px 6px 0px #ffffff14] bg-[#060606] text-[#B2B3B8] border-white border-opacity-5 z-[100]">
          {options.map((option, optionIdx) => (
            <Listbox.Option
              key={optionIdx}
              className={classes(
                `relative flex gap-2 cursor-default select-none text-gray-900`,
                classNames?.option
              )}
              value={option}
              disabled={option.unavailable}
            >
              {({ selected }) => (
                <>
                  <CheckBox
                    isChecked={selected}
                    className="h-5 w-5"
                    aria-hidden="true"
                    isDarkTheme
                  />
                  <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                    {option.name}
                  </span>
                </>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  );
}

export default ListBox;
