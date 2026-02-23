"use server";

import nodemailer from "nodemailer";
import { contactEmailTemplate } from "@/_lib/utils/contact-email-template";
import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";

const propertyEmailMap: Record<string, string | undefined> = {
  "The Crescent": process.env.SMTP_SEND_TO_CRESCENT,
  "Eastlands Estate": process.env.SMTP_SEND_TO_EASTLANDS,
  "Serene Park Centre": process.env.SMTP_SEND_TO_SERENE,
  "Parsonage Street Home": process.env.SMTP_SEND_TO_PARSONAGE,
  "Hartland Estate": process.env.SMTP_SEND_TO_HARTLAND,
};

const propertyCcMap: Record<string, string | undefined> = {
  "The Crescent": undefined,
  "Eastlands Estate": process.env.SMTP_CC_EASTLANDS,
  "Serene Park Centre": process.env.SMTP_CC_SERENE,
  "Parsonage Street Home": process.env.SMTP_CC_PARSONAGE,
  "Hartland Estate": undefined,
};

const sanitizeInput = (input: string): string => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export async function sendEmail(
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  const honey = formData.get("_honey");
  const recaptchaToken = formData.get("recaptchaToken") as string;

  try {
    if (!honey || honey.toString().trim() === "") {
      if (!recaptchaToken) {
        return { success: false, error: "reCAPTCHA verification required" };
      }

      const recaptchaResult = await verifyRecaptchaToken(recaptchaToken);
      if (!recaptchaResult.success) {
        return {
          success: false,
          error: recaptchaResult.error || "reCAPTCHA verification failed",
        };
      }

      const name = sanitizeInput(formData.get("name")?.toString() || "");
      const email = sanitizeInput(formData.get("email")?.toString() || "");
      const phone = sanitizeInput(formData.get("phone")?.toString() || "");
      const message = sanitizeInput(formData.get("message")?.toString() || "");
      const property = formData.get("property")?.toString() || "";

      if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
        return {
          success: false,
          error: "All required fields must be filled",
        };
      }

      const emailHtmlContent = contactEmailTemplate({
        name,
        email,
        phone,
        message,
        property: property || undefined,
      });

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST as string,
        port: 587,
        secure: false,
        auth: {
          user: process.env.SMTP_USER as string,
          pass: process.env.SMTP_PASS as string,
        },
        requireTLS: true,
      });

      const recipientEmail = property
        ? propertyEmailMap[property]
        : "info@carevita.co.za";
      const ccEmail = property ? propertyCcMap[property] : undefined;

      const mailOptions = {
        from: process.env.SMTP_SEND_FROM as string,
        to: recipientEmail,
        ...(ccEmail && { cc: ccEmail }),
        subject: property
          ? "Website - Contact Form"
          : "Website - Business Portfolio Contact Form",
        replyTo: email,
        html: emailHtmlContent,
      };

      await transporter.sendMail(mailOptions);
      return { success: true };
    } else {
      console.error("Invalid form submission due to non-empty honeypot field");
      return { success: false, error: "Spam detected" };
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendEmailWithActionState(
  prevState: any,
  formData: FormData
): Promise<{ success: boolean; error?: string }> {
  return sendEmail(formData);
}
