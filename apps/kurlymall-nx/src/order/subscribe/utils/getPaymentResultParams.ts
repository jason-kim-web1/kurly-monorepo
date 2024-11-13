import { ParsedUrlQuery } from 'querystring';
import { PageProcessResult } from '../interfaces';

interface PaymentQueryResult extends Omit<PageProcessResult, 'isAddKurlpayMethod'> {
  isAddKurlpayMethod?: string;
}

export const getPageProcessResult = (query: ParsedUrlQuery): PageProcessResult => {
  const {
    couponPackId,
    isAddKurlpayMethod,
    isChangePayment,
    isQuickSubscribe,
    result = '',
    orderNo = '',
    productCd = '',
    errorMsg = '',
    errorCd = '',
  } = query as ParsedUrlQuery & PaymentQueryResult;

  return {
    couponPackId,
    isChangePayment,
    isQuickSubscribe,
    result,
    orderNo,
    productCd,
    errorMsg,
    errorCd,
    isAddKurlpayMethod: isAddKurlpayMethod === 'true',
  };
};
