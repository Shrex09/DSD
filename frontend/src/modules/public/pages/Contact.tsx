import React from "react";
import { useState, useEffect, type FormEvent, type ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Clock, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { CONTACT_CONTENT } from "@/content/contact";
import { contactService } from "@/services/contactService";
import { isValidEmail, isValidPhone, isNotEmpty } from "@/utils";
import { companyConfig } from "@/config/company";
import type { InquiryPayload } from "@/types";
import "../styles/contact.css";

const INITIAL_FORM: InquiryPayload = {
  fullName: "",
  email: "",
  phone: "",
  serviceType: "",
  message: "",
};

const SERVICE_OPTIONS: string[] = [
  "Security Guard Services",
  "Bouncer / Event Security",
  "Housekeeping Services",
  "CCTV Monitoring Support",
  "Residential Security",
  "Industrial / Factory Security",
  "Other",
];

const Contact = (): React.JSX.Element => {
  const content = CONTACT_CONTENT;
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<InquiryPayload>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryPayload, string>>>({});

  useEffect(() => {
    const serviceParam = searchParams.get("service") || "";
    const messageParam = searchParams.get("message") || "";
    if (serviceParam || messageParam) {
      setForm((prev) => ({ ...prev, serviceType: serviceParam, message: messageParam }));
    }
  }, [searchParams]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof InquiryPayload]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryPayload, string>> = {};
    if (!isNotEmpty(form.fullName)) newErrors.fullName = "Full name is required.";
    if (!isValidEmail(form.email)) newErrors.email = "A valid email is required.";
    if (!isValidPhone(form.phone)) newErrors.phone = "A valid phone number is required.";
    if (!isNotEmpty(form.serviceType)) newErrors.serviceType = "Please select a service.";
    if (!isNotEmpty(form.message)) newErrors.message = "Please add a brief message.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await contactService.submitInquiry(form);
      setIsSuccess(true);
      setForm(INITIAL_FORM);
    } catch {
      setErrors({ message: "Submission failed. Please call us directly." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <SEO title="Contact Us - DSD Security Services" />

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-overlay" />
        <img src="/images/guards/guard-assembly.jpg" alt="" className="contact-hero-bg" />
        <div className="contact-hero-content">
          <motion.span
            className="contact-hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Get In Touch
          </motion.span>
          <motion.h1
            className="contact-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Let's Secure What<br />Matters to You
          </motion.h1>
          <motion.p
            className="contact-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Reach out for a free consultation. Our team responds within a few hours.
          </motion.p>
        </div>
      </section>

      {/* ── QUICK CONTACT CARDS ── */}
      <section className="contact-quick-section">
        <div className="contact-quick-grid">
          <a href={`tel:${companyConfig.contact.phoneRaw}`} className="contact-quick-card">
            <div className="contact-quick-icon"><Phone className="w-5 h-5" /></div>
            <div>
              <p className="contact-quick-label">Call Us Directly</p>
              <p className="contact-quick-value">{companyConfig.contact.phone}</p>
            </div>
          </a>
          <a href={`mailto:${companyConfig.contact.email}`} className="contact-quick-card">
            <div className="contact-quick-icon"><Mail className="w-5 h-5" /></div>
            <div>
              <p className="contact-quick-label">Email Us</p>
              <p className="contact-quick-value">{companyConfig.contact.email}</p>
            </div>
          </a>
          <a
            href={`https://wa.me/91${companyConfig.contact.phoneRaw}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-quick-card whatsapp"
          >
            <div className="contact-quick-icon whatsapp"><MessageCircle className="w-5 h-5" /></div>
            <div>
              <p className="contact-quick-label">WhatsApp</p>
              <p className="contact-quick-value">Chat with us instantly</p>
            </div>
          </a>
          <div className="contact-quick-card plain">
            <div className="contact-quick-icon"><Clock className="w-5 h-5" /></div>
            <div>
              <p className="contact-quick-label">Working Hours</p>
              <p className="contact-quick-value">24/7 Operations · Office: Mon–Sat 9AM–6PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FORM + INFO ── */}
      <section className="contact-body">
        <div className="contact-body-grid">

          {/* FORM */}
          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="contact-form-header">
              <h2 className="contact-form-title">Send Us a Message</h2>
              <p className="contact-form-subtitle">Fill in the form and we'll get back to you shortly.</p>
            </div>

            {isSuccess ? (
              <div className="contact-success-box" role="alert">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
                <h3 className="contact-success-title">Message Sent!</h3>
                <p className="contact-success-desc">
                  Thank you for reaching out. Our team will contact you within a few hours.
                </p>
                <button className="contact-back-btn" onClick={() => setIsSuccess(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form" noValidate>
                <div className="contact-form-row">
                  <div className="form-field-group">
                    <label htmlFor="c-name" className="form-label">Full Name <span className="text-red-400">*</span></label>
                    <input id="c-name" type="text" name="fullName" value={form.fullName}
                      onChange={handleInputChange} placeholder="Your full name"
                      className={`form-input ${errors.fullName ? "form-input-error" : ""}`} />
                    {errors.fullName && <span className="form-error-msg">{errors.fullName}</span>}
                  </div>
                  <div className="form-field-group">
                    <label htmlFor="c-phone" className="form-label">Phone Number <span className="text-red-400">*</span></label>
                    <input id="c-phone" type="tel" name="phone" value={form.phone}
                      onChange={handleInputChange} placeholder="Your phone number"
                      className={`form-input ${errors.phone ? "form-input-error" : ""}`} />
                    {errors.phone && <span className="form-error-msg">{errors.phone}</span>}
                  </div>
                </div>

                <div className="form-field-group">
                  <label htmlFor="c-email" className="form-label">Email Address <span className="text-red-400">*</span></label>
                  <input id="c-email" type="email" name="email" value={form.email}
                    onChange={handleInputChange} placeholder="your@email.com"
                    className={`form-input ${errors.email ? "form-input-error" : ""}`} />
                  {errors.email && <span className="form-error-msg">{errors.email}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="c-service" className="form-label">Service Required <span className="text-red-400">*</span></label>
                  <select id="c-service" name="serviceType" value={form.serviceType}
                    onChange={handleInputChange}
                    className={`form-input ${errors.serviceType ? "form-input-error" : ""}`}>
                    <option value="">-- Select a service --</option>
                    {SERVICE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {errors.serviceType && <span className="form-error-msg">{errors.serviceType}</span>}
                </div>

                <div className="form-field-group">
                  <label htmlFor="c-message" className="form-label">Message <span className="text-red-400">*</span></label>
                  <textarea id="c-message" name="message" value={form.message}
                    onChange={handleInputChange} rows={4}
                    placeholder="Briefly describe your security requirements..."
                    className={`form-input form-textarea ${errors.message ? "form-input-error" : ""}`} />
                  {errors.message && <span className="form-error-msg">{errors.message}</span>}
                </div>

                <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
                  ) : (
                    <span>Send Message</span>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* INFO */}
          <motion.div
            className="contact-info-wrap"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="contact-info-card">
              <h3 className="contact-info-heading">Our Office</h3>
              <div className="contact-info-items">
                <div className="contact-info-row">
                  <MapPin className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">Address</p>
                    <p className="contact-info-val">{content.officeInfo.address}</p>
                  </div>
                </div>
                <div className="contact-info-row">
                  <Phone className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">Phone</p>
                    <a href={`tel:${companyConfig.contact.phoneRaw}`} className="contact-info-val contact-info-link">
                      {content.officeInfo.phone}
                    </a>
                  </div>
                </div>
                <div className="contact-info-row">
                  <Mail className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">Email</p>
                    <a href={`mailto:${content.officeInfo.email}`} className="contact-info-val contact-info-link">
                      {content.officeInfo.email}
                    </a>
                  </div>
                </div>
                <div className="contact-info-row">
                  <Clock className="contact-info-icon" />
                  <div>
                    <p className="contact-info-label">Operations</p>
                    <p className="contact-info-val">{content.officeInfo.hours}</p>
                    <p className="contact-info-sub">{content.officeInfo.officeHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map embed */}
            <div className="contact-map-wrap">
              <iframe
                title="DSD Security Services Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3820.123!2d74.5703!3d16.8524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc11692c4cedfef%3A0x38c2f0cbef09f0f0!2sVishrambag%2C%20Sangli%2C%20Maharashtra%20416415!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                className="contact-map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;