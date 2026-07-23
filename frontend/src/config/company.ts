import type { CompanyConfig } from "@/types";

export const companyConfig: CompanyConfig = {
  name: "DSD Security Services",
  shortName: "DSD",
  tagline: "Premium Security & Protection Services",
  foundedYear: 2013,
  description:
    "DSD Security Services is a leading provider of elite security solutions, offering tailored guarding, patrol, CCTV monitoring, and emergency response services to protect your assets and peace of mind.",

  contact: {
    address: "Shop No. 1, Near Dandekar Hall, S.T. Colony, Vishrambag, Sangli – 416415",
    phone: "9665510514 / 9890488427",
    phoneRaw: "9665510514",
    email: "dsd9665@gmail.com",
    supportEmail: "dsd9665@gmail.com",
    hours: "24/7 Operations & Dispatch",
    officeHours: "Office Administration: Mon - Sat 9:00 AM - 6:00 PM",
  },

  socials: {
    instagram:
      "https://www.instagram.com/dsd_security_services_2015?igsh=MTdkaWVjbWpnenh1dw==",
  },

  logos: {
    light: "/logos/logo-hero-clean.png", // Transparent logo for dark backgrounds (footer, drawer)
    dark: "/logos/logo-for-light-bg.png",  // For light backgrounds (white navbar)
    favicon: "/favicon/favicon.ico",
  },

  cta: {
    quote: "Request a Quote",
    call: "Call Now",
    consultation: "Get Security Consultation",
  },
};