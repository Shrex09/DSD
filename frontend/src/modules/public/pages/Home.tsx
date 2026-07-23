import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { Phone, ArrowRight, Star, Radio, Award, Users, Clock, ShieldCheck } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { SectionHeader } from "@/modules/public/components/ui";
import { companyConfig } from "@/config/company";
import { HOME_CONTENT } from "@/content/home";
import { ROUTES } from "@/constants";
import { resolveIcon } from "@/utils";
import type { Testimonial } from "@/types";
import "../styles/home.css";

const HERO_VIDEO = "/videos/hero-security-1.mp4";
const HERO_LOGO_BG = "/logos/logo-hero-clean.png";
const HERO_VIDEO_PLAYBACK_RATE = 1.175;
const HERO_LOGO_DISPLAY_MS = 5000;

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

/**
 * Animated counter that ticks from 0 → target when scrolled into view.
 * Leaves non-numeric values (e.g. "24/7") untouched.
 */
const CountUp = ({ value, duration = 1800 }: { value: string; duration?: number }): React.JSX.Element => {
  const match = value.match(/^(\d+)(\D*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState<number>(match ? 0 : NaN);
  const [settled, setSettled] = useState(false);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!match) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const startTime = performance.now();
            const tick = (now: number) => {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(Math.round(target * eased));
              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setSettled(true);
              }
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [match, target, duration]);

  if (!match) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className={settled ? "count-up-settle" : undefined}>
      {display}
      {suffix}
    </span>
  );
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

/** Inline multicolor Google "G" — marks a review as sourced from Google */
const GoogleIcon = ({ className }: { className?: string }): React.JSX.Element => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="#4285F4"
      d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
    />
    <path
      fill="#34A853"
      d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
    />
    <path
      fill="#FBBC05"
      d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.44 2 24s.85 6.91 2.34 9.88l7.35-5.7z"
    />
    <path
      fill="#EA4335"
      d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7C13.42 14.62 18.27 10.75 24 10.75z"
    />
  </svg>
);

const READ_MORE_THRESHOLD = 180;

/** Single review card — handles Read More toggle for long reviews */
const TestimonialCard = ({ review }: { review: Testimonial }): React.JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.quote.length > READ_MORE_THRESHOLD;
  const shownText =
    !isLong || expanded
      ? review.quote
      : `${review.quote.slice(0, READ_MORE_THRESHOLD).trimEnd()}…`;

  return (
    <motion.div className="testimonial-card" variants={fadeInUp}>
      {review.source === "google" && (
        <div className="testimonial-source" aria-label="Sourced from Google">
          <GoogleIcon className="testimonial-source-icon" />
        </div>
      )}
      <div className="testimonial-stars" aria-label={`${review.rating} out of 5 stars`}>
        {renderStars(review.rating)}
      </div>
      <p className="testimonial-quote">
        <span>&ldquo;{shownText}&rdquo;</span>
        {isLong && (
          <button
            type="button"
            className="testimonial-read-more"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </p>
      <div className="testimonial-author-box">
        <div className="testimonial-avatar-initials" aria-hidden="true">
          {getInitials(review.author)}
        </div>
        <div className="testimonial-author-meta">
          <h4 className="testimonial-author-name">{review.author}</h4>
          <span className="testimonial-author-role">{review.role}</span>
          {review.date && <span className="testimonial-author-date">{review.date}</span>}
        </div>
      </div>
    </motion.div>
  );
};

const Home = (): React.JSX.Element => {
  const content = HOME_CONTENT;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [heroPhase, setHeroPhase] = useState<"video" | "logo">("video");

  // Drive the background between the video and a slow Ken-Burns logo
  // sequence: play the video once, then hold on the logo, then repeat.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
    video.play().catch(() => {});

    const handleEnded = (): void => setHeroPhase("logo");
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  useEffect(() => {
    if (heroPhase === "logo") {
      const timer = window.setTimeout(() => setHeroPhase("video"), HERO_LOGO_DISPLAY_MS);
      return () => window.clearTimeout(timer);
    }

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.playbackRate = HERO_VIDEO_PLAYBACK_RATE;
      video.play().catch(() => {});
    }
  }, [heroPhase]);

  return (
    <div className="flex flex-col w-full">
      <SEO title="Premium Security Guard & Protection Services" />

      {/* ==========================================
         1. HERO SECTION (Redesigned Corporate Presentation)
         ========================================== */}
      <section className="home-hero bg-primary-dark">
        {/* background video (plays once, then hands off to the logo sequence) */}
        <video
          ref={videoRef}
          src={HERO_VIDEO}
          autoPlay
          muted
          playsInline
          className={`home-hero-video absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none select-none ${
            heroPhase === "logo" ? "home-hero-bg-hidden" : "home-hero-bg-visible"
          }`}
        />

        {/* Logo sequence: shown after one full video playback, slow Ken Burns zoom */}
        <div
          className={`home-hero-logo-sequence absolute top-0 left-0 w-full h-full z-0 flex items-center justify-center pointer-events-none select-none ${
            heroPhase === "logo" ? "home-hero-bg-visible" : "home-hero-bg-hidden"
          }`}
          aria-hidden="true"
        >
          {heroPhase === "logo" && (
            <img
              src={HERO_LOGO_BG}
              alt=""
              className="home-hero-logo-kenburns w-[55%] max-w-[640px] object-contain"
            />
          )}
        </div>

        {/* Subtle background watermark: right-center, only shown once the layout has room beside the text */}
        <div
          className="hidden lg:flex absolute inset-0 opacity-[0.08] items-center justify-end pr-10 xl:pr-20 select-none pointer-events-none z-0"
          aria-hidden="true"
        >
          <img
            src={HERO_LOGO_BG}
            alt=""
            className="w-[320px] h-[320px] xl:w-[420px] xl:h-[420px] object-contain"
          />
        </div>

        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-hero-glass-overlay" aria-hidden="true" />

        <div className="home-hero-container">
          {/* Logo above the hero title */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-2 flex items-center"
          >
            <img
              src={HERO_LOGO_BG}
              alt="DSD Official Logo"
              className="h-[105px] w-auto object-contain select-none"
            />
          </motion.div>

          {/* Small lightweight label */}
          <motion.span
            className="hero-label-uppercase"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
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
        <motion.div
          className="about-preview-watermark"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.05 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          aria-hidden="true"
        >
          <img src={HERO_LOGO_BG} alt="" />
        </motion.div>
        <div className="about-preview-container">
          {/* Visual element (left) */}
          <motion.div
            className="about-preview-visual"
            initial={{ opacity: 0, x: -45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="home-about-img-wrap">
              <img
                src="/images/guards/guard-assembly.jpg"
                alt="DSD Security guards in formation"
                className="home-about-main-img"
              />
              <div className="about-visual-overlay-card">
                <div className="about-visual-overlay-icon" aria-hidden="true">
                  <Radio className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="about-visual-overlay-title">HQ Dispatch</span>
                  <span className="about-visual-overlay-detail">24/7 Patrol Monitoring</span>
                </div>
                <div
                  className="w-2 h-2 bg-green-500 rounded-full animate-ping shrink-0 ml-auto"
                  aria-hidden="true"
                />
              </div>
            </div>
          </motion.div>

          {/* Text content (right) */}
          <motion.div
            className="about-preview-content"
            initial={{ opacity: 0, x: 45 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionHeader badge={content.aboutPreview.badge} title={content.aboutPreview.title} />
            {content.aboutPreview.paragraphs.map((p, idx) => (
              <p key={idx} className="about-paragraph-text">
                {p}
              </p>
            ))}
            <motion.div
              className="home-about-stat-row"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.div className="home-about-stat-pill" variants={fadeInUp}>
                <Award className="home-about-stat-icon" aria-hidden="true" />
                <span className="home-about-stat-num">6+</span>
                <span className="home-about-stat-label">Years Experience</span>
              </motion.div>
              <motion.div className="home-about-stat-pill" variants={fadeInUp}>
                <Users className="home-about-stat-icon" aria-hidden="true" />
                <span className="home-about-stat-num">500+</span>
                <span className="home-about-stat-label">Clients Served</span>
              </motion.div>
              <motion.div className="home-about-stat-pill" variants={fadeInUp}>
                <Clock className="home-about-stat-icon" aria-hidden="true" />
                <span className="home-about-stat-num">24/7</span>
                <span className="home-about-stat-label">Active Coverage</span>
              </motion.div>
            </motion.div>
            <Link to={ROUTES.ABOUT} className="btn-glow-gold about-cta-btn mt-2">
              <span>{content.aboutPreview.ctaText}</span>
              <ArrowRight
                className="w-3.5 h-3.5 text-primary about-cta-arrow"
                aria-hidden="true"
              />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         3. SERVICE PORTFOLIO SECTION
         ========================================== */}
      <section className="service-portfolio-section">
        <motion.div
          className="portfolio-header-glow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          aria-hidden="true"
        />
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
          {content.servicePortfolio.cards.map((card) => {
            const CardIcon = card.icon ? resolveIcon(card.icon) : null;
            return (
              <motion.div key={card.id} className="portfolio-card" variants={fadeInUp}>
                <Link to={card.linkTo} className="portfolio-card-link-wrapper">
                  {/* Background Image with navy overlay + bottom gradient */}
                  <div className="portfolio-card-bg-wrap">
                    <img
                      src={card.imageBg}
                      alt={card.title}
                      className="portfolio-card-img"
                      loading="lazy"
                    />
                    <div className="portfolio-card-overlay" aria-hidden="true" />
                    <div className="portfolio-card-gradient" aria-hidden="true" />
                  </div>

                  {/* Resting title (bottom-left) */}
                  <div className="portfolio-card-resting">
                    <h3 className="portfolio-card-title-rest">{card.title}</h3>
                  </div>

                  {/* Hover panel — slides up from bottom */}
                  <div className="portfolio-card-panel">
                    <div className="portfolio-card-panel-accent" aria-hidden="true" />
                    <div className="portfolio-card-panel-inner">
                      {CardIcon && (
                        <CardIcon className="portfolio-card-panel-icon" aria-hidden="true" />
                      )}
                      <h3 className="portfolio-card-panel-title">{card.title}</h3>
                      <p className="portfolio-card-panel-desc">{card.description}</p>
                      <span className="portfolio-card-panel-cta">
                        <span>Learn More</span>
                        <ArrowRight
                          className="portfolio-card-panel-arrow w-4 h-4"
                          aria-hidden="true"
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ==========================================
         4. WHY CHOOSE US SECTION
         ========================================== */}
      <section className="why-choose-section">
        <motion.div
          className="why-choose-watermark"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.04 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          aria-hidden="true"
        >
          <img src={HERO_LOGO_BG} alt="" />
        </motion.div>
        <div className="why-choose-container">
          {/* Headline (left) */}
          <motion.div
            className="why-choose-content"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionHeader
              badge={content.whyChooseUs.badge}
              title={content.whyChooseUs.title}
              subtitle={content.whyChooseUs.subtitle}
            />
            <div className="mt-4">
              <Link to={ROUTES.CONTACT} className="btn-glow-gold why-choose-cta-btn">
                <span>{companyConfig.cta.consultation}</span>
                <ArrowRight
                  className="w-3.5 h-3.5 text-white why-choose-cta-arrow"
                  aria-hidden="true"
                />
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
                  <div className="why-choose-card-icon-wrap">
                    <Icon className="why-choose-card-icon" aria-hidden="true" />
                  </div>
                  <h3 className="why-choose-card-title">{card.title}</h3>
                  <p className="why-choose-card-desc">{card.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         5. STATISTICS SECTION (Compact Trust Strip)
         ========================================== */}
      {content.statistics.items && content.statistics.items.length > 0 && (
        <section className="stats-section">
          <div className="stats-top-fade" aria-hidden="true" />
          <div className="stats-bg-glow" aria-hidden="true" />
          <div className="stats-bg-noise" aria-hidden="true" />
          <div className="stats-shield-watermark" aria-hidden="true">
            <ShieldCheck strokeWidth={1.2} />
          </div>
          <motion.div
            className="stats-container"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <span className="stats-eyebrow">Trusted by 500+ Clients</span>
            <div className="stats-strip">
              {content.statistics.items.map((stat) => {
                const Icon = resolveIcon(stat.icon);
                return (
                  <div key={stat.id} className="stats-cell">
                    <Icon className="stats-cell-icon" aria-hidden="true" />
                    <span className="stats-cell-num">
                      <CountUp value={stat.value} />
                    </span>
                    <span className="stats-cell-label">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </section>
      )}

      {/* ==========================================
         6b. CLIENTS MARQUEE (Trusted By)
         ========================================== */}
      <section className="clients-section" aria-labelledby="clients-heading">
        <div className="clients-container">
          <motion.div
            className="clients-header"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="clients-eyebrow">Our Clients</span>
            <h2 id="clients-heading" className="clients-title">
              Trusted by leading organizations
            </h2>
          </motion.div>

          <div
            className="clients-marquee"
            role="list"
            aria-label="Clients we serve"
          >
            <div className="clients-track">
              {(() => {
                const logos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
                const doubled = [...logos, ...logos];
                return doubled.map((n, idx) => (
                  <div
                    key={`${n}-${idx}`}
                    className="clients-logo-wrap"
                    role="listitem"
                    aria-hidden={idx >= logos.length ? "true" : undefined}
                  >
                    <img
                      src={`/images/clients/${n}.jpeg`}
                      alt={idx < logos.length ? `Client ${n}` : ""}
                      className="clients-logo-img"
                      loading="lazy"
                      draggable={false}
                    />
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </section>

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
              <TestimonialCard key={rev.id} review={rev} />
            ))}
          </motion.div>
        </section>
      )}

      {/* ==========================================
         8. FINAL CTA BANNER
         ========================================== */}
      <section className="cta-banner-section">
        <div className="cta-banner-watermark" aria-hidden="true">
          <img src={HERO_LOGO_BG} alt="" />
        </div>
        <div className="cta-banner-glow" aria-hidden="true" />
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