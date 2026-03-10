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
  "the-crescent": fetchCrescentEmail,
  "eastlands-estate": fetchEastlandsEmail,
  "serene-park-centre": fetchSereneEmail,
  "parsonage-street-home-for-the-aged": fetchParsonageEmail,
  "hartland-estate": fetchHartlandEmail,
};

const phoneFunctions = {
  general: fetchGeneralPhone,
  "the-crescent": fetchCrescentPhone,
  "eastlands-estate": fetchEastlandsPhone,
  "serene-park-centre": fetchSerenePhone,
  "parsonage-street-home-for-the-aged": fetchParsonagePhone,
  "hartland-estate": fetchHartlandPhone,
};

export const getEmailFetcher = (property: string) => {
  return emailFunctions[property as keyof typeof emailFunctions];
};

export const getPhoneFetcher = (property: string) => {
  return phoneFunctions[property as keyof typeof phoneFunctions];
};
