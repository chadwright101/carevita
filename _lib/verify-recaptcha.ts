"use server";

interface RecaptchaResponse {
  success: boolean;
  error?: string;
  score?: number;
}

export const verifyRecaptchaToken = async (
  token: string
): Promise<RecaptchaResponse> => {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    return {
      success: false,
      error: "reCAPTCHA secret key not configured",
    };
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${secretKey}&response=${token}`,
      }
    );

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: "reCAPTCHA verification failed",
      };
    }

    if (data.score < 0.5) {
      return {
        success: false,
        error: "Low reCAPTCHA score",
        score: data.score,
      };
    }

    return {
      success: true,
      score: data.score,
    };
  } catch (error) {
    return {
      success: false,
      error: "reCAPTCHA verification request failed",
    };
  }
};
