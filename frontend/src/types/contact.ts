/**
 * Contact form and API response type definitions.
 */

export interface InquiryPayload {
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

export interface SubmitResponse {
  success: boolean;
  message: string;
}
