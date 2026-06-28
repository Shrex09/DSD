import React from "react";
import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";
import { companyConfig } from "@/config/company";
import { FOOTER_QUICK_LINKS } from "@/constants/navigation";
import "../../styles/footer.css";

const Footer = (): React.JSX.Element => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper">
      <div className="footer-grid">

        {/* Column 1: Brand */}
        <div className="footer-brand-col">
          <div className="footer-brand-logo">
            <Shield className="text-accent w-5 h-5 fill-accent/10" aria-hidden="true" />
            <span className="font-extrabold uppercase tracking-widest text-base text-white">
              {companyConfig.shortName}<span className="text-accent">.</span>
            </span>
          </div>
          <p className="footer-brand-desc">
            Professional security, bouncer, and housekeeping services across Sangli and surrounding regions. Trusted by 500+ clients since 2018.
          </p>
          {/* Social links */}
          <div className="footer-socials">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="Facebook">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="footer-social-btn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="footer-col-title">Quick Links</h3>
          <ul className="footer-links-list">
            {FOOTER_QUICK_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="footer-link-item">
                  <span>→</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h3 className="footer-col-title">Contact Us</h3>
          <div className="footer-contact-details">
            <div className="footer-contact-item">
              <MapPin className="footer-contact-icon" aria-hidden="true" />
              <span>{companyConfig.contact.address}</span>
            </div>
            <div className="footer-contact-item">
              <Phone className="footer-contact-icon" aria-hidden="true" />
              <a href={`tel:${companyConfig.contact.phoneRaw}`} className="hover:text-accent transition-colors duration-200">
                {companyConfig.contact.phone}
              </a>
            </div>
            <div className="footer-contact-item">
              <Mail className="footer-contact-icon" aria-hidden="true" />
              <a href={`mailto:${companyConfig.contact.email}`} className="hover:text-accent transition-colors duration-200">
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
        <p className="footer-copyright">Vishrambag, Sangli – 416415, Maharashtra</p>
      </div>
    </footer>
  );
};

export default Footer;