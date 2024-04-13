import { TgFunctionSpec, SchemaSpec } from '@watch/common';
import { format } from 'sql-formatter';
import { arrayOfSize } from './ui';
import { COLUMN_NAME_REGEX } from 'consts';

export interface outputType {
  output: string;
  name: string;
  isTouched: boolean;
  isError: boolean;
}

interface ViewSqlOptions {
  isDesc?: boolean;
  isLastCycle?: boolean;
  orderBy?: string;
}
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

export function getAlias(index: number): string {
  let i = index;
  let alias = ALPHABET.charAt(i % 26);

  while (i >= 26) {
    alias = alias.concat(ALPHABET.charAt(i % 26));

    i /= 26;
  }

  return alias;
}

export function validateSchemaSpec(spec: Pick<SchemaSpec, 'as'>): boolean {
  return !spec.as || !COLUMN_NAME_REGEX.test(spec.as);
}

export function getValidated(spec: SchemaSpec): SchemaSpec {
  return {
    ...spec,
    isTouched: true,
    isError: !validateSchemaSpec(spec),
  };
}

export function createSQLFromFunction(
  funSpecs: TgFunctionSpec[],
  { orderBy, isDesc }: ViewSqlOptions = {}
) {
  if (funSpecs.length === 0) {
    return `-- Add collections from the menu or type here...${arrayOfSize(21)
      .map(() => '\n')
      .join('')}`;
  }

  const aliases = funSpecs.map((_, index) => getAlias(index));

  const columns = funSpecs.reduce((res: string[], { outputs }, index) => {
    return [
      ...res,
      ...outputs
        .filter((output) => {
          const { name } = output as unknown as outputType;
          return !(index > 0 && ['_clock', '_index'].includes(name));
        })
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        .map((el) => `${aliases[index]}.${el.name}${el.as ? ` AS ${el.as}` : ''}`),
    ];
  }, []);


  const joins = funSpecs
    .reduce((res: string[], { identifier, inputs }, index) => {
      const filteredInputs = inputs.filter((input) => (input as { inputValue: string }).inputValue);
      const inputString = filteredInputs.reduce((acc, input, index) => {
        let string = index === 0 ? '(' : '';
        string += acc + (input as { inputValue: string }).inputValue;
        string += index === filteredInputs.length - 1 ? ')' : ', ';
        return string;
      }, '');
      return [
        ...res,
        `${inputString.length ? `'{${identifier}${inputString}}'` : identifier} ${aliases[index]}${
          index > 0 ? ` ON ${aliases[0]}._clock = ${aliases[index]}._clock` : ''
        }`,
      ];
    }, [])
    .join(' JOIN ');

  const result = `SELECT ${columns} FROM ${joins} ${
    orderBy ? `ORDER BY ${orderBy} ${isDesc ? 'DESC' : 'ASC'}` : ''
  }`;

  return format(result);
}
