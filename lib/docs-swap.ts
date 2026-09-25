import type { DocSection } from './docs'

// Swap SDK, widget and hosted token list — spread into DOCS in lib/docs.ts.

export const SWAP_DOCS: DocSection[] = [
  // ── @awarizon/swap ──────────────────────────────────────────────────────────
  {
    id: 'swap-sdk',
    title: '@awarizon/swap',
    items: [
      { type: 'text', md: 'Multichain and cross-chain swaps behind one API. Every capable provider is queried in parallel and quotes come back sorted by output amount. Try it live on the [swap demo](/swap).' },
      {
        type: 'grid', cols: 3, items: [
          { label: 'Same-chain EVM',  sub: '0x Swap API v2 + LI.FI',  tag: 'SWAP' },
          { label: 'Same-chain Solana', sub: 'Jupiter + LI.FI',        tag: 'SWAP' },
          { label: 'Cross-chain',     sub: 'EVM ↔ EVM, EVM ↔ Solana via LI.FI', tag: 'BRIDGE' },
        ],
      },
      { type: 'shell', cmd: 'npm install @awarizon/swap', label: 'Install' },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'Executing swaps that start on Solana also needs `@solana/web3.js` (an optional peer dependency, loaded only when used).' },

      { type: 'h3', id: 'swap-client', title: 'new SwapClient(config)' },
      {
        type: 'code', filename: 'swap.ts', lang: 'ts', code: `import { SwapClient } from "@awarizon/swap"

export const swap = new SwapClient({
  integrator: "my-app",                  // LI.FI integrator id
  zeroEx:  { baseUrl: "/api/swap/0x" },  // your proxy — keeps the 0x key server-side
  lifi:    { baseUrl: "/api/swap/lifi" },
  jupiter: { baseUrl: "/api/swap/jupiter" },
})`,
      },
      {
        type: 'props', header: 'SwapClientConfig', rows: [
          { name: 'assetListUrl', type: 'string | string[]', desc: 'Hosted token list URL(s), tried in order. Defaults to the Awarizon list on jsDelivr.' },
          { name: 'assetList', type: 'SwapList', desc: 'Inline list — skips fetching (tests, SSR).' },
          { name: 'integrator', type: 'string', desc: 'Label sent to LI.FI; needed for fee collection.' },
          { name: 'fee', type: '{ bps, evmRecipient?, solanaFeeAccount? }', desc: 'Integrator fee in basis points for 0x and Jupiter routes.' },
          { name: 'zeroEx', type: '{ apiKey?, baseUrl? }', desc: '0x is skipped unless one of these is set.' },
          { name: 'lifi', type: '{ apiKey?, baseUrl? }', desc: 'Optional key for higher rate limits.' },
          { name: 'jupiter', type: '{ apiKey?, baseUrl? }', desc: 'Uses lite-api without a key.' },
          { name: 'rpcUrls', type: 'Record<number, string>', desc: 'Override RPCs per chain id (recommended for Solana: 501000101).' },
          { name: 'defaultSlippageBps', type: 'number', desc: 'Default 50 (0.5%).' },
        ],
      },

      { type: 'h3', id: 'swap-quotes', title: 'getQuotes(request)' },
      { type: 'text', md: 'Tokens can be symbols from the list or any address. Amounts are in base units. `fromAddress` is optional — without it you get indicative previews.' },
      {
        type: 'code', lang: 'ts', code: `const { best, quotes, errors } = await swap.getQuotes({
  fromChainId: 8453,        // Base
  toChainId: 501000101,     // Solana
  fromToken: "USDC",
  toToken: "SOL",
  amount: "25000000",       // 25 USDC (6 decimals)
  fromAddress: "0x…",
  toAddress: "7xKX…",       // required when chain types differ
  slippageBps: 50,
})

best.toAmount            // base units of SOL
best.toAmountMin         // after slippage
best.steps               // [{ type: "bridge", tool: "Mayan (Swift)", … }]
best.estimatedDurationSec`,
      },

      { type: 'h3', id: 'swap-execute', title: 'execute(quote, signers)' },
      { type: 'text', md: 'Switches the wallet to the right chain (adding it if needed), approves the token when required, signs, submits, waits for confirmation and — for cross-chain routes — tracks the bridge until funds arrive.' },
      {
        type: 'code', lang: 'ts', code: `import { evmSignerFromEip1193 } from "@awarizon/swap"

const result = await swap.execute(best, {
  evm: evmSignerFromEip1193(window.ethereum),
  solana: window.phantom?.solana,   // any wallet-adapter-shaped wallet
}, {
  approval: "exact",                // or "infinite"
  onUpdate: (u) => console.log(u.stage, u.message, u.txLink),
})

// preparing → switching-chain → approving → signing → submitted → confirming → bridging → done`,
      },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'Using wagmi? Wrap its wallet client with `evmSignerFromViem(walletClient)`.' },

      { type: 'h3', id: 'swap-proxy', title: 'Server proxy' },
      { type: 'text', md: 'Keep aggregator keys off the client. The proxy forwards only the quote, swap, status and token endpoints, so it can’t be used as an open relay.' },
      {
        type: 'code', filename: 'app/api/swap/[...path]/route.ts', lang: 'ts', code: `import { createSwapProxy } from "@awarizon/swap/server"

const proxy = createSwapProxy({
  basePath: "/api/swap",
  zeroExApiKey: process.env.ZEROX_API_KEY,
  lifiApiKey: process.env.LIFI_API_KEY,
  jupiterApiKey: process.env.JUPITER_API_KEY,
})

export const GET = proxy
export const POST = proxy`,
      },

      { type: 'h3', id: 'swap-assets', title: 'Tokens & chains' },
      {
        type: 'code', lang: 'ts', code: `await swap.assets.load()
swap.assets.chains()                        // enabled mainnet chains
swap.assets.tokens(8453)                    // listed + user-imported tokens
await swap.assets.search("usdc", 8453)      // symbol / name, or a pasted address
await swap.assets.resolveToken(8453, "0x…") // list → imports → on-chain lookup`,
      },
      { type: 'callout', icon: 'ℹ️', variant: 'info', md: 'Chain ids are EVM chain ids; Solana is `501000101`. Provider-specific ids (e.g. LI.FI’s Solana id) are mapped for you by the token list.' },
    ],
  },

  // ── @awarizon/swap-widget ───────────────────────────────────────────────────
  {
    id: 'swap-widget',
    title: '@awarizon/swap-widget',
    items: [
      { type: 'text', md: 'A drop-in React swap and bridge widget for EVM chains and Solana, built on `@awarizon/swap`. See it running on the [live demo](/swap).' },
      { type: 'shell', cmd: 'npm install @awarizon/swap-widget @solana/web3.js', label: 'Install' },

      { type: 'h3', id: 'widget-usage', title: '<SwapWidget />' },
      {
        type: 'code', filename: 'Swap.tsx', lang: 'tsx', code: `"use client"
import { SwapWidget } from "@awarizon/swap-widget"

export default function Swap() {
  return (
    <SwapWidget
      config={{ integrator: "my-app", zeroEx: { baseUrl: "/api/swap/0x" } }}
      evmProvider={window.ethereum}
      solanaWallet={phantom}
      onConnectWallet={(type) => openConnectModal(type)}  // "evm" | "svm"
      defaultFromChainId={8453}
      defaultToChainId={501000101}
      defaultFromToken="USDC"
      defaultToToken="SOL"
      theme="dark"
      accentColor="#C8F13F"
    />
  )
}`,
      },
      {
        type: 'props', header: 'SwapWidgetProps', rows: [
          { name: 'client / config', type: 'SwapClient / SwapClientConfig', desc: 'Share one client across your app, or let the widget create one.' },
          { name: 'evmProvider', type: 'EIP-1193 provider', desc: 'window.ethereum, WalletConnect, Privy… The connected account is tracked automatically.' },
          { name: 'evmSigner + evmAddress', type: 'EvmSigner, string', desc: 'Alternative to evmProvider, e.g. evmSignerFromViem(walletClient) with wagmi.' },
          { name: 'solanaWallet', type: 'SolanaSigner', desc: 'Wallet-adapter wallet or window.phantom.solana.' },
          { name: 'onConnectWallet', type: '(type) => void', desc: 'Called when a wallet of that type is needed.' },
          { name: 'defaultFromChainId / defaultToChainId', type: 'number', desc: 'Starting chains. Solana is 501000101.' },
          { name: 'defaultFromToken / defaultToToken', type: 'string', desc: 'Symbol or address.' },
          { name: 'chainIds', type: 'number[]', desc: 'Restrict which chains appear.' },
          { name: 'theme', type: "'light' | 'dark' | 'auto'", desc: 'Default auto (follows the OS).' },
          { name: 'accentColor / borderRadius', type: 'string / number', desc: 'Quick theming. For more, pass CSS variables in style.' },
          { name: 'onSwapComplete / onError', type: 'callbacks', desc: 'Fired after execution finishes or fails.' },
        ],
      },

      { type: 'h3', id: 'widget-theming', title: 'Theming' },
      { type: 'text', md: 'Styles are scoped under `.awz-sw` — no Tailwind needed and nothing leaks into your app. Override any CSS variable through `style`:' },
      {
        type: 'code', lang: 'tsx', code: `<SwapWidget
  style={{
    "--awz-accent": "#C8F13F",
    "--awz-accent-fg": "#000",
    "--awz-bg": "#0A0A0A",
    "--awz-surface": "#141414",
    "--awz-border": "#222",
    "--awz-radius": "4px",
  } as React.CSSProperties}
/>`,
      },

      { type: 'h3', id: 'widget-headless', title: 'useSwap() — headless' },
      { type: 'text', md: 'Build your own UI on the same state machine the widget uses: debounced quoting, auto-refresh, route selection and execution status.' },
      {
        type: 'code', lang: 'tsx', code: `import { useSwap, SwapClient } from "@awarizon/swap-widget"

const s = useSwap({ client, signers: { evm, solana }, evmAddress, solanaAddress })

s.setAmount("25")
s.quote?.toAmount   // best quote
s.quotes?.quotes    // all routes
await s.execute()
s.status            // { stage, message, txLink }`,
      },
    ],
  },

  // ── Token list ──────────────────────────────────────────────────────────────
  {
    id: 'swap-token-list',
    title: 'Swap Token List',
    items: [
      { type: 'text', md: 'The swap SDK loads its tokens and chains at runtime from a hosted list, so new assets ship without an SDK release or app redeploy. The list is a superset of the Uniswap Token List format with an extra `chains` array.' },
      { type: 'code', lang: 'txt', code: 'https://cdn.jsdelivr.net/gh/Awaizon-ltd/awarizon-sdk-core@main/token-lists/dist/awarizon.swaplist.min.json' },
      { type: 'callout', icon: '💡', variant: 'tip', md: 'Users can already trade any token by pasting its address — metadata is read on-chain and the widget shows a warning before importing it. Listing a token makes it searchable and removes the warning.' },

      { type: 'h3', id: 'list-add-token', title: 'Add a token' },
      { type: 'text', md: 'Append it to `token-lists/src/custom.json`, run the build, and push. CI validates the list and purges the CDN cache; clients pick it up within the hour.' },
      {
        type: 'code', filename: 'token-lists/src/custom.json', lang: 'json', code: `{
  "tokens": [
    { "chainId": 8453, "address": "0x…", "symbol": "ABC", "name": "ABC Token", "decimals": 18, "logoURI": "https://…" }
  ],
  "blocklist": []
}`,
      },
      { type: 'shell', cmd: 'node token-lists/build.mjs', label: 'Build' },

      { type: 'h3', id: 'list-add-chain', title: 'Add a chain' },
      { type: 'text', md: 'Add an entry to `token-lists/src/chains.json`. The `providers` object decides routing — a chain with no providers is hidden.' },
      {
        type: 'code', lang: 'json', code: `"providers": {
  "zeroEx":  { "chainId": 8453 },
  "jupiter": {},
  "lifi":    { "chainId": 1151111081099710 }
}`,
      },

      { type: 'h3', id: 'list-chains', title: 'Supported chains' },
      {
        type: 'chain-grid', items: [
          { id: '1',         name: 'Ethereum',    tag: '0x · LI.FI' },
          { id: '8453',      name: 'Base',        tag: '0x · LI.FI' },
          { id: '501000101', name: 'Solana',      tag: 'Jupiter · LI.FI' },
          { id: '42161',     name: 'Arbitrum',    tag: '0x · LI.FI' },
          { id: '10',        name: 'OP Mainnet',  tag: '0x · LI.FI' },
          { id: '56',        name: 'BNB Chain',   tag: '0x · LI.FI' },
          { id: '137',       name: 'Polygon',     tag: '0x · LI.FI' },
          { id: '43114',     name: 'Avalanche',   tag: '0x · LI.FI' },
          { id: '130',       name: 'Unichain',    tag: '0x · LI.FI' },
          { id: '81457',     name: 'Blast',       tag: '0x · LI.FI' },
          { id: '480',       name: 'World Chain', tag: '0x · LI.FI' },
          { id: '143',       name: 'Monad',       tag: '0x · LI.FI' },
          { id: '4663',      name: 'Robinhood',   tag: 'LI.FI' },
          { id: '42220',     name: 'Celo',        tag: 'LI.FI' },
          { id: '324',       name: 'zkSync Era',  tag: 'LI.FI' },
          { id: '196',       name: 'X Layer',     tag: 'LI.FI' },
          { id: '4217',      name: 'Tempo',       tag: 'LI.FI' },
        ],
      },
    ],
  },
]
