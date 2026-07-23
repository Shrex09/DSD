/**
 * Company configuration type definitions.
 */

export interface CompanyContact {
  address: string;
  phone: string;
  phoneRaw: string;
  email: string;
  supportEmail: string;
  hours: string;
  officeHours: string;
}

export interface CompanySocials {
  instagram: string;
}

export interface CompanyLogos {
  light: string;
  dark: string;
  favicon: string;
}

export interface CompanyCTA {
  quote: string;
  call: string;
  consultation: string;
}

export interface CompanyConfig {
  name: string;
  shortName: string;
  tagline: string;
  foundedYear: number;
  description: string;
  contact: CompanyContact;
  socials: CompanySocials;
  logos: CompanyLogos;
  cta: CompanyCTA;
}
