import { useMemo } from 'react';
import { TgFunctionInputSpec } from '@watch/common';
import { Child } from './Child';
import { Input, Props$Input } from 'components';
import { HTMLAttributes } from 'types';
import { classes, getIsValidUint256, replaceIndex } from 'utils';
import { isArrayInput, isBaseInput, isConstantInput } from 'utils/timegraph';

interface Props extends HTMLAttributes<HTMLDivElement> {
  id?: string;
  inputSpec: TgFunctionInputSpec;
  setter: (_: TgFunctionInputSpec) => void;
  signature: React.ReactNode;
}

function findComponent(inputSpec: TgFunctionInputSpec): React.ComponentType<Props$Input> {
  let Component;

  const typeString =
    (isBaseInput(inputSpec) && inputSpec.value) ||
    (isConstantInput(inputSpec) && 'string') ||
    'numeric';

  switch (typeString) {
    case 'address':
      Component = InputHexAddress;
      break;

    case 'number':
      Component = InputDecimal;
      break;

    case 'string':
      Component = InputString;
      break;

    case 'numeric':
    case 'uint256':
      Component = InputUint256;
      break;

    default:
      Component = Input;
      break;
  }

  return Component;
}

function Label({ children }: HTMLAttributes<HTMLDivElement>) {
  return <div className="relative mb-2 text-xs">{children}</div>;
}

export function FnInput({ inputSpec, id = 'input', setter: set, signature }: Props) {
  if (isArrayInput(inputSpec)) {
    return (
      <div>
        <Label>{signature}</Label>
        <Child className="flex flex-col space-y-4 py-2 ">
          {inputSpec.array.map((subInputSpec, subInputIndex) => {
            const subId = `${id}-${subInputIndex}`;

            return (
              <FnInput
                key={subId}
                id={subId}
                inputSpec={subInputSpec}
                setter={(newSubInputSpec) =>
                  set({ array: replaceIndex(inputSpec.array, subInputIndex, newSubInputSpec) })
                }
                signature={`${subInputIndex}`}
              />
            );
          })}
        </Child>
      </div>
    );
  }

  const Component = findComponent(inputSpec);

  const isConst = isConstantInput(inputSpec);

  const isError = useMemo(
    () => !isConst && inputSpec.isTouched && inputSpec.isError,
    [isConst, inputSpec]
  );

  return (
    <div>
      <Label>
        {signature}
        {isConst && <div className="absolute right-0 top-0 text-neutral-500">Constant</div>}
      </Label>

      <Component
        classNames={{ input: 'bg-black rounded-3xl', base: classes(isError && '!bg-black') }}
        isDisabled={isConst}
        isError={isError}
        placeholder="Required"
        value={isConst ? inputSpec.constant : inputSpec.inputValue}
        onChange={
          !isConst
            ? (newValue) => {
                set({
                  ...inputSpec,
                  isTouched: true,
                  isError: newValue.length === 0,
                  inputValue: newValue,
                });
              }
            : undefined
        }
        isDarkTheme
      >
        {isError && <span className="text-[#FF6666] text-xs mr-4">Invalid value</span>}
      </Component>
    </div>
  );
}

function InputHexAddress(props: Props$Input) {
  return <Input {...props} filter={/[^a-zA-Z0-9]+/g}></Input>;
}

function InputDecimal(props: Props$Input) {
  return <Input {...props} filter={/[^\de]/g}></Input>;
}

function InputString(props: Props$Input) {
  return <Input {...props} filter={/ /g}></Input>;
}

function InputUint256(props: Props$Input) {
  const isValid = useMemo(() => {
    if (props.value) return getIsValidUint256(props.value);
    return true;
  }, [props.value]);

  return <Input {...props} isError={props.isError || !isValid} filter={/[^\d]/g}></Input>;
}
