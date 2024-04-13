import React from 'react';
import { classes } from 'utils';

interface Props {
  text: string;
  className?: React.ComponentProps<'div'>['className'];
  icon?: React.ReactElement;
  textClassName?: React.ComponentProps<'div'>['className'];
}

export function SectionHeaderChip({ text, className, icon, textClassName }: Props) {
  return (
    <div
      className={classes(
        'p-[8px_12px_6px] text-[13px] font-normal text-[#f7f8f8] w-fit bg-[#ffffff1a] rounded-[99px] border border-[#ffffff1a]',
        className
      )}
    >
      {icon}
      <span className={textClassName}>{text}</span>
    </div>
  );
}

export default SectionHeaderChip;
