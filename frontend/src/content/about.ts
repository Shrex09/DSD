import type { CoreValueItem, LeadershipMember } from "@/types";

interface StoryContent {
  badge: string;
  title: string;
  paragraphs: string[];
}

interface MissionVisionItem {
  title: string;
  description: string;
}

interface MissionVisionContent {
  mission: MissionVisionItem;
  vision: MissionVisionItem;
}

interface CoreValuesContent {
  badge: string;
  title: string;
  items: CoreValueItem[];
}

interface LeadershipContent {
  badge: string;
  title: string;
  members: LeadershipMember[];
}

interface CertificationsContent {
  badge: string;
  title: string;
  items: string[];
}

interface AboutContent {
  story: StoryContent;
  missionVision: MissionVisionContent;
  coreValues: CoreValuesContent;
  leadership: LeadershipContent;
  certifications: CertificationsContent;
}

export const ABOUT_CONTENT: AboutContent = {
  story: {
    badge: "Our Story",
    title: "A Legacy of Trust and Vigilance",
    paragraphs: [
      "DSD Security Services was established in 2018 in Vishrambag, Sangli, with a simple but powerful purpose — to provide reliable, professional security that people and businesses can truly count on.",
      "What started as a small team has grown into a trusted agency serving 500+ clients across Sangli and surrounding regions. We offer security guard services, bouncer services, and housekeeping — all delivered by trained, uniformed, and disciplined personnel.",
      "We remain committed to our founding principles: accountability, discipline, and genuine care for the safety of every client we serve.",
    ],
  },

  missionVision: {
    mission: {
      title: "Our Mission",
      description:
        "To provide honest, disciplined, and dependable security services that give our clients complete peace of mind — protecting their people, assets, and premises every single day.",
    },
    vision: {
      title: "Our Vision",
      description:
        "To be the most trusted security partner in Sangli and Maharashtra — known for professionalism, integrity, and a genuine commitment to the safety of every client we serve.",
    },
  },

  coreValues: {
    badge: "What Defines Us",
    title: "Our Core Values",
    items: [
      {
        id: "val-1",
        icon: "ShieldCheck",
        title: "Accountability",
        description:
          "We verify our patrols using real-time geofenced checkpoints and GPS logs, ensuring transparent security.",
      },
      {
        id: "val-2",
        icon: "UserCheck",
        title: "Discipline",
        description:
          "All officers adhere to post orders, maintain immaculate appearance standards, and undergo regular mock drills.",
      },
      {
        id: "val-3",
        icon: "Eye",
        title: "Vigilance",
        description:
          "Constant monitoring and proactive threat assessments allow us to intercept incidents before they escalate.",
      },
      {
        id: "val-4",
        icon: "Award",
        title: "Integrity",
        description:
          "We hold ourselves to strict ethical codes, protecting client confidentiality and providing honest incident logs.",
      },
    ],
  },

  leadership: {
    badge: "Executive Leadership",
    title: "Governed by Experienced Officers",
    members: [],
  },

  certifications: {
    badge: "Why Trust Us",
    title: "Built on Accountability",
    items: [
      "Licensed security agency operating in Maharashtra",
      "Trained & uniformed security personnel",
      "24/7 operations and rapid response capability",
      "Serving 500+ clients across Sangli and surrounding regions",
      "6+ years of professional security experience",
    ],
  },
};