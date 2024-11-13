import { useQuery } from '@tanstack/react-query';

import { fetchPickupRefundQR } from '../api/fetchPickupRefundQR';
import { ORDER_DETAIL_QUERY_KEYS } from '../constants/QueryKeys';

interface Props {
  orderNo: number;
  isQRPickupCompleted: boolean;
}

export function usePickupRefundQRQuery({ orderNo, isQRPickupCompleted }: Props) {
  return useQuery(ORDER_DETAIL_QUERY_KEYS.REFUND_QR(orderNo), () => fetchPickupRefundQR({ orderNo }), {
    enabled: isQRPickupCompleted && !!orderNo,
  });
}
