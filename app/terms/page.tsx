import type { ReactNode } from "react";
import Link from "next/link";

const EFFECTIVE_DATE = "September 28, 2026";
const CONTACT_EMAIL = "info@awarizon.com"; // change to your real email
const GOVERNING_LAW = "Global"; // e.g. "the laws of Nigeria" — set before publishing

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "services", title: "3. The Services" },
  { id: "non-custodial", title: "4. Non-Custodial Wallet" },
  { id: "responsibilities", title: "5. Your Responsibilities" },
  { id: "third-party", title: "6. Swaps & Third-Party Services" },
  { id: "fees", title: "7. Fees" },
  { id: "risks", title: "8. Risks of Digital Assets" },
  { id: "prohibited", title: "9. Prohibited Conduct" },
  { id: "ip", title: "10. Intellectual Property" },
  { id: "disclaimers", title: "11. Disclaimers" },
  { id: "liability", title: "12. Limitation of Liability" },
  { id: "indemnification", title: "13. Indemnification" },
  { id: "termination", title: "14. Suspension & Termination" },
  { id: "governing-law", title: "15. Governing Law" },
  { id: "changes", title: "16. Changes to These Terms" },
  { id: "contact", title: "17. Contact Us" },
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

export default function TermsPage() {
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
            TERMS OF USE
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
          These Terms of Use (&quot;Terms&quot;) are a binding agreement between
          you and Awarizon Ltd. (&quot;Awarizon&quot;, &quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;). They govern your use of our
          website, the Awarizon ecosystem services, and the Rizon Wallet mobile
          app (together, the &quot;Services&quot;). Please read them carefully.
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

        <Section id="acceptance" title="1. Acceptance of Terms">
          <p>
            By accessing our website, creating a wallet, or otherwise using the
            Services, you agree to be bound by these Terms and our{" "}
            <Link
              href="/policy"
              className="text-white font-semibold hover:underline"
            >
              Privacy Policy
            </Link>
            . If you do not agree, do not use the Services.
          </p>
        </Section>

        <Section id="eligibility" title="2. Eligibility">
          <p>
            You must be at least 18 years old and able to form a binding
            contract to use the Services. You may not use the Services if you
            are subject to sanctions or located in a jurisdiction where using
            digital-asset software is prohibited. You are responsible for making
            sure your use complies with the laws that apply to you.
          </p>
        </Section>

        <Section id="services" title="3. The Services">
          <p>
            Awarizon builds blockchain infrastructure and distribution tools.
            Rizon Wallet is a self-custody software wallet that lets you hold,
            send, receive, and scan to pay with digital assets, swap and trade
            across supported chains, view market data, and manage NFTs. We may
            add, change, or remove features and supported networks at any time.
          </p>
          <p>
            Awarizon is a software provider. We are not a bank, exchange,
            broker, custodian, or financial advisor, and nothing in the Services
            is investment, legal, or tax advice.
          </p>
        </Section>

        <Section id="non-custodial" title="4. Non-Custodial Wallet">
          <p>
            Rizon Wallet is non-custodial. Your private keys and recovery phrase
            are generated and stored on your device, and we never have access to
            them. We cannot access, freeze, reverse, or recover your assets or
            transactions, and we cannot reset or restore a lost recovery phrase.
          </p>
          <p>
            You alone are responsible for safeguarding your device, passcode,
            and recovery phrase. Anyone with your recovery phrase can control
            your assets. Awarizon will never ask you for it.
          </p>
        </Section>

        <Section id="responsibilities" title="5. Your Responsibilities">
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Keep your device, passcode, biometric lock, and recovery phrase
              secure;
            </li>
            <li>
              Verify recipient addresses, networks, tokens, and amounts before
              confirming — blockchain transactions are irreversible;
            </li>
            <li>
              Provide accurate information and keep the app up to date; and
            </li>
            <li>
              Pay any network fees and taxes that apply to your transactions.
            </li>
          </ul>
        </Section>

        <Section id="third-party" title="6. Swaps & Third-Party Services">
          <p>
            Swaps, cross-chain transfers, market data, and other features may be
            powered by third parties, such as decentralized exchange aggregators
            (for example, 0x Protocol), bridges, blockchain networks, and data
            providers. These services are operated independently of Awarizon,
            and your use of them is subject to their own terms and privacy
            policies. We do not control and are not responsible for their
            availability, pricing, accuracy, or performance.
          </p>
          <p>
            Tokens and assets shown in the app, including tokenized assets and
            trending or market lists, are displayed for information only. Their
            appearance is not an endorsement or recommendation, and some may not
            be available in your region.
          </p>
        </Section>

        <Section id="fees" title="7. Fees">
          <p>
            Blockchain networks charge fees (&quot;gas&quot;) to process
            transactions, and those fees go to network validators, not to
            Awarizon. Swap and bridge providers may also charge fees or apply
            slippage, which are shown in the app before you confirm where
            available. We may charge service fees in the future and will
            disclose them before they apply.
          </p>
        </Section>

        <Section id="risks" title="8. Risks of Digital Assets">
          <p>
            Digital assets are volatile and carry significant risk, including
            loss of some or all of their value. Other risks include
            smart-contract bugs, network congestion or outages, failed or
            delayed transactions, scams and phishing, malicious tokens or NFTs,
            regulatory changes, and loss of access to your keys. You use the
            Services at your own risk and should only use assets you can afford
            to lose.
          </p>
        </Section>

        <Section id="prohibited" title="9. Prohibited Conduct">
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Use the Services for money laundering, terrorist financing, fraud,
              sanctions evasion, or any illegal activity;
            </li>
            <li>
              Interfere with, probe, or attack the Services, our infrastructure,
              or other users;
            </li>
            <li>
              Reverse engineer, copy, or resell the Services except as permitted
              by law;
            </li>
            <li>
              Use bots, scrapers, or automated means to access the Services
              without our permission; or
            </li>
            <li>
              Impersonate others or misrepresent your affiliation with Awarizon.
            </li>
          </ul>
        </Section>

        <Section id="ip" title="10. Intellectual Property">
          <p>
            The Services, including the Awarizon and Rizon names, logos,
            software, and content, are owned by Awarizon or its licensors and
            protected by intellectual property laws. We grant you a limited,
            non-exclusive, non-transferable, revocable license to use the app
            for your personal use in line with these Terms. You keep ownership
            of your digital assets and any content you submit to us.
          </p>
        </Section>

        <Section id="disclaimers" title="11. Disclaimers">
          <p>
            The Services are provided &quot;as is&quot; and &quot;as
            available&quot;, without warranties of any kind, express or implied,
            including merchantability, fitness for a particular purpose,
            accuracy, and non-infringement. We do not guarantee that the
            Services will be uninterrupted, error-free, or secure, or that
            prices, balances, or market data shown are accurate or current.
          </p>
        </Section>

        <Section id="liability" title="12. Limitation of Liability">
          <p>
            To the maximum extent permitted by law, Awarizon and its affiliates,
            directors, employees, and partners will not be liable for any
            indirect, incidental, special, consequential, or punitive damages,
            or for any loss of profits, data, digital assets, or goodwill,
            arising from your use of the Services — including loss caused by
            lost keys, user error, third-party services, network failures, or
            unauthorized access to your device. Our total liability for any
            claim relating to the Services will not exceed the greater of the
            fees you paid us in the 12 months before the claim or US$100. Some
            jurisdictions do not allow certain limitations, so parts of this
            section may not apply to you.
          </p>
        </Section>

        <Section id="indemnification" title="13. Indemnification">
          <p>
            You agree to defend and indemnify Awarizon and its affiliates
            against claims, losses, and expenses (including reasonable legal
            fees) arising from your breach of these Terms, your violation of
            law, or your misuse of the Services.
          </p>
        </Section>

        <Section id="termination" title="14. Suspension & Termination">
          <p>
            You can stop using the Services at any time by deleting the app;
            your assets remain on-chain and accessible with your recovery phrase
            in any compatible wallet. We may suspend or restrict access to the
            Services, in whole or in part, if we believe you have violated these
            Terms or the law, or to protect the Services and other users.
            Because the wallet is non-custodial, we cannot lock or seize your
            assets.
          </p>
        </Section>

        <Section id="governing-law" title="15. Governing Law">
          <p>
            These Terms are governed by {GOVERNING_LAW}, without regard to
            conflict-of-law rules. Any dispute will be resolved in the courts of
            that jurisdiction, unless applicable law gives you the right to
            bring a claim elsewhere.
          </p>
        </Section>

        <Section id="changes" title="16. Changes to These Terms">
          <p>
            We may update these Terms from time to time. If we make material
            changes, we&apos;ll notify you in the app or by other reasonable
            means before they take effect. Continuing to use the Services after
            the changes take effect means you accept the updated Terms. The
            &quot;Effective&quot; date above reflects the latest revision.
          </p>
        </Section>

        <Section id="contact" title="17. Contact Us">
          <p>
            Questions about these Terms? Reach us at{" "}
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
