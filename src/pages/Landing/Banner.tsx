import { AnalogClock, SectionHeaderChip } from 'components';
import { ReactNode } from 'react';
import { ClassNames } from 'types';
import { classes } from 'utils';

export function Banner({
  title,
  description,
  backGroundImage,
  sectionHeaderChip,
  button,
  classNames,
}: {
  title: ReactNode;
  description?: ReactNode;
  backGroundImage?: ReactNode;
  button?: ReactNode;
  sectionHeaderChip?: ReactNode;
  classNames?: ClassNames<'main'>;
}) {
  return (
    <div className={classNames?.base}>
      {backGroundImage}
      <div className={classNames?.main}>
        {sectionHeaderChip}
        {title}
        {description}
        {button}
      </div>
    </div>
  );
}
