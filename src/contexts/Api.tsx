import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import init, { build_ssk, encode_ssk } from '@analog-labs/timegraph-wasm/web/lib';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { CheckIcon, ConnectAccount } from 'components';
import { ChainProperties, Setter, VoidFn } from 'types';
import {
  ApiPromise,
  getChainProperties,
  notify,
  WsProvider,
  web3Accounts,
  web3Enable,
  web3FromSource,
  hexToU8a,

  pathTo,
  stringToHex,
} from 'utils';

import { useCreateUserMutation, useUserLazyQuery } from 'hooks';
// import { useSearchParams } from 'react-router-dom';

interface ApiState {
  api: ApiPromise;
  account: InjectedAccountWithMeta | null | undefined;
  sessionKey: string | undefined;
  chainProps: ChainProperties;
  isConnecting: boolean;
  isReady: boolean;
  onConnect: (_?: string | null, __?: string) => Promise<void>;
  onConfirm: (
    _: InjectedAccountWithMeta,
    __?: ((_: InjectedAccountWithMeta) => void) | null
  ) => Promise<void>;
  onDisconnect: VoidFn;
  accountOptions: InjectedAccountWithMeta[] | null;
  selectedWallet: string;
  setSelectedWallet: Setter<string>;
  walletAccountOptions: InjectedAccountWithMeta[] | null;
  showRefresh: boolean;
  setShowRefresh: Setter<boolean>;
  isConfirming: boolean;
  setIsConfirming: Setter<boolean>;
  setIsConnecting: Setter<boolean>;
}

export const ApiContext = createContext<ApiState>({
  account: null,
  isConnecting: false,
} as unknown as ApiState);

export function ApiProvider({ children }: React.PropsWithChildren) {
  const connectedRef = useRef(false);
  // const [searchParams, setSearchParams] = useSearchParams();

  const [api, setApi] = useState({} as ApiPromise);
  const [isReady, setIsReady] = useState(false);
  const [chainProps, setChainProps] = useState({} as ChainProperties);
  const [selectedWallet, setSelectedWallet] = useState('');
  const [account, setAccount] = useState<InjectedAccountWithMeta | null>();
  const [sessionKey, setSessionKey] = useState<string | undefined>();
  const [cookies, setCookie, removeCookie] = useCookies(['sessionKey', 'account']);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [showRefresh, setShowRefresh] = useState(false);

  const [accountOptions, setAccountOptions] = useState<InjectedAccountWithMeta[] | null>(null);
  const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
  const [renderConnectAccount, setRenderConnectAccount] = useState(false);
  // const [isConnectModalOpen, setIsConnectModalOpen] = useState(
  //   searchParams.get('connect') !== null
  // );

  const [fetchUser] = useUserLazyQuery();
  const [createUser] = useCreateUserMutation();

  const navigate = useNavigate();

  const onConfirm = useCallback(
    async (
      account: InjectedAccountWithMeta,
      onComplete?: ((_: InjectedAccountWithMeta) => void) | null
    ) => {
      setIsConfirming(true);

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

        try {
          const { signature } = await signRaw({
            address: account.address,
            data: stringToHex(sskData),
            type: 'bytes',
          });
          let user;
          const sessionKey = build_ssk(sskData, hexToU8a(signature));
          try {
            const fetch = await fetchUser({
              variables: { address: account.address, sessionKey },
            });

            if (!fetch.data) {
              throw new Error();
            }
            user = fetch?.data?.user;
          } catch (e) {
            const create = await createUser({
              variables: { address: account.address, sessionKey },
            });
            user = create?.data?.createUser;
          }

          if (user) {
            setAccount(account);
            setSessionKey(sessionKey);
            setIsConfirming(false);

            notify('Account connected', CheckIcon);

            onComplete && onComplete(account);
          }
        } catch (e) {
          // @ts-ignore
          const eString = e.toString() as string;
          if (
            eString === 'Error: Cancelled' ||
            eString === 'Error: Rejected by user' ||
            eString.includes('User Rejected Request')
          ) {
            setIsConfirming(false);
          }
        }
      }
    },
    [fetchUser, createUser, setAccount, setSessionKey]
  );

  const onDisconnect = useCallback(() => {
    setAccount(null);
    removeCookie('account');
    removeCookie('sessionKey');
    navigate(pathTo('Landing'));
    notify('Account disconnected', CheckIcon);
  }, [setAccount]);

  const onConnect = useCallback(
    async (address?: string | null, wallet?: string) => {
      setIsConnecting(true);

      const timeoutId = setTimeout(() => {
        setShowRefresh(true);
      }, 8000);
      await web3Enable('analog-watch');

      clearTimeout(timeoutId);

      const allAccounts = await web3Accounts({ ...(wallet && { extensions: [wallet] }) });

      if (address) {
        const isOwned = allAccounts.some((a) => a.address === address);
        if (!isOwned) {
          onDisconnect();
        }

        fetchUser({
          variables: { address, sessionKey },
        }).then((res) => {
          if (!res?.data?.user) {
            onDisconnect();
          }
        });
      } else {
        setAccountOptions(
          [...allAccounts].reduce((unique: InjectedAccountWithMeta[], item) => {
            return unique.find((el) => el.address === item.address) ? unique : [...unique, item];
          }, [])
        );
        setSelectedAccount(allAccounts[0]);
      }
      setIsConnecting(false);
    },
    [fetchUser, onDisconnect, sessionKey]
  );

  const walletAccountOptions = useMemo(() => {
    if (selectedWallet === 'all') {
      return (
        accountOptions?.filter(
          (account) =>
            account.meta.source !== 'talisman' &&
            account.meta.source !== 'enkrypt' &&
            account.meta.source !== 'subwallet-js' &&
            account.meta.source !== 'polkadot-js'
        ) || null
      );
    } else {
      return accountOptions?.filter((account) => account.meta.source === selectedWallet) || null;
    }
  }, [selectedWallet, accountOptions]);

  const value = useMemo(
    () => ({
      account,
      sessionKey,
      api,
      chainProps,
      isConnecting,
      isReady,
      onConnect,
      onConfirm,
      onDisconnect,
      setRenderConnectAccount,
      accountOptions,
      selectedWallet,
      setSelectedWallet,
      walletAccountOptions,
      showRefresh,
      setShowRefresh,
      isConfirming,
      setIsConfirming,
      setIsConnecting,
    }),
    [
      account,
      api,
      chainProps,
      isConnecting,
      isReady,
      onConnect,
      onConfirm,
      onDisconnect,
      setRenderConnectAccount,
      sessionKey,
      accountOptions,
      selectedWallet,
      setSelectedWallet,
      walletAccountOptions,
      showRefresh,
      setShowRefresh,
      isConfirming,
      setIsConfirming,
      setIsConnecting,
    ]
  );

  useEffect((): void => {
    const wsProvider = new WsProvider(import.meta.env.VITE_RPC_URL);
    const _api = new ApiPromise({ provider: wsProvider });
    _api.on('connected', async () => {
      await _api.isReady;
      console.log(`WS: connected to ${import.meta.env.VITE_RPC_URL}`);
      const _chainProps = await getChainProperties(_api);
      setApi(_api);
      setChainProps(_chainProps);
      setIsReady(true);
    });
    _api.on('disconnected', () => {
      console.log('WS: disconnected');
      setIsReady(false);
    });
  }, []);

  useEffect(() => {
    if (account?.address && sessionKey && !connectedRef.current) {
      onConnect(account.address);
      connectedRef.current = true;
    }
  }, [account?.address, sessionKey, onConnect]);

  useEffect(() => {
    if (sessionKey)
      setCookie('sessionKey', sessionKey, {
        sameSite: 'strict',
        secure: false,
        maxAge: 34560000,
      });
  }, [sessionKey]);

  useEffect(() => {
    if (account)
      setCookie('account', account, {
        sameSite: 'strict',
        secure: false,
        maxAge: 34560000,
      });
  }, [account]);

  useEffect(() => {
    if (cookies.account) setAccount(cookies.account);
    setSessionKey(cookies.sessionKey);
  }, []);

  return (
    <ApiContext.Provider value={value}>
      {children}
      <ConnectAccount
        options={accountOptions}
        walletOption={walletAccountOptions}
        selected={selectedAccount}
        setSelected={setSelectedAccount}
        renderConnectAccount={renderConnectAccount}
        showRefresh={showRefresh}
      />
    </ApiContext.Provider>
  );
}

export const useApi = () => useContext(ApiContext);
