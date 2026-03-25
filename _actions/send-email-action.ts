"use server";

import nodemailer from "nodemailer";
import { contactEmailTemplate } from "@/_lib/utils/contact-email-template";
import { verifyRecaptchaToken } from "@/_lib/verify-recaptcha";
import { getFirestoreDb } from "@/_lib/firebase-admin";

const sanitizeInput = (input: string): string => {
  return input.replace(/</g, "&lt;").replace(/>/g, "&gt;");
};

export async function sendEmail(
  formData: FormData,
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
      const propertySlug = formData.get("propertySlug")?.toString() || "";

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

      let recipientEmail = "chad@bodymindzone.com";
      let ccEmail: string | undefined;
      if (propertySlug) {
        const db = getFirestoreDb();
        const doc = await db
          .collection("facilitiesContent")
          .doc(propertySlug)
          .get();
        const facilityEmail = doc.data()?.general?.facilityEmail;
        if (facilityEmail) recipientEmail = facilityEmail;
        ccEmail = doc.data()?.general?.facilityEmailCC;
      }

      const mailOptions: any = {
        from: process.env.SMTP_SEND_FROM as string,
        to: recipientEmail,
        subject: property
          ? "Website - Contact Form"
          : "Website - Business Portfolio Contact Form",
        replyTo: email,
        html: emailHtmlContent,
      };

      if (ccEmail) {
        mailOptions.cc = ccEmail;
      }

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
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  return sendEmail(formData);
}
