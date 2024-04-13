import { Skeleton, ProfileDetails, ProfileResources, BreadCrumbs } from 'components';
import { usePublisher } from 'contexts';
// import { pathTo } from 'utils';

export function Publisher() {
  const { publisher, isLoading, publisherStats } = usePublisher();

  return (
    <Skeleton.Provider isLoading={isLoading || !publisher}>
      <div className="mb-20 w-full justify-start px-16">
        <BreadCrumbs />
        <div className="[&>*]:mb-16">
          <ProfileDetails
            value={publisher}
            isDarkTheme
            isLoading={!publisher}
            className="!bg-black rounded-[24px] !border-[#1F1F1F] md:!border-0 lg:p-6 md:p-6 sm:p-4 p-4"
            classNames={{
              identicon:
                'rounded-[8px] lg:w-20 md:w-20 sm:w-12 w-12 lg:h-20 md:h-20 sm:h-12 h-12   ',
            }}
            showIcon={false}
            totalRewardEarned={publisherStats?.totalUserRewards}
            totalSpent={publisherStats?.totalUserSponsor}
          />
          <ProfileResources value={publisher} isLoading={!publisher} isDarkTheme />
        </div>
      </div>
    </Skeleton.Provider>
  );
}
