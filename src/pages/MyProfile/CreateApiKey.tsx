import { useCallback, useEffect, useMemo, useState } from 'react';
import { useApi, useMyProfile } from 'contexts';
import {
  Button,
  Buttons,
  CopyButton,
  DownloadButton,
  Input,
  InputCheckBox,
  Loader,
  Modal,
  ModalProps as Props,
  Select,
} from 'components';
import { useCreateApiKeyMutation } from 'hooks';
import { Network } from 'types';
import { classes } from 'utils';
import { generateApiKey } from 'utils/wasm';
import ListBox, { ListBoxOptionType } from 'components/ListBox';
// import { createApiKey } from 'utils/wasm';

const networkOption: ListBoxOptionType[] = [
  { id: 1, name: 'Testnet', value: 'testnet' },
  { id: 2, name: 'Mainnet', value: 'mainnet', unavailable: true },
];

export function CreateApiKey(props: Props) {
  const { setIsOpen: _setIsOpen } = props;
  const { account, sessionKey } = useApi();

  const [createApiKey, { loading: isLoading }] = useCreateApiKeyMutation();

  const [step, setStep] = useState(0);
  const [secret, setSecret] = useState<string | null>(null);
  const [network, setNetwork] = useState<ListBoxOptionType | undefined>();
  const [name, setName] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const setIsOpen = useCallback(
    (isOpen: boolean) => {
      // if (step === 2 && !confirmed) {
      //   return;
      // }

      _setIsOpen && _setIsOpen(isOpen);
      setStep(0);
      setName('');
      setIsClicked(false);
      setNetwork(undefined);
    },
    [_setIsOpen, step, confirmed]
  );

  const onSubmit = useCallback(async () => {
    switch (step) {
      case 0:
        setStep((step) => step + 1);
        break;

      case 1:
        if (account?.address && sessionKey && !!network) {
          setIsClicked(true);
          try {
            const { key, cert, secret } = await generateApiKey(account);

            const result = await createApiKey({
              variables: {
                data: { cert, name, network: (network?.value || Network.Testnet) as Network, key },
                address: account.address,
                sessionKey,
              },
              refetchQueries: ['MyProfile'],
            });

            if (result?.data?.createApiKey) {
              setSecret(secret);
              setStep((step) => step + 1);
            }
            setIsClicked(false);
          } catch (e) {
            setIsClicked(false);
          }
        }
        break;

      default:
        setIsOpen(false);
        break;
    }
  }, [step, account, sessionKey, network, setIsOpen, createApiKey, name]);

  const [content, nextButton] = useMemo<[React.ReactNode, React.ReactNode]>(() => {
    switch (step) {
      case 0: {
        return [
          <div className="mb-6">
            <p className="text-white font-['Neue text-sm mb-2">Instance</p>
            <ListBox
              options={networkOption}
              placeHolder="Select which instance"
              selected={network as ListBoxOptionType}
              setSelected={setNetwork}
              classNames={{ button: 'mt-3' }}
            />
          </div>,
          <Button
            isDisabled={!network}
            isSubmit
            key="next-step"
            variant="darkThemeFilled"
            className="max-w-[120px] m-auto"
          >
            Next
          </Button>,
        ];
      }

      case 1: {
        return [
          <div className="">
            <p className="text-sm text-[#B2B3B8] font-['Neue text-sm leading-[140%] pb-6">
              Please securely save your API secret, our system won't store this for you.
            </p>
            <div>
              <span className="flex flex-col justify-center self-stretch h-4 text-white mb-2">
                Project Name
              </span>
              <Input
                key="input-name"
                value={name}
                className="flex items-center py-3 px-6  rounded-full border border-[#1f1f1f] bg-[#060606] placeholder:text-[#808080]  font-['Neue text-sm leading-[140%] "
                filter={/^([-._]*)[^\w]/g}
                onChange={setName}
                placeholder="e.x. Project 1"
                classNames={{ input: 'p-0 text-white text-[14px]' }}
              />
            </div>
          </div>,
          <Button
            isDisabled={!name || name.length === 0 || isClicked}
            isSubmit
            key="next-step"
            variant="darkThemeFilled"
            className="m-auto max-w-[10.5rem] "
          >
            Generate API Key
          </Button>,
        ];
      }

      default: {
        return [
          <>
            <div className="mb-6 text-sm  text-left text-[#b2b3b8] font-['Neue text-sm'] leading-[140%]">
              Please securely save your API secret, our
              <br />
              system won&apos;t store this for you.
            </div>
            <div className="mb-2 text-white font-['Neue text-sm'] text-[14px]">API key</div>
            <Input
              className="mb-6 cursor-pointer rounded-full border border-[#1f1f1f] bg-[#060606] text-white "
              onFocus={(e) => e.target.select()}
              value={secret}
              classNames={{ input: 'text-white' }}
            >
              <DownloadButton className="mr-1" value={secret as string} filename={`${name}.txt`} />
              <CopyButton value={secret as string} />
            </Input>
          </>,
          <Button
            key="close"
            variant="darkThemeFilled"
            className="max-w-[8.9375rem] h-12 m-auto"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            Next
          </Button>,
        ];
      }
    }
  }, [step, network, name, secret, confirmed, onSubmit, isClicked]);

  if (!account) {
    return null;
  }

  return (
    <Modal
      isOpen={props.isOpen}
      setIsOpen={setIsOpen}
      isDarkTheme
      className={classes('w-full max-w-md', step < 2 && 'p-[34px]')}
    >
      {isLoading ? (
        <div className="text-white flex gap-5 flex-col">
          <Loader className="text-white" />
          Loading...
        </div>
      ) : (
        <form
          className="flex h-full w-full flex-col font-['Neue_Montreal']"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
        >
          <div className="mb-6">
            <h5 className="self-stretch text-white text-2xl font-normal leading-8 normal-case">
              {step === 2 ? 'API Key Created!' : 'Create a new API key'}
            </h5>
          </div>
          <div className="flex-1">{content}</div>
          <Buttons className="w-full mt-6">{nextButton}</Buttons>
        </form>
      )}
    </Modal>
  );
}
