import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Buttons, CheckIcon, Header, Input, Modal, Skeleton, TimeAgo } from 'components';
import { useApi, useApiKey } from 'contexts';
import { MyProfileDocument, MyProfileQuery, useRevokeApiKeyMutation } from 'gql';
import { useUpdateApiKeyMutation } from 'hooks';
import { notify } from 'utils';

export function Details() {
  const { account, sessionKey } = useApi();
  const { apiKey } = useApiKey();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeactivateVisible, setIsDeactivateVisible] = useState(false);
  const [deactivateString, setDeactivateString] = useState('');
  const [editName, setEditName] = useState(apiKey?.name || '');

  const [updateApiKey, { loading: isUpdating }] = useUpdateApiKeyMutation({
    refetchQueries: ['ApiKey'],
    update(cache, { data }) {
      const variables = { address: account?.address, sessionKey };
      const prev = cache.readQuery<MyProfileQuery>({
        query: MyProfileDocument,
        variables,
      });

      prev?.apiKeys &&
        data?.updateApiKey?.key &&
        cache.writeQuery({
          query: MyProfileDocument,
          variables,
          data: {
            ...prev,
            apiKeys: (prev.apiKeys || []).map((a) =>
              a.key === data?.updateApiKey?.key ? data.updateApiKey : a
            ),
          },
        });
    },
  });

  const [revokeApiKey] = useRevokeApiKeyMutation({
    update(cache, { data }) {
      const variables = { address: account?.address, sessionKey };
      const prev = cache.readQuery<MyProfileQuery>({
        query: MyProfileDocument,
        variables,
      });

      prev?.apiKeys &&
        data?.revokeApiKey?.key &&
        cache.writeQuery({
          query: MyProfileDocument,
          variables,
          data: {
            ...prev,
            apiKeys: (prev.apiKeys || []).map((a) =>
              a.key === data?.revokeApiKey?.key ? data.revokeApiKey : a
            ),
          },
        });
    },
  });

  const onEdit = useCallback(async () => {
    if (isEditing && apiKey?.key && account?.address && sessionKey) {
      await updateApiKey({
        variables: {
          data: { key: apiKey.key as string, name: editName },
          address: account?.address,
          sessionKey,
        },
      });
      notify('API key updated', CheckIcon);
    }

    setIsEditing((prev) => !prev);
  }, [isEditing, apiKey?.key, account?.address, sessionKey, updateApiKey, editName]);

  const onDeactivate = useCallback(async () => {
    if (deactivateString === 'deactivate' && sessionKey && account?.address && apiKey?.key) {
      await revokeApiKey({
        variables: {
          data: { key: apiKey.key },
          address: account?.address,
          sessionKey,
        },
      });

      navigate('/profile');
      notify('API key deactivated', CheckIcon);
    }
  }, [deactivateString, sessionKey, account?.address, apiKey?.key, revokeApiKey, navigate]);

  useEffect(() => {
    apiKey?.name && setEditName(apiKey?.name);
  }, [apiKey?.name]);

  return (
    <>
      <div className="card sm:mb-[60px] mb-[24px] sm:p-5 sm:pb-8 p-4  !bg-transparent !bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] text-white rounded-[20px] !border-[#1F1F1F]">
        <div className="flex flex-wrap whitespace-nowrap items-center ">
          <div className="flex flex-1 items-center uppercase">
            <Skeleton.Loader isDarkTheme className="w-60 h-7">
              <div className="text-base font-medium">API Key</div>
              <div className="ml-2 bg-neutral-100 px-2 py-1 text-[10px] text-[#010314] rounded-full uppercase">
                {apiKey?.network}
              </div>
            </Skeleton.Loader>
          </div>
          <div className="text-sm text-[#B2B3B8]">
            <Skeleton.Loader isDarkTheme className="w-40 h-7">
              Created <TimeAgo date={apiKey?.createdAt} className="text-sm" />
            </Skeleton.Loader>
          </div>
        </div>
        <Skeleton.Loader isDarkTheme containerClassName="flex-1 flex mt-5">
          <Input
            className="mt-2 w-full !bg-[#060606] h-[48px] rounded-[25px] border border-solid !border-[#1F1F1F]"
            isDarkTheme
            isCopyOnly
            classNames={{ input: 'text-white', copyBtn: 'bg-transparent' }}
            value={apiKey?.key || ''}
          />
        </Skeleton.Loader>
      </div>
      <Header className="text-white text-2xl leading-[130%] sm:items-center items-start">
        Basic Details
      </Header>
      <div className="card sm:mb-[60px] mb-[40px] sm:p-5 p-4  !bg-transparent bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] text-white rounded-[20px] !border-[#1F1F1F]">
        <div className="uppercase text-[#B2B3B8] text-xs">
          <Skeleton.Loader isDarkTheme className="w-12 h-7">
            Name
          </Skeleton.Loader>
        </div>
        <form
          className="flex sm:flex-row flex-col flex-wrap items-center gap-4 mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            onEdit();
          }}
        >
          {isEditing ? (
            <>
              <Input
                className="flex-1 basis-full sm:basis-0 rounded-[20px] !border-[#1F1F1F] !bg-transparent bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] min-h-[48px] w-full"
                value={editName}
                onChange={setEditName}
                classNames={{
                  input: 'text-white ',
                }}
              />
              <Button
                className="sm:w-28 w-full h-12"
                isSubmit
                variant="darkThemeFilled"
                isDisabled={isUpdating}
              >
                Save
              </Button>
              <Button
                className="sm:w-28 w-full h-12"
                variant="darkThemeOutlined"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Skeleton.Loader isDarkTheme containerClassName="flex flex-1">
                <Input
                  isCopyOnly
                  isDarkTheme
                  className="text-md flex-1 max-w-full text-ellipsis whitespace-nowrap overflow-hidden font-medium  !border-[#1f1f1f] !bg-[#060606] rounded-3xl h-[48px] !border-solid w-full"
                  value={apiKey?.name}
                  classNames={{ copyBtn: 'bg-transparent' }}
                />
              </Skeleton.Loader>
              <Skeleton.Loader isDarkTheme className="h-10 w-24 leading-none">
                <Button
                  isSubmit
                  variant="darkThemeFilled"
                  className="text-sm h-[48px] sm:min-w-[117px] min-w-full"
                >
                  Edit
                </Button>
              </Skeleton.Loader>
            </>
          )}
        </form>
      </div>
      <Header className="text-2xl text-white font-normal sm:items-center items-start">
        Deactivate API Key
      </Header>
      <div className="card flex flex-col sm:flex-row sm:items-center items-start gap-4 sm:p-6 p-4 !bg-transparent bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] text-white rounded-[20px] !border-[#1F1F1F]">
        <div className="flex-1">
          <Skeleton.Loader isDarkTheme className="w-full h-8">
            Any applications using this project&apos;s keys will no longer be able to access the
            Timegraph API. This can not be undone.
          </Skeleton.Loader>
        </div>
        <Skeleton.Loader isDarkTheme className="h-10 w-48">
          <Button onClick={() => setIsDeactivateVisible(true)} variant="darkThemeOutlined">
            Deactivate API Key
          </Button>
        </Skeleton.Loader>
      </div>
      <Modal
        isDarkTheme
        isOpen={isDeactivateVisible}
        setIsOpen={setIsDeactivateVisible}
        className="max-w-md"
        classNames={{ content: 'items-start' }}
      >
        <div className="mb-3 text-center">
          <h5 className="text-left">Deactivate API Key</h5>
          <div className="mt-2 text-sm text-neutral-500">
            Type &apos;deactivate&apos; below to confirm:
          </div>
        </div>
        <form
          className="w-full"
          onSubmit={(e) => {
            e.preventDefault();
            onDeactivate();
          }}
        >
          <Input
            className="mb-4 w-ful rounded-[20px] !border-[#1F1F1F] !bg-transparent bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%] h-[48px]"
            classNames={{ input: 'text-white' }}
            value={deactivateString}
            onChange={setDeactivateString}
          />
          <Buttons className="w-full">
            <Button
              variant="darkThemeOutlined"
              className="h-12"
              onClick={() => {
                setIsDeactivateVisible(false);
              }}
            >
              Cancel
            </Button>
            <Button
              isDisabled={deactivateString !== 'deactivate'}
              isSubmit
              variant="darkThemeFilled"
              className="h-12"
            >
              Confirm
            </Button>
          </Buttons>
        </form>
      </Modal>
    </>
  );
}
