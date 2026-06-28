import React from "react";
import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Shield, Menu, X, Phone, ShieldCheck } from "lucide-react";
import { companyConfig } from "@/config/company";
import { NAV_LINKS } from "@/constants/navigation";
import { ROUTES } from "@/constants/routes";
import { useScrollPosition } from "@/hooks";
import "../../styles/navbar.css";

/** Framer Motion drawer animation variants */
const drawerVariants: Variants = {
  hidden: { x: "100%" },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
  exit: {
    x: "100%",
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
};

const Navbar = (): React.JSX.Element => {
  const scrollY = useScrollPosition();
  const isScrolled = scrollY > 50;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = (): void => setIsMobileMenuOpen((prev) => !prev);
  const closeMobileMenu = (): void => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`navbar-header ${isScrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Company brand logo */}
          <Link to={ROUTES.HOME} className="nav-logo-link" onClick={closeMobileMenu}>
            <Shield className="logo-icon-gold w-8 h-8 fill-accent/10" />
            <span className="font-extrabold uppercase tracking-widest text-lg">
              {companyConfig.shortName}
              <span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop navigation links */}
          <nav className="nav-menu-desktop" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) => `nav-item-link ${isActive ? "nav-active-link" : ""}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Call / CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={`tel:${companyConfig.contact.phoneRaw}`}
              className="text-slate-700 hover:text-accent flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
              aria-label={`Call us at ${companyConfig.contact.phone}`}
            >
              <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
              <span>{companyConfig.contact.phone}</span>
            </a>
            <Link to={ROUTES.CONTACT} className="nav-cta-btn">
              {companyConfig.cta.quote}
            </Link>
          </div>

          {/* Mobile hamburger toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            {isMobileMenuOpen ? (
              <X className="w-7 h-7" aria-hidden="true" />
            ) : (
              <Menu className="w-7 h-7" aria-hidden="true" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark translucent backdrop */}
            <motion.div
              className="mobile-menu-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            {/* Slide-out panel */}
            <motion.div
              id="mobile-nav-drawer"
              className="mobile-menu-drawer"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={drawerVariants}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              {/* Header inside mobile menu */}
              <div className="mobile-nav-logo">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="text-accent w-7 h-7" aria-hidden="true" />
                  <span className="font-black tracking-widest text-white uppercase text-base">
                    {companyConfig.shortName}
                    <span className="text-accent">.</span>
                  </span>
                </div>
                <button
                  className="text-slate-400 hover:text-white p-1"
                  onClick={closeMobileMenu}
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" aria-hidden="true" />
                </button>
              </div>

              {/* Navigation links inside mobile menu */}
              <nav className="mobile-nav-links" aria-label="Mobile navigation">
                {NAV_LINKS.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `mobile-nav-item ${isActive ? "nav-active-link" : ""}`
                    }
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </nav>

              {/* Mobile CTA footer */}
              <div className="mobile-nav-cta">
                <a
                  href={`tel:${companyConfig.contact.phoneRaw}`}
                  className="mobile-cta-btn mobile-cta-secondary flex items-center justify-center gap-2"
                  aria-label={`Call us at ${companyConfig.contact.phone}`}
                >
                  <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>Call {companyConfig.contact.phone}</span>
                </a>
                <Link
                  to={ROUTES.CONTACT}
                  className="mobile-cta-btn mobile-cta-primary"
                  onClick={closeMobileMenu}
                >
                  {companyConfig.cta.quote}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
