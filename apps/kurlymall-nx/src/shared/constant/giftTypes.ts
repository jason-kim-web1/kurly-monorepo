import { GiftOrderStatus } from '../../mypage/gift/shared/enum/GiftOrderStatus.enum';
import { TermsAgreements } from '../interfaces';

export type GiftStatus = keyof typeof GiftOrderStatus;

export type GiftMethod = 'KAKAO_TALK' | 'SMS';

/**
 * 딜 상품
 * - dealProductNo 딜 상품번호
 * - dealProductName 딜 상품명
 * - dealProductImageUrl 딜 상품 이미지
 * - contentProductName 컨텐츠 상품명
 * - quantity 수량
 */
export interface DealProducts {
  dealProductNo: number;
  dealProductName: string;
  dealProductImageUrl: string;
  productVerticalSmallUrl: string;
  contentProductName: string;
  quantity: number;
}

export interface ReceiveInfo {
  externalOrderNo: string;
  orderNo: number;
  ordererName: string;
  recipientName: string;
  status: GiftStatus;
  dealProducts: DealProducts;
  message: string;
  giftSentDateTime: number | null;
  availableDate: string;
  giftAcceptedDateTime: number | null;
  giftCanceledDateTime: number | null;
  giftRejectedDateTime: number | null;
}

export interface AcceptInfo {
  // 선물수신인 명
  name: string;
  // 선물수신인 전화번호
  phoneNumber: string;
  // 선물 수신 주소
  address: string;
  // 선물 수신 주소 상세
  addressDetail: string;
  // 메모
  memo?: string;
  // 약관 동의 정보
  termsAgreements: TermsAgreements[];
}
