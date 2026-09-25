import { createSwapProxy } from "@awarizon/swap/server";

// Keeps aggregator API keys server-side. The swap widget on /swap points at
// /api/swap/{0x,lifi,jupiter}; only the quote/swap/status/token endpoints are forwarded.
const proxy = createSwapProxy({
  basePath: "/api/swap",
  zeroExApiKey: process.env.ZEROX_API_KEY,
  lifiApiKey: process.env.LIFI_API_KEY,
  jupiterApiKey: process.env.JUPITER_API_KEY,
});

export const dynamic = "force-dynamic";
export const GET = proxy;
export const POST = proxy;
