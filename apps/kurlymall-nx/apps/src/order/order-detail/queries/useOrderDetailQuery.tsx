import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { Alert } from '@thefarmersfront/kpds-react';

import fetchOrderDetail from '../api/fetchOrderDetail';
import { ORDER_DETAIL_QUERY_KEYS } from '../constants/QueryKeys';
import { MYPAGE_PATH } from '../../../shared/constant';
import { isWebview } from '../../../../util/window/getDevice';
import appService from '../../../shared/services/app.service';

const useOrderDetailQuery = (groupOrderNo: number) => {
  const { replace } = useRouter();

  return useQuery({
    queryKey: ORDER_DETAIL_QUERY_KEYS.DETAIL(groupOrderNo),
    queryFn: () => fetchOrderDetail(groupOrderNo),
    retry: 0,
    cacheTime: 0,
    onError: async (error: AxiosError) => {
      await Alert({ contents: error.message, allowOutsideClick: false });

      if (isWebview()) {
        appService.closeWebview();
        return;
      }

      await replace(MYPAGE_PATH.orderList.uri);
    },
  });
};

export default useOrderDetailQuery;
