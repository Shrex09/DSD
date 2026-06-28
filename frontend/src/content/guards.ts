import type { QualificationItem, TrainingCard, HiringStep, ContentHeader } from "@/types";

interface GuardsQualifications {
  badge: string;
  title: string;
  description: string;
  items: QualificationItem[];
}

interface GuardsTraining {
  badge: string;
  title: string;
  subtitle: string;
  cards: TrainingCard[];
}

interface GuardsHiring {
  badge: string;
  title: string;
  steps: HiringStep[];
}

interface GuardsProfessionalism {
  badge: string;
  title: string;
  description: string;
  rules: string[];
}

interface GuardsContent {
  header: ContentHeader;
  qualifications: GuardsQualifications;
  training: GuardsTraining;
  hiring: GuardsHiring;
  professionalism: GuardsProfessionalism;
}

export const GUARDS_CONTENT: GuardsContent = {
  header: {
    badge: "Security Personnel",
    title: "Vetted Protective Force",
    subtitle:
      "Learn about our rigorous guard recruitment, continuous de-escalation training, and the strict standards we maintain.",
  },

  qualifications: {
    badge: "Onboarding Criteria",
    title: "Vetting Protocols",
    description:
      "Unlike standard security agencies, we filter out over 85% of applicants. We maintain a zero-tolerance policy on security compliance.",
    items: [
      {
        id: "qual-1",
        title: "Clean Criminal Vetting",
        desc: "Full criminal history, DMV records, and credit checks conducted by federal background audit agencies.",
      },
      {
        id: "qual-2",
        title: "Mandatory Drug Screening",
        desc: "Strict pre-employment drug trials followed by randomized testing throughout their patrol tenure.",
      },
      {
        id: "qual-3",
        title: "Fitness & Reflex Trials",
        desc: "Physical endurance tests, stamina evaluations, and defensive reflex trials.",
      },
      {
        id: "qual-4",
        title: "De-escalation Capability",
        desc: "Vetting of conflict management, verbal mediation, and psychological de-escalation potential.",
      },
    ],
  },

  training: {
    badge: "Training Standards",
    title: "Continuous Field Instruction",
    subtitle:
      "DSD officers undergo mandatory training updates every six months, maintaining operational readiness across tactical and technical disciplines.",
    cards: [
      {
        id: "tr-1",
        icon: "UserCheck",
        title: "Conflict De-escalation",
        description:
          "Focuses on verbal containment, de-escalation cues, and de-fusing hostile trespassers without force.",
      },
      {
        id: "tr-2",
        icon: "Shield",
        title: "Tactical Post Orders",
        description:
          "Covers legal arrest limits, property boundaries, asset search rules, and restraint tactics.",
      },
      {
        id: "tr-3",
        icon: "Zap",
        title: "Medical Trauma Care",
        description:
          "Certified training in First Aid, CPR, AED operations, and immediate mass casualty containment.",
      },
      {
        id: "tr-4",
        icon: "Eye",
        title: "Operations Tech Systems",
        description:
          "Instruction in CCTV console monitoring, smart GPS checkpoint scanning, and digital incident logging.",
      },
    ],
  },

  hiring: {
    badge: "Recruitment Stages",
    title: "Our Selection Process",
    steps: [
      {
        num: "01",
        title: "Background Audits",
        description: "Fingerprint verification, license checks, and local police registry scans.",
      },
      {
        num: "02",
        title: "Psychological Screenings",
        description: "Evaluating situational judgment under severe stress or crisis triggers.",
      },
      {
        num: "03",
        title: "DSD Academy",
        description:
          "40 hours of rigorous physical drills, legal frameworks, and technology training.",
      },
      {
        num: "04",
        title: "Field Probation",
        description: "Vetted on active client sites under direct supervision of senior sergeants.",
      },
    ],
  },

  professionalism: {
    badge: "Standards of Conduct",
    title: "Professional Conduct Code",
    description:
      "Every officer maintains pristine uniform compliance, strict attendance, and polite, corporate-level client relations.",
    rules: [
      "Zero-tolerance policy on post negligence or unscheduled absences.",
      "Meticulous dress code (ironed shirts, polished boots, visible badge ID).",
      "Courteous, professional communication with visitors and client staff.",
      "Immediate, accurate digital logs of all vehicle movement and visitor entry.",
    ],
  },
};
