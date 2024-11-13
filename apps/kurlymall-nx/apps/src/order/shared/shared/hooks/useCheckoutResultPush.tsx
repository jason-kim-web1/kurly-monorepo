import { useCallback, useEffect } from 'react';

import { Alarm } from '@thefarmersfront/kurly-web-sdk';

import { add, set } from 'date-fns';

import { ignoreError } from '../../../../shared/utils/general';
import deepLinkUrl from '../../../../shared/constant/deepLink';
import { isWebview } from '../../../../../util/window/getDevice';
import { PaymentCompletedDealProducts, PaymentsResult } from '../../../../shared/interfaces';
import { isValidDeliveryPolicy } from '../../../checkout/shared/utils/isValidDeliveryPolicy';
import { CART_DELIVERY_TYPE } from '../../../cart/constants/CartDeliveryType';

type Props = Pick<PaymentsResult, 'isDeliveryOrder'> & {
  orderNo?: string;
  orderDealProducts: PaymentCompletedDealProducts[];
};

interface GetPushTimeResponse {
  time: Date;
  jitter: Alarm.JitterConfig | false;
}

export default function useCheckoutResultPush({ orderNo, isDeliveryOrder, orderDealProducts }: Props) {
  const hasPartnerFulfillmentOrder = isValidDeliveryPolicy({
    validDeliveryPolicy: CART_DELIVERY_TYPE.NORMAL_PARCEL,
    orderDealProducts,
  });

  const getPushTime = useCallback((): GetPushTimeResponse => {
    const nowDate = new Date();

    // 10시 ~ 24시(23시 59분 59초) 주문건은 7일뒤 1시간 뺸 시간으로 반환
    // 아닐경우 7일뒤 오후 12시 반환
    if (nowDate.getHours() >= 10 && nowDate.getHours() <= 23) {
      return {
        time: add(nowDate, {
          days: 7,
          hours: -1,
        }),
        jitter: false,
      };
    } else {
      return {
        time: set(
          add(nowDate, {
            days: 7,
          }),
          { hours: 12, minutes: 0, seconds: 0, milliseconds: 0 },
        ),
        jitter: { duration: { hours: 1 } },
      };
    }
  }, []);

  const addPushSchedule = useCallback(() => {
    ignoreError(async () => {
      const isPossiblePush = await Alarm.checkDeviceAlarmPermission();
      if (!isPossiblePush) {
        return;
      }

      const { time, jitter } = getPushTime();
      await Alarm.addAlarm({
        alarmId: 'CheckoutSuccessRemind',
        title: '컬리에서 구매하신 경험은 어떠셨나요?',
        message: '고객님의 생생한 경험을 들려주시고 마음에 드는 상품은 다시 담기 해보세요',
        link: `${deepLinkUrl.ORDER_DETAIL}${orderNo}`,
        time,
        jitter,
      });
    });
  }, [getPushTime, orderNo]);

  useEffect(() => {
    if (!isWebview() || !orderNo) {
      return;
    }

    // 3p제외 배송 주문 여부 검증
    if (!isDeliveryOrder || hasPartnerFulfillmentOrder) {
      return;
    }

    addPushSchedule();
  }, [addPushSchedule, hasPartnerFulfillmentOrder, isDeliveryOrder, orderNo]);
}
