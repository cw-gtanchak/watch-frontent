import { RadioGroup } from '@headlessui/react';
import { QuestionProps } from 'types';
import { classes } from 'utils';

export function Question<T extends string>({
  header,
  text,
  options,
  value: { value },
  onChange,
  classNames,
}: QuestionProps<T>) {
  return (
    <RadioGroup
      className={classes('w-full flex flex-col flex-1', classNames?.base)}
      value={value || ''}
      onChange={(newValue: T) => onChange((prev) => ({ ...prev, value: newValue }))}
    >
      <RadioGroup.Label className="block my-6">
        <h4 className="text-left text-2xl font-normal leading-[32px]">{header}</h4>
        <div className="text-base leading-6 font-normal text-[#B2B3B8] text-left w-full mt-2">
          {text}
        </div>
      </RadioGroup.Label>
      <div className="flex flex-wrap flex-1 lg:text-base text-sm gap-4">
        {options.map(({ label, value }, index) => {
          return (
            <RadioGroup.Option
              className={classes('flex sm:basis-[calc(33.33%_-_12px)] shrink-0 flex-1 ')}
              key={value}
              value={value}
            >
              {({ checked }) => {
                return (
                  <div
                    className={classes(
                      'flex cursor-pointer text-white text-center font-normal w-full h-12 rounded-3xl items-center justify-center border border-solid px-4 shadow-none',
                      checked
                        ? 'bg-white border-white text-[#010101]'
                        : 'bg-[#060606] border-[#1F1F1F] hover:border-white',
                      (index === options.length - 1 || (index + 1) % 3 === 0) && 'mr-0',
                      classNames?.optionContainer
                    )}
                  >
                    {label}
                  </div>
                );
              }}
            </RadioGroup.Option>
          );
        })}
      </div>
    </RadioGroup>
  );
}
