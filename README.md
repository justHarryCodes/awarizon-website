# Awarizon: Website, Docs and Developer Dashboard

The source for [awarizon.com](https://awarizon.com): the marketing site, the SDK documentation, and the developer dashboard where builders manage API keys and usage for the [Awarizon Web3 SDK](https://github.com/Awaizon-ltd/awarizon-sdk).

## What's inside

| Area | Routes | Description |
|---|---|---|
| **Marketing** | `/`, `/sdk`, `/infrastructure`, `/ecosystem`, `/adoption`, `/thesis`, `/company`, `/custom-solutions`, `/shift` | Product pages for the SDK and the Awarizon platform. |
| **Docs** | `/docs`, `/docs/[slug]` | SDK documentation: quickstart, packages, API reference and guides. |
| **Learn** | `/learn`, `/learn/[slug]` | Web3 learning content for developers. |
| **Swap** | `/swap` | A live multichain swap built on `@awarizon/swap-widget` (0x, Jupiter and LI.FI). |
| **Dashboard** | `/dashboard/*` | Sign-in, API key management, usage analytics, a contract codegen tool, and profile and settings. |
| **API** | `/api/*` | Key issuing and validation, usage metering, codegen, and a server-side swap proxy that keeps aggregator keys off the client. |

## Tech stack

- [Next.js](https://nextjs.org) (App Router), React and TypeScript
- Tailwind CSS, Framer Motion, Lenis smooth scrolling, Rive and Three.js / Vanta visuals
- Firebase Auth and Firestore for dashboard accounts, API keys and usage; Firebase Admin on the server
- `@awarizon/swap-widget` and `@solana/web3.js` for the swap page
- EmailJS for the contact forms

## Getting started

```bash
git clone https://github.com/justHarryCodes/awarizon-website.git
cd awarizon-website
npm install
cp .env.local.example .env.local   # then fill in the values
npm run dev                         # http://localhost:3000
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Lint |

## Environment variables

See [`.env.local.example`](.env.local.example).

| Group | Variables | Used for |
|---|---|---|
| Firebase (client) | `NEXT_PUBLIC_FIREBASE_API_KEY`, `…_AUTH_DOMAIN`, `…_PROJECT_ID`, `…_STORAGE_BUCKET`, `…_MESSAGING_SENDER_ID`, `…_APP_ID` | Dashboard sign-in and data |
| Firebase Admin (server) | `FIREBASE_ADMIN_PROJECT_ID`, `FIREBASE_ADMIN_CLIENT_EMAIL`, `FIREBASE_ADMIN_PRIVATE_KEY` | API key validation and usage writes |
| Swap (server) | `ZEROX_API_KEY`, `LIFI_API_KEY`, `JUPITER_API_KEY` | The aggregator proxy in `/api/swap` |
| Solana | `NEXT_PUBLIC_SOLANA_RPC_URL` | Solana quotes and balances |
| EmailJS | `NEXT_PUBLIC_EMAILJS_SERVICE_ID`, `…_TEMPLATE_ID`, `…_PUBLIC_KEY` | Contact forms |

Server-only variables (no `NEXT_PUBLIC_` prefix) are never sent to the browser.

## Project structure

```
app/                 # Routes (marketing, docs, learn, swap, dashboard) and API handlers
components/          # Navigation, footer, dashboard, docs, swap, motion and UI components
lib/                 # Config, docs and learn content, codegen, Firebase helpers, animations
scripts/             # Maintenance scripts (theme recolouring)
firestore.indexes.json
```

## Related

- [Awarizon Web3 SDK](https://github.com/Awaizon-ltd/awarizon-sdk): the SDK these docs describe
- [Kendra](https://github.com/Awaizon-ltd/kendra-IDE): a smart-contract IDE from Awarizon
