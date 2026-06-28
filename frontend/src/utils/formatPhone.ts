/**
 * Strips all non-digit characters from a phone string.
 */
export const stripPhoneFormatting = (phone: string): string => {
  return phone.replace(/\D/g, "");
};

/**
 * Formats a raw phone number string for display.
 * Handles common Indian and US formats.
 *
 * @example
 * formatPhone("+91XXXXXXXXXX") → "+91 XXXXX XXXXX"
 */
export const formatPhone = (phone: string): string => {
  const digits = stripPhoneFormatting(phone);

  // Indian mobile: 91 + 10 digits
  if (digits.startsWith("91") && digits.length === 12) {
    return `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`;
  }

  // US format: 1 + 10 digits
  if (digits.startsWith("1") && digits.length === 11) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // Return as-is if no format matches
  return phone;
};
