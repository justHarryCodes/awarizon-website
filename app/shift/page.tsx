"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import PageTransition from "@/components/motion/PageTransition";
import ScrollProvider from "@/components/motion/ScrollProvider";
import Reveal, { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import Button from "@/components/ui/Button";
import CountUp from "@/components/ui/CountUp";
import FloatingOrbs from "@/components/ui/FloatingOrbs";
import ScrollZoomImage from "@/components/ui/ScrollZoomImage";
import { ALL_CHAINS } from "@/lib/chainLogos";
import NewTabLink from "@/components/NewTabLink";
import ChamferImage from "@/components/ui/ChamferImage";
import Products from "@/components/shift/Products";

const PROBLEM_LAYERS = [
  {
    num: "01",
    icon: "/elements/signal-01.png",
    title: "Web3 setup takes months.",
    sub: "It should take days.",
    body: "Teams lose months to RPCs, ABIs and wallet setup. Awarizon removes that work.",
  },
  {
    num: "02",
    icon: "/elements/signal-02.png",
    title: "Fragmented tooling kills velocity.",
    sub: "One SDK changes everything.",
    body: "Scattered libraries force every team to rebuild the basics. One unified SDK fixes that.",
  },
  {
    num: "03",
    icon: "/elements/signal-03.png",
    title: "Businesses need on-chain capability",
    sub: "without a dedicated blockchain team.",
    body: "Payments, identity and wallets shouldn't need specialists. Any technical team can ship them with us.",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

// ─── Comparison illustration ───────────────────────────────────────────────────

function ComparisonIllustration() {
  const withoutItems = [
    "Configure RPC endpoints",
    "Manage ABI files by hand",
    "Build wallet connection logic",
    "Handle chain ID differences",
    "Write retry & gas logic",
    "Build payment processing",
    "Set up identity & auth",
    "Maintain as chains update",
  ];
  const withItems = [
    "npm install @awarizon/web3",
    "Configure your API key",
    "Ship your product",
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="border border-black/10 p-6">
        <div className="font-mono text-[9px] text-black/60 tracking-widest mb-5 uppercase">
          Without Awarizon
        </div>
        <div className="space-y-2.5">
          {withoutItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 border border-black/25 rounded-sm flex items-center justify-center shrink-0">
                <span className="text-[8px] text-black/50">✕</span>
              </div>
              <span className="font-body text-[12px] text-black/65 line-through decoration-black/30">
                {item}
              </span>
            </div>
          ))}
          <div className="pt-3 mt-3 border-t border-black/15">
            <span className="font-mono text-[10px] text-black/55 tracking-widest">
              ~3–6 MONTHS OF SETUP
            </span>
          </div>
        </div>
      </div>
      <div className="border border-black bg-black p-6">
        <div className="font-mono text-[9px] text-accent tracking-widest mb-5 uppercase">
          With Awarizon
        </div>
        <div className="space-y-3.5">
          {withItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5">
              <div className="w-3.5 h-3.5 bg-accent flex items-center justify-center shrink-0">
                <span className="text-[8px] text-black font-bold">✓</span>
              </div>
              <span className="font-mono text-[12px] text-white">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-5 border-t border-white/10">
          <span className="font-display font-extrabold text-accent text-2xl">
            90% less
          </span>
          <span className="font-mono text-[9px] text-white/55 block mt-0.5 tracking-widest">
            SETUP & CONFIGURATION TIME
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ShiftPage() {
  const heroVisible = true;

  // Vanta
  const vantaRef = useRef<HTMLDivElement>(null);
  const vantaEffect = useRef<any>(null);

  useEffect(() => {
    async function initVanta() {
      if (!vantaRef.current) return;
      const THREE = await import("three");
      // @ts-expect-error — no types for vanta
      const mod = await import("vanta/dist/vanta.net.min");
      const VANTA = mod.default ?? mod;
      // Narrow screens pack the same net into fewer pixels — thin it out
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      vantaEffect.current = VANTA({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        color: 0xc8f13f,
        backgroundColor: 0x000000,
        points: isMobile ? 6.0 : 9.0,
        maxDistance: isMobile ? 16.0 : 22.0,
        spacing: isMobile ? 20.0 : 18.0,
        showDots: true,
      });
    }
    initVanta();
    return () => {
      vantaEffect.current?.destroy();
    };
  }, []);

  return (
    <ScrollProvider>
      <PageTransition>
        {/* ── HERO ───────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-black">
          {/* Vanta NET */}
          <div ref={vantaRef} className="absolute inset-0 z-[0]" />
          {/* Darken so text stays legible */}
          <div className="absolute inset-0 bg-black/52 z-[1]" />
          {/* Edge vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_50%_45%,transparent_30%,black_85%)] z-[2]" />
          <div className="absolute left-0 right-0 h-px bg-accent/10 animate-scan pointer-events-none z-[3]" />

          <div className="relative z-[4] flex flex-col min-h-screen px-6 md:px-12 lg:px-20 pt-24 pb-16">
            {/* Hero text */}
            <motion.div
              className="text-center mx-auto flex flex-col items-center"
              initial="hidden"
              animate={heroVisible ? "show" : "hidden"}
              variants={{ show: { transition: { staggerChildren: 0.13 } } }}
            >
              <h1 className="font-display font-extrabold text-hero overflow-hidden">
                {[
                  { text: "Build", cls: "block text-white" },
                  { text: "on-chain Products.", cls: "block text-white" },
                  { text: "5× faster.", cls: "block gradient-text" },
                ].map(({ text, cls }) => (
                  <div key={text} className="overflow-hidden">
                    <motion.span
                      className={cls}
                      style={{ display: "block" }}
                      variants={{
                        hidden: { y: "110%", opacity: 0 },
                        show: {
                          y: "0%",
                          opacity: 1,
                          transition: { duration: 0.85, ease },
                        },
                      }}
                    >
                      {text}
                    </motion.span>
                  </div>
                ))}
              </h1>
              <motion.p
                className="font-body text-lg md:text-xl text-muted mt-8 max-w-md"
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                }}
              >
                SDK, wallets and payments for teams shipping Web3. Go from idea to mainnet in days, not months.
              </motion.p>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-auto pt-14 mx-auto flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: heroVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="w-px h-12 bg-gradient-to-b from-accent to-transparent" />
            </motion.div>
          </div>
        </section>

        {/* ── VALUE PROP — white section ──────────────────────── */}
        <section className="bg-white py-28 px-6 md:px-12 lg:px-20 relative overflow-hidden">
          <ScrollZoomImage
            src="/mesh-theme.png"
            direction="in"
            spin
            spinDuration={50}
            className="opacity-[0.35]"
          />
          <FloatingOrbs
            color="0,0,0"
            orbs={[
              {
                w: 600,
                h: 400,
                left: "-5%",
                top: "10%",
                delay: "0s",
                duration: "12s",
                opacity: 0.018,
              },
              {
                w: 400,
                h: 350,
                left: "65%",
                top: "40%",
                delay: "3s",
                duration: "14s",
                opacity: 0.012,
              },
            ]}
          />
          <div className="relative max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <Reveal>
                  <h2 className="font-display font-extrabold text-black text-statement mb-4">
                    Everything to build on-chain.
                  </h2>
                  <p className="font-body text-lg text-black/70 mb-10">
                    Skip months of RPCs, ABIs and wallet plumbing. Our SDK, APIs and payment rails are ready from day one.
                  </p>
                </Reveal>

                <Reveal delay={0.15}>
                  <div className="grid grid-cols-3 gap-px bg-black/10">
                    {[
                      { to: 5, suffix: "×", label: "Faster development" },
                      { to: 90, suffix: "%", label: "Less setup time" },
                      { to: 15, suffix: "+", label: "EVM chains" },
                    ].map((s) => (
                      <div key={s.suffix} className="bg-white px-4 py-5">
                        <div className="font-display font-extrabold text-3xl md:text-4xl text-black mb-1">
                          <CountUp to={s.to} suffix={s.suffix} />
                        </div>
                        <div className="font-mono text-[9px] text-black/60 tracking-widest uppercase">
                          {s.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>

              <Reveal delay={0.2}>
                <ComparisonIllustration />
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ────────────────────────────────────────── */}
        <Products />

        {/* ── PROBLEM CARDS ─────────────────────────────────────── */}
        <section className="relative overflow-hidden py-32 px-6 md:px-12 lg:px-20">
          <ScrollZoomImage
            src="/grok_image_1789742427607.jpg"
            direction="in"
            className="opacity-[0.16]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />

          <div className="relative max-w-6xl mx-auto">
            <Reveal className="mb-20">
              <h2 className="font-display font-bold text-h2 text-white">
                Why teams need us.
              </h2>
            </Reveal>

            <RevealGroup
              className="grid md:grid-cols-3 gap-px bg-[#111]/80"
              stagger={0.12}
            >
              {PROBLEM_LAYERS.map((layer) => (
                <RevealItem
                  key={layer.num}
                  className="group bg-black/90 backdrop-blur-sm p-10"
                >
                  <div className="flex items-end justify-between mb-6">
                    <div className="font-display text-7xl font-extrabold text-[#1A1A1A] select-none leading-none">
                      {layer.num}
                    </div>
                    <Image
                      src={layer.icon}
                      alt=""
                      width={120}
                      height={120}
                      className="w-20 h-20 object-contain select-none pointer-events-none drop-shadow-[0_10px_24px_rgba(200,241,63,0.18)] transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6"
                    />
                  </div>
                  <h3 className="font-display font-bold text-h3 text-white mb-1 leading-tight">
                    {layer.title}
                  </h3>
                  <h3 className="font-display font-bold text-h3 text-accent mb-6 leading-tight">
                    {layer.sub}
                  </h3>
                  <p className="font-body text-base text-muted leading-relaxed">
                    {layer.body}
                  </p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* ── QUOTE ─────────────────────────────────────────────── */}
        <section className="relative py-32 px-6 md:px-12 lg:px-20 overflow-hidden">
          <ScrollZoomImage
            src="/grok_image_1789741949904.jpg"
            direction="out"
            className="opacity-[0.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black pointer-events-none" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[50vw] rounded-full bg-accent/[0.03] blur-3xl pointer-events-none" />
          <Reveal className="relative max-w-4xl">
            <blockquote className="font-display font-bold leading-tight text-3xl md:text-5xl text-white">
              From months of setup to{" "}
              <span className="text-accent">shipping in days.</span>
            </blockquote>
          </Reveal>
        </section>

        {/* ── SDK TEASER ─────────────────────────────────────────── */}
        <section className="relative py-28 px-6 md:px-12 lg:px-20 bg-[#020202] border-t border-[#0E0E0E] overflow-hidden">
          <div className="absolute left-0 top-0 w-[40vw] h-[40vw] bg-accent/[0.03] blur-3xl pointer-events-none" />

          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <Reveal x={-24} y={0}>
              <h2 className="font-display font-extrabold text-white text-statement mb-4">
                One SDK. Any chain.{" "}
                <span className="gradient-text">Ship faster.</span>
              </h2>
              <p className="font-body text-lg text-muted mb-10">
                Typed reads, writes and events across 15+ EVM chains. No RPC setup, no ABI juggling, no boilerplate.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/sdk"
                  className="font-mono text-[10px] tracking-widest px-5 py-3 bg-accent text-black font-semibold hover:bg-white transition-colors"
                >
                  EXPLORE THE SDK →
                </Link>
                <NewTabLink
                  to="dashboard"
                  path="/docs"
                  className="font-mono text-[10px] tracking-widest px-5 py-3 border border-[#252525] text-muted hover:text-white hover:border-white/20 transition-colors"
                >
                  DOCUMENTATION
                </NewTabLink>
              </div>
            </Reveal>

            <Reveal delay={0.15} scale={0.96}>
              <ChamferImage src="/sdk-theme.png" alt="Awarizon SDK" side="right" scale={0.95} blend />
            </Reveal>
          </div>
        </section>

        {/* ── SUPPORTED CHAINS ──────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#0E0E0E] bg-[#020202]">
          <div className="max-w-6xl mx-auto">
            <Reveal className="mb-10">
              <h2 className="font-display font-bold text-h2 text-white">
                Every major chain.
              </h2>
              <p className="font-body text-lg text-muted mt-4">
                EVM-native and chain-agnostic. Deploy once, run on any supported network.
              </p>
            </Reveal>

            <RevealGroup
              className="flex items-end gap-4 flex-wrap"
              stagger={0.04}
            >
              {ALL_CHAINS.map(({ name, logo }) => (
                <RevealItem key={name} y={16}>
                  <motion.div
                    className="flex flex-col items-center gap-1.5 group cursor-default"
                    whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  >
                    <div className="w-12 h-12 rounded-full bg-[#111] border border-[#1E1E1E] flex items-center justify-center overflow-hidden group-hover:border-accent/40 transition-colors duration-300">
                      <Image
                        src={logo}
                        alt={name}
                        width={32}
                        height={32}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <span className="font-mono text-[9px] text-dim group-hover:text-accent/70 transition-colors">
                      {name}
                    </span>
                  </motion.div>
                </RevealItem>
              ))}
              <RevealItem y={16}>
                <motion.div
                  className="flex flex-col items-center gap-1.5 cursor-default"
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <span className="font-mono text-accent text-xl font-bold leading-none">
                      +
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-accent tracking-widest">
                    more
                  </span>
                </motion.div>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────── */}
        <section className="py-20 px-6 md:px-12 lg:px-20 border-t border-[#111]">
          <div className="max-w-6xl mx-auto flex items-start justify-between flex-wrap gap-8">
            <Reveal>
              <p className="font-display font-semibold text-3xl text-white">
                Build on the infrastructure.
              </p>
              <p className="font-body text-base text-dim mt-2">
                Start with the SDK and scale on our rails. Distribution is part of the product.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="flex flex-wrap gap-3">
              <Button href="/sdk" variant="primary" size="lg">
                SDK →
              </Button>
              <Button href="/adoption" variant="ghost" size="lg">
                Adoption Layer
              </Button>
              <Button href="/infrastructure" variant="ghost" size="lg">
                Infrastructure
              </Button>
            </Reveal>
          </div>
        </section>
      </PageTransition>
    </ScrollProvider>
  );
}
