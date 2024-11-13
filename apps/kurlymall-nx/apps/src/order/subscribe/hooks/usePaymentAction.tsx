import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';

import { useEffect } from 'react';

import { initSubscribeCheckout, setPaymentLoading } from '../reducers/subscribeCheckout.slice';
import { useAppSelector } from '../../../shared/store';
import Alert from '../../../shared/components/Alert/Alert';
import useKurlyMembersCheckout from './useKurlyMembersCheckout';

import { SessionExpirationError } from '../../../shared/errors/kurly-members';
import { notifyAndRedirectTo } from '../../../shared/reducers/page';
import { getPageUrl, MEMBERSHIP_PATH } from '../../../shared/constant';
import useOpenPayment from './useOpenPayment';
import { KURLY_PAY_ERROR_MESSAGE, PAYMENT_TERMS_ID } from '../constants';
import { createMemberSession } from '../../../mypage/membership/shared/service';

export default function usePaymentAction() {
  const dispatch = useDispatch();
  const { couponPackId, isChangePayment, paymentMethodId, paymentMethodType, marketingTermsAgreed } = useAppSelector(
    ({ subscribeCheckout }) => ({
      couponPackId: subscribeCheckout.selectedCouponPack?.couponPackId,
      isChangePayment: subscribeCheckout.isChangePayment,
      paymentMethodId: subscribeCheckout.paymentMethodId,
      paymentMethodType: subscribeCheckout.paymentMethodType,
      marketingTermsAgreed: subscribeCheckout.terms[PAYMENT_TERMS_ID.MARKETING],
    }),
  );
  const { product, isKurlypayError } = useKurlyMembersCheckout();
  const isSmsAgreed = useAppSelector(({ member }) => member.subscription.agreeSMS);
  const orderType = isChangePayment ? '결제수단 변경' : '정기결제';

  useEffect(() => {
    return () => {
      dispatch(initSubscribeCheckout());
    };
  }, [dispatch]);

  const handlePaymentError = async (error: AxiosError | Error) => {
    const message = `${orderType} 신청에 실패하였습니다.\n다시 시도해주세요.`;

    if (error instanceof SessionExpirationError) {
      dispatch(
        notifyAndRedirectTo({
          message,
          redirectUrl: getPageUrl(MEMBERSHIP_PATH.membership),
        }),
      );
      return;
    }

    await Alert({ text: message });
    dispatch(setPaymentLoading(false));
  };

  const notifyInvalidParams = async () => {
    const message = `${orderType} 신청을 위한 필수정보가 누락되었습니다.\n다시 시도해주세요.`;

    await Alert({ text: message });
  };

  const { openSubscribePayment } = useOpenPayment(handlePaymentError);

  const handleClickPayment = async () => {
    if (isKurlypayError) {
      await Alert({ text: KURLY_PAY_ERROR_MESSAGE });
      return;
    }

    await createMemberSession({ marketingAgreement: isSmsAgreed || marketingTermsAgreed });

    const productCode = product?.code;
    if (!productCode || !paymentMethodType || (!isChangePayment && !couponPackId)) {
      await notifyInvalidParams();
      return;
    }

    await openSubscribePayment({ productCode, paymentMethodType, paymentMethodId });
  };

  return {
    handleClickPayment,
  };
}
