import nodemailer from "nodemailer";

// Logo URL for emails
const LOGO_URL = "https://african-leaders-hub.vercel.app/_next/image?url=%2Fafrican-leaders-hub-logo.png&w=128&q=75";

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  organization?: string;
  message: string;
  newsletter?: boolean;
}

export interface VolunteerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  skills: string;
  interest: string;
  availability: string;
  motivation: string;
}

export interface PartnershipFormData {
  orgName: string;
  orgType: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  orgLocation: string;
  orgDescription: string;
  partnershipInterest: string;
  partnershipGoals: string;
}

// Email footer template function - returns footer HTML with current year evaluated dynamically
function getEmailFooter(): string {
  return `
  <div class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <p><strong>Email:</strong> <a href="mailto:africanleadershub@gmail.com" style="color: #8B4513; text-decoration: none;">africanleadershub@gmail.com</a></p>
        <p><strong>Phone:</strong> <a href="tel:+250788358891" style="color: #8B4513; text-decoration: none;">+250 788 358 891</a></p>
        <p><strong>Location:</strong> Kigali, Rwanda</p>
      </div>
      <div class="footer-section">
        <p>
          <a href="https://twitter.com/A_LeadersHub" target="_blank" rel="noopener noreferrer" style="color: #8B4513; text-decoration: none; margin-right: 15px;">Twitter</a>
          <a href="https://www.linkedin.com/company/african-leaders-hub" target="_blank" rel="noopener noreferrer" style="color: #8B4513; text-decoration: none; margin-right: 15px;">LinkedIn</a>
          <a href="https://www.instagram.com/a_leadershub/" target="_blank" rel="noopener noreferrer" style="color: #8B4513; text-decoration: none;">Instagram</a>
        </p>
      </div>
      <div class="footer-bottom">
        <p>&copy; ${new Date().getFullYear()} African Leaders Hub. All rights reserved.</p>
        <p>Building Africa's Future through People, Purpose, and Possibility</p>
      </div>
    </div>
  </div>
`;
}

// Send confirmation email to user
export async function sendConfirmationEmail(
  to: string,
  formType: "contact" | "volunteer" | "partnership",
  name: string
) {
  const subject =
    formType === "contact"
      ? "Thank you for contacting African Leaders Hub"
      : formType === "volunteer"
      ? "Thank you for your volunteer application"
      : "Thank you for your partnership inquiry";

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background-color: #ffffff; padding: 30px 20px; text-align: center; border-bottom: 3px solid #8B4513; }
          .logo-container { background-color: #ffffff; padding: 20px; display: inline-block; }
          .logo-container img { max-width: 200px; height: auto; display: block; }
          .content { padding: 30px 20px; background-color: #ffffff; }
          .footer { background-color: #f9f9f9; padding: 30px 20px; border-top: 2px solid #e0e0e0; }
          .footer-content { max-width: 560px; margin: 0 auto; }
          .footer-section { margin-bottom: 20px; text-align: center; }
          .footer-section h3 { color: #8B4513; margin-bottom: 10px; font-size: 16px; }
          .footer-section p { margin: 5px 0; color: #666; font-size: 14px; }
          .footer-bottom { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
          .footer-bottom p { margin: 5px 0; color: #999; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo-container">
              <img src="${LOGO_URL}" alt="African Leaders Hub Logo" />
            </div>
          </div>
          <div class="content">
            <p>Dear ${name},</p>
            <p>Thank you for reaching out to African Leaders Hub!</p>
            <p>We have received your ${
              formType === "contact"
                ? "message"
                : formType === "volunteer"
                ? "volunteer application"
                : "partnership inquiry"
            } and will review it shortly. Our team will get back to you as soon as possible.</p>
            <p>We appreciate your interest in our mission to empower Africa's future leaders.</p>
            <p>Best regards,<br>The African Leaders Hub Team</p>
          </div>
          ${getEmailFooter()}
        </div>
      </body>
    </html>
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
}

// Send notification email to admin
export async function sendNotificationEmail(
  formType: "contact" | "volunteer" | "partnership",
  formData: ContactFormData | VolunteerFormData | PartnershipFormData
) {
  const adminEmail = process.env.ADMIN_EMAIL ?? "africanleadershub@gmail.com";

  let subject: string;
  let html: string;

  if (formType === "contact") {
    const data = formData as ContactFormData;
    subject = `New Contact Form Submission: ${data.subject}`;
    html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background-color: #ffffff; padding: 30px 20px; text-align: center; border-bottom: 3px solid #8B4513; }
            .logo-container { background-color: #ffffff; padding: 20px; display: inline-block; }
            .logo-container img { max-width: 200px; height: auto; display: block; }
            .header h1 { color: #8B4513; margin-top: 15px; margin-bottom: 0; }
            .content { padding: 30px 20px; background-color: #ffffff; }
            .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0; }
            .field:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #8B4513; margin-bottom: 5px; }
            .value { margin-top: 5px; color: #666; }
            .footer { background-color: #f9f9f9; padding: 30px 20px; border-top: 2px solid #e0e0e0; }
            .footer-content { max-width: 560px; margin: 0 auto; }
            .footer-section { margin-bottom: 20px; text-align: center; }
            .footer-section h3 { color: #8B4513; margin-bottom: 10px; font-size: 16px; }
            .footer-section p { margin: 5px 0; color: #666; font-size: 14px; }
            .footer-bottom { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
            .footer-bottom p { margin: 5px 0; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-container">
                <img src="${LOGO_URL}" alt="African Leaders Hub Logo" />
              </div>
              <h1>New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.firstName} ${data.lastName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              ${
                data.phone
                  ? `
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${data.subject}</div>
              </div>
              ${
                data.organization
                  ? `
              <div class="field">
                <div class="label">Organization:</div>
                <div class="value">${data.organization}</div>
              </div>
              `
                  : ""
              }
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${data.message.replace(/\n/g, "<br>")}</div>
              </div>
              ${
                data.newsletter
                  ? `
              <div class="field">
                <div class="label">Newsletter Subscription:</div>
                <div class="value">Yes</div>
              </div>
              `
                  : ""
              }
            </div>
            ${getEmailFooter()}
          </div>
        </body>
      </html>
    `;
  } else if (formType === "volunteer") {
    const data = formData as VolunteerFormData;
    subject = "New Volunteer Application";
    html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background-color: #ffffff; padding: 30px 20px; text-align: center; border-bottom: 3px solid #8B4513; }
            .logo-container { background-color: #ffffff; padding: 20px; display: inline-block; }
            .logo-container img { max-width: 200px; height: auto; display: block; }
            .header h1 { color: #8B4513; margin-top: 15px; margin-bottom: 0; }
            .content { padding: 30px 20px; background-color: #ffffff; }
            .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0; }
            .field:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #8B4513; margin-bottom: 5px; }
            .value { margin-top: 5px; color: #666; }
            .footer { background-color: #f9f9f9; padding: 30px 20px; border-top: 2px solid #e0e0e0; }
            .footer-content { max-width: 560px; margin: 0 auto; }
            .footer-section { margin-bottom: 20px; text-align: center; }
            .footer-section h3 { color: #8B4513; margin-bottom: 10px; font-size: 16px; }
            .footer-section p { margin: 5px 0; color: #666; font-size: 14px; }
            .footer-bottom { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
            .footer-bottom p { margin: 5px 0; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-container">
                <img src="${LOGO_URL}" alt="African Leaders Hub Logo" />
              </div>
              <h1>New Volunteer Application</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Name:</div>
                <div class="value">${data.firstName} ${data.lastName}</div>
              </div>
              <div class="field">
                <div class="label">Email:</div>
                <div class="value">${data.email}</div>
              </div>
              <div class="field">
                <div class="label">Phone:</div>
                <div class="value">${data.phone}</div>
              </div>
              <div class="field">
                <div class="label">Location:</div>
                <div class="value">${data.location}</div>
              </div>
              <div class="field">
                <div class="label">Skills & Experience:</div>
                <div class="value">${data.skills.replace(/\n/g, "<br>")}</div>
              </div>
              <div class="field">
                <div class="label">Area of Interest:</div>
                <div class="value">${data.interest}</div>
              </div>
              <div class="field">
                <div class="label">Availability:</div>
                <div class="value">${data.availability.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
              <div class="field">
                <div class="label">Motivation:</div>
                <div class="value">${data.motivation.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
            </div>
            ${getEmailFooter()}
          </div>
        </body>
      </html>
    `;
  } else {
    const data = formData as PartnershipFormData;
    subject = "New Partnership Inquiry";
    html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
            .header { background-color: #ffffff; padding: 30px 20px; text-align: center; border-bottom: 3px solid #8B4513; }
            .logo-container { background-color: #ffffff; padding: 20px; display: inline-block; }
            .logo-container img { max-width: 200px; height: auto; display: block; }
            .header h1 { color: #8B4513; margin-top: 15px; margin-bottom: 0; }
            .content { padding: 30px 20px; background-color: #ffffff; }
            .field { margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f0f0f0; }
            .field:last-child { border-bottom: none; }
            .label { font-weight: bold; color: #8B4513; margin-bottom: 5px; }
            .value { margin-top: 5px; color: #666; }
            .footer { background-color: #f9f9f9; padding: 30px 20px; border-top: 2px solid #e0e0e0; }
            .footer-content { max-width: 560px; margin: 0 auto; }
            .footer-section { margin-bottom: 20px; text-align: center; }
            .footer-section h3 { color: #8B4513; margin-bottom: 10px; font-size: 16px; }
            .footer-section p { margin: 5px 0; color: #666; font-size: 14px; }
            .footer-bottom { text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
            .footer-bottom p { margin: 5px 0; color: #999; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo-container">
                <img src="${LOGO_URL}" alt="African Leaders Hub Logo" />
              </div>
              <h1>New Partnership Inquiry</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Organization Name:</div>
                <div class="value">${data.orgName}</div>
              </div>
              <div class="field">
                <div class="label">Organization Type:</div>
                <div class="value">${data.orgType}</div>
              </div>
              <div class="field">
                <div class="label">Contact Person:</div>
                <div class="value">${data.contactName}</div>
              </div>
              <div class="field">
                <div class="label">Contact Email:</div>
                <div class="value">${data.contactEmail}</div>
              </div>
              <div class="field">
                <div class="label">Contact Phone:</div>
                <div class="value">${data.contactPhone}</div>
              </div>
              <div class="field">
                <div class="label">Organization Location:</div>
                <div class="value">${data.orgLocation}</div>
              </div>
              <div class="field">
                <div class="label">Organization Description:</div>
                <div class="value">${data.orgDescription.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
              <div class="field">
                <div class="label">Partnership Interest:</div>
                <div class="value">${data.partnershipInterest.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
              <div class="field">
                <div class="label">Partnership Goals:</div>
                <div class="value">${data.partnershipGoals.replace(
                  /\n/g,
                  "<br>"
                )}</div>
              </div>
            </div>
            ${getEmailFooter()}
          </div>
        </body>
      </html>
    `;
  }

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: adminEmail,
    subject,
    html,
  });
}
