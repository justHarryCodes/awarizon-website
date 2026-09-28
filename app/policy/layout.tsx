import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Awarizon and Rizon Wallet collect, use, and protect your information. Rizon Wallet is non-custodial — your private keys never leave your device.",
  openGraph: {
    title: "Privacy Policy | Awarizon",
    description:
      "How Awarizon and Rizon Wallet collect, use, and protect your information. Your keys stay on your device.",
  },
  twitter: {
    title: "Privacy Policy | Awarizon",
    description:
      "How Awarizon and Rizon Wallet collect, use, and protect your information.",
  },
  alternates: {
    canonical: "https://awarizon.com/policy",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
