import { format as dateFnFormat, formatDistanceToNowStrict, parseISO } from 'date-fns';

export function timeAgo(d?: Date | string | null) {
  if (!d) return '';

  let date: Date;
  if (typeof d === 'string') {
    date = parseISO(d);
  } else {
    date = d;
  }

  return formatDistanceToNowStrict(date, { addSuffix: true });
}

export function format(d?: Date | string | null, formatString = 'PPpp') {
  if (!d) return '';

  let date: Date;
  if (typeof d === 'string') {
    date = parseISO(d);
  } else {
    date = d;
  }

  return dateFnFormat(date, formatString);
}
