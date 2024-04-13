import { Maybe } from '@watch/common';
import { Page } from 'types';

export function pathConnect(redirect?: Maybe<Page>) {
  return `?connect${redirect ? `&redirect=${pathTo(redirect)}` : ''}`;
}

export function pathTo(page: Page, ...params: (string | number | undefined)[]): string {
  try {
    switch (page) {
      case 'Landing': {
        return '/';
      }
      case 'Onboarding': {
        return '/onboarding';
      }
      case 'Library': {
        return '/library';
      }
      case 'MyProfile': {
        return '/profile';
      }
      case 'ViewBuilder': {
        return '/view-builder';
      }
      case 'BalanceHistory': {
        return '/balance-history';
      }
      case 'NotFound':
      case 'ContactUs': {
        return '/404';
      }

      default: {
        const first = params[0] || undefined;

        if (!first) {
          throw new Error('Missing required parameter');
        }

        switch (page) {
          case 'SmartContract': {
            return `/smart-contract/${first}`;
          }
          case 'CreateCollection': {
            return `/smart-contract/${first}/collection`;
          }
          case 'Collection': {
            return `/collection/${first}`;
          }
          case 'View': {
            return `/view/${first}`;
          }
          case 'Publisher': {
            return `/publisher/${first}`;
          }
          case 'ApiKey': {
            return `/api-key/${first}`;
          }
          case 'FundingActivity': {
            return `/funding-activity/${first}`;
          }
        }
      }
    }
  } catch (e) {
    return '#';
  }
}
