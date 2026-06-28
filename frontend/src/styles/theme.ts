/**
 * Typed mirror of the CSS custom properties defined in variables.css.
 * Use these for any inline styles or JS-driven animations that need colour values.
 */

export const colors = {
  primary: "#0A1128",
  primaryLight: "#1C2541",
  primaryDark: "#000814",
  secondary: "#F4F5F7",
  secondaryDark: "#E2E8F0",
  accent: "#D4AF37",
  accentHover: "#AA800B",
  accentLight: "#F3E5AB",
  bgWhite: "#FFFFFF",
  bgLight: "#F8FAFC",
  textDark: "#1E293B",
  textMuted: "#64748B",
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
