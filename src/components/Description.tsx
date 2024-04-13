import { HTMLAttributes, Maybe } from 'types';

interface Props extends HTMLAttributes<HTMLDivElement> {
  value?: Maybe<string>;
}

export function Description({ className, value, ...props }: Props) {
  return (
    <span className={className} {...props}>
      {value && value.length > 0 ? value : <i>No description available</i>}
    </span>
  );
}
