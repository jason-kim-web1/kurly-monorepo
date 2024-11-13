import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Alert from '../../../shared/components/Alert/Alert';
import { postPickupComplete } from '../../../shared/api/mypage/pickup-complete';
import { OrderDetail } from '../interface/OrderDetail';
import { ORDER_DETAIL_QUERY_KEYS } from '../constants/QueryKeys';

export default function usePickupCompleteMutation(groupOrderNo: OrderDetail['groupOrderNo']) {
  const queryClient = useQueryClient();

  return useMutation(() => postPickupComplete({ groupOrderNo }), {
    onSuccess: async () => {
      await Alert({ text: '픽업이 완료되었습니다.' });
    },
    onError: async (error: AxiosError) => {
      const message = error.response?.data.message;

      await Alert({ text: message });
    },
    onSettled: () => {
      queryClient.invalidateQueries(ORDER_DETAIL_QUERY_KEYS.DETAIL(groupOrderNo));
    },
  });
}
