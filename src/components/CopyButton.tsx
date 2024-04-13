import { Button } from './Button';
import { Skeleton } from './Skeleton';
import { classes, copy } from 'utils';
import { HTMLAttributes } from 'types';
import { Copy } from './svg';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  value?: string | null;
}

export function CopyButton({ className, value }: Props) {
  return (
    <Skeleton.Loader className="leading-0 h-5 w-5">
      <Button
        variant="plain"
        className={classes('h-auto px-2 py-0 text-blue-500 hover:text-blue-300', className)}
        onClick={() => value && copy(value)}
      >
        <Copy className="h-5 w-5" />
      </Button>
    </Skeleton.Loader>
  );
}
