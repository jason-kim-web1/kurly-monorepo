import { InProgressProps, PageProcessResult, PaymentResult } from '../interfaces';

const makeQueryParams = ({
  couponPackId,
  isChangePayment,
  isQuickSubscribe,
  result,
  orderNo,
  productCd,
  errorMsg,
  errorCd,
}: Omit<PageProcessResult, 'isAddKurlpayMethod'>) => {
  const orderParams = {
    couponPackId,
    isChangePayment: isChangePayment === 'true',
    isQuickSubscribe: isQuickSubscribe === 'true',
  };

  return {
    orderParams,
    paymentResult: result,
    requestSubscribeParams: {
      orderNo,
      productCode: productCd,
      errorMessage: errorMsg,
      errorCode: errorCd,
      ...orderParams,
    },
  };
};

interface PaymentResultProps {
  iframeProcessResult: InProgressProps;
  pageProcessResult: PageProcessResult;
}

/**
 * 결제 결과를 반환합니다.
 *
 * @param result 결제 결과 (SUCCESS, ERROR)
 * @param iframeProcessResult 아이프레임으로 처리된 결제 결과 데이터
 * @param isAddKurlpayMethod 컬리페이 결제수단 추가 여부
 * @param pageProcessResult 페이지 이동으로 처리된 결제 결과 데이터
 */
export const getPaymentResult = ({
  iframeProcessResult: { result, ...iframeProcessResult },
  pageProcessResult: { isAddKurlpayMethod, ...pageProcessResult },
}: PaymentResultProps): PaymentResult => {
  const { orderParams, paymentResult, requestSubscribeParams } = makeQueryParams(pageProcessResult);

  if (isAddKurlpayMethod) {
    return {
      paymentResult,
      requestSubscribeParams,
    };
  }

  return {
    paymentResult: result,
    requestSubscribeParams: { ...iframeProcessResult, ...orderParams },
  };
};
