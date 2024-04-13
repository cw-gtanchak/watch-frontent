export interface QueryParam<T> {
  id: string;
  defaultValue?: T;
}

export interface QuerySpec {
  id: string;
  params: QueryParam<unknown>[];
  fields: string[];
}

export interface QueryInclusion {
  params: unknown[];
  fields: boolean[];
}
