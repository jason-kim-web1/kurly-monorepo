import { GiftStatus } from '../../../../shared/constant';

export const GiftOrderStatusTextMap: Record<GiftStatus, string> = {
  READY_FOR_ACCEPT: '선물 수락 대기',
  REJECTED: '선물 거절',
  ACCEPTED: '선물 수락',
  DELIVERED: '선물 배송완료',
  CANCELED: '선물 취소완료',
};
