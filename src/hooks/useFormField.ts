import { useCallback, useMemo, useState } from 'react';
import { Setter } from 'types';

export type FormField<T> = [T, boolean, boolean, (_?: T) => boolean, Setter<boolean>];

type ValidateFn<T> = (_: T) => boolean;

const defaultValidate = (): boolean => true;

export function useFormField<T>(
  defaultValue: T,
  validate: ValidateFn<T> = defaultValidate,
  limit?: number
): FormField<T> {
  const [value, setValue] = useState<T>(defaultValue);
  const [isTouched, setIsTouched] = useState(false);
  const isValid = useMemo(() => !!value && validate(value), [validate, value]);
  const setter = useCallback((value?: T) => {
    if (value !== undefined) {
      if (limit) {
        if ((value || '').toString().length <= limit) {
          setValue(value);
        }
      } else {
        setValue(value);
      }
      setIsTouched((prev) => prev || true);
    }
    return !!value && validate(value);
  }, []);

  return [value, isValid, isTouched, setter, setIsTouched];
}
