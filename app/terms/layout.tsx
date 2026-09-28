import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of Awarizon and Rizon Wallet, a non-custodial multi-chain crypto wallet.",
  openGraph: {
    title: "Terms of Use | Awarizon",
    description: "The terms that govern your use of Awarizon and Rizon Wallet.",
  },
  twitter: {
    title: "Terms of Use | Awarizon",
    description: "The terms that govern your use of Awarizon and Rizon Wallet.",
  },
  alternates: {
    canonical: "https://awarizon.com/terms",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
