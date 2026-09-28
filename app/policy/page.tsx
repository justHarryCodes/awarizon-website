import type { ReactNode } from "react";
import Link from "next/link";

const EFFECTIVE_DATE = "September 28, 2026";
const SITE_URL = "awarizon.com"; // change to your real domain
const CONTACT_EMAIL = "privacy@awarizon.com"; // change to your real email

const sections = [
  { id: "overview", title: "1. Overview" },
  { id: "information-we-collect", title: "2. Information We Collect" },
  { id: "how-we-use-it", title: "3. How We Use Your Information" },
  { id: "wallets-and-keys", title: "4. Your Wallet & Private Keys" },
  { id: "sharing", title: "5. How We Share Information" },
  { id: "blockchain", title: "6. Blockchain Data Is Public" },
  { id: "retention", title: "7. Data Retention" },
  { id: "security", title: "8. Security" },
  { id: "your-rights", title: "9. Your Rights & Choices" },
  { id: "cookies", title: "10. Cookies & Similar Technologies" },
  { id: "international", title: "11. International Data Transfers" },
  { id: "children", title: "12. Children's Privacy" },
  { id: "changes", title: "13. Changes to This Policy" },
  { id: "contact", title: "14. Contact Us" },
];

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-8 border-b border-white/10">
      <h2
        className="text-white font-black mb-4"
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(17px, 2vw, 21px)",
          letterSpacing: "0.01em",
        }}
      >
        {title}
      </h2>
      <div
        className="text-white/70 leading-relaxed space-y-4"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: 16.5 }}
      >
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <div className="bg-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;600&display=swap');
      `}</style>

      {/* Black banner header */}
      <div className="relative bg-black overflow-hidden pt-40 pb-16 px-6">
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/6 blur-3xl" />
        <div className="relative max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/70" />
            <span
              className="text-white/80 text-[11px] font-semibold uppercase tracking-widest"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Legal
            </span>
          </div>
          <h1
            className="text-white font-black tracking-wide mb-4"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(30px, 5vw, 48px)",
            }}
          >
            PRIVACY POLICY
          </h1>
          <p
            className="text-white/60"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 16 }}
          >
            Effective {EFFECTIVE_DATE}
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="relative max-w-3xl mx-auto px-6 pb-24">
        <p
          className="text-white/70 leading-relaxed pt-12 pb-4"
          style={{ fontFamily: "'Inter', sans-serif", fontSize: 17 }}
        >
          Awarizon (&quot;Awarizon&quot;, &quot;we&quot;, &quot;us&quot;, or
          &quot;our&quot;) builds the Awarizon blockchain ecosystem and Rizon
          Wallet, a non-custodial mobile crypto wallet that lets you hold, send,
          receive, swap, and trade digital assets across multiple chains, view
          market data, and manage your NFTs. This Privacy Policy explains what
          information we collect through our website ({SITE_URL}) and the Rizon
          Wallet mobile app, how we use it, and the choices you have.
        </p>

        {/* Table of contents */}
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 mb-4 mt-8">
          <p
            className="text-white font-bold mb-3 uppercase tracking-wide"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: 12 }}
          >
            On this page
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-white/70 hover:text-white transition-colors text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Section id="overview" title="1. Overview">
          <p>
            This policy applies whenever you visit {SITE_URL}, use the Awarizon
            ecosystem services we operate, or use the Rizon Wallet app on iOS or
            Android. By using our services, you agree to the collection and use
            of information as described here. If you don&apos;t agree, please
            don&apos;t use our services. This policy works alongside our{" "}
            <Link
              href="/terms"
              className="text-white font-semibold hover:underline"
            >
              Terms of Use
            </Link>
            , which govern your use of the services more broadly.
          </p>
        </Section>

        <Section id="information-we-collect" title="2. Information We Collect">
          <p>
            <strong className="text-white/90">Wallet information</strong> — your
            public wallet address(es) on the networks Rizon Wallet supports. We
            never receive or store your private keys or recovery phrase — see
            Section 4.
          </p>
          <p>
            <strong className="text-white/90">Profile information</strong> — a
            wallet or account name you choose and, if you add one, a profile
            image from your camera or photo library.
          </p>
          <p>
            <strong className="text-white/90">Transaction information</strong> —
            details of transfers you send or receive, swaps and cross-chain
            transactions you place through the app (token, amount, network,
            counterparty address), and NFT activity associated with your wallet
            address.
          </p>
          <p>
            <strong className="text-white/90">Location</strong> — with your
            permission, we may use coarse device location to detect your country
            and set a local currency display. If you decline, we fall back to
            your device&apos;s locale settings.
          </p>
          <p>
            <strong className="text-white/90">Camera access</strong> — if you
            use the Scan feature to read a QR code (for example, a wallet
            address), the camera is used only to read the code. Images are not
            stored or sent to us.
          </p>
          <p>
            <strong className="text-white/90">Device & usage data</strong> —
            device model, operating system, app version, IP address,
            push-notification tokens, crash logs, and general usage analytics
            that help us diagnose issues and improve the app.
          </p>
          <p>
            <strong className="text-white/90">Advertising data</strong> — where
            the app displays ads, our ad partners may collect device identifiers
            and usage information as described in Section 5.
          </p>
          <p>
            <strong className="text-white/90">Biometric authentication</strong>{" "}
            — if you enable Face ID, fingerprint, or passcode lock, that
            authentication happens entirely on your device using your operating
            system&apos;s secure hardware. Rizon Wallet never receives,
            transmits, or stores your biometric data.
          </p>
        </Section>

        <Section id="how-we-use-it" title="3. How We Use Your Information">
          <p>We use the information above to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Provide, operate, and maintain the wallet, including sending,
              receiving, swapping, and cross-chain transfers you request;
            </li>
            <li>
              Display balances, market data, and prices in your preferred
              currency;
            </li>
            <li>
              Send transaction confirmations, security alerts, and (with your
              consent) product updates;
            </li>
            <li>
              Detect, investigate, and prevent fraud, abuse, and violations of
              our terms;
            </li>
            <li>
              Comply with applicable laws and regulations, including sanctions
              and anti-money-laundering obligations where they apply; and
            </li>
            <li>
              Diagnose crashes, understand feature usage, and improve Awarizon
              and Rizon Wallet.
            </li>
          </ul>
        </Section>

        <Section id="wallets-and-keys" title="4. Your Wallet & Private Keys">
          <p>
            Rizon Wallet is non-custodial. Your private keys and recovery phrase
            are generated and stored on your device, protected by the secure
            hardware of your operating system and your passcode or biometric
            lock. They are never transmitted to Awarizon, and we cannot access,
            move, freeze, or recover funds on your behalf. This also means you
            are solely responsible for backing up your recovery phrase. If you
            lose your device and your recovery phrase, we will not be able to
            restore access to your wallet, and anyone who obtains your recovery
            phrase can control your assets. Never share it with anyone,
            including anyone claiming to be from Awarizon.
          </p>
        </Section>

        <Section id="sharing" title="5. How We Share Information">
          <p>
            We do not sell your personal information. We share information only
            with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong className="text-white/90">
                Infrastructure providers
              </strong>{" "}
              that host our backend and provide blockchain connectivity
              (node/RPC and indexing services) to read balances and broadcast
              transactions you authorize;
            </li>
            <li>
              <strong className="text-white/90">
                Swap and liquidity providers
              </strong>
              , such as 0x Protocol and cross-chain routing providers, which
              receive the token, amount, network, and wallet address needed to
              quote and execute a swap you initiate. These providers have their
              own privacy policies;
            </li>
            <li>
              <strong className="text-white/90">Market data providers</strong>{" "}
              that supply prices, charts, and token information shown in the
              app;
            </li>
            <li>
              <strong className="text-white/90">
                Analytics and advertising partners
              </strong>{" "}
              that help us understand app usage and, where ads are shown, serve
              and measure them;
            </li>
            <li>
              <strong className="text-white/90">
                Regulators and law enforcement
              </strong>
              , where required by law, court order, or to protect the rights,
              safety, and property of Awarizon or our users; and
            </li>
            <li>
              <strong className="text-white/90">Successors</strong>, in the
              event of a merger, acquisition, or asset sale, subject to this
              policy.
            </li>
          </ul>
        </Section>

        <Section id="blockchain" title="6. Blockchain Data Is Public">
          <p>
            Transactions settled on-chain are recorded on public, distributed
            ledgers by design — this is what lets you verify a transfer
            independently. Your wallet address and the transactions associated
            with it are publicly visible and cannot be deleted or altered by
            Awarizon once confirmed on-chain.
          </p>
        </Section>

        <Section id="retention" title="7. Data Retention">
          <p>
            We retain the information we hold about you for as long as needed to
            provide our services and to comply with our legal, tax, and
            regulatory obligations, resolve disputes, and enforce our
            agreements. When information is no longer needed for these purposes,
            we delete or anonymize it.
          </p>
        </Section>

        <Section id="security" title="8. Security">
          <p>
            We use encryption in transit, secure device storage for key
            material, and biometric/passcode gating for sensitive actions. No
            method of transmission or storage is 100% secure, but we work to
            protect your information using industry-standard safeguards and to
            promptly investigate any suspected breach.
          </p>
        </Section>

        <Section id="your-rights" title="9. Your Rights & Choices">
          <p>Depending on where you live, you may have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Access, correct, or delete the personal information we hold about
              you;
            </li>
            <li>Request a copy of your data in a portable format;</li>
            <li>
              Withdraw consent for location access, notifications, or marketing
              communications at any time from your device settings or in-app
              settings; and
            </li>
            <li>
              Object to certain processing, subject to our legal and regulatory
              obligations.
            </li>
          </ul>
          <p>
            To exercise any of these rights, contact us using the details in
            Section 14. Note that deleting the app or local data does not remove
            transactions already confirmed on a public blockchain (see Section
            6).
          </p>
        </Section>

        <Section id="cookies" title="10. Cookies & Similar Technologies">
          <p>
            Our website uses essential cookies and similar local-storage
            technologies to keep the site functioning correctly and to
            understand aggregate traffic. The Rizon Wallet app does not use
            browser cookies but may use device-level identifiers for push
            notifications, crash diagnostics, and advertising.
          </p>
        </Section>

        <Section id="international" title="11. International Data Transfers">
          <p>
            Awarizon serves users globally, which means your information may be
            processed in a country other than the one you live in. Where we
            transfer information internationally, we take steps to ensure it
            receives an adequate level of protection consistent with this policy
            and applicable law.
          </p>
        </Section>

        <Section id="children" title="12. Children's Privacy">
          <p>
            Our services are not directed to children and are not intended for
            use by anyone under the age of 18. We do not knowingly collect
            personal information from children. If you believe a child has
            provided us with personal information, please contact us so we can
            delete it.
          </p>
        </Section>

        <Section id="changes" title="13. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. If we make
            material changes, we&apos;ll notify you in the app or by other
            reasonable means before the changes take effect. The
            &quot;Effective&quot; date above reflects the latest revision.
          </p>
        </Section>

        <Section id="contact" title="14. Contact Us">
          <p>
            Questions about this policy or your information? Reach us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-white font-semibold hover:underline"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <div className="pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white font-semibold hover:underline"
            style={{ fontFamily: "'Inter', sans-serif", fontSize: 15 }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
