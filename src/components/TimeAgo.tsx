import { HTMLAttributes } from 'types';
import { classes } from 'utils';
import { format, timeAgo } from 'utils/date';
import { Clock } from './svg';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  date?: Date | string;
  showIcon?: boolean;
}

export function TimeAgo({ date, showIcon = false, ...props }: Props) {
  if (!date) {
    return <span />;
  }

  return (
    <span
      className={classes('cursor-help md:text-base text-xs', props.className)}
      title={format(date, 'PPpp')}
      {...props}
    >
      {showIcon && <Clock />}
      {timeAgo(date)}
    </span>
  );
}
