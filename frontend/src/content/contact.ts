import type { ContentHeader } from "@/types";

interface OfficeInfo {
  badge: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  officeHours: string;
}

interface FormContent {
  title: string;
  subtitle: string;
  successMessage: string;
  submitText: string;
}

interface ContactContent {
  header: ContentHeader;
  officeInfo: OfficeInfo;
  form: FormContent;
}

export const CONTACT_CONTENT: ContactContent = {
  header: {
    badge: "Contact Us",
    title: "Get in Touch",
    subtitle:
      "Reach out to our team for a free consultation. We'll get back to you within a few hours.",
  },

  officeInfo: {
    badge: "Our Office",
    title: "Headquarters",
    address: "Shop No. 1, Near Dandekar Hall, S.T. Colony, Vishrambag, Sangli – 416415",
    phone: "9665510514 / 8890488427",
    email: "dsd9665@gmail.com",
    hours: "24/7 Operations",
    officeHours: "Office: Mon – Sat, 9:00 AM – 6:00 PM",
  },

  form: {
    title: "Send Us a Message",
    subtitle: "Fill in the form and we'll get back to you shortly.",
    successMessage:
      "Thank you for reaching out. Our team will contact you within a few hours.",
    submitText: "Send Message",
  },
};