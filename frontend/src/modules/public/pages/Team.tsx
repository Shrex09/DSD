import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Users } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { SectionHeader } from "@/modules/public/components/ui";
import { TEAM_HIERARCHY } from "@/content/team";
import type { TeamMember } from "@/types";
import "../styles/team.css";

/**
 * Renders one org-chart node.
 * - Real person → circular photo card with name / designation / department.
 * - Group node (empty `name`) → compact department-header pill.
 * Recursively renders its children below via .team-children (CSS handles connectors).
 * On mobile the whole tree collapses to a tap-to-expand accordion (see team.css).
 */
const OrgNode = ({ member, isRoot = false }: { member: TeamMember; isRoot?: boolean }): React.JSX.Element => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const hasChildren = Boolean(member.children && member.children.length > 0);
  const isGroup = member.name.trim() === "";

  const toggleExpanded = (): void => {
    if (hasChildren) setExpanded((v) => !v);
  };

  const initials = isGroup
    ? member.designation.slice(0, 2).toUpperCase()
    : member.name
        .replace(/^Mr\.?\s+/i, "")
        .split(/\s+/)
        .map((w) => w.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

  return (
    <li className={`team-node ${isRoot ? "team-node-root" : ""}`}>
      <div className={`team-card ${isGroup ? "team-card-group" : ""}`}>
        {hasChildren && (
          <button
            type="button"
            className={`team-toggle-btn ${expanded ? "team-toggle-open" : ""}`}
            aria-label={expanded ? "Collapse team" : "Expand team"}
            aria-expanded={expanded}
            onClick={toggleExpanded}
          >
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </button>
        )}

        {isGroup ? (
          <>
            <div className="team-group-icon" aria-hidden="true">
              <Users className="w-5 h-5" />
            </div>
            <div className="team-group-title">{member.designation}</div>
            {member.department && member.department !== member.designation && (
              <div className="team-group-sub">{member.department}</div>
            )}
          </>
        ) : (
          <>
            <div className="team-avatar-wrap">
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
                  {initials}
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
          </>
        )}
      </div>

      {hasChildren && expanded && (
        <ul className="team-children">
          {member.children!.map((child) => (
            <OrgNode key={child.id} member={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

const Team = (): React.JSX.Element => {
  return (
    <div className="flex flex-col w-full">
      <SEO title="Our Team - Leadership & Operations" />

      {/* ── HERO ── */}
      <section className="team-hero-section">
        <div className="team-hero-overlay" aria-hidden="true" />
        <div className="team-hero-glow" aria-hidden="true" />
        <motion.div
          className="team-hero-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="team-hero-badge">Our Team</span>
          <h1 className="team-hero-title">Leadership &amp; Operations</h1>
          <p className="team-hero-subtitle">
            Meet the people behind DSD Security Services — a disciplined team of leaders,
            managers, and trainers driving dependable protection across every assignment.
          </p>
        </motion.div>
      </section>

      {/* ── ORG CHART ── */}
      <section className="team-org-section">
        <div className="team-org-header">
          <SectionHeader
            badge="Organizational Structure"
            title="How our team is structured"
            subtitle="From executive leadership down to area managers and training officers, every role has clear ownership and reporting lines."
            centered
          />
        </div>

        <div className="team-org-scroll">
          <motion.div
            className="team-org-tree"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ul className="team-root-list">
              <OrgNode member={TEAM_HIERARCHY} isRoot />
            </ul>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Team;
