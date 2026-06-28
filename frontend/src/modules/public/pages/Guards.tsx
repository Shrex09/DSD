import React from "react";
import { useState, useEffect, useCallback } from "react";
import { motion, type Variants } from "framer-motion";
import { CheckCircle2, BadgeCheck } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { PageHero, SectionHeader, EmptyState, ErrorState } from "@/modules/public/components/ui";
import { GUARDS_CONTENT } from "@/content/guards";
import { guardService } from "@/services/guardService";
import { resolveIcon } from "@/utils";
import type { GuardProfile } from "@/types";
import "../styles/guards.css";

// Section reveal animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
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

const Guards = (): React.JSX.Element => {
  const content = GUARDS_CONTENT;
  const [guards, setGuards] = useState<GuardProfile[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const [retryCount, setRetryCount] = useState<number>(0);

  const handleRetry = useCallback((): void => {
    setRetryCount((c) => c + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    setHasError(false);

    guardService
      .getGuardsList()
      .then((data: GuardProfile[]) => {
        if (isMounted) {
          setGuards(data);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHasError(true);
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  return (
    <div className="flex flex-col w-full">
      <SEO title="Our Security Guards - Vetted & Trained Personnel" />

      {/* ==========================================
         1. PAGE HERO
         ========================================== */}
      <PageHero
        badge={content.header.badge}
        title={content.header.title}
        subtitle={content.header.subtitle}
        className="guards-header-hero"
        containerClassName="guards-header-container"
      />

      {/* ==========================================
         2. GUARD ROSTER SECTION (dynamic)
         ========================================== */}
      <section className="guard-roster-section">
        <div className="guard-roster-container">
          <SectionHeader badge="Guard Roster" title="Active Protection Officers" centered />

          {/* Loading skeleton */}
          {isLoading && (
            <div
              className="guard-cards-grid mt-10"
              aria-busy="true"
              aria-label="Loading guard roster"
            >
              {[1, 2, 3].map((n) => (
                <div key={n} className="guard-skeleton-card animate-pulse">
                  <div className="w-20 h-20 rounded-full bg-slate-200 mx-auto mb-4" />
                  <div className="h-4 bg-slate-200 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-3 bg-slate-100 rounded w-1/2 mx-auto mb-4" />
                  <div className="space-y-2">
                    <div className="h-3 bg-slate-100 rounded" />
                    <div className="h-3 bg-slate-100 rounded w-5/6" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error state */}
          {!isLoading && hasError && (
            <ErrorState
              title="Failed to load guard roster"
              description="An error occurred while retrieving the personnel list. Please try again."
              onRetry={handleRetry}
            />
          )}

          {/* Empty state */}
          {!isLoading && !hasError && guards.length === 0 && (
            <EmptyState
              title="No personnel found"
              description="No active guards are available in the roster at this time."
            />
          )}

          {/* Guard cards */}
          {!isLoading && !hasError && guards.length > 0 && (
            <motion.div
              className="guard-cards-grid mt-10"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {guards.map((guard) => (
                <motion.article
                  key={guard.id}
                  className="guard-card"
                  variants={fadeInUp}
                  aria-label={`Guard profile: ${guard.name}`}
                >
                  {/* Badge number */}
                  <div
                    className="guard-badge-chip"
                    aria-label={`Badge number ${guard.badgeNumber}`}
                  >
                    <BadgeCheck className="w-3 h-3" aria-hidden="true" />
                    {guard.badgeNumber}
                  </div>

                  {/* Avatar initials placeholder */}
                  <div className="guard-avatar" aria-hidden="true">
                    {guard.name
                      .split(" ")
                      .map((word) => word.charAt(0))
                      .slice(0, 2)
                      .join("")}
                  </div>

                  <h2 className="guard-name">{guard.name}</h2>
                  <span className="guard-rank">{guard.rank}</span>
                  <span className="guard-experience">{guard.experience}</span>

                  {/* Specialties */}
                  <div className="guard-specialties">
                    <h3 className="guard-detail-label">Specialties</h3>
                    <ul className="guard-tags-list" aria-label="Specialties">
                      {guard.specialties.map((spec, idx) => (
                        <li key={idx} className="guard-tag guard-tag-specialty">
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certifications */}
                  <div className="guard-certifications">
                    <h3 className="guard-detail-label">Certifications</h3>
                    <ul className="guard-certs-list" aria-label="Certifications">
                      {guard.certifications.map((cert, idx) => (
                        <li key={idx} className="guard-cert-item">
                          <CheckCircle2 className="guard-cert-check" aria-hidden="true" />
                          <span>{cert}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ==========================================
         3. QUALIFICATIONS SECTION
         ========================================== */}
      <section className="qualifications-section">
        <div className="qualifications-container">
          <div className="qualifications-intro-col">
            <SectionHeader
              badge={content.qualifications.badge}
              title={content.qualifications.title}
            />
            <p className="qualifications-desc">{content.qualifications.description}</p>
          </div>
          <motion.ul
            className="qualifications-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            aria-label="Vetting qualifications"
          >
            {content.qualifications.items.map((item) => (
              <motion.li key={item.id} className="qualification-item" variants={fadeInUp}>
                <CheckCircle2 className="qualification-check" aria-hidden="true" />
                <div>
                  <h3 className="qualification-title">{item.title}</h3>
                  <p className="qualification-desc">{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* ==========================================
         4. TRAINING SECTION
         ========================================== */}
      <section className="training-section">
        <div className="training-container">
          <SectionHeader
            badge={content.training.badge}
            title={content.training.title}
            subtitle={content.training.subtitle}
            centered
          />
          <motion.div
            className="training-grid"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {content.training.cards.map((card) => {
              const Icon = resolveIcon(card.icon);
              return (
                <motion.div key={card.id} className="training-card" variants={fadeInUp}>
                  <div className="training-card-icon-box">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="training-card-title">{card.title}</h3>
                  <p className="training-card-desc">{card.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ==========================================
         5. HIRING PROCESS SECTION
         ========================================== */}
      <section className="hiring-section">
        <div className="hiring-container">
          <SectionHeader badge={content.hiring.badge} title={content.hiring.title} centered />
          <motion.ol
            className="hiring-steps-list"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            aria-label="Hiring process steps"
          >
            {content.hiring.steps.map((step, idx) => (
              <motion.li key={idx} className="hiring-step" variants={fadeInUp}>
                <div className="hiring-step-number" aria-hidden="true">
                  {step.num}
                </div>
                <div>
                  <h3 className="hiring-step-title">{step.title}</h3>
                  <p className="hiring-step-desc">{step.description}</p>
                </div>
              </motion.li>
            ))}
          </motion.ol>
        </div>
      </section>

      {/* ==========================================
         6. PROFESSIONALISM SECTION
         ========================================== */}
      <section className="professionalism-section">
        <div className="professionalism-container">
          <SectionHeader
            badge={content.professionalism.badge}
            title={content.professionalism.title}
          />
          <p className="professionalism-desc">{content.professionalism.description}</p>
          <ul className="professionalism-rules" aria-label="Professional conduct rules">
            {content.professionalism.rules.map((rule, idx) => (
              <li key={idx} className="professionalism-rule-item">
                <CheckCircle2 className="rule-check" aria-hidden="true" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Guards;
