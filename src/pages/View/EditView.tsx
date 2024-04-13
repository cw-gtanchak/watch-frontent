import { useCallback, useState } from 'react';
import { Button, CheckIcon, EditMetadata } from 'components';
import { useApi, useView } from 'contexts';
import { useEditViewMutation } from 'gql';
import { useEditMetadata } from 'hooks';
import { notify } from 'utils';

export function EditView() {
  const { account, sessionKey } = useApi();
  const { resource: view } = useView();
  const editMetadata = useEditMetadata({
    name: view?.name,
    description: view?.description || '',
    tags: view?.tags,
  });

  const [isOpen, setIsOpen] = useState(false);

  const [editView, { loading: isEditing }] = useEditViewMutation({
    refetchQueries: ['Resource'],
  });

  const onSubmit = useCallback(() => {
    if (view && account) {
      editView({
        variables: {
          data: {
            hashId: view.hashId,
            name: editMetadata.name,
            description: editMetadata.description,
            tags: editMetadata.tags,
          },
          address: account.address,
          sessionKey,
        },
      }).then(() => {
        setIsOpen(false);
        notify('Collection has been updated', CheckIcon);
      });
    }
  }, [
    account,
    editMetadata.description,
    editMetadata.name,
    editMetadata.tags,
    editView,
    sessionKey,
    view,
  ]);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Edit</Button>
      <EditMetadata
        isLoading={isEditing}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onSubmit}
        labels={{
          title: 'Edit View',
          nameLabel: 'View Name',
          namePlaceholder: 'Enter a new name for this view',
          descriptionLabel: 'View Description',
          descriptionPlaceholder: 'Enter a new description for this view',
          submitButton: 'Submit',
          helpLabel: 'editing view',
        }}
        {...editMetadata}
      />
    </>
  );
}
