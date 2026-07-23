import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import {
  ShieldCheck,
  Target,
  Eye,
  ArrowRight,
  Check,
  ChevronDown,
} from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { SectionHeader } from "@/modules/public/components/ui";
import { ABOUT_CONTENT } from "@/content/about";
import { resolveIcon } from "@/utils";
import { ROUTES } from "@/constants";
import "../styles/about.css";

const HERO_LOGO = "/logos/logo-hero-clean.png";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/** Words in story paragraphs highlighted with gold brand accent */
const STORY_HIGHLIGHTS =
  /\b(trust(?:ed)?|disciplin(?:e|ed)|profession(?:al|alism)?|accountab(?:le|ility)|vigilan(?:t|ce)|integrity)\b/gi;

const HighlightedParagraph = ({ text }: { text: string }): React.JSX.Element => {
  // The split() with a capture group returns [text, capture, text, capture, …],
  // so odd indexes are the highlighted keyword matches.
  const parts = text.split(STORY_HIGHLIGHTS);
  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <span key={idx} className="about-story-highlight">
            {part}
          </span>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
};

const About = (): React.JSX.Element => {
  const content = ABOUT_CONTENT;

  // Subtle scroll-driven parallax for the story image
  const storyRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: storyProgress } = useScroll({
    target: storyRef,
    offset: ["start end", "end start"],
  });
  const storyImgY = useTransform(storyProgress, [0, 1], [-30, 30]);

  // Hero background parallax — moves slower than the content
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "22%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-8%"]);

  const missionVisionCards = [
    {
      id: "mission",
      icon: <Target className="w-7 h-7" aria-hidden="true" />,
      label: "Our Mission",
      title: content.missionVision.mission.title,
      description: content.missionVision.mission.description,
    },
    {
      id: "vision",
      icon: <Eye className="w-7 h-7" aria-hidden="true" />,
      label: "Our Vision",
      title: content.missionVision.vision.title,
      description: content.missionVision.vision.description,
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <SEO title="About Us - Our Story, Mission & Leadership" />

      {/* ── 1. STORYTELLING HERO ── */}
      <section className="about-hero-section" ref={heroRef}>
        <motion.div className="about-hero-bg-wrap" style={{ y: heroBgY }}>
          <img
            src="/images/guards/guard-assembly.jpg"
            alt=""
            aria-hidden="true"
            className="about-hero-bg-img"
          />
        </motion.div>
        <div className="about-hero-overlay" aria-hidden="true" />
        <div className="about-hero-glow" aria-hidden="true" />
        <motion.div
          className="about-hero-side-logo"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          <img src={HERO_LOGO} alt="" />
        </motion.div>
        <motion.div className="about-hero-content" style={{ y: heroContentY }}>
          <div className="about-hero-glass-panel">
            <motion.span
              className="about-hero-eyebrow"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Est. 2013 · Sangli, Maharashtra
            </motion.span>
            <motion.h1
              className="about-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              A Legacy of Trust
              <br />
              <span className="about-hero-title-alt">and Vigilance</span>
            </motion.h1>
            <motion.p
              className="about-hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Protecting businesses, communities, and peace of mind for over six years.
            </motion.p>
          </div>
        </motion.div>
        <motion.div
          className="about-hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          aria-hidden="true"
        >
          <ChevronDown className="about-hero-scroll-icon w-5 h-5" />
          <span>Scroll to discover our journey</span>
        </motion.div>
      </section>

      {/* ── 2. OUR STORY ── */}
      <section className="about-story-section" ref={storyRef}>
        <div className="about-story-watermark" aria-hidden="true">
          <img src={HERO_LOGO} alt="" />
        </div>
        <div className="about-story-container">
          {/* Layered image collage with parallax */}
          <motion.div
            className="about-story-image-col"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <motion.div
              className="about-story-photos-wrap"
              style={{ y: storyImgY }}
            >
              <img
                src="/images/guards/guard-assembly.jpg"
                alt="DSD Security guards in formation"
                className="about-story-photo-main"
              />
              <img
                src="/images/gallery/ceremonial-red.jpg"
                alt="DSD Security ceremonial event"
                className="about-story-photo-thumb"
              />
              <img
                src="/images/gallery/parade-1.jpg"
                alt="DSD Security parade event"
                className="about-story-photo-thumb-2"
              />
              <div className="about-story-badge-pill">
                <ShieldCheck className="w-4 h-4 shrink-0" aria-hidden="true" />
                <span>Serving since 2013</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Text column with staggered paragraphs and keyword highlights */}
          <motion.div
            className="about-story-text-col"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
          >
            <motion.div className="about-story-heading-wrap" variants={fadeInUp}>
              <div className="about-story-accent-line" aria-hidden="true" />
              <SectionHeader badge={content.story.badge} title={content.story.title} />
            </motion.div>
            {content.story.paragraphs.map((p, idx) => (
              <motion.p key={idx} className="about-para-text" variants={fadeInUp}>
                <HighlightedParagraph text={p} />
              </motion.p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. MISSION & VISION ── */}
      <section className="about-mv-section">
        <div className="about-mv-inner">
          <SectionHeader badge="Our Purpose" title="Mission & Vision" centered />
          <motion.div
            className="about-mv-grid-new"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {missionVisionCards.map((card) => (
              <motion.div
                key={card.id}
                className="about-mv-flip-card"
                variants={fadeInUp}
                tabIndex={0}
                aria-label={`${card.label}: ${card.description}`}
              >
                <div className="about-mv-flip-inner">
                  {/* Front face */}
                  <div className="about-mv-flip-face about-mv-flip-front" aria-hidden="true">
                    <div className="about-mv-card-accent" />
                    <div className="about-mv-card-watermark">
                      <img src={HERO_LOGO} alt="" />
                    </div>
                    <div className="about-mv-icon-wrap">{card.icon}</div>
                    <h3 className="about-mv-flip-title">{card.label}</h3>
                    <span className="about-mv-flip-hint">
                      Hover to explore
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  {/* Back face */}
                  <div className="about-mv-flip-face about-mv-flip-back" aria-hidden="true">
                    <div className="about-mv-card-accent" />
                    <div className="about-mv-card-watermark">
                      <img src={HERO_LOGO} alt="" />
                    </div>
                    <span className="about-mv-label">{card.label}</span>
                    <p className="about-mv-flip-desc">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 4. CORE VALUES ── */}
      <section className="about-values-section-new">
        <div className="about-values-fixed-watermark" aria-hidden="true" />
        <div className="about-values-inner">
          <SectionHeader
            badge={content.coreValues.badge}
            title={content.coreValues.title}
            centered
          />
          <motion.div
            className="about-values-grid-new"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.coreValues.items.map((val) => {
              const Icon = resolveIcon(val.icon);
              return (
                <motion.div key={val.id} className="about-value-card-new" variants={fadeInUp}>
                  <div className="about-value-icon-new">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="about-value-title-new">{val.title}</h3>
                  <p className="about-value-desc-new">{val.description}</p>
                  <ArrowRight
                    className="about-value-arrow w-4 h-4"
                    aria-hidden="true"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 5. WHY TRUST US (checklist) ── */}
      <section className="about-cert-section-new">
        <div className="about-cert-fixed-watermark" aria-hidden="true" />
        <div className="about-cert-inner">
          <SectionHeader
            badge={content.certifications.badge}
            title={content.certifications.title}
            centered
          />
          <motion.div
            className="about-cert-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.certifications.items.map((cert, idx) => (
              <motion.div key={idx} className="about-cert-card" variants={fadeInUp}>
                <div className="about-cert-check-wrap" aria-hidden="true">
                  <Check className="w-4 h-4" />
                </div>
                <div className="about-cert-body">
                  <h3 className="about-cert-title">{cert.title}</h3>
                  <p className="about-cert-desc">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 6. GALLERY MARQUEE ── */}
      <section className="about-photo-marquee" aria-label="DSD Security photo gallery">
        <div
          className="about-marquee-track"
          style={{ animation: "marqueeLeftScroll 45s linear infinite" }}
        >
          {[...Array(2)].map((_, copyIdx) => (
            <div className="about-marquee-row" key={copyIdx} aria-hidden={copyIdx === 1}>
              <img src="/images/gallery/ceremonial-red.jpg" alt="DSD Security ceremonial event" className="about-marquee-img" />
              <img src="/images/gallery/parade-1.jpg" alt="DSD Security ceremonial formation" className="about-marquee-img" />
              <img src="/images/gallery/parade-2.jpg" alt="DSD Security officers lineup" className="about-marquee-img" />
              <img src="/images/guards/guard-assembly.jpg" alt="DSD Security guards assembly" className="about-marquee-img" />
              <img src="/images/gallery/parade-3.jpg" alt="DSD Security flag hoisting" className="about-marquee-img" />
              <img src="/images/gallery/parade-4.jpg" alt="DSD Security flag tribute" className="about-marquee-img" />
              <img src="/images/gallery/parade-5.jpg" alt="DSD Security guard drill" className="about-marquee-img" />
            </div>
          ))}
        </div>
      </section>

      {/* ── 7. CTA ── */}
      <section className="about-cta-section">
        <div className="about-cta-watermark" aria-hidden="true">
          <img src={HERO_LOGO} alt="" />
        </div>
        <div className="about-cta-glow" aria-hidden="true" />
        <div className="about-cta-inner">
          <motion.h2
            className="about-cta-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Work With Us?
          </motion.h2>
          <motion.p
            className="about-cta-subtitle"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Contact our team today for a free security consultation tailored to your needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <Link to={ROUTES.CONTACT} className="btn-glow-gold about-cta-btn">
              <span>Request a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-white about-cta-arrow" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
