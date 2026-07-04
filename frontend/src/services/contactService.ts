import type { InquiryPayload, SubmitResponse } from "@/types";
import api from "./api";

export const contactService = {
  /**
   * Submits a contact or security consultation inquiry to the server API.
   */
  submitInquiry: async (inquiryData: InquiryPayload): Promise<SubmitResponse> => {
    try {
      const response = await api.post<SubmitResponse>("/contact", inquiryData);
      return response.data;
    } catch (error: any) {
      console.error("Error submitting contact inquiry:", error);
      throw new Error(
        error.response?.data?.message || "Failed to submit inquiry. Please try again."
      );
    }
  },
};

