import { isPC } from '../../../../util/window/getDevice';
import { RESOURCE_URL } from '../../../shared/configs/config';

export * from './querykeys';

export const RESULT_NOTICE = [
  '컬리멤버스 서비스는 결제 즉시 사용이 가능합니다.',
  '컬리멤버스 관련 정보 조회는 마이컬리 > 컬리멤버스 메뉴에서 확인 하실수 있습니다.',
  '서비스에 대한 문의가 있을 경우 1:1 문의에 남겨주시면 신속히 해결 해드리겠습니다.',
];

export const BORDER_RADIUS = isPC ? 3 : 6;

export const KURLY_PAY_ERROR_MESSAGE = '컬리페이 시스템 점검 중입니다.';

export const PAYMENT_TERMS_ID = {
  PERSONAL: 'termsPersonalAgreed',
  PAYMENT: 'termsPaymentAgreed',
  NORMAL: 'termsAgreed',
  MARKETING: 'marketingAgreed',
};
export type PaymentTermsId = typeof PAYMENT_TERMS_ID[keyof typeof PAYMENT_TERMS_ID];

export const PaymentTermsArray: {
  id: PaymentTermsId;
  label: string;
  required: boolean;
  link?: string;
  total?: boolean;
}[] = [
  {
    id: PAYMENT_TERMS_ID.PERSONAL,
    label: '개인정보 수집・이용 및 처리 동의',
    required: true,
    link: `${RESOURCE_URL}/json/terms/order/personal_info.html`,
  },
  {
    id: PAYMENT_TERMS_ID.PAYMENT,
    label: '전자지급 결제대행 서비스 이용약관 동의',
    required: true,
    link: `${RESOURCE_URL}/json/terms/order/electronic_payment_agent.html`,
  },
  {
    id: PAYMENT_TERMS_ID.NORMAL,
    label: '이용약관 및 유의사항 동의',
    required: true,
    link: `${RESOURCE_URL}/json/terms/members/members_terms_agree.html`,
  },
  {
    id: PAYMENT_TERMS_ID.MARKETING,
    label: '멤버십 혜택 및 프로모션 알림 동의(SMS)',
    total: false,
    required: false,
  },
];
