import { ResourceList } from 'components';
import { SmartContract } from 'gql';
import { usePageFilter } from 'hooks/usePageFilter';
import React from 'react';

function ViewSmartContractList({ smartContracts }: { smartContracts: SmartContract[] }) {
  const { controller, currentPage } = usePageFilter(smartContracts);
  return (
    <>
      <ResourceList value={currentPage} />
      {controller}
    </>
  );
}

export default ViewSmartContractList;
