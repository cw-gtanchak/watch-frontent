import { ContractInOutSpec } from '@analog-labs/timegraph-js';
import { TgFunction } from '@watch/common';

export function getAbiType(obj: ContractInOutSpec): string {
  // const type = obj.internalType || obj.type;
  const type = obj.type;

  if (!type) {
    throw new Error('Malformed contract ABI');
  }

  return type;
}

export function getFnOutputAbiCounterpart(fn: TgFunction, outputIndex: number) {
  if (fn.contract.abi.outputs[outputIndex]) {
    return fn.contract.abi.outputs[outputIndex];
  }

  let i = outputIndex - 1;
  while (i >= 0) {
    const candidateType = getAbiType(fn.contract.abi.outputs[outputIndex]);

    if (candidateType && /\[\]$/.test(candidateType)) {
      return fn.contract.abi.outputs[i];
    }

    i -= 1;
  }

  throw new Error('ABI output counterpart not found');
}
