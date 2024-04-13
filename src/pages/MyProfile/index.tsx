import { useCallback, useMemo, useState, useEffect } from 'react';
import init, { build_ssk, encode_ssk } from '@analog-labs/timegraph-wasm/web/lib';
import fileDownload from 'js-file-download';
import { ApiKeys } from './ApiKeys';
import { FundedView } from './FundedView';
import {
  BreadCrumbs,
  Download,
  ProfileDetails,
  ProfileResources,
  Select,
  Skeleton,
} from 'components';
import { useApi, useMyProfile } from 'contexts';
import { useBreadCrumbsChild } from 'hooks/useBreadCrumbs';
import { FundsModal } from 'components/FundsModal';
import { classes, hexToU8a, pathTo, web3FromSource, stringToHex, notify } from 'utils';

export function MyProfile() {
  useBreadCrumbsChild({ page: 'MyProfile' }, [{ page: 'Library' }]);

  const {
    account,
    isReady,
    chainProps: { tokenDecimals },
    sessionKey,
  } = useApi();
  const profile = useMyProfile();
  const [isOpen, setIsOpen] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);
  const [sortBy, setSortBy] = useState<'testnet' | 'mainnet' | 'all'>('all');

  const handleClick = useCallback((type: boolean) => {
    setIsWithdraw(type);
    setIsOpen(true);
  }, []);

  const isLoading = useMemo(
    () => !isReady || !profile.myProfile || !profile.myBalance || !profile.accountBalance,
    [isReady, profile]
  );

  useEffect(() => {
    const isModalOpen = sessionStorage.getItem('isModalOpen') === 'true';
    setIsOpen(isModalOpen);
  }, []);

  useEffect(() => {
    sessionStorage.removeItem('isModalOpen');
  }, [isOpen]);

  const clickHandler = useCallback(async () => {
    if (account) {
      await init();
      const injector = await web3FromSource(account.meta.source);
      const signRaw = injector?.signer?.signRaw;
      if (signRaw) {
        const sskData = encode_ssk({
          ns: 0,
          key: account.address,
          user_id: 1,
          expiration: 0,
        });

        const { signature } = await signRaw({
          address: account.address,
          data: stringToHex(sskData),
          type: 'bytes',
        });

        const sessionKey = build_ssk(sskData, hexToU8a(signature));
        fileDownload(sessionKey, 'sessionkey.txt');
        notify('Session key downloaded', Download);
      }
    }
  }, []);

  if (!account) {
    return null;
  }

  return (
    <Skeleton.Provider isLoading={isLoading}>
      <div className="flex flex-col space-y-12 md:space-y-[50px] lg:p-16 !pt-0 px-0 ">
        <BreadCrumbs />
        <ProfileDetails
          value={profile.myProfile}
          className="!bg-black rounded-[24px] !border-[#1F1F1F] md:!border-0 lg:p-6 md:p-6 sm:p-4 p-4 !mt-0"
          showIcon={false}
          classNames={{
            identicon: 'rounded-[8px] lg:w-20 md:w-20 sm:w-12 w-12 lg:h-20 md:h-20 sm:h-12 h-12',
          }}
          isDarkTheme
          showAccountOptions
          handleClick={handleClick}
          accountBalance={profile.accountBalance}
          tokenDecimals={tokenDecimals}
          sessionKey={sessionKey}
          onDownload={clickHandler}
          totalRewardEarned={profile.userStats?.totalUserRewards}
          totalSpent={profile.userStats?.totalUserSponsor}
          isLoading={isLoading}
        />
        <ProfileResources
          value={profile.myProfile}
          isDarkTheme
          isLoading={isLoading}
          apiComponent={<ApiKeys sortBy={sortBy} />}
          fundedViewComponent={<FundedView />}
          additionalButton={
            <div className="flex flex-row sm:w-[unset] w-full justify-between items-center gap-4 sm:order-2 order-1">
              <Skeleton.Loader isDarkTheme className="w-[120px] h-10 !rounded-full">
                <button
                  className="flex gap-2 md:text-base text-sm text-white cursor-pointer"
                  onClick={() => profile.setIsCreateVisible(true)}
                >
                  <div>+</div>Add API Key
                </button>
              </Skeleton.Loader>
              {/* <Skeleton.Loader isDarkTheme className="w-[140px] h-10 !rounded-full">
                <div className="flex flex-row shrink-0 pl-4 md:justify-end justify-start items-center text-sm border border-[#ffffff14] rounded-3xl">
                  <span className="text-[#B2B3B8]">
                    Sort by <span className="ml-1">·</span>
                  </span>
                  <Select
                    value={sortBy}
                    onChange={setSortBy}
                    options={[
                      { value: 'all', label: 'All' },
                      { value: 'testnet', label: 'Testnet' },
                      { value: 'mainnet', label: 'Mainnet' },
                    ]}
                    isLibrary
                    classNames={{
                      control: () =>
                        'w-25 h-10 relative rounded-3xl shadow shadow-inner border border-white border-opacity-20 bg-transparent text-white text-sm font-normal pl-2 pr-4 py-2 placeholder:text-[#B2B3B8] hover:border-white',
                      dropdownIndicator: () => 'text-white',
                      option: (_) =>
                        classes('bg-[#010101] text-white  hover:bg-[#1B1B1B]', _ && ''),
                      menu: () => 'border-none !top-[45px] rounded-[8px] overflow-hidden',
                    }}
                  />
                </div>
              </Skeleton.Loader> */}
            </div>
          }
        />
        {isOpen && (
          <FundsModal
            showBalance
            accountBalance={profile.accountBalance}
            isOpen
            setIsOpen={setIsOpen}
            OnFundExchangeSubmit={isWithdraw ? profile.withDrawFund : profile.depositFund}
            isLoading={profile.isFundExchangeLoading}
            texts={{
              header: isWithdraw ? ' Withdraw $TANLOG' : 'Fund your Account',
              headerSub: isWithdraw
                ? 'Use this modal to withdraw $TANLOG from your Analog Watch account. Note that withdrawing $TANLOG tokens from the Watch account locks it from deploying and querying views on the Analog Watch.'
                : 'Start deploying and querying views right away by depositing $TANLOG into your Watch account!',
              submit: isWithdraw ? 'Withdraw' : 'Deposit',
              inputLabel: isWithdraw ? 'Withdraw amount' : 'Deposit amount',
              inputPlaceHolder: 'Amount',
            }}
            successTexts={{
              header: `Great news! Your funds have been successfully ${
                isWithdraw ? 'withdrawed' : 'deposited'
              }. 🎉`,
              submitToButton: 'See My Profile',
            }}
            successModalSubmitTo={pathTo('MyProfile')}
          />
        )}
      </div>
    </Skeleton.Provider>
  );
}
