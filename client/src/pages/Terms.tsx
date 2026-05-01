import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, createWebPageSchema } from "@/components/SchemaMarkup";

export default function Terms() {
  const lastUpdated = "May 1, 2026";

  const sections = [
    { id: "s1", label: "About Freshtrax" },
    { id: "s2", label: "Acceptance of Terms" },
    { id: "s3", label: "Use of the Website" },
    { id: "s4", label: "Kiosk Services" },
    { id: "s5", label: "Partnership and Venue Agreements" },
    { id: "s6", label: "Intellectual Property" },
    { id: "s7", label: "Disclaimer of Warranties" },
    { id: "s8", label: "Limitation of Liability" },
    { id: "s9", label: "Indemnification" },
    { id: "s10", label: "Third-Party Links and Services" },
    { id: "s11", label: "Privacy" },
    { id: "s12", label: "Modifications to Terms" },
    { id: "s13", label: "Governing Law" },
    { id: "s14", label: "Contact Us" },
  ];

  return (
    <>
      <SEOHead
        title="Terms of Service | Freshtrax"
        description="Terms governing use of the Freshtrax website and footwear sanitization kiosk services."
        canonicalUrl="https://getfreshtrax.com/terms"
      />
      <SchemaMarkup
        schema={createWebPageSchema({
          title: "Terms of Service | Freshtrax",
          description: "Terms governing use of the Freshtrax website and Services.",
          url: "https://getfreshtrax.com/terms",
        })}
      />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
        <Navbar />
        <main className="flex-1 pt-32 pb-20" role="main">
          <div className="container max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-2">
              Terms of Service
            </h1>
            <p className="text-white/40 text-sm font-body mb-4">
              Last updated: {lastUpdated}
            </p>
            <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-body font-medium px-3 py-1 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              Effective May 1, 2026
            </span>

            <p className="text-white/70 font-body text-base leading-relaxed mb-3">
              Please read these Terms of Service (&quot;Terms&quot;) carefully before using the Freshtrax
              website located at{" "}
              <a
                href="https://getfreshtrax.com"
                className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
              >
                getfreshtrax.com
              </a>{" "}
              or interacting with any Freshtrax footwear sanitization kiosk (&quot;Services&quot;).
            </p>
            <p className="text-white/70 font-body text-base leading-relaxed mb-10">
              By accessing our website or using our Services, you agree to be bound by these Terms. If you do
              not agree, please do not use our Services.
            </p>

            <div className="bg-orange-500/5 border border-orange-500/20 rounded-xl p-5 mb-12">
              <h3 className="text-orange-500 text-xs font-mono font-semibold uppercase tracking-[0.2em] mb-3">
                Contents
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 text-sm text-white/70 font-body marker:text-orange-500/60">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-white/70 hover:text-orange-400 underline-offset-4 hover:underline transition-colors"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-12 font-body text-white/75 text-base leading-relaxed">

              <section id="s1">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  1. About Freshtrax
                </h2>
                <p>
                  Freshtrax is a footwear sanitization kiosk company that provides automated shoe-cleaning
                  solutions for venues, businesses, and public spaces. Our services include the placement,
                  operation, and maintenance of Freshtrax kiosk units, as well as information and resources
                  available through our website at{" "}
                  <a
                    href="https://getfreshtrax.com"
                    className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
                  >
                    getfreshtrax.com
                  </a>.
                </p>
              </section>

              <section id="s2">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  2. Acceptance of Terms
                </h2>
                <p className="mb-3">By using this website or any Freshtrax Services, you confirm that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are at least 18 years of age, or are using the Services under the supervision of a parent or legal guardian.</li>
                  <li>You have read, understood, and agree to be bound by these Terms.</li>
                  <li>You have the legal authority to enter into this agreement on behalf of yourself or any organization you represent.</li>
                </ul>
              </section>

              <section id="s3">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  3. Use of the Website
                </h2>
                <p className="mb-3">You agree to use our website only for lawful purposes. You must not:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Use the site in any way that violates applicable federal, state, or local laws or regulations.</li>
                  <li>Attempt to gain unauthorized access to any portion of the site or its related systems.</li>
                  <li>Transmit any unsolicited or unauthorized advertising or promotional material.</li>
                  <li>Scrape, crawl, or extract data from the website without our express written permission.</li>
                  <li>Introduce malware, viruses, or any other harmful code.</li>
                  <li>Impersonate Freshtrax, its employees, or any other person or entity.</li>
                </ul>
                <p>
                  We reserve the right to terminate or restrict your access to the website at our sole
                  discretion, without notice, for conduct that we believe violates these Terms or is harmful
                  to other users, us, or third parties.
                </p>
              </section>

              <section id="s4">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  4. Kiosk Services
                </h2>
                <p className="mb-3">
                  Our footwear sanitization kiosks are designed for public or semi-public use at partner
                  venues. By using a Freshtrax kiosk, you acknowledge that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-white font-semibold">Use at your own discretion.</span> Freshtrax kiosks are provided as-is for convenience. Results may vary based on footwear type, material, and soiling level.</li>
                  <li><span className="text-white font-semibold">No damage guarantee.</span> While we design our kiosks to be safe for general footwear, Freshtrax is not liable for damage to specialty, delicate, or non-standard footwear materials.</li>
                  <li><span className="text-white font-semibold">Compliance with venue rules.</span> Use of kiosks must comply with the rules of the venue or facility in which the kiosk is located.</li>
                  <li><span className="text-white font-semibold">No tampering.</span> You must not tamper with, disassemble, deface, or attempt to repair any Freshtrax kiosk unit.</li>
                </ul>
              </section>

              <section id="s5">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  5. Partnership and Venue Agreements
                </h2>
                <p>
                  If you are a business, venue operator, or organization interested in hosting a Freshtrax
                  kiosk, any such arrangement will be governed by a separate written partnership or placement
                  agreement between you and Freshtrax. These Terms apply to your use of our website and
                  general interactions with Freshtrax, and do not supersede any executed partnership
                  agreement.
                </p>
                <p>
                  Inquiries submitted through our website do not constitute a binding agreement or guarantee
                  of placement.
                </p>
              </section>

              <section id="s6">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  6. Intellectual Property
                </h2>
                <p className="mb-3">
                  All content on this website, including but not limited to text, graphics, logos, images,
                  icons, and software, is the property of Freshtrax or its content suppliers and is protected
                  by applicable intellectual property laws.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You may not reproduce, distribute, modify, create derivative works of, or publicly display any content from this website without our prior written consent.</li>
                  <li>The Freshtrax name, logo, and all related marks are trademarks of Freshtrax. Nothing in these Terms grants you any right to use our trademarks.</li>
                  <li>Feedback or suggestions you submit to us may be used by Freshtrax without restriction or compensation to you.</li>
                </ul>
              </section>

              <section id="s7">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  7. Disclaimer of Warranties
                </h2>
                <div className="bg-amber-500/5 border-l-2 border-amber-500 rounded-r-lg px-4 py-3 mb-4">
                  <p className="text-amber-300 text-sm font-medium m-0">
                    The website and services are provided on an &quot;as is&quot; and &quot;as available&quot; basis without
                    warranties of any kind, either express or implied.
                  </p>
                </div>
                <p className="mb-3">
                  Freshtrax expressly disclaims all warranties, including but not limited to implied
                  warranties of merchantability, fitness for a particular purpose, and non-infringement. We
                  do not warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>The website will be uninterrupted, error-free, or free of viruses or other harmful components.</li>
                  <li>The results obtained from use of the website or kiosk services will be accurate or reliable.</li>
                  <li>Any defects in the website will be corrected.</li>
                </ul>
              </section>

              <section id="s8">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  8. Limitation of Liability
                </h2>
                <p>
                  To the fullest extent permitted by applicable law, Freshtrax and its officers, directors,
                  employees, agents, and partners shall not be liable for any indirect, incidental, special,
                  consequential, or punitive damages arising out of or related to your use of the website or
                  kiosk services, including but not limited to loss of profits, data, or goodwill.
                </p>
                <p>
                  In no event shall our total liability to you for all claims exceed the amount paid by you,
                  if any, to Freshtrax in the twelve (12) months preceding the event giving rise to the
                  claim.
                </p>
              </section>

              <section id="s9">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  9. Indemnification
                </h2>
                <p className="mb-3">
                  You agree to defend, indemnify, and hold harmless Freshtrax and its officers, directors,
                  employees, and agents from and against any claims, damages, obligations, losses,
                  liabilities, costs, or expenses (including reasonable attorneys&apos; fees) arising from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your use of or access to the website or Services.</li>
                  <li>Your violation of any provision of these Terms.</li>
                  <li>Your violation of any third-party rights, including intellectual property or privacy rights.</li>
                  <li>Any content you submit through our website.</li>
                </ul>
              </section>

              <section id="s10">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  10. Third-Party Links and Services
                </h2>
                <p>
                  Our website may contain links to third-party websites or services. These links are provided
                  for convenience only. Freshtrax does not endorse, control, or assume responsibility for the
                  content, privacy practices, or terms of any third-party site. Accessing third-party sites is
                  at your own risk.
                </p>
              </section>

              <section id="s11">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  11. Privacy
                </h2>
                <p>
                  Your use of our website is also governed by our{" "}
                  <a
                    href="/privacy"
                    className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
                  >
                    Privacy Policy
                  </a>
                  , which is incorporated into these Terms by reference. By using our Services, you consent
                  to the data practices described in the Privacy Policy.
                </p>
              </section>

              <section id="s12">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  12. Modifications to Terms
                </h2>
                <p>
                  Freshtrax reserves the right to update or modify these Terms at any time. When we do, we
                  will revise the &quot;Last updated&quot; date at the top of this page. For material changes, we
                  will provide more prominent notice. Your continued use of the website after any
                  modifications constitutes your acceptance of the updated Terms.
                </p>
                <div className="bg-orange-500/5 border-l-2 border-orange-500 rounded-r-lg px-4 py-3 mt-4">
                  <p className="text-orange-300 text-sm m-0">
                    We recommend checking this page periodically so you are aware of any updates.
                  </p>
                </div>
              </section>

              <section id="s13">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  13. Governing Law
                </h2>
                <p>
                  These Terms shall be governed by and construed in accordance with the laws of the state in
                  which Freshtrax is registered, without regard to its conflict of law provisions. Any
                  disputes arising under these Terms shall be subject to the exclusive jurisdiction of the
                  state and federal courts located in that jurisdiction.
                </p>
                <p>
                  If any provision of these Terms is found to be invalid or unenforceable, the remaining
                  provisions shall remain in full force and effect.
                </p>
              </section>

              <section id="s14">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  14. Contact Us
                </h2>
                <p className="mb-3">If you have any questions about these Terms, please contact us:</p>
                <div className="bg-[#111]/60 border border-white/10 rounded-xl p-5">
                  <p className="text-white font-semibold m-0 mb-1">Freshtrax</p>
                  <p className="m-0 mb-1">
                    Email:{" "}
                    <a
                      href="mailto:getfreshtrax@gmail.com"
                      className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
                    >
                      getfreshtrax@gmail.com
                    </a>
                  </p>
                  <p className="m-0">
                    Website:{" "}
                    <a
                      href="https://getfreshtrax.com"
                      className="text-orange-500 hover:text-orange-400 underline underline-offset-4"
                    >
                      getfreshtrax.com
                    </a>
                  </p>
                </div>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
