import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SEO } from "@/modules/public/components/common";
import { PageHero, SectionHeader } from "@/modules/public/components/ui";
import { SERVICES_CATALOG } from "@/content/servicesCatalog";
import { SERVICES_CONTENT } from "@/content/services";
import { ROUTES } from "@/constants";
import "../styles/services.css";

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
    transition: { staggerChildren: 0.08 },
  },
};

const CATEGORIES = [
  {
    id: "security-services",
    key: "security",
    badge: "Static & Mobile Guarding",
    title: "Security Services",
    description:
      "Professional trained security personnel for commercial, industrial, residential, institutional and corporate environments.",
  },
  {
    id: "bouncer-services",
    key: "bouncer",
    badge: "Event & Crowd Control",
    title: "Bouncer Services",
    description:
      "Professional event security and crowd management for hotels, clubs, weddings, VIP events and private functions.",
  },
  {
    id: "housekeeping-services",
    key: "housekeeping",
    badge: "Facility Support",
    title: "Housekeeping Services",
    description:
      "Reliable housekeeping and facility support services for offices, commercial buildings and residential properties.",
  },
];

const Services = (): React.JSX.Element => {
  const content = SERVICES_CONTENT;
  const { hash } = useLocation();

  // Smooth scrolling to hash sections on load/change
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash]);

  return (
    <div className="flex flex-col w-full">
      <SEO title="Services - Security, Bouncers & Housekeeping Solutions" />

      {/* ==========================================
         1. PAGE HERO
         ========================================== */}
      <PageHero
        badge={content.header.badge}
        title={content.header.title}
        subtitle={content.header.subtitle}
        className="services-header-hero"
        containerClassName="services-header-container"
      />

      {/* ==========================================
         2. CATEGORIZED SERVICE LISTS
         ========================================== */}
      <div className="services-catalog-container">
        {CATEGORIES.map((cat) => {
          const categoryItems = SERVICES_CATALOG.filter((item) => item.category === cat.key);

          return (
            <section
              key={cat.id}
              id={cat.id}
              className="services-category-section scroll-mt-24 py-20 border-b border-slate-100 last:border-0"
            >
              <div className="container mx-auto px-6 mb-12">
                <SectionHeader badge={cat.badge} title={cat.title} subtitle={cat.description} />
              </div>

              <motion.div
                className="services-catalog-grid container mx-auto px-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {categoryItems.map((item) => (
                  <motion.div key={item.id} className="service-catalog-card" variants={fadeInUp}>
                    {/* Card Image */}
                    <div className="service-card-image-wrap">
                      <img
                        src={item.imageBg}
                        alt={item.title}
                        className="service-card-img"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback if image path is not yet present
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                      <div className="service-card-image-overlay" />
                    </div>

                    {/* Card Details */}
                    <div className="service-card-details">
                      <h3 className="service-card-title">{item.title}</h3>
                      <p className="service-card-desc">{item.shortDescription}</p>

                      <Link
                        to={`${ROUTES.CONTACT}?service=${encodeURIComponent(
                          item.title
                        )}&message=${encodeURIComponent(
                          `Hi, I am interested in inquiring about your ${item.title}. Please provide more details.`
                        )}`}
                        className="service-card-enquire-btn btn-glow-gold"
                      >
                        <span>Enquire Now</span>
                        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          );
        })}
      </div>

      {/* ==========================================
         3. FAQ ACCORDION GRID
         ========================================== */}
      <section className="faq-section bg-brand-bg-light">
        <div className="container mx-auto px-6">
          <SectionHeader badge={content.faqs.badge} title={content.faqs.title} centered />
        </div>

        <motion.div
          className="faq-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {content.faqs.items.map((faq) => (
            <motion.div key={faq.id} className="faq-card" variants={fadeInUp}>
              <h3 className="faq-card-question">
                <span className="text-accent font-extrabold shrink-0 mt-0.5" aria-hidden="true">
                  Q.
                </span>
                <span>{faq.question}</span>
              </h3>
              <p className="faq-card-answer">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
