import { VendorCode } from '../../order/shared/shared/interfaces';
import { BenefitType } from './BenefitType';

export interface Coupon {
  benefitPrice: number;
  benefitSummary: string;
  benefitType: BenefitType;
  couponCode: number;
  creditCardId: null | string;
  description: string;
  expiredAt: string;
  name: string;
  paymentGateways: (VendorCode | 'ALL')[];
  pointAllowed: boolean;
  usable: boolean;
  // 쿠폰 중복 검증용 추가 인터페이스
  // TODO: 서버 데이터 내려올 경우 변경
  duplicateCoupons?: unknown[];
}
