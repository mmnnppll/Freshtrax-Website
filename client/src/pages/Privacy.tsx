import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, createWebPageSchema } from "@/components/SchemaMarkup";

export default function Privacy() {
  const lastUpdated = "May 1, 2026";

  const sections = [
    { id: "section1", label: "Information We Collect" },
    { id: "section2", label: "How We Use Your Information" },
    { id: "section3", label: "How We Share Your Information" },
    { id: "section4", label: "Cookies and Tracking Technologies" },
    { id: "section5", label: "Data Retention" },
    { id: "section6", label: "Your Privacy Rights" },
    { id: "section7", label: "Children's Privacy" },
    { id: "section8", label: "Third-Party Links" },
    { id: "section9", label: "Security" },
    { id: "section10", label: "Changes to This Policy" },
    { id: "section11", label: "Contact Us" },
  ];

  return (
    <>
      <SEOHead
        title="Privacy Policy | Freshtrax"
        description="How Freshtrax collects, uses, discloses, and safeguards your information when you visit our website or interact with our footwear sanitization kiosks."
        canonicalUrl="https://getfreshtrax.com/privacy/"
      />
      <SchemaMarkup
        schema={createWebPageSchema({
          title: "Privacy Policy | Freshtrax",
          description: "How Freshtrax collects, uses, and protects personal information.",
          url: "https://getfreshtrax.com/privacy",
        })}
      />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
        <Navbar />
        <main className="flex-1 pt-32 pb-20" role="main">
          <div className="container max-w-3xl">
            {/* Header */}
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-2">
              Privacy Policy
            </h1>
            <p className="text-white/40 text-sm font-body mb-4">
              Last updated: {lastUpdated}
            </p>
            <span className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-body font-medium px-3 py-1 rounded-full mb-8">
              <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
              Effective May 1, 2026
            </span>

            <p className="text-white/70 font-body text-base leading-relaxed mb-10">
              Freshtrax (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or interact with our footwear sanitization kiosk services.
            </p>

            {/* Table of Contents */}
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

            {/* Section content shared classes */}
            <div className="space-y-12 font-body text-white/75 text-base leading-relaxed">

              <section id="section1">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  1. Information We Collect
                </h2>
                <p className="mb-3">We may collect the following types of information:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-white font-semibold">Contact Information</span> — Name, email address, phone number, and company name when you fill out an inquiry form, request a partnership, or subscribe to our newsletter.</li>
                  <li><span className="text-white font-semibold">Usage Data</span> — Pages visited, time spent on site, referring URLs, browser type, device type, and IP address, collected automatically when you access our website.</li>
                  <li><span className="text-white font-semibold">Business Information</span> — Details about your venue or facility if you inquire about placing a Freshtrax kiosk at your location.</li>
                  <li><span className="text-white font-semibold">Communications</span> — Records of your correspondence with us via email or contact forms.</li>
                  <li><span className="text-white font-semibold">Kiosk Interaction Data</span> — Aggregated, anonymized usage statistics from our kiosk units (session counts, dwell time). We do not collect personally identifiable information at kiosk touchpoints.</li>
                </ul>
              </section>

              <section id="section2">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  2. How We Use Your Information
                </h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Respond to inquiries and provide customer support</li>
                  <li>Process partnership and deployment requests</li>
                  <li>Send updates, newsletters, and promotional content (you may opt out at any time)</li>
                  <li>Improve our website experience and kiosk services</li>
                  <li>Analyze trends and usage patterns to optimize performance</li>
                  <li>Comply with legal obligations</li>
                </ul>
                <div className="bg-orange-500/5 border-l-2 border-orange-500 rounded-r-lg px-4 py-3 mt-4">
                  <p className="text-orange-300 text-sm font-medium m-0">
                    We will never sell your personal information to third parties. Full stop.
                  </p>
                </div>
              </section>

              <section id="section3">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  3. How We Share Your Information
                </h2>
                <p className="mb-3">We do not sell, rent, or trade your personal information. We may share information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-white font-semibold">Service Providers</span> — Trusted vendors who assist with website hosting, email delivery, analytics, and CRM functions, under strict confidentiality agreements.</li>
                  <li><span className="text-white font-semibold">Business Partners</span> — Venue operators or partners relevant to your inquiry, only with your consent.</li>
                  <li><span className="text-white font-semibold">Legal Requirements</span> — When required by law, court order, or to protect our legal rights or the safety of others.</li>
                  <li><span className="text-white font-semibold">Business Transfers</span> — In connection with a merger, acquisition, or sale of assets, with notice provided to you.</li>
                </ul>
              </section>

              <section id="section4">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  4. Cookies and Tracking Technologies
                </h2>
                <p className="mb-3">Our website uses cookies and similar tracking technologies to enhance your browsing experience. These include:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-white font-semibold">Essential Cookies</span> — Required for the website to function properly.</li>
                  <li><span className="text-white font-semibold">Analytics Cookies</span> — Help us understand how visitors interact with our site (e.g., Google Analytics). Data is aggregated and anonymized.</li>
                  <li><span className="text-white font-semibold">Marketing Cookies</span> — Used to deliver relevant content and measure campaign effectiveness, only if you consent.</li>
                </ul>
                <p>You can control or disable cookies through your browser settings. Note that disabling certain cookies may affect website functionality.</p>
              </section>

              <section id="section5">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  5. Data Retention
                </h2>
                <p>
                  We retain your personal information only as long as necessary to fulfill the purposes outlined
                  in this policy, or as required by applicable law. Contact form submissions are retained for up
                  to 24 months. You may request deletion of your data at any time (see Section 6).
                </p>
              </section>

              <section id="section6">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  6. Your Privacy Rights
                </h2>
                <p className="mb-3">Depending on your location, you may have the following rights regarding your personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-white font-semibold">Access</span> — Request a copy of the data we hold about you.</li>
                  <li><span className="text-white font-semibold">Correction</span> — Request correction of inaccurate or incomplete information.</li>
                  <li><span className="text-white font-semibold">Deletion</span> — Request deletion of your personal data (&quot;right to be forgotten&quot;).</li>
                  <li><span className="text-white font-semibold">Opt-Out</span> — Unsubscribe from marketing communications at any time via the unsubscribe link in any email or by contacting us directly.</li>
                  <li><span className="text-white font-semibold">Data Portability</span> — Request a machine-readable export of your data (where applicable).</li>
                  <li><span className="text-white font-semibold">Restriction</span> — Request that we limit how we process your data in certain circumstances.</li>
                </ul>
                <p className="mt-3">To exercise any of these rights, contact us at the address in Section 11. We will respond within 30 days.</p>
                <div className="bg-orange-500/5 border-l-2 border-orange-500 rounded-r-lg px-4 py-3 mt-4">
                  <p className="text-orange-300 text-sm m-0">
                    California residents may have additional rights under the CCPA. Virginia, Colorado, and
                    Connecticut residents may have rights under their respective state privacy laws. Contact
                    us for details.
                  </p>
                </div>
              </section>

              <section id="section7">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  7. Children&apos;s Privacy
                </h2>
                <p>
                  Our website and services are not directed to individuals under the age of 13. We do not
                  knowingly collect personal information from children. If you believe a child has submitted
                  personal information to us, please contact us immediately and we will delete it.
                </p>
              </section>

              <section id="section8">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  8. Third-Party Links
                </h2>
                <p>
                  Our website may contain links to third-party websites or platforms. We are not responsible
                  for the privacy practices of those sites and encourage you to review their privacy policies
                  before providing any personal information.
                </p>
              </section>

              <section id="section9">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  9. Security
                </h2>
                <p>
                  We implement industry-standard technical and organizational measures to protect your personal
                  information from unauthorized access, disclosure, alteration, or destruction. However, no
                  transmission over the internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section id="section10">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  10. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy periodically to reflect changes in our practices or
                  applicable law. When we do, we will revise the &quot;Last updated&quot; date at the top of this page.
                  For material changes, we will provide more prominent notice (such as an email notification).
                  Your continued use of our website after such changes constitutes acceptance of the updated
                  policy.
                </p>
              </section>

              <section id="section11">
                <h2 className="text-2xl font-bold text-white mb-3 pb-2 border-b-2 border-orange-500 inline-block">
                  11. Contact Us
                </h2>
                <p className="mb-3">
                  If you have questions, concerns, or requests related to this Privacy Policy or our data
                  practices, please reach out:
                </p>
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
