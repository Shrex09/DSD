import type { TrustIndicator, StatItem, Testimonial, IndustryCard, WhyChooseCard } from "@/types";

interface HeroContent {
  badgeText: string;
  badgeSubText: string;
  sidebarText: string;
  watchOverviewText: string;
  titleLeft: string;
  titleGold: string;
  titleRight: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  videoBg: string | null;
  imageBg: string;
}

interface AboutPreviewContent {
  badge: string;
  title: string;
  paragraphs: string[];
  ctaText: string;
}

interface ServicePortfolioCard {
  id: string;
  title: string;
  description: string;
  imageBg: string;
  linkTo: string;
  icon?: string;
}

interface ServicePortfolioContent {
  badge: string;
  title: string;
  subtitle: string;
  cards: ServicePortfolioCard[];
}

interface WhyChooseUsContent {
  badge: string;
  title: string;
  subtitle: string;
  cards: WhyChooseCard[];
}

interface StatisticsContent {
  badge: string;
  title: string;
  items: StatItem[];
}

interface IndustriesContent {
  badge: string;
  title: string;
  subtitle: string;
  cards: IndustryCard[];
}

interface TestimonialsContent {
  badge: string;
  title: string;
  reviews: Testimonial[];
}

interface CTABannerContent {
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
}

interface HomeContent {
  hero: HeroContent;
  trustIndicators: TrustIndicator[];
  aboutPreview: AboutPreviewContent;
  servicePortfolio: ServicePortfolioContent;
  whyChooseUs: WhyChooseUsContent;
  statistics: StatisticsContent;
  industries: IndustriesContent;
  testimonials: TestimonialsContent;
  ctaBanner: CTABannerContent;
}

export const HOME_CONTENT: HomeContent = {
  hero: {
    badgeText: "Professional Security Services",
    badgeSubText: "Serving Businesses Across Multiple Industries",
    sidebarText: "SECURITY OPERATIONS ACTIVE",
    watchOverviewText: "Watch overview",
    titleLeft: "Security ",
    titleGold: "designed",
    titleRight: " for what matters.",
    subtitle:
      "Licensed officers, AI-monitored surveillance, and rapid response — engineered by the security partner enterprises rely on, 24 hours a day.",
    primaryCta: "Request a Quote",
    secondaryCta: "Call Us",
    videoBg: null,
    imageBg: "/images/hero/hero-main.jpg",
  },

  trustIndicators: [
    {
      id: "trust-1",
      icon: "ShieldCheck",
      badgeUpper: "ALL 50 STATES",
      title: "Licensed & Verified",
      description:
        "Accredited state-licensed agency complying with the highest security standards.",
    },
    {
      id: "trust-2",
      icon: "Award",
      badgeUpper: "80H ACADEMY",
      title: "Trained Personnel",
      description: "Our officers undergo vetting, physical trials, and advanced tactical training.",
    },
    {
      id: "trust-3",
      icon: "Radio",
      badgeUpper: "365 DAYS",
      title: "24/7 Coverage",
      description:
        "Continuous monitoring and immediate dispatch coordination from our command hub.",
    },
    {
      id: "trust-4",
      icon: "Zap",
      badgeUpper: "< 8 MIN",
      title: "Rapid Response",
      description: "Rapid deployment teams on standby to resolve incidents within minutes.",
    },
  ],

  aboutPreview: {
    badge: "About Our Company",
    title: "Protecting What Matters Most",
    paragraphs: [
      "We provide premium security services designed to mitigate risks and protect commercial, industrial, and residential assets. Our agency is founded on discipline, trust, and strict accountability.",
      "Every officer is vetted and backed by our round-the-clock operations center. By integrating advanced tracking technology with seasoned leadership, we provide the reliable defence our clients expect.",
    ],
    ctaText: "Discover Our Story",
  },

  servicePortfolio: {
    badge: "Our Service Portfolio",
    title: "Comprehensive Security Solutions",
    subtitle:
      "We provide professional security and support services tailored for businesses, industries, institutions, residential communities, commercial establishments, and events.",
    cards: [
      {
        id: "security-services",
        title: "Security Services",
        description:
          "Professional trained security personnel for commercial, industrial, residential, institutional and corporate environments.",
        imageBg: "https://images.unsplash.com/photo-1485230405346-71acb9518d9c?auto=format&fit=crop&w=600&q=80",
        linkTo: "/services#security-services",
        icon: "ShieldCheck",
      },
      {
        id: "bouncer-services",
        title: "Bouncer Services",
        description:
          "Professional event security and crowd management for hotels, clubs, weddings, VIP events and private functions.",
        imageBg: "/images/gallery/bouncer.png",
        linkTo: "/services#bouncer-services",
        icon: "Users",
      },
      {
        id: "housekeeping-services",
        title: "Housekeeping Services",
        description:
          "Reliable housekeeping and facility support services for offices, commercial buildings and residential properties.",
        imageBg: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80",
        linkTo: "/services#housekeeping-services",
        icon: "Sparkles",
      },
      {
        id: "gunman-security-services",
        title: "Gunman Security Services",
        description:
          "Licensed armed gunmen for banks, cash escorts, jewellery vaults and high-risk assignments requiring trained firearm personnel.",
        imageBg: "/images/gallery/gunman.png",
        linkTo: "/services#gunman-security-services",
        icon: "ShieldAlert",
      },
    ],
  },

  whyChooseUs: {
    badge: "Why Choose Us",
    title: "Trusted Security, Proven Results",
    subtitle:
      "DSD Security Services has been protecting businesses, residences, and events across Sangli since 2013 — with trained, uniformed personnel and round-the-clock support.",
    cards: [
      {
        id: "why-1",
        icon: "UserCheck",
        title: "Trained & Uniformed Staff",
        description:
          "All our guards are professionally trained, uniformed, and disciplined — presenting a credible security presence at your premises.",
      },
      {
        id: "why-2",
        icon: "Clock",
        title: "24/7 Availability",
        description:
          "We provide round-the-clock security coverage with quick deployment and always-available support for our clients.",
      },
      {
        id: "why-3",
        icon: "MapPin",
        title: "Local Expertise",
        description:
          "Based in Sangli, we understand the local environment and have been serving clients across the region for 12+ years.",
      },
      {
        id: "why-4",
        icon: "ShieldCheck",
        title: "Reliable & Accountable",
        description:
          "We take full responsibility for the security of your premises, with regular supervision and clear communication with clients.",
      },
    ],
  },

  statistics: {
    badge: "Track Record",
    title: "Performance by the Numbers",
    items: [
      {
        id: "stat-1",
        value: "12+",
        label: "Years in Business",
        icon: "Award",
      },
      {
        id: "stat-2",
        value: "500+",
        label: "Total Security Guards",
        icon: "UserCheck",
      },
      {
        id: "stat-3",
        value: "24/7",
        label: "Active Coverage",
        icon: "Radio",
      },
      {
        id: "stat-4",
        value: "3",
        label: "Service Categories",
        icon: "ShieldCheck",
      },
    ],
  },

  industries: {
    badge: "Industries We Protect",
    title: "Securing Diverse Environments",
    subtitle:
      "We customize our security guard post orders and threat perimeters to address the unique risk factors of each industry sector.",
    cards: [
      {
        id: "ind-1",
        title: "Commercial Buildings",
        description:
          "Office towers, corporate centers, and business parks needing access control and visitor handling.",
        icon: "Home",
      },
      {
        id: "ind-2",
        title: "Manufacturing Plants",
        description:
          "Industrial complexes with strict safety, gatekeeping, and asset loss protection guidelines.",
        icon: "Factory",
      },
      {
        id: "ind-3",
        title: "Warehouses & Logistics",
        description:
          "Distribution hubs requiring inventory check audits, cargo monitoring, and yard patrols.",
        icon: "Briefcase",
      },
      {
        id: "ind-4",
        title: "Residential Communities",
        description:
          "Gated neighborhoods, estate perimeters, and condominium concierge visitor management.",
        icon: "Home",
      },
      {
        id: "ind-5",
        title: "Events & Exhibitions",
        description:
          "Concerts, summits, and public trade shows needing crowd management and evacuation plans.",
        icon: "Calendar",
      },
      {
        id: "ind-6",
        title: "Educational Institutions",
        description: "School grounds, university campuses, and security checks for dormitories.",
        icon: "Award",
      },
      {
        id: "ind-7",
        title: "Hospitals & Healthcare",
        description:
          "Medical centers requiring quiet dispute mediation, security patrols, and emergency response.",
        icon: "ShieldAlert",
      },
    ],
  },

  testimonials: {
    badge: "Client Testimonials",
    title: "What Our Partners Say",
    reviews: [
      {
        id: "rev-1",
        quote:
          "DSD Security has been guarding our residential society for over 3 years. Their guards are disciplined, punctual, and always professional. We feel genuinely safe.",
        author: "Rajesh Patil",
        role: "Society Chairman, Sangli",
        rating: 5,
        date: "2 months ago",
        source: "google",
      },
      {
        id: "rev-2",
        quote:
          "We hired DSD for our corporate event and were impressed by their crowd management and quick coordination. Highly recommend their bouncer services.",
        author: "Sneha Kulkarni",
        role: "Event Manager, Sangli",
        rating: 5,
        date: "5 months ago",
        source: "google",
      },
      {
        id: "rev-3",
        quote:
          "Reliable, trained, and responsive. DSD Security has been our trusted partner for warehouse security. Zero incidents since we onboarded them.",
        author: "Mahesh Desai",
        role: "Operations Head, Vishrambag",
        rating: 5,
        date: "8 months ago",
        source: "google",
      },
    ],
  },

  ctaBanner: {
    title: "Need Security for Your Premises?",
    subtitle:
      "Contact us today for a free consultation. We serve businesses, residences, and events across Sangli and nearby regions.",
    primaryButton: "Get in Touch",
    secondaryButton: "Call Us Now",
  },
};