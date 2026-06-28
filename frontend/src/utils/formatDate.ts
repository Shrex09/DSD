/**
 * Formats a date value into a human-readable string.
 *
 * @param date - A Date object or ISO 8601 date string
 * @param locale - BCP 47 locale string (defaults to "en-US")
 * @returns Formatted date string, e.g. "June 27, 2026"
 */
export const formatDate = (date: Date | string, locale = "en-US"): string => {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

/**
 * Formats a date value to a short representation.
 *
 * @returns Formatted date string, e.g. "Jun 27, 2026"
 */
export const formatDateShort = (date: Date | string, locale = "en-US"): string => {
  return new Date(date).toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
