import { RESOURCE_URL } from '../../../../shared/configs/config';
import { TermsType } from '../../../../shared/interfaces';

// 약관 리스트
export interface TermsPolicy {
  subject: string;
  url: string;
  key: string;
  code: TermsType;
  required?: boolean;
}

// 주문서 약관 코드 확인
// https://kurly0521.atlassian.net/wiki/spaces/CMS/pages/3150185608
const PERSONAL_INFO_AGREE: TermsPolicy = {
  subject: '개인정보 수집∙이용 및 처리 동의',
  url: `${RESOURCE_URL}/json/terms/order/personal_info.html`,
  key: 'personal-info',
  code: 'M01',
};

const ELECTRONIC_PAYMENT_AGENT_AGREE: TermsPolicy = {
  subject: '전자지급 결제대행 서비스 이용약관 동의',
  url: `${RESOURCE_URL}/json/terms/order/electronic_payment_agent.html`,
  key: 'electronic-payment-agent',
  code: 'M04',
};

const TOSS_PAYMENT_AGENT_AGREE: TermsPolicy = {
  subject: '결제대행 서비스 약관 동의',
  url: `${RESOURCE_URL}/json/terms/order/payment_agent.html`,
  key: 'payment-agent',
  code: 'M03',
};

export const KURLYPAY_PAYMENT_AGENT_AGREE: TermsPolicy = {
  subject: '결제대행 서비스 약관 동의',
  url: `${RESOURCE_URL}/json/terms/order/kurlypay_payment_agent.html`,
  key: 'payment-agent',
  code: 'M03',
};

export const PERSONAL_INFO_THIRD_PARTIES_AGREE: TermsPolicy = {
  subject: '개인정보 제3자 제공 동의',
  url: `${RESOURCE_URL}/json/terms/order/personal_info_third_party.html`,
  key: 'personal-info-third-party',
  code: 'M02',
};

// 약관_선물 주문자
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PERSONAL_INFO_AGREE_GIFT_ORDERER: TermsPolicy = {
  subject: '개인정보 수집∙이용 및 처리 동의',
  url: `${RESOURCE_URL}/json/terms/gift/personal_info_orderer.html`,
  key: 'personal-info',
  code: 'M05',
};

// 약관_선물 수신자
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PERSONAL_INFO_AGREE_GIFT_RECEIVER: TermsPolicy = {
  subject: '개인정보 수집∙이용 및 처리 동의',
  url: `${RESOURCE_URL}/json/terms/gift/personal_info_receiver.html`,
  key: 'personal-info',
  code: 'M06',
};

// 대량 주문 문의
export const BULK_ORDER_AGREE: TermsPolicy = {
  subject: '개인정보 수집∙이용 동의',
  url: `${RESOURCE_URL}/json/terms/mypage/bulkorder_personal_info_agree.html`,
  key: 'bulk-order-agree',
  code: 'UNKNOWN',
};

// 개인 정보 수정
export const MYINFO_PERSONAL_INFO_AGREE: TermsPolicy = {
  subject: '개인정보 수집∙이용 동의',
  url: `${RESOURCE_URL}/json/terms/mypage/myinfo_personal_agree.html`,
  key: 'OptionalTermsOfPrivacy',
  required: false,
  code: 'UNKNOWN',
};

export const MYINFO_EVENT_AGREE: TermsPolicy = {
  subject: '무료배송, 할인쿠폰 등 혜택/정보 수신 동의',
  url: '',
  key: 'SignupEventAll',
  required: false,
  code: 'UNKNOWN',
};

// (회원)
export const MEMBER_BASIC: TermsPolicy[] = [PERSONAL_INFO_AGREE, PERSONAL_INFO_THIRD_PARTIES_AGREE];

// (회원) 선물하기 - 신용카드 제외 나머지 수단 결제 시
export const GIFT_NOT_CARD: TermsPolicy[] = [PERSONAL_INFO_AGREE, ELECTRONIC_PAYMENT_AGENT_AGREE];

// (회원) 선물하기 - 신용카드 결제
export const GIFT_CARD: TermsPolicy[] = [
  PERSONAL_INFO_AGREE,
  KURLYPAY_PAYMENT_AGENT_AGREE,
  ELECTRONIC_PAYMENT_AGENT_AGREE,
];

export const MEMBER_NOT_CARD: TermsPolicy[] = [...MEMBER_BASIC, ELECTRONIC_PAYMENT_AGENT_AGREE];

export const MEMBER_CARD_WITH_TOSS_PAYMENTS: TermsPolicy[] = [
  ...MEMBER_BASIC,
  TOSS_PAYMENT_AGENT_AGREE,
  ELECTRONIC_PAYMENT_AGENT_AGREE,
];

export const MEMBER_CARD_WITH_KURLYPAY: TermsPolicy[] = [
  ...MEMBER_BASIC,
  KURLYPAY_PAYMENT_AGENT_AGREE,
  ELECTRONIC_PAYMENT_AGENT_AGREE,
];

// 개인 정보 수정
export const MYINFO_AGREE: TermsPolicy[] = [MYINFO_PERSONAL_INFO_AGREE, MYINFO_EVENT_AGREE];
