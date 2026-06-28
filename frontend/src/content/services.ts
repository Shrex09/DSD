import type { FaqItem, ContentHeader } from "@/types";

interface QuoteBanner {
  title: string;
  subtitle: string;
  primaryButton: string;
  secondaryButton: string;
}

interface FaqsContent {
  badge: string;
  title: string;
  items: FaqItem[];
}

interface ServicesContent {
  header: ContentHeader;
  faqs: FaqsContent;
  quoteBanner: QuoteBanner;
}

export const SERVICES_CONTENT: ServicesContent = {
  header: {
    badge: "Our Services",
    title: "Tailored Security Solutions",
    subtitle:
      "We offer commercial-grade defensive services designed to defend perimeters, mitigate loss, coordinate logistics, and respond to critical incidents 24/7.",
  },

  faqs: {
    badge: "Operations FAQ",
    title: "Frequently Asked Questions",
    items: [
      {
        id: "faq-1",
        question: "How quickly can security guards be deployed to our site?",
        answer:
          "For standard static services, deployment ranges between 24 to 48 hours following risk assessments and post-order agreement. For urgent emergency needs, our patrol dispatch can deploy officers within hours.",
      },
      {
        id: "faq-2",
        question: "What tracking software do you use for audits?",
        answer:
          "We use a cloud-based GPS Guard Tour system. Officers scan NFC tags at checkpoints on patrol routes. These generate automated timestamps, photos, and digital incident logs accessible via our client dashboard.",
      },
      {
        id: "faq-3",
        question: "Are your security officers armed or unarmed?",
        answer:
          "We provide both armed and unarmed officers. Armed personnel are strictly assigned to high-risk profiles, banks, executive protection, or tactical alarm response, requiring mandatory firearms qualifications and state permits.",
      },
      {
        id: "faq-4",
        question: "How do you handle supervisor site audits?",
        answer:
          "Field sergeants conduct unannounced site audits on every shift. They inspect uniforms, check logs, and run mock drills to ensure our personnel are alert and conforming to specific post orders.",
      },
    ],
  },

  quoteBanner: {
    title: "Need a Custom Security Assessment?",
    subtitle:
      "Our operations managers conduct site walkthroughs to audit perimeter vulnerabilities and build customized post orders.",
    primaryButton: "Request Free Site Audit",
    secondaryButton: "Download Service Catalog",
  },
};
