/**
 * Application route path constants.
 * Never hardcode route strings in components — always use ROUTES.
 */
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  GUARDS: "/guards",
  TEAM: "/team",
  CONTACT: "/contact",
  // Error pages
  FORBIDDEN: "/403",
  SERVER_ERROR: "/500",
  MAINTENANCE: "/maintenance",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
