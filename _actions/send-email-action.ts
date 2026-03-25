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

      console.log("Contact form submission - propertySlug:", propertySlug);
      console.log("Contact form submission - property:", property);
      console.log("Contact form submission - name:", name);
      console.log("Contact form submission - email:", email);
      console.log("Contact form submission - phone:", phone);
      console.log("Contact form submission - message length:", message.length);

      if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
        console.log("Validation failed - missing required fields");
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
        console.log("Looking up facility email for slug:", propertySlug);
        const db = getFirestoreDb();
        const doc = await db
          .collection("facilitiesContent")
          .doc(propertySlug)
          .get();
        const facilityEmail = doc.data()?.general?.facilityEmail;
        console.log("Found facility email:", facilityEmail);
        if (facilityEmail) recipientEmail = facilityEmail;
        ccEmail = doc.data()?.general?.facilityEmailCC;
        console.log("Found CC email:", ccEmail);
      } else {
        console.log("No propertySlug provided, using fallback email");
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

      console.log("Sending email to:", recipientEmail, "CC:", ccEmail || "none");
      await transporter.sendMail(mailOptions);
      console.log("Email sent successfully");
      return { success: true };
    } else {
      console.error("Invalid form submission due to non-empty honeypot field");
      return { success: false, error: "Spam detected" };
    }
  } catch (error) {
    console.error("Error sending email:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    return { success: false, error: "Failed to send email" };
  }
}

export async function sendEmailWithActionState(
  prevState: any,
  formData: FormData,
): Promise<{ success: boolean; error?: string }> {
  return sendEmail(formData);
}
