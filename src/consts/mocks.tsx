import { Link } from 'react-router-dom';
import { MockRow, QuerySpec, TableCol } from 'types';
import { arrayOfSize, toUSD } from 'utils';

export const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const QUERY_SPEC: QuerySpec[] = [
  {
    id: 'last_eth_block_number',
    fields: ['cycle', 'blocknumber'],
    params: [],
  },
  {
    id: 'last_USDC_UNI',
    fields: ['cycle', 'price'],
    params: [],
  },
  {
    id: 'USDC_UNI',
    fields: ['cycle', 'price'],
    params: [
      { id: 'limit', defaultValue: 2 },
      { id: 'before', defaultValue: 60 },
    ],
  },
  {
    id: 'USDC_WBTC',
    fields: ['cycle', 'price'],
    params: [{ id: 'limit', defaultValue: 2 }, { id: 'before' }],
  },
  {
    id: 'USDC_WETH',
    fields: ['cycle', 'price'],
    params: [
      { id: 'limit', defaultValue: 2 },
      { id: 'before', defaultValue: 60 },
    ],
  },
];

export const VIEW_AVG_MOCK_RESULT = {
  data: [
    {
      Avg: '1866.45',
    },
    {
      Avg: '1866.42',
    },
    {
      Avg: '1866.69',
    },
    {
      Avg: '1864.50',
    },
    {
      Avg: '1865.33',
    },
    {
      Avg: '1866.01',
    },
    {
      Avg: '1866.06',
    },
    {
      Avg: '1866.92',
    },
    {
      Avg: '1867.18',
    },
    {
      Avg: '1867.25',
    },
  ],
};

export const JSON_STRING = `{
  "data": {
    "protocols": [
      {
        "id": "0",
        "inflation": "218500",
        "inflationChange": "500",
        "maxEarningsClaimsRounds": 100
      }
    ],
    "transcoders": [
      {
        "id": "0x000000000000000000000000000000000",
        "activationRound": "0",
        "deactivationRound": "0",
        "lastActiveStakeUpdateRound": "0"
      },
      {
        "id": "0x004dcf13e2f37abea365a9ed94e568906a39a",
        "activationRound": "0",
        "deactivationRound": "0",
        "lastActiveStakeUpdateRound": "0"
      }
    ]
  }
}`;

export const TABLE_COLS: TableCol[] = [
  { id: 'address', label: 'Address' },
  { id: 'ens', label: 'ENS' },
  { id: 'holdingBalance', label: 'Holding Balance', format: (v) => v.toLocaleString() },
  { id: 'holdingValue', label: 'Holding Value', format: toUSD },
  { id: 'avgHoldingCost', label: 'Avg Holding Cost' },
  {
    id: 'netCost',
    label: 'Net Cost',
    format: (v) => <span className="text-red-500">{toUSD(v)}</span>,
  },
  {
    id: 'profit',
    label: 'Profit',
    format: (v) => <span className="text-green-500">{toUSD(v)}</span>,
  },
  { id: 'roi', label: 'ROI', format: (v) => `${v.toLocaleString()}%` },
  { id: 'revenue', label: 'Revenue', format: toUSD },
  {
    id: 'link',
    label: 'Link',
    format: (v) => (
      <Link to="#" className="hyperlink">
        {v}
      </Link>
    ),
  },
];

export const TABLE_ROW: MockRow = {
  address: '0xjkfhkh38bdktfg373443bd1d',
  ens: '',
  holdingBalance: 4750480933293,
  holdingValue: 1262354,
  avgHoldingCost: 2.95891632617404e-8,
  netCost: -140538,
  profit: 1221816,
  roi: 809.48,
  totalCost: -150.93,
  revenue: 10401,
  link: 'link- >analog',
};

export const TABLE_DATA: MockRow[] = arrayOfSize(50).map(() => TABLE_ROW);
