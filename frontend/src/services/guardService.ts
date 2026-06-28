import type { GuardProfile } from "@/types";

// import api from "./api";

/** Predefined mock guard profiles for local development */
const MOCK_GUARDS: GuardProfile[] = [];

export const guardService = {
  /**
   * Fetches active security personnel profiles.
   * Replace the mock implementation with the real API call when the backend is ready.
   */
  getGuardsList: async (): Promise<GuardProfile[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(MOCK_GUARDS);
      }, 1000);
    });

    /*
    // Production implementation:
    const response = await api.get("/guards/public-list");
    return response.data;
    */
  },
};
