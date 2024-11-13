import { OrderVendorCode, PaymentVendor } from '../../../shared/shared/interfaces';
import { isCreditCardPayments } from '../../../shared/shared/services';

/**
 * 결제수단 목록 중 찾으려는 결제 수단을 return 한다.
 * 신용카드의 경우 pg-id 가 toss-payments, kurlypay-credit 두 가지 모두 가능하여
 * 결제수단에 포함되어 있는 신용카드사를 return 합니다.
 *
 * @param {PaymentVendor[]} vendors 결제 수단 목록
 * @param {OrderVendorCode} code 찾으려는 결제 수단의 pg사 id
 * @returns 찾은 결제 수단
 */
export const findVendor = (vendors: PaymentVendor[], code?: OrderVendorCode | '') => {
  return vendors.find((it) => (isCreditCardPayments(code) ? isCreditCardPayments(it.code) : it.code === code));
};
