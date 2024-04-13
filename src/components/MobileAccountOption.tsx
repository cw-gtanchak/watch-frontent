import { useApi } from 'contexts';
import { useMemo } from 'react';
import { classes, truncate } from 'utils';
import { Identicon } from './Identicon';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { CustomExcalmationMark } from './svg';

interface Props {
  onSubmit: (selected: InjectedAccountWithMeta) => void;
  isSwitchAccount?: boolean;
}

function MobileAccountOption({ onSubmit, isSwitchAccount }: Props) {
  const { accountOptions, account } = useApi();


  return (
    <div className="w-full mt-6 flex-1 overflow-y-auto">
      {accountOptions && accountOptions?.length > 0 && (
        <div className="max-h-[300px] overflow-auto no-scrollbar">
          {accountOptions?.map((option) => {
            const { address, meta } = option;

            return (
              <button
                key={address}
                className={classes(
                  'mb-2 flex w-full  bg-[#000] items-center overflow-hidden text-ellipsis px-4 py-2 rounded-2xl border border-[#ffffff1f] hover:bg-[#ffffff0d] hover:border-[#ffffff0d] last:mb-0'
                )}
                onClick={() => onSubmit(option)}
                disabled={account?.address === address}
              >
                <Identicon className="mr-3 h-8 w-8" value={address} />
                <div className="flex-1 overflow-hidden">
                  <div className="text-lg font-medium text-white">{meta.name}</div>
                  <div className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-sm text-neutral-500">
                    {truncate(address)}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MobileAccountOption;
