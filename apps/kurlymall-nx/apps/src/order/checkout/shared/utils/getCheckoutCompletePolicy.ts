import { Notification, NotificationType } from '../../../gift/shared/interfaces/ReceiverForm.interface';
import {
  BASIC_POLICY,
  PICKUP_POLICY,
  KAKAO_TALK_GIFT_POLICY,
  SMS_GIFT_POLICY,
  NON_DELEIVERY_POLICY,
} from '../constants/order-success-policy';

/**
 * 주문 완료 페이지에서 노출 시킬 정책 문구를 구하는 함수.
 *
 * @param {boolean} param.hasPickupOrder - 픽업 주문서인지에 대한 true/false 값
 * @param {boolean} param.isDeliveryOrder - 무배송 상품 주문 여부
 * @param {boolean} param.hasGiftOrder - 선물하기 주문서 여부
 * @param {boolean} param.notificationType - 선물하기 주문서의 메세지 전송 타입 (SMS/KAKAO_TALK)
 *
 * @returns 주문 완료 정책 문구를 반환한다.
 */
export const getOrderSuccessPolicy = ({
  hasPickupOrder = false,
  isDeliveryOrder = true,
  hasGiftOrder = false,
  notificationType = Notification.KAKAO_TALK,
}: {
  hasPickupOrder?: boolean;
  isDeliveryOrder?: boolean;
  hasGiftOrder?: boolean;
  notificationType?: NotificationType;
}) => {
  if (hasPickupOrder) {
    return PICKUP_POLICY;
  }

  if (hasGiftOrder) {
    return notificationType === Notification.KAKAO_TALK ? KAKAO_TALK_GIFT_POLICY : SMS_GIFT_POLICY;
  }

  if (!isDeliveryOrder) {
    return NON_DELEIVERY_POLICY;
  }

  return BASIC_POLICY;
};
