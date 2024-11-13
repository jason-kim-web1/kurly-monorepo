import { isPC } from '../../../../../util/window/getDevice';
import { getPageUrl, PAYMENT_GIFT_PATH, ORDER_PATH } from '../../../../shared/constant';
import { LoadOrderProps, PlaceOrderResponse } from '../../../../shared/interfaces';
import { storeTossToken } from '../services/tossToken.storage.service';

const getNextPaymentUrl = (placeOrderResponse: PlaceOrderResponse) =>
  isPC
    ? placeOrderResponse.paymentUrlParameter.nextRedirectPcUrl
    : placeOrderResponse.paymentUrlParameter.nextRedirectMobileUrl;

export const getOrderParams = ({
  placeOrderResponse,
  selectedVendorCode,
  isGiftOrder = false,
  isJoinOrder,
}: LoadOrderProps) => {
  const commonPath = isGiftOrder ? PAYMENT_GIFT_PATH : ORDER_PATH;
  const checkoutInitUrl = getPageUrl(commonPath.init);
  const paymentRedirectSuccessUrl = `${origin}${commonPath.process.uri}`;
  const nextPaymentUrl = getNextPaymentUrl(placeOrderResponse);

  // 전액 적립금 (핀코드 인증 필요없는 경우)
  if (selectedVendorCode === 'kurly' && !nextPaymentUrl) {
    const paymentGatewayTransactionId = placeOrderResponse.paymentAuthParameter.paymentGatewayTransactionId;
    const params = new URLSearchParams({
      groupOrderNo: placeOrderResponse.groupOrderNo,
      ...(paymentGatewayTransactionId && { paymentGatewayTransactionId }),
    });

    if (isGiftOrder) {
      return { url: `${getPageUrl(PAYMENT_GIFT_PATH.success)}/${selectedVendorCode}?${params.toString()}` };
    }

    const successPath = isJoinOrder ? getPageUrl(ORDER_PATH.joinSuccess) : getPageUrl(ORDER_PATH.success);

    return {
      url: `${successPath}/${selectedVendorCode}?${params.toString()}`,
    };
  }

  if (selectedVendorCode === 'toss-payments') {
    return {
      url: `${checkoutInitUrl}/${selectedVendorCode}`,
      query: {
        groupOrderNo: placeOrderResponse.groupOrderNo,
        ...placeOrderResponse.paymentAuthParameter.tossPaymentsParameter,
        lgd_returnurl: `${paymentRedirectSuccessUrl}/${selectedVendorCode}`,
      },
    };
  }

  if (selectedVendorCode === 'toss') {
    storeTossToken(placeOrderResponse.paymentAuthParameter.paymentGatewayToken);
  }

  if (selectedVendorCode === 'kurlypay') {
    return {
      url: placeOrderResponse.kurlypayEasyPaymentUrlParameter.requestUrl,
    };
  }

  // toss, payco, naver-pay, kakao-pay, phonebill, kurlypay-credit, kurly(유상캐시 포함된 핀인증 필요할 경우)
  return {
    url: nextPaymentUrl,
  };
};
