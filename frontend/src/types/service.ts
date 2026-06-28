/**
 * Service-related type definitions.
 */

export interface ServiceCatalogItem {
  id: string;
  title: string;
  shortDescription: string;
  imageBg: string;
  category: "security" | "bouncer" | "housekeeping" | string;
  slug: string;
}

export interface ServicePreviewCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  linkTo: string;
}
