import { motion } from "framer-motion";
import { ArrowRight, Mail, Phone, Clock } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleField from "@/components/ParticleField";
import { toast } from "sonner";
import { SEOHead } from "@/components/SEOHead";
import { SchemaMarkup, organizationSchema, localBusinessSchema, createWebPageSchema } from "@/components/SchemaMarkup";
import { useBookCall } from "@/contexts/BookCallContext";

export default function Contact() {
  const { openBookCall } = useBookCall();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "owner",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      toast.success("Message sent! We'll respond within 1 business day.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        inquiryType: "owner",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHead
        title="Contact Us | Freshtrax Footwear Sanitization"
        description="Get in touch with Freshtrax. Contact us for owner inquiries, partnerships, general questions, or support. We respond within 1 business day."
        canonicalUrl="https://getfreshtrax.com/contact"
        ogTitle="Contact Us | Freshtrax Footwear Sanitization"
        ogDescription="Reach out to Freshtrax for inquiries about becoming an owner, partnerships, or technical support."
      />
      <SchemaMarkup schema={organizationSchema} />
      <SchemaMarkup schema={localBusinessSchema} />
      <SchemaMarkup schema={createWebPageSchema({
        title: "Contact Us | Freshtrax Footwear Sanitization",
        description: "Get in touch with Freshtrax. Contact us for owner inquiries, partnerships, general questions, or support.",
        url: "https://getfreshtrax.com/contact",
      })} />
      <div className="min-h-screen flex flex-col bg-[#0a0a0a] text-white overflow-x-hidden">
      <ParticleField />
      <Navbar />
      <main className="flex-1" role="main">
        {/* Hero Section */}
        <section className="relative min-h-[50vh] flex items-center pt-20 pb-12 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 via-[#0a0a0a]/50 to-[#0a0a0a]" />
          </div>

          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
              <p className="text-xl text-white/70 max-w-2xl">
                Have questions about becoming an owner or partnering with
                Freshtrax? We'd love to hear from you. Fill out the form below and
                we'll respond within 1 business day.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 border-t border-white/5">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              {/* Info Cards */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <Mail className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Email</h3>
                <p className="text-white/60 text-sm">
                  <a
                    href="mailto:getfreshtrax@gmail.com"
                    className="hover:text-orange-500 transition-colors"
                  >
                    getfreshtrax@gmail.com
                  </a>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <Clock className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Response Time</h3>
                <p className="text-white/60 text-sm">
                  We respond to all inquiries within 1 business day.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-lg p-6"
              >
                <ArrowRight className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold mb-2">Quick Call</h3>
                <p className="text-white/60 text-sm">
                  <button
                    type="button"
                    onClick={openBookCall}
                    className="hover:text-orange-500 transition-colors"
                  >
                    Book a call with us
                  </button>
                </p>
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Company / Venue Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="Your gym or business name"
                    />
                  </div>
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    I'm interested in... *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-colors"
                  >
                    <option value="owner">Becoming a Freshtrax Owner</option>
                    <option value="partnership">
                      Partnership / Venue Collaboration
                    </option>
                    <option value="general">General Inquiry</option>
                    <option value="support">Support / Technical Issue</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-orange-500 focus:outline-none transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-600 disabled:bg-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <ArrowRight size={18} />
                </button>

                <p className="text-xs text-white/40 text-center">
                  We'll respond to your inquiry within 1 business day.
                </p>
              </form>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <div className="container text-center">
            <h2 className="text-4xl font-bold mb-6">Prefer a Quick Chat?</h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Schedule a call with Marvin to discuss your specific situation and
              timeline.
            </p>
            <button
              onClick={openBookCall}
              className="px-8 py-4 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-600 transition-all duration-300 inline-flex items-center gap-2"
            >
              Book a Call with Marvin N.
              <ArrowRight size={18} />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
    </>
  );
}
