import { encodeQueryString } from '../../../../shared/utils/querystring-encoder';

import { ORDER_PATH, PAYMENT_GIFT_PATH } from '../../../../shared/constant';

import {
  CheckPaymentGatewayResultProps,
  CheckTossPaymentsResultProps,
  PaymentGatewayStatus,
} from '../../../../shared/interfaces';
import { OrderVendorCode } from '../interfaces/OrderVendorCode.interface';
import {
  COMMON_SUCCESS_CODE,
  KURLYPAY_CODE,
  NAVER_PAY_CODE,
  PAYCO_CODE,
  PHONEBILL_CODE,
  TOSS_CODE,
  TOSS_PATMENTS_CODE,
} from '../constants';

type PgGateWayResultProps = {
  [key in OrderVendorCode]: string[] | null;
};

export const PG_SUCCESS_CODE: PgGateWayResultProps = {
  toss: TOSS_CODE.SUCCESS,
  'toss-payments': COMMON_SUCCESS_CODE,
  phonebill: COMMON_SUCCESS_CODE,
  'naver-pay': NAVER_PAY_CODE.SUCCESS,
  'kakao-pay': null,
  payco: PAYCO_CODE.SUCCESS,
  'kurly-pass': COMMON_SUCCESS_CODE,
  kurly: COMMON_SUCCESS_CODE,
  'kurlypay-credit': COMMON_SUCCESS_CODE,
  kurlypay: COMMON_SUCCESS_CODE,
  ALL: COMMON_SUCCESS_CODE,
};

export const PG_CANCEL_CODE: PgGateWayResultProps = {
  toss: TOSS_CODE.CANCEL,
  'toss-payments': TOSS_PATMENTS_CODE.CANCEL,
  phonebill: PHONEBILL_CODE.CANCEL,
  'naver-pay': NAVER_PAY_CODE.CANCEL,
  'kakao-pay': null,
  payco: PAYCO_CODE.CANCEL,
  'kurly-pass': TOSS_PATMENTS_CODE.CANCEL,
  kurly: [...TOSS_PATMENTS_CODE.CANCEL, ...KURLYPAY_CODE.CANCEL],
  'kurlypay-credit': TOSS_PATMENTS_CODE.CANCEL,
  kurlypay: KURLYPAY_CODE.CANCEL,
  ALL: TOSS_PATMENTS_CODE.CANCEL,
};

export const checkPaymentGatewayResult = ({
  selectedVendorCode,
  paymentGatewayResult,
  paymentGatewayMessage,
}: CheckPaymentGatewayResultProps): PaymentGatewayStatus => {
  if (paymentGatewayMessage) {
    if (PG_CANCEL_CODE[selectedVendorCode]?.includes(paymentGatewayMessage)) {
      return 'cancel';
    }
  }

  if (paymentGatewayResult) {
    if (PG_SUCCESS_CODE[selectedVendorCode] !== null || PG_CANCEL_CODE[selectedVendorCode] !== null) {
      if (!PG_SUCCESS_CODE[selectedVendorCode]?.includes(paymentGatewayResult)) {
        if (PG_CANCEL_CODE[selectedVendorCode]?.includes(paymentGatewayResult)) {
          return 'cancel';
        }
        return 'fail';
      }
    }
  }

  return 'success';
};

export const checkTossPaymentsResult = ({
  groupOrderNo,
  selectedVendorCode,
  paymentGatewayResult,
  tossPaymentsParameter,
  isGiftOrder = false,
  isJoinOrder,
}: CheckTossPaymentsResultProps) => {
  const getCancelUrl = () => {
    if (isGiftOrder) {
      return `${PAYMENT_GIFT_PATH.cancel.uri}/${selectedVendorCode}?orderNumber=${groupOrderNo}`;
    }

    const cancelType = isJoinOrder ? 'joinCancel' : 'cancel';

    return `${ORDER_PATH[cancelType].uri}/${selectedVendorCode}?orderNumber=${groupOrderNo}`;
  };

  const getFailUrl = () => {
    if (isGiftOrder) {
      return `${PAYMENT_GIFT_PATH.fail.uri}/${selectedVendorCode}${encodeQueryString({
        orderNumber: groupOrderNo,
      })}`;
    }

    const failType = isJoinOrder ? 'joinFail' : 'fail';

    return `${ORDER_PATH[failType].uri}/${selectedVendorCode}${encodeQueryString({
      orderNumber: groupOrderNo,
    })}`;
  };

  const getSuccessUrl = () => {
    if (isGiftOrder) {
      return `${PAYMENT_GIFT_PATH.success.uri}/${selectedVendorCode}${encodeQueryString({
        ...tossPaymentsParameter,
        groupOrderNo,
      })}`;
    }

    const successType = isJoinOrder ? 'joinSuccess' : 'success';

    return `${ORDER_PATH[successType].uri}/${selectedVendorCode}${encodeQueryString({
      ...tossPaymentsParameter,
      groupOrderNo,
    })}`;
  };

  if (!PG_SUCCESS_CODE[selectedVendorCode]?.includes(paymentGatewayResult)) {
    if (PG_CANCEL_CODE[selectedVendorCode]?.includes(paymentGatewayResult)) {
      parent.location.href = getCancelUrl();
      return;
    }
    // 'C001' - Invalid card number
    parent.location.href = getFailUrl();
    return;
  }

  parent.location.href = getSuccessUrl();
};
