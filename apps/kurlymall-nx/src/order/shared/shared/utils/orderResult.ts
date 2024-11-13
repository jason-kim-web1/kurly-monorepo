import { AxiosError } from 'axios';
import { omit } from 'lodash';

import router from 'next/router';

import { isPC, isPaymentWebview } from '../../../../../util/window/getDevice';

import Alert from '../../../../shared/components/Alert/Alert';
import { CART_PATH, ORDER_PATH, PAYMENT_GIFT_PATH } from '../../../../shared/constant';
import { PaymentErrorResponse, PaymentCompleteResponse, PaymentAllResult } from '../../../../shared/interfaces';
import {
  ORDER_CANCEL,
  ORDER_FAIL,
  ORDER_SCRIPT_LOADING_FAIL,
  ORDER_SERVICE_FAIL,
  ORDER_SUCCESS,
  sentryCaptureError,
} from '../../../../shared/services';
import appService from '../../../../shared/services/app.service';

import { giftPaymentOutInProgress, paymentOutInProgress } from '../services/payments.service';
import { ignoreError } from '../../../../shared/utils/general';

/**
 * OrderResultCommonProps
 *
 * @property showAlert  Alert를 보여줘야 하는경우 true로 설정합니다.
 * @property alertText  Alert를 보여줘야 하는경우 보여줄 메세지를 설정합니다.
 * @property groupOrderNo  주문 번호
 * @property message  PG에서 받은 실패 메세지
 * @property isGiftOrder  선물하기 유무
 */
interface OrderResultCommonProps {
  showAlert?: boolean;
  alertText?: string;
  groupOrderNo: string;
  message?: string | null;
  isGiftOrder?: boolean;
  isJoinOrder?: boolean;
}

/**
 * OrderResultProps
 *
 * @property groupOrderNo 주문 번호
 */
interface OrderResultProps extends OrderResultCommonProps {
  groupOrderNo: string;
}

/**
 * OrderResultFailProps
 *
 * @property apiMessage API 실패 시 받은 메세지
 * @property paymentAllResult PG에서 받은 메세지 전문
 */
interface OrderResultFailProps extends OrderResultProps {
  apiMessage?: string | null;
  paymentAllResult?: PaymentAllResult;
}

/**
 * OrderResultServiceFailProps
 *
 * @property error AxiosError
 */
interface OrderResultServiceFailProps extends OrderResultCommonProps {
  error: AxiosError;
}

/**
 * OrderResultSuccessProps
 *
 * @property groupOrderNo 주문 번호
 * @property isGiftOrder 선물하기 여부
 * @property data API 성공 시 받은 값
 */
interface OrderResultSuccessProps {
  groupOrderNo: string;
  isGiftOrder?: boolean;
  isJoinOrder?: boolean;
  data: PaymentCompleteResponse;
}

const makeTargetUrl = ({
  url,
  groupOrderNo,
  isGiftOrder,
}: {
  url: string;
  groupOrderNo: string;
  isGiftOrder?: boolean;
}) => {
  const params = {
    orderNo: groupOrderNo,
    ...(isGiftOrder && { gift: 'true' }),
  };
  const queryString = new URLSearchParams(params).toString();

  return `${url}?${queryString}`;
};

// NOTE: MBB 사전작업 : 주문 완료 데이터에서 'memberships' 정보는 앱으로 전달하지 않습니다.
export const getOrderSuccessDataForApp = (data: OrderResultSuccessProps['data']) => {
  try {
    return omit(data, 'memberships');
  } catch (error) {
    return data;
  }
};

// 결제 결과 처리 - 주문서
export default function orderResult() {
  const routerReplace = (url: string) => {
    const { replace } = router;

    if (isPC) {
      replace(url);
      return;
    }

    replace(`/m${url}`, url);
  };

  // PG 스크립트 로딩 실패
  const paymentsScriptLoadingFail = async ({
    groupOrderNo,
    showAlert = true,
    alertText = '일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.',
    message = null,
  }: OrderResultCommonProps) => {
    if (isPaymentWebview()) {
      appService.postOrderFailure({
        orderNumber: groupOrderNo,
      });
      appService.postCheckoutResult({
        code: ORDER_SCRIPT_LOADING_FAIL,
        data: null,
        error: null,
        message,
      });
    }

    if (showAlert) {
      await Alert({ text: alertText });
    }

    const targetUrl = makeTargetUrl({ url: `${ORDER_PATH.fail.uri}`, groupOrderNo });
    routerReplace(targetUrl);
  };

  // 주문 실패 (결제 서비스 호출 시 에러)
  const paymentsServiceFail = async ({
    showAlert = true,
    alertText = '일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.',
    error,
    message = null,
    isGiftOrder = false,
    groupOrderNo,
  }: OrderResultServiceFailProps) => {
    const responseData = error.response?.data as PaymentErrorResponse;
    const errorMessage = responseData?.message;

    switch (responseData?.code) {
      case '4101':
        alertText = errorMessage;
        message = errorMessage;
        break;
      case '4102':
        alertText = errorMessage;
        message = errorMessage;
        break;
      case '4009':
        alertText = '구매 불가능한 상품이 있습니다. 주문 전 상품 정보를 다시 확인해주세요.';
        message = errorMessage;
        break;
      case '9001':
        alertText = '주문 정보가 변경되었습니다.\n주문을 다시 시도해 주세요.';
        message = errorMessage;
        break;
      case '9998':
        alertText = '결제를 실패했습니다. 주문을 다시 시도해주세요.';
        message = errorMessage;
        break;
      case '9999':
        alertText = '일시적인 장애가 발생했어요. 잠시 후 다시 시도해주세요.';
        break;
    }

    if (isPaymentWebview()) {
      appService.postOrderFailure({
        orderNumber: groupOrderNo,
      });
      appService.postCheckoutResult({
        code: ORDER_SERVICE_FAIL,
        data: null,
        error: responseData,
        message,
      });
    }

    if (showAlert) {
      await Alert({ text: alertText });
    }

    switch (responseData?.code) {
      case '4101':
        routerReplace(ORDER_PATH.joinFail.uri);
        return;
      case '9001':
        if (isPaymentWebview()) {
          appService.finishAndRefresh();
          return;
        }
        routerReplace(`${CART_PATH.cart.uri}`);
        break;
      default: {
        const targetUrl = makeTargetUrl({ url: `${ORDER_PATH.fail.uri}`, isGiftOrder, groupOrderNo });
        routerReplace(targetUrl);
      }
    }
  };

  // 주문 실패 (PG 실패)
  const paymentsFail = async ({
    showAlert = true,
    alertText = '결제를 실패했습니다. 주문을 다시 시도해주세요.',
    groupOrderNo,
    paymentAllResult,
    message = null,
    apiMessage,
    isGiftOrder = false,
  }: OrderResultFailProps) => {
    ignoreError(() => {
      const isNotOurIssueList = ['요금 미납으로 결제 불가합니다', 'KG모빌리언스 정책상 휴대폰 결제가 불가합니다'];

      if (!isNotOurIssueList.some((isNotOurIssue) => message && message.includes(isNotOurIssue))) {
        sentryCaptureError(new Error('결제 실패'), {
          tags: { type: 'payments', groupOrderNo: groupOrderNo ?? '' },
          extra: {
            apiMessage: apiMessage ?? '',
            pgMessage: message ?? '',
            paymentAllResult: paymentAllResult ? JSON.parse(paymentAllResult) : '',
          },
        });
      }
    });

    try {
      if (isGiftOrder) {
        await giftPaymentOutInProgress({ groupOrderNo });
      } else {
        await paymentOutInProgress({ groupOrderNo });
      }

      if (isPaymentWebview()) {
        appService.postOrderFailure({
          orderNumber: groupOrderNo,
        });
        appService.postCheckoutResult({
          code: ORDER_FAIL,
          data: null,
          error: null,
          message,
        });
      }

      if (showAlert) {
        await Alert({ text: alertText });
      }

      const targetUrl = makeTargetUrl({ url: `${ORDER_PATH.fail.uri}`, isGiftOrder, groupOrderNo });
      routerReplace(targetUrl);
    } catch (err) {
      paymentsServiceFail({
        error: err as AxiosError,
        groupOrderNo,
      });
    }
  };

  // 주문 취소
  const paymentsCancel = async ({
    showAlert = true,
    alertText = '결제를 취소했습니다.',
    groupOrderNo,
    message = null,
    isGiftOrder = false,
    isJoinOrder,
  }: OrderResultProps) => {
    try {
      if (isGiftOrder) {
        await giftPaymentOutInProgress({ groupOrderNo });
      } else {
        await paymentOutInProgress({ groupOrderNo });
      }

      if (isPaymentWebview()) {
        appService.postOrderCancel({
          orderNumber: groupOrderNo,
        });
        appService.postCheckoutResult({
          code: ORDER_CANCEL,
          data: null,
          error: null,
          message,
        });
      }

      if (showAlert) {
        await Alert({ text: alertText });
      }

      if (isJoinOrder) {
        routerReplace(ORDER_PATH.join.uri);
        return;
      }

      routerReplace(`${ORDER_PATH.order.uri}${isGiftOrder ? '?gift=true' : ''}`);
    } catch (err) {
      paymentsServiceFail({
        error: err as AxiosError,
        isJoinOrder,
        groupOrderNo,
      });
    }
  };

  // 주문 완료
  const paymentsSuccess = async ({ groupOrderNo, data, isGiftOrder = false, isJoinOrder }: OrderResultSuccessProps) => {
    if (isPaymentWebview()) {
      appService.postCheckoutResult({
        code: ORDER_SUCCESS,
        data: getOrderSuccessDataForApp(data),
        error: null,
        message: null,
      });
    }
    if (isJoinOrder) {
      routerReplace(`${ORDER_PATH.joinSuccess.uri}?orderNo=${groupOrderNo}`);
      return;
    }

    const PATH = isGiftOrder ? PAYMENT_GIFT_PATH : ORDER_PATH;
    routerReplace(`${PATH.success.uri}?orderNo=${groupOrderNo}`);
  };

  return {
    paymentsCancel,
    paymentsFail,
    paymentsServiceFail,
    paymentsSuccess,
    paymentsScriptLoadingFail,
  };
}
