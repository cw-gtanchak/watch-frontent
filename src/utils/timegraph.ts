import {
  TgFunction,
  TgFunctionInput,
  TgFunctionInputSpec,
  TgFunctionOutputSpec,
  TgFunctionSpec,
  TgType,
} from '@watch/common';
import { capitalize } from './ui';
import { hexToU8a, isHex } from '@polkadot/util';
import { decodeAddress, encodeAddress } from '@polkadot/keyring';

export function isBaseInput(input: TgFunctionInput): input is { value: TgType } {
  try {
    return typeof (input as { value: TgType }).value === 'string';
  } catch (e) {
    return false;
  }
}

export function isArrayInput(input: TgFunctionInput): input is { array: TgFunctionInput[] } {
  return !!(input as { array: TgFunctionInput[] }).array;
}

export function isConstantInput(input: TgFunctionInput): input is { constant: string } {
  return !!(input as { constant: string }).constant;
}

function extractFunctionInputSpec(input: TgFunctionInput): TgFunctionInputSpec {
  if (isBaseInput(input)) {
    return { ...input, inputValue: '', isTouched: false, isError: true };
  }

  if (isArrayInput(input)) {
    return { array: input.array.map(extractFunctionInputSpec) };
  }

  if (isConstantInput(input)) {
    return input;
  }

  throw new Error('Invalid function input');
}

export function isInputSpecValid(input: TgFunctionInputSpec): boolean {
  if (isConstantInput(input)) {
    return true;
  }

  if (isArrayInput(input)) {
    return input.array.reduce((b, input) => b && isInputSpecValid(input), true);
  }

  if (isBaseInput(input)) {
    switch (input.value) {
      case 'address':
        return /^(0x)?[0-9a-fA-F]{40}$/.test(input.inputValue || '');

      case 'string':
        return /[^ ]+/.test(input.inputValue || '');

      default:
        return /^\d+$/.test(input.inputValue || '');
    }
  }

  throw new Error('Invalid input spec detected');
}

export function extractFunctionSpec(fn: TgFunction): TgFunctionSpec {
  const res: TgFunctionSpec = {
    ...fn,
    inputs: fn.inputs.map(extractFunctionInputSpec),
    outputs: [
      {
        name: '_clock',
        value: 'integer',
        isError: false,
        isTouched: true,
      },
      {
        name: '_index',
        value: 'integer',
        isError: false,
        isTouched: true,
      },
      ...fn.outputs.map((output) => {
        return {
          ...output,
          isTouched: false,
          isError: false,
        } as TgFunctionOutputSpec;
      }),
    ],
  };

  return res;
}
