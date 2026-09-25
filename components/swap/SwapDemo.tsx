"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import Link from "next/link";
import { DEFAULT_ASSET_LIST_URLS, SwapClient, SwapWidget, type SolanaSigner } from "@awarizon/swap-widget";
import PageTransition from "@/components/motion/PageTransition";
import Reveal from "@/components/motion/Reveal";

// ─── Injected wallets ─────────────────────────────────────────────────────────

interface Eip1193 {
  request(args: { method: string; params?: unknown[] | object }): Promise<any>;
  on?(event: string, fn: (...a: any[]) => void): void;
  removeListener?(event: string, fn: (...a: any[]) => void): void;
}

interface PhantomLike {
  publicKey: { toBase58(): string } | null;
  connect(): Promise<unknown>;
  signTransaction?<T>(tx: T): Promise<T>;
  signAndSendTransaction?<T>(tx: T): Promise<{ signature: string }>;
  on?(event: string, fn: (...a: any[]) => void): void;
  off?(event: string, fn: (...a: any[]) => void): void;
}

declare global {
  interface Window {
    ethereum?: Eip1193;
    solana?: PhantomLike;
    phantom?: { solana?: PhantomLike };
  }
}

const getSolana = () => (typeof window === "undefined" ? undefined : window.phantom?.solana ?? window.solana);

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SwapDemo({ zeroExEnabled }: { zeroExEnabled: boolean }) {
  const client = useMemo(
    () =>
      new SwapClient({
        integrator: "awarizon",
        // Hosted list first (updates without a deploy); the copy in /public keeps the demo up if the CDN is unreachable
        assetListUrl: [...DEFAULT_ASSET_LIST_URLS, "/awarizon.swaplist.min.json"],
        zeroEx: zeroExEnabled ? { baseUrl: "/api/swap/0x" } : undefined,
        lifi: { baseUrl: "/api/swap/lifi" },
        jupiter: { baseUrl: "/api/swap/jupiter" },
        rpcUrls: process.env.NEXT_PUBLIC_SOLANA_RPC_URL ? { 501000101: process.env.NEXT_PUBLIC_SOLANA_RPC_URL } : undefined,
      }),
    [zeroExEnabled],
  );

  // EVM provider only exists after hydration
  const [evm, setEvm] = useState<Eip1193 | undefined>();
  const [solKey, setSolKey] = useState<string | undefined>();
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setEvm(window.ethereum);
    const sol = getSolana();
    if (!sol) return;
    const sync = () => setSolKey(sol.publicKey?.toBase58());
    sync();
    sol.on?.("connect", sync);
    sol.on?.("accountChanged", sync);
    sol.on?.("disconnect", sync);
    return () => {
      sol.off?.("connect", sync);
      sol.off?.("accountChanged", sync);
      sol.off?.("disconnect", sync);
    };
  }, []);

  const connect = useCallback(async (type: "evm" | "svm") => {
    setNotice(null);
    try {
      if (type === "evm") {
        if (!window.ethereum) return setNotice("No EVM wallet found. Install MetaMask, Rabby or another browser wallet.");
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else {
        const sol = getSolana();
        if (!sol) return setNotice("No Solana wallet found. Install Phantom or Backpack.");
        await sol.connect();
        setSolKey(sol.publicKey?.toBase58());
      }
    } catch {
      /* user closed the wallet prompt */
    }
  }, []);

  const solanaWallet: SolanaSigner | undefined = useMemo(() => {
    const sol = getSolana();
    if (!sol || !solKey) return undefined;
    return {
      publicKey: solKey,
      signTransaction: sol.signTransaction?.bind(sol),
      signAndSendTransaction: sol.signAndSendTransaction?.bind(sol),
    };
  }, [solKey]);

  return (
    <PageTransition>
      <section className="relative min-h-screen px-6 md:px-12 lg:px-20 pt-32 pb-24 bg-black overflow-hidden">
        <div className="absolute right-0 top-1/3 w-[45vw] h-[45vw] rounded-full bg-accent/[0.04] blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto grid lg:grid-cols-[1fr_440px] gap-14 lg:gap-20 items-start">
          <Reveal x={-24} y={0}>
            <h1 className="font-display font-extrabold text-white text-statement mb-6">
              Swap anything. <span className="gradient-text">Across any chain.</span>
            </h1>
            <p className="font-body text-lg text-muted leading-relaxed mb-10 max-w-lg">
              The same widget you can drop into your app with one component. It finds the best route and handles approvals, signing and bridging.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/docs/swap-widget" className="font-mono text-[10px] tracking-widest px-5 py-3 bg-accent text-black font-semibold hover:bg-white transition-colors">
                WIDGET DOCS →
              </Link>
              <Link href="/docs/swap-sdk" className="font-mono text-[10px] tracking-widest px-5 py-3 border border-[#252525] text-muted hover:text-white hover:border-white/20 transition-colors">
                SWAP SDK
              </Link>
              <Link href="/docs/swap-token-list" className="font-mono text-[10px] tracking-widest px-5 py-3 border border-[#252525] text-muted hover:text-white hover:border-white/20 transition-colors">
                TOKEN LIST
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15} y={16} className="lg:sticky lg:top-28">
            <SwapWidget
              client={client}
              evmProvider={evm}
              solanaWallet={solanaWallet}
              onConnectWallet={connect}
              defaultFromChainId={8453}
              defaultToChainId={501000101}
              defaultFromToken="USDC"
              defaultToToken="SOL"
              theme="dark"
              accentColor="#C8F13F"
              borderRadius={4}
              style={{ "--awz-accent-fg": "#000", "--awz-bg": "#0A0A0A", "--awz-surface": "#141414", "--awz-surface-2": "#1C1C1C", "--awz-border": "#222", fontFamily: "var(--font-body)", maxWidth: 440 } as CSSProperties}
            />
            {notice && <p className="mt-4 font-mono text-[11px] text-accent/80">{notice}</p>}
            <p className="mt-4 font-mono text-[10px] text-dim tracking-wide">Real mainnet transactions.</p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
