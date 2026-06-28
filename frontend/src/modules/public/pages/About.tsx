import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Target, Eye, ArrowRight } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { SectionHeader } from "@/modules/public/components/ui";
import { ABOUT_CONTENT } from "@/content/about";
import { resolveIcon } from "@/utils";
import { ROUTES } from "@/constants";
import "../styles/about.css";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};


interface FlipCardProps {
  icon: React.ReactNode;
  label: string;
  title: string;
  description: string;
}

const FlipCard = ({ icon, label, title, description }: FlipCardProps): React.JSX.Element => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`flip-card-wrap${flipped ? " flipped" : ""}`}
      onClick={() => setFlipped((f) => !f)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setFlipped((f) => !f)}
      aria-label={`${label} - click to reveal`}
    >
      <div className="flip-card-inner">
        {/* Front */}
        <div className="flip-card-front">
          <div className="flip-card-icon">{icon}</div>
          <span className="flip-card-label">{label}</span>
          <h3 className="flip-card-title">{title}</h3>
          <span className="flip-card-hint">Hover or tap to reveal →</span>
        </div>
        {/* Back */}
        <div className="flip-card-back">
          <div className="flip-card-icon">{icon}</div>
          <span className="flip-card-label">{label}</span>
          <p className="flip-card-desc">{description}</p>
        </div>
      </div>
    </div>
  );
};

const About = (): React.JSX.Element => {
  const content = ABOUT_CONTENT;

  return (
    <div className="flex flex-col w-full">
      <SEO title="About Us - Our Story, Mission & Leadership" />

      {/* ── 1. HERO ── */}
      <section className="about-hero-section">
        <div className="about-hero-overlay" />
        <img
          src="/images/guards/guard-assembly.jpg"
          alt="DSD Security guards in formation"
          className="about-hero-bg-img"
        />
        <div className="about-hero-content">
          <motion.span
            className="about-hero-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Est. 2018 · Sangli, Maharashtra
          </motion.span>
          <motion.h1
            className="about-hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            A Legacy of Trust<br />and Vigilance
          </motion.h1>
          <motion.p
            className="about-hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            Discover the story, mission, and values behind DSD Security Services — Sangli's trusted protection partner.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to={ROUTES.CONTACT} className="btn-glow-gold">
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 2. STORY + PHOTO ── */}
      <section className="about-story-section">
        <div className="about-story-container">
          <motion.div
            className="about-story-image-col"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="about-story-photos-wrap">
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
            </div>
            <div className="about-story-badge-pill">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>Serving since 2018</span>
            </div>
          </motion.div>

          <motion.div
            className="about-story-text-col"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <SectionHeader badge={content.story.badge} title={content.story.title} />
            {content.story.paragraphs.map((p, idx) => (
              <p key={idx} className="about-para-text">{p}</p>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. MISSION & VISION FLIP CARDS ── */}
      <section className="flip-cards-section">
        <div className="flip-cards-inner">
          <SectionHeader badge="Our Purpose" title="Mission & Vision" centered />
          <div className="flip-cards-grid">
            {/* Mission flip card */}
            <FlipCard
              icon={<Target className="w-6 h-6" />}
              label="Our Mission"
              title={content.missionVision.mission.title}
              description={content.missionVision.mission.description}
            />
            {/* Vision flip card */}
            <FlipCard
              icon={<Eye className="w-6 h-6" />}
              label="Our Vision"
              title={content.missionVision.vision.title}
              description={content.missionVision.vision.description}
            />
          </div>
        </div>
      </section>

      {/* ── 4. CORE VALUES ── */}
      <section className="about-values-section-new">
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
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="about-value-title-new">{val.title}</h3>
                  <p className="about-value-desc-new">{val.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── 5. CERTIFICATIONS ── */}
      <section className="about-cert-section-new">
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
                <ShieldCheck className="about-cert-icon" />
                <span>{cert}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 5b. PHOTO MARQUEE (news-ticker style) ── */}
      <section className="about-photo-marquee" aria-label="DSD Security photo gallery">
        <div
          className="about-marquee-track"
          style={{ animation: "marqueeLeftScroll 45s linear infinite" }}
        >
          {[...Array(2)].map((_, copyIdx) => (
            <div className="about-marquee-row" key={copyIdx} aria-hidden={copyIdx === 1}>
              <img src="/images/gallery/parade-1.jpg" alt="DSD Security ceremonial formation" className="about-marquee-img" />
              <img src="/images/gallery/parade-2.jpg" alt="DSD Security officers lineup" className="about-marquee-img" />
              <img src="/images/gallery/parade-3.jpg" alt="DSD Security flag hoisting" className="about-marquee-img" />
              <img src="/images/gallery/parade-4.jpg" alt="DSD Security flag tribute" className="about-marquee-img" />
              <img src="/images/gallery/parade-5.jpg" alt="DSD Security guard drill" className="about-marquee-img" />
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. CTA BANNER ── */}
      <section className="about-cta-section">
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
            <Link to={ROUTES.CONTACT} className="btn-glow-gold">
              <span>Request a Consultation</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;