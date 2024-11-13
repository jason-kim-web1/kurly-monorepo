import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { isUndefined } from 'lodash';

import { orderCheckoutKeys } from '../../../../../mypage/order/shared/util/queryKeys';
import { fetchCheckoutAddress, removeHyphen } from '../../../../../shared/services';

import { CHECKOUT_PATH } from '../../../../../shared/constant';
import { ReceiverInfo } from '../../interfaces';
import { setValue } from '../../reducers/checkout.slice';
import { checkoutError } from '../../reducers/checkoutErrors';
import { useAppSelector } from '../../../../../shared/store';

export default function useCheckoutAddressQuery() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const orderType = useAppSelector(({ checkout }) => checkout.orderType);

  const dispatch = useDispatch();

  const receiverInfo = queryClient.getQueryData<ReceiverInfo>(orderCheckoutKeys.orderer());

  return useQuery(orderCheckoutKeys.checkoutAddress(), () => fetchCheckoutAddress(orderType), {
    enabled: !!receiverInfo && !isUndefined(orderType),
    cacheTime: 0,
    refetchOnMount: 'always',
    onSuccess: (response) => {
      const isShowReceiverDetailsPage = router.pathname.includes(CHECKOUT_PATH.address.uri);

      // 최초 배송 요청사항 클릭시 수신인이 없을 때
      if (isShowReceiverDetailsPage && !response.name && !response.phone) {
        if (receiverInfo?.name && receiverInfo?.phone) {
          dispatch(
            setValue({
              receiverForm: {
                ...response,
                name: receiverInfo.name,
                phone: removeHyphen(receiverInfo.phone),
              },
            }),
          );
        }
      } else {
        dispatch(setValue({ receiverForm: response }));
      }
    },
    onError: (err) => {
      dispatch(checkoutError(err as Error));
    },
  });
}
