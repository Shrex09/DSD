import type { NavLink } from "@/types";
import { ROUTES } from "./routes";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", path: ROUTES.HOME },
  { label: "About Us", path: ROUTES.ABOUT },
  { label: "Services", path: ROUTES.SERVICES },
  { label: "Contact Us", path: ROUTES.CONTACT },
];

export const FOOTER_QUICK_LINKS: NavLink[] = [
  { label: "About Our Company", path: ROUTES.ABOUT },
  { label: "Security Services", path: ROUTES.SERVICES },
  { label: "Get In Touch", path: ROUTES.CONTACT },
];

export const FOOTER_SERVICES_LINKS: NavLink[] = [
  { label: "Static Security Guards", path: `${ROUTES.SERVICES}#security-guards` },
  { label: "Mobile Patrol Services", path: `${ROUTES.SERVICES}#patrol-services` },
  { label: "CCTV Remote Monitoring", path: `${ROUTES.SERVICES}#cctv-monitoring` },
  { label: "Special Event Security", path: `${ROUTES.SERVICES}#event-security` },
  { label: "Emergency Response", path: `${ROUTES.SERVICES}#emergency-response` },
];