import {
  GIFT_CARD,
  MEMBER_NOT_CARD,
  MEMBER_CARD_WITH_TOSS_PAYMENTS,
  MEMBER_CARD_WITH_KURLYPAY,
  GIFT_NOT_CARD,
} from '../constants/terms';
import { OrderVendorCode } from '../interfaces';
import { isCreditCardPayments } from '../services';

interface Props {
  isGiftOrder: boolean;
  code?: OrderVendorCode;
  isUseAllPoint?: boolean;
}

export const getTermsList = ({ isGiftOrder, code, isUseAllPoint }: Props) => {
  const isCreditCard = isCreditCardPayments(code);

  if (isGiftOrder) {
    return isCreditCard ? GIFT_CARD : GIFT_NOT_CARD;
  }

  if (isCreditCard && !isUseAllPoint) {
    if (code === 'toss-payments') {
      return MEMBER_CARD_WITH_TOSS_PAYMENTS;
    }

    if (code === 'kurlypay-credit') {
      return MEMBER_CARD_WITH_KURLYPAY;
    }
  }

  return MEMBER_NOT_CARD;
};

export const getKurlyNoticeMessage = ({ isGiftOrder }: { isGiftOrder: boolean }) => {
  return [
    isGiftOrder
      ? '직접 주문취소는 ‘선물 수락 대기’ 상태에서만 가능합니다.'
      : '[주문완료] 상태일 경우에만 주문 취소 가능합니다.',
    '미성년자가 결제 시 법정대리인이 그 거래를 취소할 수 있습니다.',
    '배송 불가 시, 결제수단으로 환불됩니다. 일부 또는 전체 상품이 품절 등의 사유로 배송 되지 못할 경우, 신속하게 환불해 드리겠습니다.',
    '카카오페이, 토스, 네이버페이, 페이코 결제 시, 결제하신 수단으로만 환불됩니다.',
  ];
};
