export const YAML_STRING = `endpoints:
  - network: Ethereum
    name: eth
    module: eth
    export:
      - function: getBlockNumber
        output:
          - value: as_word
  - network: Ethereum
    name: UniSwap
    mapping:
      - name: token_into_address
        map:
          - key: WETH
            value: C02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2
            type: hex_address
          - key: WBTC
            value: 2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599
            type: hex_address
          - key: UNI
            value: 1f9840a85d5aF5bf1D1762F925BDADdC4201F984
            type: hex_address
          - key: USDC
            value: A0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48
            type: hex_address
          - key: USDT
            value: dAC17F958D2ee523a2206206994597C13D831ec7
            type: hex_address
    contract:
      address: 7a250d5630B4cF539739dF2C5dAcb4c659F2488D
      abi:
        json: |
          [{
            "inputs": [
              {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
              },
              {
                "internalType": "address[]",
                "name": "path",
                "type": "address[]"
              }
            ],
            "name": "getAmountsOut",
            "outputs": [
              {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
              }
            ],
            "stateMutability": "view",
            "type": "function"
          }]
    export:
      - function: getAmountsOut
        input:
          - value: number_into_quad
          - into_array:
            - value: token_into_address
            - value: token_into_address
        output:
          - value: skip
          - value: as_quad

collections:
  - name: eth_block_number
    update:
      every: cycle
      from: eth
      function: getBlockNumber
      schema:
        - type: integer
          name: BockNumber
    sql: |
      select Cycle, BlockNumber
  - name: USDC_WETH
    update:
      every: cycle
      from: UniSwap
      with: [ 100e6, USDC, WETH ]
      schema:
        - type: decimal
          name: Price
          round: 8
          affinity: 20
    sql: |
      select Cycle, 'WETH' as Token, Price
  - name: USDC_UNI
    update:
      every: cycle
      from: UniSwap
      with: [ 100e6, USDC, UNI ]
      schema:
        - type: decimal
          name: Price
          round: 8
          affinity: 20
    sql: |
      select Cycle, 'UNI' as Token, Price
  - name: USDC_WBTC
    update:
      every: cycle
      from: UniSwap
      with: [ 100e6, USDC, WBTC ]
      schema:
        - type: decimal
          name: Price
          round: 8
          affinity: 10
    sql: |
      select Cycle, 'WBTC' as Token, Price

views:
  - name: LastUniSwapPrice
    sql: |
      select r.Cycle as Cycle, r.Token as Token, r.Price as Price from (
        select Cycle, Token, Price from USDC_WETH
        union
        select Cycle, Token, Price from USDC_WBTC
        union
        select Cycle, Token, Price from USDC_UNI ) r
      join
        the_last_cycle on r.Cycle = the_last_cycle.Cycle

  - name: UniSwapPrice
    sql: |
      select r.Cycle as Cycle, r.Token as Token, r.Price as Price from (
        select Cycle, Token, Price from USDC_WETH
        union
        select Cycle, Token, Price from USDC_WBTC
        union
        select Cycle, Token, Price from USDC_UNI ) r order by r.Cycle desc`;
