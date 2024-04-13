import { ClassNames } from 'types';
import { Skeleton } from './Skeleton';
import { classes, imgUrl } from 'utils';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  src2x?: React.ImgHTMLAttributes<HTMLImageElement>['src'];
  classNames?: ClassNames<'image'>;
}

export function Image({ alt, classNames, src = '', src2x, ...props }: Props) {
  return (
    <div className={classes('fit-content shrink-0 leading-none', classNames?.base)}>
      <Skeleton.Loader className={classes(classNames?.image, 'opacity-100')}>
        <img
          alt={alt}
          className={classNames?.image}
          src={imgUrl(src)}
          srcSet={src2x ? `${imgUrl(`${src2x}`)} 2x` : undefined}
          {...props}
        />
      </Skeleton.Loader>
    </div>
  );
}
