import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Mail, Phone, MapPin, Clock, ArrowUp } from "lucide-react";

const InstagramIcon = (): React.JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (): React.JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const LinkedinIcon = (): React.JSX.Element => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
import { companyConfig } from "@/config/company";
import { FOOTER_QUICK_LINKS } from "@/constants/navigation";
import "../../styles/footer.css";

const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrapper">
      {/* Thin gold accent line at very top */}
      <div className="footer-accent-strip" aria-hidden="true" />

      <div className="footer-grid">
        {/* Column 1: Brand */}
        <div className="footer-brand-col">
          <Link to="/" className="footer-brand-logo flex items-center mb-2" aria-label="DSD Home">
            <img src={companyConfig.logos.light} alt="DSD Security Services Logo" className="h-16 w-auto object-contain" />
          </Link>

          <p className="footer-brand-desc">
            Professional security, bouncer, and housekeeping services across Sangli and surrounding
            regions. Trusted by 500+ clients since {companyConfig.foundedYear}.
          </p>

          <span className="footer-licensed-pill">
            <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
            Licensed in Maharashtra
          </span>

          <div className="footer-socials" aria-label="Social media">
            <a
              href={companyConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={companyConfig.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={companyConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-btn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h3 className="footer-col-title">Quick Links</h3>
          <ul className="footer-links-list">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer-link-item">
                  <span className="footer-link-arrow" aria-hidden="true">
                    →
                  </span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Hours */}
        <div className="footer-col">
          <h3 className="footer-col-title">Working Hours</h3>
          <div className="footer-hours-list">
            <div className="footer-hours-item">
              <Clock className="footer-contact-icon" aria-hidden="true" />
              <div>
                <p className="footer-hours-label">Operations & Dispatch</p>
                <p className="footer-hours-value">24 / 7 — Always Available</p>
              </div>
            </div>
            <div className="footer-hours-item">
              <Clock className="footer-contact-icon" aria-hidden="true" />
              <div>
                <p className="footer-hours-label">Office Administration</p>
                <p className="footer-hours-value">Mon – Sat · 9:00 AM – 6:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Column 4: Contact */}
        <div className="footer-col">
          <h3 className="footer-col-title">Contact Us</h3>
          <div className="footer-contact-details">
            <div className="footer-contact-item">
              <MapPin className="footer-contact-icon" aria-hidden="true" />
              <span>{companyConfig.contact.address}</span>
            </div>
            <div className="footer-contact-item">
              <Phone className="footer-contact-icon" aria-hidden="true" />
              <a
                href={`tel:${companyConfig.contact.phoneRaw}`}
                className="footer-contact-link"
              >
                {companyConfig.contact.phone}
              </a>
            </div>
            <div className="footer-contact-item">
              <Mail className="footer-contact-icon" aria-hidden="true" />
              <a
                href={`mailto:${companyConfig.contact.email}`}
                className="footer-contact-link"
              >
                {companyConfig.contact.email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <p className="footer-copyright">
          &copy; {currentYear} {companyConfig.name}. All rights reserved.
        </p>
        <p className="footer-copyright footer-location-line">
          <MapPin className="w-3.5 h-3.5 text-accent" aria-hidden="true" />
          Vishrambag, Sangli – 416415, Maharashtra
        </p>
        <button
          type="button"
          onClick={scrollToTop}
          className="footer-back-top"
          aria-label="Back to top"
        >
          <ArrowUp className="w-4 h-4" aria-hidden="true" />
          <span>Back to Top</span>
        </button>
      </div>

      {/* Credit line */}
      <p className="footer-credit-line">
        Designed &amp; Developed by{" "}
        <span className="footer-credit-brand">Infernos IT Solutions</span>
      </p>
    </footer>
  );
};

export default Footer;
