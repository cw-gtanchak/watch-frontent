// import ReactCodeMirror, { IReactCodemirror } from '@uiw/react-codemirror';
import { useMemo } from 'react';
import { HTMLAttributes } from 'types';
import { classes } from 'utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function Json({ className, value, ...props }: Props) {
  const json = useMemo(() => {
    try {
      return JSON.stringify(JSON.parse(value), null, 2);
    } catch (e) {
      console.error(e);
      return null;
    }
  }, [value]);

  return (
    <div
      className={classes(
        'flex w-full max-w-full flex-col overflow-auto whitespace-pre bg-neutral-100 p-2 font-mono text-xs',
        className
      )}
      {...props}
    >
      <pre className="flex-1">{json}</pre>
    </div>
  );
}
