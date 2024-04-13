import { Navigate, createHashRouter } from 'react-router-dom';
import * as pages from './pages';
import { Layout } from 'components';
import {
  ApiKeyProvider,
  PublisherProvider,
  ResourceProvider,
  MyProfileProvider,
  NewViewBuilderProvider,
} from 'contexts';
import { SearchType } from 'gql';
import { pathTo } from 'utils';
import AllContextProvider from 'contexts/AllContextProvider';
import { NewViewBuilder } from 'pages/NewViewBuilder';

export const router = createHashRouter([
  {
    element: (
      <Layout classNames={{ inner: 'md:pt-0 sm:px-0 px-3', base: 'bg-[#010101] ' }} isLanding />
    ),
    children: [
      {
        path: pathTo('Landing'),
        element: <pages.Landing />,
      },
    ],
  },
  {
    element: (
      <Layout isOnboarding classNames={{ inner: 'flex md:items-center justify-center md:pt-0' }} />
    ),
    children: [
      {
        path: pathTo('Onboarding'),
        element: <pages.Onboarding />,
      },
    ],
  },
  {
    element: <Layout />,
    children: [
      {
        path: pathTo('Library'),
        element: <pages.Library />,
      },
      {
        path: pathTo('MyProfile'),
        element: (
          <MyProfileProvider>
            <pages.MyProfile />
          </MyProfileProvider>
        ),
      },
      {
        path: pathTo('ViewBuilder'),
        element: <NewViewBuilder />,
      },
      {
        path: pathTo('SmartContract', ':id'),
        element: (
          <ResourceProvider type={SearchType.SmartContracts}>
            <pages.SmartContract />
          </ResourceProvider>
        ),
      },
      {
        path: pathTo('View', ':id'),
        element: (
          <ResourceProvider type={SearchType.Views}>
            <pages.View />
          </ResourceProvider>
        ),
      },
      {
        path: pathTo('ApiKey', ':id'),
        element: (
          <ApiKeyProvider>
            <pages.ApiKey />
          </ApiKeyProvider>
        ),
      },
      {
        path: pathTo('Publisher', ':id'),
        element: (
          <PublisherProvider>
            <pages.Publisher />
          </PublisherProvider>
        ),
      },
      {
        path: pathTo('FundingActivity', ':id'),
        element: (
          <ResourceProvider type={SearchType.Views}>
            <pages.FundingActivity />
          </ResourceProvider>
        ),
      },
      {
        path: pathTo('BalanceHistory'),
        element: (
          <MyProfileProvider>
            <pages.BalanceHistory />
          </MyProfileProvider>
        ),
      },
    ],
  },
  {
    path: pathTo('NotFound'),
    element: <pages.NotFound />,
  },
  {
    path: '/*',
    element: <Navigate to={pathTo('NotFound')} replace />,
  },
]);
