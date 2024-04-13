import fileDownload from 'js-file-download';
import { Button } from './Button';
import { Skeleton } from './Skeleton';
import { classes } from 'utils';
import { HTMLAttributes } from 'types';
import { Download } from './svg';

interface Props extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  filename: string;
}

export function DownloadButton({ className, filename, value, ...props }: Props) {
  return (
    <Skeleton.Loader className="leading-0 h-5 w-5">
      <Button
        {...props}
        variant="plain"
        className={classes('px-2 py-0 text-blue-500 hover:text-blue-300', className)}
        onClick={() => fileDownload(value, filename)}
      >
        <Download className="h-5 w-5" />
      </Button>
    </Skeleton.Loader>
  );
}
