import { HTMLAttributes, VoidFn } from 'types';

interface Props extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit: VoidFn;
}

export function Form({ children, onSubmit, ...props }: Props) {
  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      {children}
    </form>
  );
}
