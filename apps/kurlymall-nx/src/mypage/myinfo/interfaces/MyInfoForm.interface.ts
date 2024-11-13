import { MYINFO_AGREE } from '../../../order/shared/shared/constants/terms';

export type GenderType = 'MAN' | 'WOMAN' | 'NONE';

export const initialAgreedData = Object.assign(
  {
    OptionalTermsOfSms: {
      key: 'OptionalTermsOfSms',
      checked: false,
    },
    OptionalTermsOfMailing: {
      key: 'OptionalTermsOfMailing',
      checked: false,
    },
  },
  ...MYINFO_AGREE.map(({ key }) => {
    return { [key]: { key, checked: false } };
  }),
);

export interface MypageInfoForm {
  memberId: string;
  originalPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
  name: string;
  email: string;
  originalEmail: string;
  mobileNumber: string;
  authCode: string;
  gender: GenderType;
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  recommendId: string;
  eventName: string;
  modifyingToken: string;
  agreed: {
    [key: string]: {
      key: string;
      checked: boolean;
    };
  };
  isAgreeOptionalTermsOfPrivacy: boolean;
  isAgreeOptionalTermsOfSms: boolean;
  isAgreeOptionalTermsOfMailing: boolean;
  isDuplicateCheckEmail: boolean;
  isVerification: boolean;
  isVerifiedOriginalPassword: boolean;
}

export interface MypageInfoPasswordForm {
  password: string;
}

export const initialMypageInfoForm: MypageInfoForm = {
  memberId: '',
  originalPassword: '',
  newPassword: '',
  newPasswordConfirm: '',
  name: '',
  email: '',
  originalEmail: '',
  mobileNumber: '',
  authCode: '',
  gender: 'NONE',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  recommendId: '',
  eventName: '',
  modifyingToken: '',
  agreed: initialAgreedData,
  isAgreeOptionalTermsOfPrivacy: false,
  isAgreeOptionalTermsOfSms: false,
  isAgreeOptionalTermsOfMailing: false,
  isDuplicateCheckEmail: true,
  isVerification: true,
  isVerifiedOriginalPassword: true,
};

export type PostMypageInfoForm = Pick<
  MypageInfoForm,
  | 'name'
  | 'email'
  | 'mobileNumber'
  | 'gender'
  | 'isAgreeOptionalTermsOfPrivacy'
  | 'isAgreeOptionalTermsOfSms'
  | 'isAgreeOptionalTermsOfMailing'
  | 'modifyingToken'
> &
  Pick<Partial<MypageInfoForm>, 'originalPassword' | 'newPassword' | 'birthDay' | 'birthYear'>;

export interface MyInfoResponses {
  memberId: string;
  birthDay: string;
  birthYear: string;
  email: string;
  eventName: string;
  gender: GenderType;
  isAgreeOptionalTermsOfMailing: boolean;
  isAgreeOptionalTermsOfPrivacy: boolean;
  isAgreeOptionalTermsOfSms: boolean;
  mobileNumber: string;
  name: string;
  recommendId: string;
  modifyingToken: string;
}

type PayStatusType = 'LINKED' | 'UNLINKED';

export const PayStatusTextMap: Record<PayStatusType, string> = {
  LINKED: 'LINKED',
  UNLINKED: 'UNLINKED',
};

export interface PayStatusResponses {
  status: PayStatusType;
  token: string | null;
  merchantIdentifier: string | null;
  merchantMemberIdentifier: string | null;
}

export interface MembershipStatusResponses {
  possibleWithdrawal: boolean;
}

export interface UseServiceStatusResponses {
  kurlyPay: PayStatusResponses;
  membership: MembershipStatusResponses;
}
