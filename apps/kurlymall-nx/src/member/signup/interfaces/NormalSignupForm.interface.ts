import { SIGNUP_AGREE } from '../constants';

export const JOIN_ADDITIONAL = {
  RECOMMEND: 'RECOMMEND',
  NONE: 'NONE',
};

export type AdditionalType = typeof JOIN_ADDITIONAL[keyof typeof JOIN_ADDITIONAL];
export type GenderType = 'MALE' | 'FEMALE' | 'NONE';
export type InputEventType = { name: string; value: string };
export type TouchEventType = { name: string; value: boolean };

export const initialAgreedData = Object.assign(
  {
    TermsAgreeAll: {
      key: 'TermsAgreeAll',
      required: false,
      checked: false,
    },
    OptionalTermsOfSms: {
      key: 'OptionalTermsOfSms',
      required: false,
      checked: false,
    },
    OptionalTermsOfMailing: {
      key: 'OptionalTermsOfMailing',
      required: false,
      checked: false,
    },
  },
  ...SIGNUP_AGREE.map(({ key, required }) => {
    return { [key]: { key, required, checked: false } };
  }),
);

export interface NormalSignupFormInterface {
  memberId: string;
  password: string;
  passwordConfirm: string;
  name: string;
  email: string;
  // 휴대폰
  mobileNumber: string;
  authCode: string;
  // 주소
  numberAddress: string;
  roadAddress: string;
  subAddress: string;
  zoneCode: string;
  zipCode: string;
  baseAddressType: string;
  gender: GenderType;
  joinExtraInputType: AdditionalType;
  joinExtraInput: string;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  joinInflowType: 'PC_WEB' | 'MOBILE_WEB' | 'ANDROID' | 'IOS';
  inflowType: 'MOBILE_SHOP' | 'PC';
  agreed: {
    [key: string]: {
      key: string;
      required?: boolean;
      checked: boolean;
    };
  };
  isDuplicateCheckID: boolean;
  isDuplicateCheckEmail: boolean;
  isVerification: boolean;
  isAgreeOptionalTermsOfPrivacy: boolean;
  isAgreeOptionalTermsOfSms: boolean;
  isAgreeOptionalTermsOfMailing: boolean;
  isAgreeRequiredTermsCondition: boolean;
  isAgreeRequiredTermsOfPrivacy: boolean;
}

export type PostSignupFormInterface = Pick<
  NormalSignupFormInterface,
  | 'memberId'
  | 'password'
  | 'name'
  | 'email'
  | 'mobileNumber'
  | 'numberAddress'
  | 'roadAddress'
  | 'subAddress'
  | 'zoneCode'
  | 'zipCode'
  | 'baseAddressType'
  | 'gender'
  | 'joinInflowType'
  | 'inflowType'
  | 'isAgreeOptionalTermsOfPrivacy'
  | 'isAgreeOptionalTermsOfSms'
  | 'isAgreeOptionalTermsOfMailing'
  | 'isAgreeRequiredTermsCondition'
  | 'isAgreeRequiredTermsOfPrivacy'
> &
  Pick<Partial<NormalSignupFormInterface>, 'birthDay' | 'birthYear' | 'joinExtraInputType' | 'joinExtraInput'>;

export const initialFormValues: NormalSignupFormInterface = {
  memberId: '',
  password: '',
  passwordConfirm: '',
  name: '',
  email: '',
  mobileNumber: '',
  authCode: '',
  numberAddress: '',
  roadAddress: '',
  subAddress: '',
  zoneCode: '',
  zipCode: '',
  baseAddressType: '',
  gender: 'NONE',
  joinExtraInputType: 'NONE',
  joinExtraInput: '',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  joinInflowType: 'MOBILE_WEB',
  inflowType: 'MOBILE_SHOP',
  agreed: initialAgreedData,
  isDuplicateCheckID: false,
  isDuplicateCheckEmail: false,
  isVerification: false,
  isAgreeOptionalTermsOfPrivacy: false,
  isAgreeOptionalTermsOfSms: false,
  isAgreeOptionalTermsOfMailing: false,
  isAgreeRequiredTermsCondition: false,
  isAgreeRequiredTermsOfPrivacy: false,
};
