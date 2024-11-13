import { useDispatch } from 'react-redux';

import { useCallback } from 'react';

import { postRestockedNotification } from '../../../shared/api/product/restock';
import { notify } from '../../../shared/reducers/page';
import { useAppSelector } from '../../../shared/store';
import { amplitudeService } from '../../../shared/amplitude';
import { RestockAlarmSuccess } from '../../../shared/amplitude/events/product/RestockAlarmSuccess';
import type { DealProduct } from '../types';

export default function useRestockNotification() {
  const productDetailState = useAppSelector(({ productDetail }) => productDetail);
  const dispatch = useDispatch();

  const subscribe = useCallback(
    async (deal: DealProduct) => {
      const { no: dealProductNo } = deal;
      try {
        await postRestockedNotification({
          contentProductNo: productDetailState.no,
          dealProductNo,
        });

        amplitudeService.logEvent(
          new RestockAlarmSuccess({
            productDetailState,
            deal,
          }),
        );
        dispatch(notify('재입고 알림 신청이 완료되었습니다.'));
      } catch (err) {
        dispatch(notify(err.message));
      }
    },
    [productDetailState.no, dispatch],
  );

  return { subscribe };
}
