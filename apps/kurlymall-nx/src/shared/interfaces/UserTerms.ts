export type UserTermsType = 'privacyPolicy' | 'agreement';

export type UserTerms = Array<{
  title: string;
  majorVersion: number;
  minorVersion: number;
  url: string;
}>;

export interface UserTermsDetails {
  title: string;
  editor: string;
  editDate: string;
  content: string;
}

export enum SellerType {
  ALCOHOL_DEFAULT = 'ALCOHOL_DEFAULT',
  ALCOHOL = 'ALCOHOL',
  SHIPPING = 'SHIPPING',
  TRAVEL = 'TRAVEL',
  AIRLINE = 'AIRLINE',
  CULTURE = 'CULTURE',
  PICKUP = 'PICKUP',
  AS = 'AS',
}
export interface TargetTerms {
  url: string;
  key: string;
}
export interface TermsInfo {
  names: string[] | string;
  type: SellerType;
}

export interface ThirdPartTermsContentType {
  type: string;
  items: string[];
  purpose: string;
}

export interface MemberPartners {
  partnerStoreName: string;
  businessType: string;
}
