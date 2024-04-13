import { useEffect } from 'react';
import omitDeep from 'omit-deep';
import { Loader, QueryResult } from 'components';
import { HTMLAttributes } from 'types';
import { classes } from 'utils';
import { useNewViewBuilder } from 'contexts/NewViewBuilder';

export function ResultDisplay(props: HTMLAttributes<HTMLDivElement>) {
  const { executeDryRun, dryRunResult } = useNewViewBuilder();

  useEffect(() => {
      executeDryRun();
  }, [executeDryRun]);

  return (
    <div {...props} className={classes('h-full text-xs relative flex flex-col')}>
      {dryRunResult?.dryRunView ? (
        <pre className="flex-1 px-0 overflow-y-auto">
          <QueryResult
            className="text-black pt-0"
            value={
              dryRunResult?.dryRunView
                ? JSON.stringify(omitDeep(dryRunResult.dryRunView, ['__typename']), null, 2)
                : undefined
            }
            options={{ fixedGutter: false }}
          />
        </pre>
      ) : (
        <div className="h-[calc(100vh_-_427px)]">
          <Loader className="text-white" />
        </div>
      )}
    </div>
  );
}
