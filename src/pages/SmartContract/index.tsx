import { useParams } from 'react-router-dom';
import { Details } from './Details';
import { CollectionsContract } from './CollectionsContract';
import { BreadCrumbs, Skeleton } from 'components';
import { useSmartContract } from 'contexts';
import { useBreadCrumbsChild } from 'hooks/useBreadCrumbs';

export function SmartContract() {
  const { id: address } = useParams<{ id?: string }>();
  useBreadCrumbsChild({ page: 'SmartContract', params: [address] }, [{ page: 'Library' }]);

  const { resource: smartContract } = useSmartContract();

  return (
    <Skeleton.Provider isLoading={!smartContract}>
      <div className="mb-20 lg:p-16 !pt-0 px-0  w-full justify-start">
        <BreadCrumbs />
        <div className="md:[&>*]:mb-16 [&>*]:mb-12 ">
          <Details />
          <CollectionsContract key={address} />
        </div>
      </div>
    </Skeleton.Provider>
  );
}
