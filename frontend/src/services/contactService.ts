import type { InquiryPayload, SubmitResponse } from "@/types";

// import api from "./api";

export const contactService = {
  /**
   * Submits a contact or security consultation inquiry.
   * Replace the mock implementation with the real API call when the backend is ready.
   */
  submitInquiry: async (inquiryData: InquiryPayload): Promise<SubmitResponse> => {
    // Log the payload in development
    console.log("Mock submit inquiry data:", inquiryData);

    // Simulate network latency for frontend development
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message:
            "Thank you for contacting us. Our security coordinator will review your request and get back to you shortly.",
        });
      }, 1500);
    });

    /*
    // Production implementation:
    const response = await api.post("/contact/inquiry", inquiryData);
    return response.data;
    */
  },
};
