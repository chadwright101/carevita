import {
  fetchGeneralEmail,
  fetchGeneralPhone,
  fetchAccountsEmail,
  fetchCrescentEmail,
  fetchCrescentPhone,
  fetchEastlandsEmail,
  fetchEastlandsPhone,
  fetchSereneEmail,
  fetchSerenePhone,
  fetchParsonageEmail,
  fetchParsonagePhone,
  fetchHartlandEmail,
  fetchHartlandPhone,
} from "@/_actions/contact-actions";

const emailFunctions = {
  general: fetchGeneralEmail,
  accounts: fetchAccountsEmail,
  crescent: fetchCrescentEmail,
  eastlands: fetchEastlandsEmail,
  serene: fetchSereneEmail,
  parsonage: fetchParsonageEmail,
  hartland: fetchHartlandEmail,
};

const phoneFunctions = {
  general: fetchGeneralPhone,
  crescent: fetchCrescentPhone,
  eastlands: fetchEastlandsPhone,
  serene: fetchSerenePhone,
  parsonage: fetchParsonagePhone,
  hartland: fetchHartlandPhone,
};

export const getEmailFetcher = (property: string) => {
  return emailFunctions[property as keyof typeof emailFunctions];
};

export const getPhoneFetcher = (property: string) => {
  return phoneFunctions[property as keyof typeof phoneFunctions];
};
