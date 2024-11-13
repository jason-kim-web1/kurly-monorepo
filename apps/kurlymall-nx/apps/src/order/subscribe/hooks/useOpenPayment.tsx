import { useDispatch } from 'react-redux';

import { AxiosError } from 'axios';

import { useRouter } from 'next/router';

import { isNull } from 'lodash';

import { amplitudeService } from '../../../shared/amplitude';
import { SelectMembershipSubscribeOrder } from '../../../shared/amplitude/events/order/SelectMembershipSubscribeOrder';
import { getDeviceType, getPostRequestPaymentUrl, getReturnUrl } from '../utils/paymentProcess';
import { setPaymentGatewayUrl } from '../../shared/shared/reducers/payments.slice';
import { getPaymentUrl } from '../services';
import { setPaymentLoading } from '../reducers/subscribeCheckout.slice';
import { useAppSelector } from '../../../shared/store';
import { PAYMENT_TYPE, PaymentType } from '../interfaces';
import Alert from '../../../shared/components/Alert/Alert';
import { ORDER_PATH } from '../../../shared/constant';
import { ignoreError } from '../../../shared/utils/general';

interface OpenSubscribePaymentProps {
  productCode: string;
  paymentMethodId?: string | null;
  paymentMethodType: PaymentType;
}

/**
 * 컬리멤버스 구독을 위한 컬리페이 연동 훅
 * @param handlePaymentError 결제창 오픈 실패 핸들러
 */
export default function useOpenPayment(handlePaymentError: (error: AxiosError | Error) => Promise<void> | void) {
  const dispatch = useDispatch();
  const { pathname, push } = useRouter();
  const { isChangePayment, couponPackId, paymentKurlypayType, paymentKurlypayCompanyCode, couponPackCode } =
    useAppSelector(({ subscribeCheckout }) => ({
      isChangePayment: subscribeCheckout.isChangePayment,
      paymentKurlypayType: subscribeCheckout.paymentKurlypayType,
      paymentKurlypayCompanyCode: subscribeCheckout.paymentKurlypayCompanyCode,
      couponPackId: subscribeCheckout.selectedCouponPack?.couponPackId,
      couponPackCode: subscribeCheckout.selectedCouponPack?.couponPackCode,
    }));

  /**
   * 결제창 오픈 핸들러
   * @description 결제수단이 kurly-pay이면서 컬리페이 결제 ID가 없으면 결제수단 추가 페이지 오픈
   * @param productCode 결제상품코드
   * @param paymentMethodType 결제수단 (kurly-pay || credit)
   * @param paymentMethodId 컬리페이 결제 ID (optional)
   */
  const openSubscribePayment = async ({
    productCode,
    paymentMethodId,
    paymentMethodType,
  }: OpenSubscribePaymentProps) => {
    const os = getDeviceType();
    const isQuickSubscribe = !pathname.includes(ORDER_PATH.subscribe.uri);
    const isAddKurlpayMethod = isNull(paymentMethodId) && paymentMethodType === PAYMENT_TYPE.KURLY_PAY;
    const isNaverPay = paymentMethodType === PAYMENT_TYPE.NAVER_PAY;

    const returnUrl = getReturnUrl({ isChangePayment, isQuickSubscribe, isAddKurlpayMethod, couponPackId, isNaverPay });

    if (!os || !returnUrl) {
      await Alert({ text: '필수정보가 누락되었습니다.\n다시 시도해주세요.' });
      return;
    }

    if (!isChangePayment) {
      ignoreError(() =>
        amplitudeService.logEvent(
          new SelectMembershipSubscribeOrder({
            paymentMethodType,
            paymentKurlypayType,
            couponPackCode,
            paymentKurlypayCompanyCode,
            isAddKurlpayMethod,
          }),
        ),
      );
    }

    try {
      dispatch(setPaymentLoading(true));

      const { paymentUrl, isPostRequest } = await getPaymentUrl({
        returnUrl,
        os,
        productCode,
        paymentMethodId,
        paymentMethodType,
        isChangePayment,
      });

      //네이버페이 결제수단
      if (isNaverPay) {
        push(paymentUrl);
        return;
      }

      //POST 요청이 필요한 경우 - 결제수단 추가
      if (isPostRequest) {
        push(getPostRequestPaymentUrl(paymentUrl));
        return;
      }

      //그 외 iframe 결제창 오픈
      dispatch(setPaymentGatewayUrl(paymentUrl));
    } catch (error) {
      handlePaymentError(error);
    } finally {
      dispatch(setPaymentLoading(false));
    }
  };

  return {
    openSubscribePayment,
  };
}
