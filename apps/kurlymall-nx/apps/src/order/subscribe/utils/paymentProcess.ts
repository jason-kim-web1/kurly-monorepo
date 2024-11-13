import { KURLYPAY_PATH, MEMBERSHIP_PATH, ORDER_PATH } from '../../../shared/constant';
import { DEVICE_TYPE, DeviceType } from '../interfaces';
import { isMobileWeb, isPC } from '../../../../util/window/getDevice';
import { KURLYPAY_PAGES } from '../../../shared/hooks/useKurlypay';
import { checkBrowserEnvironment } from '../../../shared/utils/checkBrowserEnvironment';

export const URL_TYPE = {
  SUBSCRIBE: 'subscribe',
  MEMBERS: 'members',
  IN_PROGRESS: 'inProgress',
  SUCCESS: 'success',
  FAIL: 'fail',
} as const;

type UrlType = typeof URL_TYPE[keyof typeof URL_TYPE];

export const getPathName = ({
  isChangePayment,
  urlType,
  isPostRequest,
}: {
  isChangePayment?: boolean;
  urlType: UrlType;
  isPostRequest?: boolean;
}): string => {
  if (isPostRequest) {
    return ORDER_PATH.subscribeProcess.uri;
  }

  switch (urlType) {
    case URL_TYPE.SUBSCRIBE:
      return isChangePayment ? ORDER_PATH.editSubscribe.uri : ORDER_PATH.subscribe.uri;
    case URL_TYPE.IN_PROGRESS:
      return ORDER_PATH.subscribeBridge.uri;
    case URL_TYPE.SUCCESS:
      return isChangePayment ? ORDER_PATH.editSubscribeSuccess.uri : ORDER_PATH.subscribeSuccess.uri;
    case URL_TYPE.FAIL:
      return isChangePayment ? ORDER_PATH.editSubscribeFail.uri : ORDER_PATH.subscribeFail.uri;
    case URL_TYPE.MEMBERS:
      return MEMBERSHIP_PATH.membership.uri;
    default:
      return '';
  }
};

const makeQueryString = ({
  isChangePayment,
  isQuickSubscribe,
  isAddKurlpayMethod,
  couponPackId,
}: {
  isChangePayment?: boolean;
  isQuickSubscribe: boolean;
  isAddKurlpayMethod: boolean;
  couponPackId?: number;
}) => {
  const params = {
    ...(isChangePayment && { isChangePayment: 'true' }),
    ...(isQuickSubscribe && { isQuickSubscribe: 'true' }),
    ...(isAddKurlpayMethod && { isAddKurlpayMethod: 'true' }),
    ...(couponPackId && { couponPackId: String(couponPackId) }),
  };

  const queryString = new URLSearchParams(params).toString();

  return queryString ? `?${encodeURIComponent(queryString)}` : '';
};

export const getReturnUrl = ({
  isChangePayment,
  isQuickSubscribe,
  isAddKurlpayMethod,
  couponPackId,
  isNaverPay,
}: {
  isChangePayment?: boolean;
  isQuickSubscribe: boolean;
  isAddKurlpayMethod: boolean;
  couponPackId?: number;
  isNaverPay: boolean;
}) => {
  if (!checkBrowserEnvironment()) {
    return '';
  }

  const pathName = getPathName({
    isChangePayment,
    urlType: URL_TYPE.IN_PROGRESS,
    isPostRequest: isAddKurlpayMethod || isNaverPay,
  });
  const queryString = makeQueryString({ isChangePayment, isQuickSubscribe, isAddKurlpayMethod, couponPackId });

  return `${window.location.origin}${pathName}${queryString}`;
};

export const getDeviceType = (): DeviceType => {
  if (isPC) {
    return DEVICE_TYPE.desktop;
  }
  if (isMobileWeb) {
    return DEVICE_TYPE['mobile-web'];
  }
  return DEVICE_TYPE['mobile-app'];
};

export const getPostRequestPaymentUrl = (paymentUrl: string) => {
  const startIndex = paymentUrl.indexOf('?');
  const queryString = `${paymentUrl.substring(startIndex)}&action=${KURLYPAY_PAGES.registration}`;

  return `${KURLYPAY_PATH.kurlypayAction.uri}${queryString}`;
};
