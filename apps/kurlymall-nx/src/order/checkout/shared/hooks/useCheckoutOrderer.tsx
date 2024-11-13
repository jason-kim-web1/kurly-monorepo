import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { useDispatch } from 'react-redux';

import { ValidationError } from 'yup';

import { orderCheckoutKeys } from '../../../../mypage/order/shared/util/queryKeys';

import { useAppSelector } from '../../../../shared/store';

import { ReceiverInfo } from '../interfaces';
import { getOrderer } from '../services/member.service';
import { ReformattedError } from '../../../../shared/errors/ReformattedError';
import { notify, notifyAndRedirectTo } from '../../../../shared/reducers/page';
import { MYPAGE_PATH } from '../../../../shared/constant';

export default function useCheckoutOrderer(): UseQueryResult<ReceiverInfo> {
  const dispatch = useDispatch();

  const hasSession = useAppSelector(({ auth }) => auth.hasSession);

  return useQuery(orderCheckoutKeys.orderer(), getOrderer, {
    enabled: !!hasSession,
    onError: (err: Error) => {
      // 주문자 정보의 허용 불가능 문자열 수정 처리
      const { errorMessage } = JSON.parse(err.message);

      if (err instanceof ReformattedError || err instanceof ValidationError) {
        dispatch(
          notifyAndRedirectTo({
            message: errorMessage,
            redirectUrl: MYPAGE_PATH.myInfo.uri,
          }),
        );

        return;
      }

      dispatch(notify(err.message));
    },
  });
}
