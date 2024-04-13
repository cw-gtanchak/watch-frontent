import { createContext, useContext, useState } from 'react';
import { default as RLS, SkeletonProps as RLSProps } from 'react-loading-skeleton';
import { classes } from 'utils';

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> &
  RLSProps & {
    heightFix?: boolean;
    isLoading?: boolean;
    isDarkTheme?: boolean;
  };

const SkeletonContext = createContext<boolean | undefined>(false);

function Provider({ children, isLoading }: React.PropsWithChildren<{ isLoading?: boolean }>) {
  const [testMode, setTestMode] = useState(false);
  return (
    <SkeletonContext.Provider value={isLoading || testMode}>
      {children}
      {import.meta.env.DEV && (
        <div className="fixed bottom-2 right-2">
          <button className="z-50" onClick={() => setTestMode((prev) => !prev)}>
            Toggle Loading
          </button>
        </div>
      )}
    </SkeletonContext.Provider>
  );
}

function Loader({
  children,
  className,
  containerClassName,
  heightFix,
  isDarkTheme,
  ...props
}: SkeletonProps) {
  const isLoading = useSkeleton();

  if (isLoading || props.isLoading) {
    return (
      <RLS
        containerClassName={classes(heightFix && 'block leading-none', containerClassName)}
        className={classes(
          isDarkTheme && '!bg-[#ffffff1f] !rounded-2xl',
          heightFix && 'h-full',
          className
        )}
        {...props}
      />
    );
  }

  return <>{children}</>;
}

export const Skeleton = {
  Loader,
  Provider,
};

export const useSkeleton = () => useContext(SkeletonContext);
