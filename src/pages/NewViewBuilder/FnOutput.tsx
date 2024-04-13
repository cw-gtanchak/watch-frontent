import { TgFunctionOutputSpec } from '@watch/common';
import { Input } from 'components';
import { HTMLAttributes } from 'types';
import { validateSchemaSpec } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  key: string;
  outputSpec: TgFunctionOutputSpec;
  setter: (_: TgFunctionOutputSpec) => void;
  signature: React.ReactNode;
}

export function FnOutput({ outputSpec, setter: set, signature }: Props) {
  const isSkipped = (outputSpec as { value: string }).value === 'skip';
  const name = (!isSkipped && (outputSpec as { name: string }).name) || '';

  const asInputId = `${name}-as`;
  return (
    <div className="flex w-full items-center">
      <div className="flex-1">
        <span className="text-sm leading-6 font-normal">{signature}</span>
      </div>
      <div className="w-1/2 py-3 px-4 flex items-center border border-[#ffffff1f] rounded-3xl bg-[#010101]">
        {isSkipped ? (
          <div className="mr-2 text-xs text-neutral-500">Skipped</div>
        ) : (
          <>
            <label className="mr-2 text-sm" htmlFor={asInputId}>
              as:
            </label>
            <Input
              isPlain
              className="flex-1 text-sm text-white truncate"
              filter={/(^\d|[^_A-Za-z0-9$])/g}
              id={asInputId}
              placeholder={(outputSpec as { name: string }).name}
              value={(outputSpec as { as: string }).as}
              onChange={(s) => {
                if (s.length < 21)
                  set({
                    ...outputSpec,
                    as: s,
                    isTouched: true,
                    isError: !validateSchemaSpec({ as: s }),
                  });
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}
