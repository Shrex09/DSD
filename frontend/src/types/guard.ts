/**
 * Guard profile type definitions.
 */

export interface GuardProfile {
  id: string;
  name: string;
  rank: string;
  badgeNumber: string;
  experience: string;
  specialties: string[];
  certifications: string[];
  image: string;
}
