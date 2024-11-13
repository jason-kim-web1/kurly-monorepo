import { TermsPolicy } from '../../../order/shared/shared/constants/terms';
import { RESOURCE_URL, isProduction } from '../../../shared/configs/config';

type SuccessSignUpKeys = 'NEW_MEMBER_COUPON' | 'MY_KURLY_STYLE' | 'MY_PAGE';
type SuccessSignUpType = '신규회원 1만원 쿠폰 받기' | '나의 컬리 스타일 등록하기' | '마이페이지로 이동';

export const SUCCESS_SIGN_UP: Record<SuccessSignUpKeys, SuccessSignUpType> = {
  NEW_MEMBER_COUPON: '신규회원 1만원 쿠폰 받기',
  MY_KURLY_STYLE: '나의 컬리 스타일 등록하기',
  MY_PAGE: '마이페이지로 이동',
};

export const SIGNUP_TERMS_AGREE: TermsPolicy = {
  subject: '이용약관 동의',
  url: `${RESOURCE_URL}/json/terms/signup/signup_terms_agree${isProduction() ? '' : '_dev'}.html`,
  key: 'RequiredTermsCondition',
  required: true,
  code: 'UNKNOWN',
};

export const SIGNUP_PERSONAL_INFO_AGREE: TermsPolicy = {
  subject: '개인정보 수집∙이용 동의',
  url: `${RESOURCE_URL}/json/terms/signup/signup_personal_info_agree${isProduction() ? '' : '_dev'}.html`,
  key: 'RequiredTermsOfPrivacy',
  required: true,
  code: 'UNKNOWN',
};

export const SIGNUP_PERSONAL_INFO_AGREE_NOT_REQUIRED: TermsPolicy = {
  subject: '개인정보 수집∙이용 동의',
  url: `${RESOURCE_URL}/json/terms/signup/signup_personal_info_agree_not_required${isProduction() ? '' : '_dev'}.html`,
  key: 'OptionalTermsOfPrivacy',
  required: false,
  code: 'UNKNOWN',
};

const SIGNUP_EVENT_AGREE: TermsPolicy = {
  subject: '무료배송, 할인쿠폰 등 혜택/정보 수신 동의',
  url: '',
  key: 'SignupEventAll',
  required: false,
  code: 'UNKNOWN',
};

const SIGNUP_MINIMUM_AGE_AGREE: TermsPolicy = {
  subject: '본인은 만 14세 이상입니다.',
  url: '',
  key: 'RequiredSignupAge',
  required: true,
  code: 'UNKNOWN',
};

// 회원가입
export const SIGNUP_AGREE: TermsPolicy[] = [
  SIGNUP_TERMS_AGREE,
  SIGNUP_PERSONAL_INFO_AGREE,
  SIGNUP_PERSONAL_INFO_AGREE_NOT_REQUIRED,
  SIGNUP_EVENT_AGREE,
  SIGNUP_MINIMUM_AGE_AGREE,
];

// 회원가입 완료 페이지 버튼 텍스트
export const BTN_TEXT = {
  CONTINUE_SHOPPING: '쇼핑 이어가기',
  CHECK_BENEFITS: '웰컴 혜택 보러가기',
};

// 신규 회원가입 쿠폰 키 배열
export const couponKeyArray = [
  {
    key: 'e45d9dbd',
    date: '2024-11-01T10:59:59+09:00',
  },
  {
    key: '4fdd51a8',
    date: '2024-10-02T10:59:59+09:00',
  },
];
