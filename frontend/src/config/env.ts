/**
 * Typed environment configuration layer.
 * Components should import from this module instead of reading
 * import.meta.env directly to ensure type safety and a single source of truth.
 */

interface Env {
  readonly appName: string;
  readonly apiUrl: string;
  readonly googleMapsKey: string;
}

export const env: Env = {
  appName: import.meta.env.VITE_APP_NAME ?? "DSD Security Services",
  apiUrl: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api",
  googleMapsKey: import.meta.env.VITE_GOOGLE_MAPS_KEY ?? "",
};
