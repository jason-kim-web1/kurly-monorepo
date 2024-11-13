import { useRouter } from 'next/router';

import { useEffect } from 'react';

import { useDispatch } from 'react-redux';

import { getPathName, URL_TYPE } from '../utils/paymentProcess';
import Alert from '../../../shared/components/Alert/Alert';
import {
  setCouponPackId,
  setOrderBannerSubscribe,
  setSubscribeFailResult,
  setSubscribeSuccessResult,
} from '../reducers/subscribeResult.slice';
import { requestSuccessResult } from '../services';
import { PIN_CODE_ERROR, usePinCodeError } from './usePinCodeError';
import { logEventPixelSubscribe } from '../utils/pixelEvent';

interface PaymentProcessProps {
  errorMessage: string;
  productCode: string;
  orderNo: string;
  couponPackId?: string;
  isChangePayment: boolean;
  isQuickSubscribe: boolean;
  errorCode: string;
}

export default function usePaymentProcess({
  errorMessage,
  productCode,
  orderNo,
  couponPackId,
  isChangePayment,
  isQuickSubscribe,
  errorCode,
}: PaymentProcessProps) {
  const dispatch = useDispatch();
  const { replace, back } = useRouter();
  const { handlePinCodeError } = usePinCodeError(isChangePayment);

  useEffect(() => {
    dispatch(setOrderBannerSubscribe({ isQuickSubscribe }));

    if (couponPackId) {
      dispatch(setCouponPackId({ couponPackId }));
    }
  }, [dispatch, isQuickSubscribe, couponPackId]);

  //정기결제, 결제 수단 변경 신청 - 승인 요청 단계
  const getSuccessResult = async () => {
    try {
      return await requestSuccessResult({ isChangePayment, productCode, orderNo, couponPackId });
    } catch (error) {
      const paymentFailMessage = error.message ?? '카드 승인 실패';
      dispatch(setSubscribeFailResult(paymentFailMessage));
      const targetUrl = getPathName({ isChangePayment, urlType: URL_TYPE.FAIL });

      await replace(targetUrl);
    }
  };

  //결제키 발급 성공
  const successPaymentProcess = async () => {
    const successResult = await getSuccessResult();

    if (successResult) {
      logEventPixelSubscribe(couponPackId);
      dispatch(setSubscribeSuccessResult(successResult));
      const targetUrl = getPathName({ isChangePayment, urlType: URL_TYPE.SUCCESS });

      await replace(targetUrl);
    }
  };

  //결제키 발급 실패
  const failPaymentProcess = async () => {
    dispatch(setSubscribeFailResult(errorMessage));
    const targetUrl = getPathName({ isChangePayment, urlType: URL_TYPE.FAIL });

    await replace(targetUrl);
  };

  //결제 중도 이탈
  const cancelPaymentProcess = async () => {
    // 결제키 5회이상 입력 실패
    if (errorCode === PIN_CODE_ERROR) {
      await handlePinCodeError();
      return;
    }

    await Alert({
      contents: `${isChangePayment ? '결제수단 변경' : '정기결제'} 신청을 취소 했습니다.`,
    });

    // 간편가입인 경우에는 쿼리스트링의 유지를 위해 historyBack으로 처리
    if (isQuickSubscribe) {
      back();
      return;
    }

    const targetUrl = getPathName({
      isChangePayment,
      urlType: URL_TYPE.SUBSCRIBE,
    });
    await replace(targetUrl);
  };

  return {
    successPaymentProcess,
    failPaymentProcess,
    cancelPaymentProcess,
  };
}
