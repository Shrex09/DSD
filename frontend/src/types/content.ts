/**
 * Content block type definitions used across page content constants.
 * These describe the shape of data objects in the content/ directory.
 */

/* ---- Home Page Content ---- */

export interface TrustIndicator {
  id: string;
  icon: string;
  badgeUpper: string;
  title: string;
  description: string;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  date?: string;
  source?: "google" | "manual";
}

export interface IndustryCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WhyChooseCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

/* ---- About Page Content ---- */

export interface CoreValueItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

/* ---- Guards Page Content ---- */

export interface QualificationItem {
  id: string;
  title: string;
  desc: string;
}

export interface TrainingCard {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface HiringStep {
  num: string;
  title: string;
  description: string;
}

/* ---- Services Page Content ---- */

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

/* ---- Shared ---- */

export interface ContentHeader {
  badge: string;
  title: string;
  subtitle: string;
}
