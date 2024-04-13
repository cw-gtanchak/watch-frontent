import { SmartContract, View } from 'types/gql';

export function isNull(x: unknown): x is null {
  return x === null;
}

export function getIsSmartContract(item?: { __typename?: string }): item is SmartContract {
  try {
    return item?.__typename === 'SmartContract';
  } catch (e) {
    return false;
  }
}

export function getIsCollection(item?: { __typename?: string }) {
  try {
    return item?.__typename === 'Collection';
  } catch (e) {
    return false;
  }
}

export function getIsView(item?: { __typename?: string }): item is View {
  try {
    return item?.__typename === 'View';
  } catch (e) {
    return false;
  }
}

export function getIsValidUint256(value: string): boolean {
  const temp = +value;
  if (temp != -1) {
    if (temp > 0) {
      if (temp <= 2 ** 256 - 1) {
        return true;
      }
    }
    return false;
  }
  return true;
}

export enum Statuses {
  Completed = 'completed',
  Success = 'success',
  Created = 'created',
  Initiated = 'initiated',
  Initialization = 'initialization',
  Pending = 'pending',
  Failed = 'failed',
  Done = 'done',
  Finalized = 'finalized',
  Unfinalized = 'unfinalized',
  Updating = 'updating',
}


