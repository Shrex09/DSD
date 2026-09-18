import nodemailer from "nodemailer";

/**
 * Shared contact-form mailer used by both the Vite dev server middleware
 * and the Vercel function (api/contact.ts) in production. Runs server-side only — SMTP
 * credentials must never be prefixed with VITE_ (that would bundle them).
 */

export const DEFAULT_RECIPIENT = "dsdsecurityservices@gmail.com";

export interface MailEnv {
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  CONTACT_TO_EMAIL?: string;
}

export interface InquiryResult {
  status: number;
  body: { success: boolean; message: string };
}

const FIELDS = ["fullName", "email", "phone", "serviceType", "message"] as const;
type Inquiry = Record<(typeof FIELDS)[number], string>;

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const parseInquiry = (raw: unknown): Inquiry | null => {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Record<string, unknown>;
  const inquiry = {} as Inquiry;
  for (const field of FIELDS) {
    const value = data[field];
    if (typeof value !== "string" || !value.trim() || value.length > 5000) return null;
    inquiry[field] = value.trim();
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) return null;
  return inquiry;
};

export async function sendInquiry(rawBody: string, env: MailEnv): Promise<InquiryResult> {
  let inquiry: Inquiry | null = null;
  try {
    inquiry = parseInquiry(JSON.parse(rawBody));
  } catch {
    // fall through to validation error
  }
  if (!inquiry) {
    return { status: 400, body: { success: false, message: "Missing or invalid fields." } };
  }

  if (!env.SMTP_USER || !env.SMTP_PASS) {
    console.error("SMTP_USER / SMTP_PASS are not configured — contact email not sent.");
    return { status: 500, body: { success: false, message: "Email service is not configured." } };
  }

  const port = parseInt(env.SMTP_PORT || "465", 10);
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
  });

  const { fullName, email, phone, serviceType, message } = inquiry;
  const h = {
    fullName: escapeHtml(fullName),
    email: escapeHtml(email),
    phone: escapeHtml(phone),
    serviceType: escapeHtml(serviceType),
    message: escapeHtml(message),
  };
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px;font-weight:bold;width:30%;border-bottom:1px solid #f0f0f0;">${label}</td>` +
    `<td style="padding:8px;border-bottom:1px solid #f0f0f0;">${value}</td></tr>`;

  try {
    await transporter.sendMail({
      from: `"DSD Security Website" <${env.SMTP_USER}>`,
      to: env.CONTACT_TO_EMAIL || DEFAULT_RECIPIENT,
      replyTo: `"${fullName.replace(/["\r\n]/g, "")}" <${email}>`,
      subject: `New Inquiry: ${serviceType} — ${fullName}`.replace(/[\r\n]/g, " "),
      text:
        `New contact form submission:\n\n` +
        `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n` +
        `Service Requested: ${serviceType}\n\nMessage:\n${message}\n`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;border:1px solid #e0e0e0;border-radius:8px;background:#ffffff;">
          <h2 style="color:#1e3a8a;border-bottom:2px solid #1e3a8a;padding-bottom:10px;">New Consultation Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;margin-top:15px;">
            ${row("Client Name:", h.fullName)}
            ${row("Email Address:", `<a href="mailto:${h.email}">${h.email}</a>`)}
            ${row("Phone Number:", `<a href="tel:${h.phone}">${h.phone}</a>`)}
            ${row("Service Requested:", `<strong style="color:#1e3a8a;">${h.serviceType}</strong>`)}
          </table>
          <div style="margin-top:20px;padding:15px;background:#f9fafb;border-left:4px solid #1e3a8a;border-radius:4px;">
            <h4 style="margin:0 0 8px;color:#374151;">Message:</h4>
            <p style="margin:0;color:#4b5563;line-height:1.5;white-space:pre-wrap;">${h.message}</p>
          </div>
          <p style="margin-top:30px;font-size:11px;color:#9ca3af;text-align:center;border-top:1px solid #e5e7eb;padding-top:15px;">
            Sent from the contact form on the DSD Security Services website. Reply to this email to respond to the client directly.
          </p>
        </div>`,
    });
    return { status: 200, body: { success: true, message: "Thank you! Your message has been sent." } };
  } catch (error) {
    console.error("SMTP error sending contact email:", error);
    return { status: 502, body: { success: false, message: "Could not send your message. Please call us directly." } };
  }
}
