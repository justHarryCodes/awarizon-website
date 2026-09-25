import SwapDemo from "@/components/swap/SwapDemo";

export default function SwapPage() {
  // Only route through 0x when the server has a key — otherwise LI.FI covers EVM swaps
  return <SwapDemo zeroExEnabled={!!process.env.ZEROX_API_KEY} />;
}
