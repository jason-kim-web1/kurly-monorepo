import { DeliveryCompleteMessage } from '../../../../shared/enums';

export const alertTime: Record<DeliveryCompleteMessage, string> = {
  IMMEDIATELY: '배송 직후',
  AM7: '아침 7시',
  AM8: '아침 8시',
};
