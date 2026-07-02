/**
 * Typed mirror of the CSS custom properties defined in variables.css.
 * Use these for any inline styles or JS-driven animations that need colour values.
 */

export const colors = {
  primary: "#0057FF",
  primaryLight: "#F2F7FF",
  primaryDark: "#0B2E6F",
  secondary: "#F4F8FF",
  secondaryDark: "#E2E8F0",
  accent: "#E5AC24",
  accentHover: "#CB971C",
  accentLight: "#FDF3D0",
  silver: "#B0ABA0",
  bgWhite: "#FFFFFF",
  bgLight: "#F8FAFC",
  footerBg: "#0B2E6F",
  textDark: "#2D3748",
  textMuted: "#5B6472",
  textLight: "#F8FAFC",
  textWhite: "#FFFFFF",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(0,0,0,0.05)",
  md: "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)",
  lg: "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
  gold: "0 10px 15px -3px rgba(212,175,55,0.15), 0 4px 6px -2px rgba(212,175,55,0.05)",
} as const;

export const fontFamily = {
  sans: '"Outfit", system-ui, -apple-system, sans-serif',
} as const;

export const borderRadius = {
  sm: "4px",
  md: "8px",
  lg: "16px",
  full: "9999px",
} as const;

export type ThemeColors = typeof colors;
export type ThemeShadows = typeof shadows;
