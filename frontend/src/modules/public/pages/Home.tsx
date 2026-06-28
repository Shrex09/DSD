import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Phone, ArrowRight, Star } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { SectionHeader } from "@/modules/public/components/ui";
import { companyConfig } from "@/config/company";
import { HOME_CONTENT } from "@/content/home";
import { ROUTES } from "@/constants";
import { resolveIcon } from "@/utils";
import type { Testimonial } from "@/types";
import "../styles/home.css";

const HERO_VIDEO = "/videos/hero-security-1.mp4";

// Section reveal animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

/** Renders n filled star icons */
const renderStars = (count: number): React.JSX.Element[] => {
  return Array.from({ length: count }, (_, index) => (
    <Star key={index} className="w-3.5 h-3.5 fill-accent stroke-accent" aria-hidden="true" />
  ));
};

/** Extracts first two initials from a full name */
const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2);
};

const Home = (): React.JSX.Element => {
  const content = HOME_CONTENT;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="flex flex-col w-full">
      <SEO title="Premium Security Guard & Protection Services" />

      {/* ==========================================
         1. HERO SECTION (Redesigned Corporate Presentation)
         ========================================== */}
      <section className="home-hero bg-[#080e23]">
        {/* background video loop (merged sequential playback) */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          muted
          loop
          playsInline
          className="home-hero-video absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none select-none"
        />

        <div className="home-hero-overlay" aria-hidden="true" />

        <div className="home-hero-container">
          {/* Small lightweight label */}
          <motion.span
            className="hero-label-uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Professional Security Services
          </motion.span>

          {/* Company Name (Largest Typography) */}
          <motion.h1
            className="hero-company-name"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            DSD Security Services
          </motion.h1>

          {/* Strong Readable Tagline */}
          <motion.h2
            className="hero-tagline-lead"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Security <span className="text-gold-accent">Designed</span> for What Matters.
          </motion.h2>

          {/* Short supporting description */}
          <motion.p
            className="hero-description-short"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Trusted security solutions delivering trained personnel and dependable protection for
            businesses, industries, institutions, residential communities, and events.
          </motion.p>

          {/* Action CTAs side-by-side */}
          <motion.div
            className="hero-cta-btn-group"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to={ROUTES.CONTACT} className="btn-glow-gold">
              <span>Request a Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            </Link>
            <a
              href={`https://wa.me/91${companyConfig.contact.phoneRaw}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white flex items-center gap-2 hover:bg-emerald-600/10 hover:border-emerald-500/50 hover:text-emerald-400"
              aria-label="Contact us on WhatsApp"
            >
              <span className="w-4 h-4 flex items-center justify-center">💬</span>
              <span>WhatsApp Us</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         2. ABOUT PREVIEW SECTION
         ========================================== */}
      <section className="about-preview-section">
        <div className="about-preview-container">
          {/* Visual element (left) */}
          <motion.div
            className="about-preview-visual"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="home-about-img-wrap">
              <img
                src="/images/guards/guard-assembly.jpg"
                alt="DSD Security guards in formation"
                className="home-about-main-img"
              />
              <div className="about-visual-overlay-card">
                <div
                  className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping shrink-0"
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-accent font-bold">
                    HQ Dispatch
                  </span>
                  <span className="text-[11px] text-white font-semibold">
                    24/7 Patrol Monitoring
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content (right) */}
          <motion.div
            className="about-preview-content"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader badge={content.aboutPreview.badge} title={content.aboutPreview.title} />
            {content.aboutPreview.paragraphs.map((p, idx) => (
              <p key={idx} className="about-paragraph-text">
                {p}
              </p>
            ))}
            <div className="home-about-stat-row">
              <div className="home-about-stat-pill">
                <span className="home-about-stat-num">6+</span>
                <span className="home-about-stat-label">Years Experience</span>
              </div>
              <div className="home-about-stat-pill">
                <span className="home-about-stat-num">500+</span>
                <span className="home-about-stat-label">Clients Served</span>
              </div>
              <div className="home-about-stat-pill">
                <span className="home-about-stat-num">24/7</span>
                <span className="home-about-stat-label">Active Coverage</span>
              </div>
            </div>
            <Link to={ROUTES.ABOUT} className="btn-glow-gold mt-2">
              <span>{content.aboutPreview.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         3. SERVICE PORTFOLIO SECTION
         ========================================== */}
      <section className="service-portfolio-section">
        <div className="portfolio-header-box">
          <SectionHeader
            badge={content.servicePortfolio.badge}
            title={content.servicePortfolio.title}
            subtitle={content.servicePortfolio.subtitle}
            centered
          />
        </div>

        <motion.div
          className="portfolio-grid-wrapper"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {content.servicePortfolio.cards.map((card) => (
            <motion.div key={card.id} className="portfolio-card" variants={fadeInUp}>
              <Link to={card.linkTo} className="portfolio-card-link-wrapper">
                {/* Background Image */}
                <div className="portfolio-card-bg-wrap">
                  <img
                    src={card.imageBg}
                    alt={card.title}
                    className="portfolio-card-img"
                    loading="lazy"
                  />
                  <div className="portfolio-card-overlay" />
                </div>

                {/* Content Overlay */}
                <div className="portfolio-card-content">
                  <h3 className="portfolio-card-title">{card.title}</h3>
                  <p className="portfolio-card-desc">{card.description}</p>
                  <div className="portfolio-card-btn">
                    <span>Learn More</span>
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ==========================================
         4. WHY CHOOSE US SECTION
         ========================================== */}
      <section className="why-choose-section">
        <div className="why-choose-container">
          {/* Headline (left) */}
          <motion.div
            className="why-choose-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader
              badge={content.whyChooseUs.badge}
              title={content.whyChooseUs.title}
              subtitle={content.whyChooseUs.subtitle}
            />
            <div className="mt-4">
              <Link to={ROUTES.CONTACT} className="btn-glow-gold">
                {companyConfig.cta.consultation}
              </Link>
            </div>
          </motion.div>

          {/* Cards grid (right) */}
          <motion.div
            className="why-choose-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.whyChooseUs.cards.map((card) => {
              const Icon = resolveIcon(card.icon);
              return (
                <motion.div key={card.id} className="why-choose-card" variants={fadeInUp}>
                  <Icon className="why-choose-card-icon" aria-hidden="true" />
                  <h3 className="why-choose-card-title">{card.title}</h3>
                  <p className="why-choose-card-desc">{card.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         5. STATISTICS SECTION
         ========================================== */}
      {content.statistics.items && content.statistics.items.length > 0 && (
        <section className="stats-section">
          <div
            className="absolute inset-0 opacity-5 flex items-center justify-center select-none pointer-events-none"
            aria-hidden="true"
          >
            <div className="w-[800px] h-[800px] rounded-full border border-white flex items-center justify-center">
              <div className="w-[600px] h-[600px] rounded-full border border-dashed border-white" />
            </div>
          </div>

          <motion.div
            className="stats-grid-wrapper"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.statistics.items.map((stat) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <motion.div key={stat.id} className="stat-item-box" variants={fadeInUp}>
                  <Icon className="stat-icon" aria-hidden="true" />
                  <span className="stat-number">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
      )}

      {/* ==========================================
         7. TESTIMONIALS SECTION
         ========================================== */}
      {content.testimonials.reviews && content.testimonials.reviews.length > 0 && (
        <section className="testimonials-section">
          <div className="services-header-box">
            <SectionHeader
              badge={content.testimonials.badge}
              title={content.testimonials.title}
              centered
            />
          </div>

          <motion.div
            className="testimonials-grid-wrapper"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.testimonials.reviews.map((rev: Testimonial) => (
              <motion.div key={rev.id} className="testimonial-card" variants={fadeInUp}>
                <div className="testimonial-stars" aria-label={`${rev.rating} out of 5 stars`}>
                  {renderStars(rev.rating)}
                </div>
                <p className="testimonial-quote">&ldquo;{rev.quote}&rdquo;</p>
                <div className="testimonial-author-box">
                  <div className="testimonial-avatar-initials" aria-hidden="true">
                    {getInitials(rev.author)}
                  </div>
                  <div>
                    <h4 className="testimonial-author-name">{rev.author}</h4>
                    <span className="testimonial-author-role">{rev.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      )}

      {/* ==========================================
         8. FINAL CTA BANNER
         ========================================== */}
      <section className="cta-banner-section">
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--primary-light),transparent_60%)] opacity-35"
          aria-hidden="true"
        />
        <div className="cta-banner-container">
          <motion.h2
            className="cta-banner-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {content.ctaBanner.title}
          </motion.h2>
          <motion.p
            className="cta-banner-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {content.ctaBanner.subtitle}
          </motion.p>
          <motion.div
            className="cta-banner-group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to={ROUTES.CONTACT} className="btn-glow-gold">
              <span>{content.ctaBanner.primaryButton}</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
            </Link>
            <a
              href={`tel:${companyConfig.contact.phoneRaw}`}
              className="btn-outline-white"
              aria-label={`Call our operations room at ${companyConfig.contact.phone}`}
            >
              <Phone className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
              <span>{content.ctaBanner.secondaryButton}</span>
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;