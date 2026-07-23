import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Briefcase, ShieldCheck, GraduationCap } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { SectionHeader } from "@/modules/public/components/ui";
import { EXECUTIVE_LEADERSHIP, DEPARTMENTS } from "@/content/team";
import type { TeamMember } from "@/types";
import "../styles/team.css";

const HERO_LOGO = "/logos/logo-hero-clean.png";
const HERO_BG = "/images/gallery/parade-3.jpg";
const WATERMARK_LOGO = "/logos/logo-hero-clean.png";

const DEPARTMENT_ICONS: Record<string, React.JSX.Element> = {
  "hr-admin": <Briefcase className="w-6 h-6" aria-hidden="true" />,
  operations: <ShieldCheck className="w-6 h-6" aria-hidden="true" />,
  training: <GraduationCap className="w-6 h-6" aria-hidden="true" />,
};

const getInitials = (name: string, fallback: string): string => {
  const src = name.trim() || fallback;
  return src
    .replace(/^Mr\.?\s+/i, "")
    .split(/\s+/)
    .map((w) => w.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

/**
 * Cursor-tracked spotlight: writes mouse position (relative to the card)
 * to CSS variables --mx / --my that the stylesheet uses to move a soft
 * gold/blue glow across the card face. Unique interaction for the Team page.
 */
const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>): void => {
  const el = e.currentTarget as HTMLElement;
  const rect = el.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  el.style.setProperty("--mx", `${x}%`);
  el.style.setProperty("--my", `${y}%`);
};

const ProfileCard = ({
  member,
  featured = false,
  wide = false,
}: {
  member: TeamMember;
  featured?: boolean;
  wide?: boolean;
}): React.JSX.Element => {
  const classes = [
    "team-card",
    "team-card-profile",
    featured ? "team-card-featured" : "",
    wide ? "team-card-wide" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <motion.article
      className={classes}
      onMouseMove={handleCardMouseMove}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="team-card-spotlight" aria-hidden="true" />
      <div className="team-card-border" aria-hidden="true" />

      <div className="team-avatar-wrap">
        <div className="team-avatar-ring" aria-hidden="true" />
        {member.image ? (
          <img
            src={member.image}
            alt={member.name}
            className="team-avatar-img"
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        ) : (
          <div className="team-avatar-fallback" aria-hidden="true">
            {getInitials(member.name, member.designation)}
          </div>
        )}
      </div>

      <h3 className="team-name">{member.name}</h3>
      <p className="team-designation">{member.designation}</p>
      {member.qualification && (
        <p className="team-qualification">{member.qualification}</p>
      )}
      {member.department && (
        <span className="team-department-badge">{member.department}</span>
      )}
    </motion.article>
  );
};

const DepartmentOverviewCard = ({
  dept,
  highlighted = false,
}: {
  dept: (typeof DEPARTMENTS)[number];
  highlighted?: boolean;
}): React.JSX.Element => {
  return (
    <motion.div
      className={`team-card team-card-dept-overview ${highlighted ? "team-card-dept-highlighted" : ""}`}
      onMouseMove={handleCardMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="team-card-spotlight" aria-hidden="true" />
      <div className="team-card-border" aria-hidden="true" />
      <div className="team-dept-icon" aria-hidden="true">
        {DEPARTMENT_ICONS[dept.id] ?? <Briefcase className="w-6 h-6" aria-hidden="true" />}
      </div>
      <div className="team-dept-title">{dept.name}</div>
      <span className="team-dept-eyebrow">Department</span>
    </motion.div>
  );
};

const DepartmentPanel = ({
  dept,
  variant,
}: {
  dept: (typeof DEPARTMENTS)[number];
  variant: "watermark" | "gradient" | "decorative";
}): React.JSX.Element => {
  return (
    <motion.section
      className={`team-panel team-panel-var-${variant}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {variant !== "gradient" && (
        <div className="team-panel-watermark" aria-hidden="true">
          <img src={WATERMARK_LOGO} alt="" />
        </div>
      )}
      {variant === "gradient" && (
        <div className="team-panel-gradient" aria-hidden="true" />
      )}
      {variant === "decorative" && (
        <div className="team-panel-decor" aria-hidden="true" />
      )}

      <div className="team-panel-heading">
        <div className="team-department-marker" aria-hidden="true">
          {DEPARTMENT_ICONS[dept.id] ?? <Briefcase className="w-5 h-5" aria-hidden="true" />}
        </div>
        <div className="team-department-titles">
          <span className="team-department-eyebrow">Department</span>
          <h3 className="team-department-name">{dept.name}</h3>
          <p className="team-department-tagline">{dept.tagline}</p>
        </div>
      </div>

      <div className="team-panel-members">
        {dept.members.map((member) => (
          <ProfileCard key={member.id} member={member} wide />
        ))}
      </div>
    </motion.section>
  );
};

const Team = (): React.JSX.Element => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroProgress, [0, 1], ["0%", "22%"]);
  const heroContentY = useTransform(heroProgress, [0, 1], ["0%", "-8%"]);

  // Map department id → panel background treatment so each section feels distinct
  const deptVariants: Record<string, "watermark" | "gradient" | "decorative"> = {
    "hr-admin": "decorative",
    operations: "watermark",
    training: "gradient",
  };

  return (
    <div className="flex flex-col w-full">
      <SEO title="Our Team - Leadership & Operations" />

      {/* ── HERO ── */}
      <section className="team-hero-section" ref={heroRef}>
        <motion.div className="team-hero-bg-wrap" style={{ y: heroBgY }}>
          <img
            src={HERO_BG}
            alt=""
            aria-hidden="true"
            className="team-hero-bg-img"
          />
        </motion.div>
        <div className="team-hero-overlay" aria-hidden="true" />
        <div className="team-hero-glow" aria-hidden="true" />

        <motion.div
          className="team-hero-side-logo"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: "easeOut" }}
          aria-hidden="true"
        >
          <img src={HERO_LOGO} alt="" />
        </motion.div>

        <motion.div className="team-hero-content" style={{ y: heroContentY }}>
          <div className="team-hero-glass-panel">
            <motion.span
              className="team-hero-eyebrow"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Our Team
            </motion.span>
            <motion.h1
              className="team-hero-title"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            >
              Leadership
              <br />
              <span className="team-hero-title-alt">&amp; Operations</span>
            </motion.h1>
            <motion.p
              className="team-hero-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.35 }}
            >
              Meet the disciplined leaders, managers, and trainers driving dependable
              protection across every DSD Security assignment.
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="team-hero-scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          aria-hidden="true"
        >
          <ChevronDown className="team-hero-scroll-icon w-5 h-5" />
          <span>Explore our leadership</span>
        </motion.div>
      </section>

      {/* ── BODY ── */}
      <div className="team-body">
        <div className="team-body-glow team-body-glow-top" aria-hidden="true" />
        <div className="team-body-glow team-body-glow-mid" aria-hidden="true" />
        <div className="team-body-glow team-body-glow-bottom" aria-hidden="true" />

        {/* Executive Leadership — wide glass panel with watermark */}
        <section className="team-executive-section">
          <div className="team-section-header">
            <SectionHeader
              badge="Executive Leadership"
              title="Driving the vision forward"
              subtitle="Our executive leaders set the direction, uphold the standards, and shape the culture that defines DSD Security Services."
              centered
            />
          </div>

          <motion.div
            className="team-executive-panel"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="team-panel-watermark" aria-hidden="true">
              <img src={WATERMARK_LOGO} alt="" />
            </div>
            <div className="team-panel-decor" aria-hidden="true" />
            <div className="team-executive-grid">
              {EXECUTIVE_LEADERSHIP.map((member) => (
                <ProfileCard key={member.id} member={member} featured />
              ))}
            </div>
          </motion.div>
        </section>

        {/* Department Leadership — three overview cards, middle spotlighted */}
        <section className="team-dept-overview-section">
          <div className="team-section-header">
            <SectionHeader
              badge="Department Leadership"
              title="Three departments, one standard"
              subtitle="HR & Admin, Operations, and Training work in lockstep to keep every DSD assignment disciplined, dependable, and always covered."
              centered
            />
          </div>

          <div className="team-dept-overview-grid">
            {DEPARTMENTS.map((dept, i) => (
              <DepartmentOverviewCard
                key={dept.id}
                dept={dept}
                highlighted={i === 1}
              />
            ))}
          </div>
        </section>

        {/* Per-department panels */}
        <div className="team-department-panels">
          {DEPARTMENTS.map((dept) => (
            <DepartmentPanel
              key={dept.id}
              dept={dept}
              variant={deptVariants[dept.id] ?? "watermark"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
