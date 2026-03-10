import {
  fetchGeneralEmail,
  fetchGeneralPhone,
  fetchAccountsEmail,
  fetchFacilityEmail,
  fetchFacilityPhone,
} from "@/_actions/contact-actions";

export const getEmailFetcher = (property: string) => {
  if (property === "general") return fetchGeneralEmail;
  if (property === "accounts") return fetchAccountsEmail;
  return (recaptchaToken?: string) => fetchFacilityEmail(property, recaptchaToken);
};

export const getPhoneFetcher = (property: string) => {
  if (property === "general") return fetchGeneralPhone;
  return (recaptchaToken?: string) => fetchFacilityPhone(property, recaptchaToken);
};
