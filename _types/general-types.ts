export interface showContactProps {
  buttonClasses?: string;
  linkClasses?: string;
}

export interface ShowEmailAddressProps {
  buttonClasses?: string;
  linkClasses?: string;
  property: string;
  blackText?: boolean;
}

export interface ShowPhoneNumberProps {
  buttonClasses?: string;
  linkClasses?: string;
  property: string;
  blackText?: boolean;
}

export interface ActionResult<T = unknown> {
  success: boolean;
  error?: string;
  data?: T;
}
