import nodemailer from "nodemailer";
import type { Lead } from "@shared/schema";
import { brandName } from "@shared/config";

export class EmailService {
  private transporter;

  constructor() {
    // Configure nodemailer transport
    // For development, we'll use a test account (Ethereal)
    // For production, configure with real SMTP credentials
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      // Development: Create test account
      console.log("⚠️  Email service running in test mode (no SMTP configured)");
      console.log("   Set SMTP_HOST, SMTP_USER, SMTP_PASS for production email delivery");
      this.transporter = null;
    }
  }

  async sendNewLeadNotification(lead: Lead): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [TEST MODE] Would send new lead notification for:", lead.email);
      return;
    }

    const gymStaffEmail = process.env.GYM_STAFF_EMAIL || "admin@yourgym.com";

    const trialInfo = lead.wantsTrial === "yes" && lead.trialDate && lead.trialTime
      ? `
        <h3 style="color: #14B8A6;">Trial Session Booked</h3>
        <p><strong>Date:</strong> ${lead.trialDate}</p>
        <p><strong>Time:</strong> ${lead.trialTime}</p>
      `
      : `<p style="color: #94a3b8;"><em>Did not book trial session</em></p>`;

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #1e293b; border-radius: 8px; padding: 30px; }
    .header { border-bottom: 2px solid #14B8A6; padding-bottom: 20px; margin-bottom: 20px; }
    .logo { font-size: 24px; font-weight: bold; color: #14B8A6; }
    .lead-info { background: #334155; border-radius: 6px; padding: 20px; margin: 20px 0; }
    .field { margin: 10px 0; }
    .label { color: #94a3b8; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
    .value { color: #f8fafc; font-size: 16px; font-weight: 500; margin-top: 4px; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155; color: #94a3b8; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">💪 ${brandName}</div>
      <h2 style="color: #14B8A6; margin-top: 10px;">New Lead Captured!</h2>
    </div>

    <p>A new potential client has completed the qualification flow:</p>

    <div class="lead-info">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${lead.name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value">${lead.email}</div>
      </div>
      <div class="field">
        <div class="label">Phone</div>
        <div class="value">${lead.phone}</div>
      </div>
      <div class="field">
        <div class="label">Fitness Level</div>
        <div class="value">${lead.fitnessLevel}</div>
      </div>
      <div class="field">
        <div class="label">Main Goal</div>
        <div class="value">${lead.mainGoal}</div>
      </div>
      <div class="field">
        <div class="label">Timeline</div>
        <div class="value">${lead.timeline}</div>
      </div>
      <div class="field">
        <div class="label">Budget</div>
        <div class="value">${lead.budget}</div>
      </div>
    </div>

    ${trialInfo}

    <div class="footer">
      <p>Lead captured on ${new Date(lead.createdAt).toLocaleString()}</p>
      <p>View all leads in your <a href="${process.env.VITE_APP_URL || 'http://localhost:5000'}/admin" style="color: #14B8A6;">admin dashboard</a></p>
    </div>
  </div>
</body>
</html>
    `;

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || `"${brandName}" <noreply@yourgym.com>`,
        to: gymStaffEmail,
        subject: `🔥 New Lead: ${lead.name} - ${lead.mainGoal}`,
        html: emailHtml,
      });

      console.log(`✅ Sent new lead notification to ${gymStaffEmail}`);
    } catch (error) {
      console.error("❌ Failed to send email notification:", error);
      throw error;
    }
  }
}

export const emailService = new EmailService();
