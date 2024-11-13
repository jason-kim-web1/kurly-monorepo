import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import Alert from '../../../../shared/components/Alert/Alert';
import useCouponListQuery from '../queries/useCouponListQuery';
import { COUPON_ALERT_TEXT_INPUT, COUPON_ALERT_TEXT_RETRY } from '../constants';
import useAddCouponMutation from '../queries/useAddCouponMutation';
import { parseCouponKeys, processResponses } from '../utils/couponRegister';
import { isPC } from '../../../../../util/window/getDevice';
import { loadMyKurlyInfo } from '../../../info-section/mykurly.slice';
import { amplitudeService } from '../../../../shared/amplitude';
import { CouponRegisterFail, CouponRegisterSuccess } from '../../../../shared/amplitude/events/coupon';

export default function useCouponRegister() {
  const { query, replace, pathname } = useRouter();
  const dispatch = useDispatch();
  const { refetch } = useCouponListQuery();
  const { mutateAsync: addCouponMutate } = useAddCouponMutation();

  const [retryCount, setRetryCount] = useState(0);
  const [couponKey, setCouponKey] = useState('');

  const { couponNo } = query as ParsedUrlQuery & { couponNo?: string };

  useEffect(() => {
    if (couponNo) {
      setCouponKey(couponNo);
      setRetryCount(0);
    }
  }, [couponNo]);

  const onChangeCouponKey = useCallback(({ value }: { value: string }) => {
    setCouponKey(value);
    setRetryCount(0);
  }, []);

  const addCoupon = useCallback(
    async (closeCouponModal: () => void) => {
      if (retryCount >= 3) {
        await Alert({ text: COUPON_ALERT_TEXT_RETRY });
        closeCouponModal();
        return;
      }

      if (!couponKey) {
        await Alert({ text: COUPON_ALERT_TEXT_INPUT });
        return;
      }

      const couponKeys = parseCouponKeys(couponKey);

      if (couponKeys.length < 1) {
        await Alert({ text: COUPON_ALERT_TEXT_INPUT });
        return;
      }

      const responses = await Promise.all(couponKeys.map((key) => addCouponMutate({ couponKey: key })));

      const { message, rejectedKeys } = processResponses(responses, couponKeys);

      await Alert({ text: `${message}` });

      if (rejectedKeys.length === 0) {
        amplitudeService.logEvent(
          new CouponRegisterSuccess({
            couponCode: couponKeys.join(';'),
          }),
        );

        setCouponKey('');
        refetch();
        closeCouponModal();
        replace(pathname);

        if (isPC) {
          dispatch(loadMyKurlyInfo());
        }
      } else {
        amplitudeService.logEvent(
          new CouponRegisterFail({
            couponCode: couponKeys.join(';'),
          }),
        );

        setCouponKey(rejectedKeys.join(';'));
        setRetryCount(retryCount + 1);
      }
    },
    [addCouponMutate, couponKey, dispatch, pathname, refetch, replace, retryCount],
  );

  return {
    couponKey,
    onChangeCouponKey,
    addCoupon,
  };
}
