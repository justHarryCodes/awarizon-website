"use client";

import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import ChamferImage from "@/components/ui/ChamferImage";

interface Product {
  name: string;
  tagline: string;
  line: string;
  image: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
}

const PRODUCTS: Product[] = [
  {
    name: "Zela Pay",
    tagline: "Self-banking on Arc.",
    line: "Hold, send and receive USDC from an account only you control. No bank in the middle, no business hours.",
    image: "/elements/zela-pay.png",
    cta: { label: "Open Zela Pay", href: "https://zelapay.xyz" },
  },
  {
    name: "Rizon Wallet",
    tagline: "One wallet. Every chain.",
    line: "Manage, swap and bridge assets across chains in one app. Your keys stay on your device.",
    image: "/elements/rizon-wallet.png",
    cta: { label: "Get it on Google Play", href: "https://play.google.com/store/apps/details?id=com.awarizon.wallet" },
  },
  {
    name: "Zela Payments",
    tagline: "Accept USDC like a card.",
    line: "Add USDC as a checkout option for your store or business. Settle instantly, with no chargebacks or cross-border fees.",
    image: "/elements/zela-payments.png",
    cta: { label: "Start accepting USDC", href: "https://payment.zelapay.xyz" },
  },
  {
    name: "Swap SDK & Widget",
    tagline: "Swaps and bridges in one component.",
    line: "Get the best route across EVM chains and Solana from 0x, Jupiter and LI.FI. Approvals, signing and bridging are handled for you.",
    image: "/elements/swap.png",
    cta: { label: "Try the live demo", href: "/swap" },
    secondary: { label: "Read the docs", href: "/docs/swap-sdk" },
  },
  {
    name: "Kendra",
    tagline: "Contract hooks, generated.",
    line: "Point Kendra at a smart contract and get typed hooks for your app. Test every call in the playground first.",
    image: "/elements/kendra.png",
    cta: { label: "Open Kendra", href: "https://kendra.awarizon.com" },
  },
];

function ArrowUpRight({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden className={className}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function ProductLink({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const external = href.startsWith("http");
  const cls = primary
    ? "group inline-flex items-center gap-3 font-mono text-[11px] tracking-widest uppercase px-5 py-3 bg-accent text-black font-semibold hover:bg-white transition-colors"
    : "group inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase px-5 py-3 border border-[#252525] text-muted hover:text-white hover:border-white/25 transition-colors";
  const inner = (
    <>
      {label}
      <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </>
  );
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cls} aria-label={`${label} (opens in a new tab)`}>{inner}</a>
  ) : (
    <Link href={href} className={cls}>{inner}</Link>
  );
}

export default function Products() {
  return (
    <section className="relative py-32 px-6 md:px-12 lg:px-20 bg-black border-t border-[#0E0E0E] overflow-hidden">

      <div className="relative max-w-6xl mx-auto">
        <Reveal className="mb-24">
          <h2 className="font-display font-bold text-h2 text-white mb-4">Our products.</h2>
          <p className="font-body text-lg text-muted">Built on the same infrastructure we give developers. Use them today, or build your own on our stack.</p>
        </Reveal>

        <div className="space-y-28 md:space-y-36">
          {PRODUCTS.map((p, i) => {
            const imageRight = i % 2 === 0;
            return (
              <div key={p.name} className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
                <Reveal x={imageRight ? -24 : 24} y={0} className={imageRight ? "" : "lg:order-2"}>
                  <span className="block font-display font-extrabold text-5xl text-[#1A1A1A] leading-none select-none mb-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display font-extrabold text-4xl md:text-5xl text-white leading-[1.05] mb-2">{p.name}</h3>
                  <p className="font-display font-bold text-2xl md:text-3xl text-accent leading-tight mb-4">{p.tagline}</p>
                  <p className="font-body text-lg text-muted leading-relaxed mb-10 max-w-md">{p.line}</p>
                  <div className="flex flex-wrap gap-3">
                    <ProductLink href={p.cta.href} label={p.cta.label} primary />
                    {p.secondary && <ProductLink href={p.secondary.href} label={p.secondary.label} />}
                  </div>
                </Reveal>

                <Reveal delay={0.1} scale={0.96} className={imageRight ? "" : "lg:order-1"}>
                  <ChamferImage src={p.image} alt={`${p.name} illustration`} side={imageRight ? "right" : "left"} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
