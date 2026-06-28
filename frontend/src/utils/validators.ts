/**
 * Returns true if the string contains a valid email address format.
 */
export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
};

/**
 * Returns true if the string contains a plausible phone number (7–15 digits with optional formatting).
 */
export const isValidPhone = (phone: string): boolean => {
  return /^\+?[\d\s\-(). ]{7,20}$/.test(phone.trim());
};

/**
 * Returns true if the trimmed string is not empty.
 */
export const isNotEmpty = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Returns true if the string meets a minimum character length after trimming.
 */
export const hasMinLength = (value: string, min: number): boolean => {
  return value.trim().length >= min;
};
