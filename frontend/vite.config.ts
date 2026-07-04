import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "node:path";
import nodemailer from "nodemailer";

// Custom Vite plugin to handle SMTP contact requests locally
function smtpMiddlewarePlugin(env: Record<string, string>) {
  return {
    name: "smtp-middleware",
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url === "/api/contact" && req.method === "POST") {
          let body = "";
          req.on("data", (chunk: any) => {
            body += chunk;
          });
          req.on("end", async () => {
            res.setHeader("Content-Type", "application/json");
            try {
              const data = JSON.parse(body);
              const { fullName, email, phone, serviceType, message } = data;

              // Validate fields
              if (!fullName || !email || !phone || !serviceType || !message) {
                res.statusCode = 400;
                res.end(JSON.stringify({ success: false, message: "Missing required fields." }));
                return;
              }

              console.log("\n========================================");
              console.log("📨 NEW CONTACT INQUIRY RECEIVED:");
              console.log(`- Name: ${fullName}`);
              console.log(`- Email: ${email}`);
              console.log(`- Phone: ${phone}`);
              console.log(`- Service: ${serviceType}`);
              console.log(`- Message: ${message}`);
              console.log("========================================\n");

              const smtpEmail = env.VITE_SMTP_EMAIL;
              const smtpPassword = env.VITE_SMTP_PASSWORD;

              if (!smtpEmail || !smtpPassword) {
                console.warn("⚠️ SMTP credentials (VITE_SMTP_EMAIL / VITE_SMTP_PASSWORD) are not set in .env.");
                console.warn("📨 Mail printing mock summary to console instead of sending.");
                
                res.statusCode = 200;
                res.end(JSON.stringify({ 
                  success: true, 
                  message: "Inquiry received! (Dev mode: SMTP credentials not set, output logged to server console)" 
                }));
                return;
              }

              const host = env.VITE_SMTP_HOST || "smtp.gmail.com";
              const port = parseInt(env.VITE_SMTP_PORT || "587", 10);
              const secure = port === 465;

              const transporter = nodemailer.createTransport({
                host,
                port,
                secure,
                auth: {
                  user: smtpEmail,
                  pass: smtpPassword,
                },
              });

              const mailOptions = {
                from: `"${env.VITE_APP_NAME || "DSD Security"}" <${smtpEmail}>`,
                to: env.VITE_SMTP_TO_EMAIL || smtpEmail,
                replyTo: email,
                subject: `New Security Inquiry: ${serviceType} from ${fullName}`,
                text: `You have received a new contact submission:\n\n` +
                      `Name: ${fullName}\n` +
                      `Email: ${email}\n` +
                      `Phone: ${phone}\n` +
                      `Service Requested: ${serviceType}\n` +
                      `Message:\n${message}\n`,
                html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff;">
                    <h2 style="color: #1e3a8a; border-bottom: 2px solid #1e3a8a; padding-bottom: 10px;">New Consultation Inquiry</h2>
                    <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                      <tr>
                        <td style="padding: 8px; font-weight: bold; width: 30%; border-bottom: 1px solid #f0f0f0;">Client Name:</td>
                        <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;">${fullName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Email Address:</td>
                        <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}">${email}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Phone Number:</td>
                        <td style="padding: 8px; border-bottom: 1px solid #f0f0f0;"><a href="tel:${phone}">${phone}</a></td>
                      </tr>
                      <tr>
                        <td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #f0f0f0;">Service Requested:</td>
                        <td style="padding: 8px; border-bottom: 1px solid #f0f0f0; color: #1e3a8a; font-weight: bold;">${serviceType}</td>
                      </tr>
                    </table>
                    <div style="margin-top: 20px; padding: 15px; background-color: #f9fafb; border-left: 4px solid #1e3a8a; border-radius: 4px;">
                      <h4 style="margin-top: 0; margin-bottom: 8px; color: #374151;">Message Details:</h4>
                      <p style="margin: 0; color: #4b5563; line-height: 1.5; white-space: pre-wrap;">${message}</p>
                    </div>
                    <div style="margin-top: 30px; font-size: 11px; color: #9ca3af; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 15px;">
                      This email was automatically generated by the DSD Security Portal contact form.
                    </div>
                  </div>
                `
              };

              await transporter.sendMail(mailOptions);
              console.log("✅ SMTP Email sent successfully!");

              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, message: "Thank you for contacting us. Your message has been sent successfully." }));
            } catch (error: any) {
              console.error("❌ SMTP Error sending email:", error);
              res.statusCode = 500;
              res.end(JSON.stringify({ 
                success: false, 
                message: `Failed to send email via SMTP: ${error.message || error}` 
              }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [tailwindcss(), react(), smtpMiddlewarePlugin(env)],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
  };
});

