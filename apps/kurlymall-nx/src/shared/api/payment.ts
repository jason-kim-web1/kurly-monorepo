import { PaymentVendor, VendorCode } from '../../order/shared/shared/interfaces';

import { handleUnauthenticated } from '../error-handlers';

import { UnknownError } from '../errors';

import { BaseResponse } from '../interfaces';
import httpClient from '../configs/http-client';

// 신용카드 즉시할인 정보
interface InstantDiscountEvent {
  // 신용카드사 코드
  credit_card_vendor_code: string;

  // 카드사명
  credit_card_vendor_name: string;

  // 즉시할인 금액
  discount_amount: number;

  // 즉시할인을 위한 최소결제금액
  min_payment_amount: number;
}

interface Installment {
  // 신용카드사 코드
  credit_card_vendor_code: string;

  // 카드사명
  credit_card_vendor_name: string;

  // 할부 유의사항
  installment_description: string;

  // 할부 가능
  installment_available: boolean;

  // 무이자 할부 사용 가능
  free_installment: boolean;

  // 기본 할부 가능 개월수
  default_installment_range: number[];

  // 무이자할부 사용 가능 할부개월
  free_interest_installment_range: number[];
}

interface CreditCardPointEvent {
  // 신용카드사 코드
  credit_card_vendor_code: string;

  // 카드사명
  credit_card_vendor_name: string;

  // 포인트 사용 문구
  point_use_text: string;

  // 포인트 사용 가능 최소금액
  point_min_payment: number;
}

export interface Vendor {
  // 결제수단코드
  pg_id: VendorCode;

  // 결제수단명
  vendor_name: string;

  // 이벤트 여부
  event_exists: false;

  // 이벤트 제목
  event_title: string;

  // 이벤트 내용
  event_descriptions: string[];

  // 신용카드사 목록 및 할부 정보 (현재 pg_id = lguplus 일 경우만 있음)
  credit_card_vendor_and_installments: Installment[];

  // 신용카드 포인트 사용 가능 정보 (현재 pg_id = lguplus 일 경우만 있음)
  credit_card_point_events: CreditCardPointEvent[];

  // 신용카드 즉시할인 정보
  instant_discount_events: InstantDiscountEvent[];
}

export const fetchPaymentVendors = async ({ accessToken, totalPrice }: { accessToken: string; totalPrice: number }) => {
  const query = `?total_price=${totalPrice}&t=${new Date().getTime()}`;
  const url = `/v3/payment/vendor-events${query}`;
  const options = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    const { data } = await httpClient.get<BaseResponse<Vendor[]>>(url, options);
    return data.data;
  } catch (err) {
    handleUnauthenticated(err);

    throw new UnknownError(err);
  }
};

interface PreviousVendor {
  credit_card_vendor_code: string;
  pg_id: VendorCode | '';
}

export const fetchPreviousVendor = async ({ accessToken }: { accessToken: string }) => {
  const url = `/v3/payment/preference?_t=${new Date().getTime()}`;
  const options = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    const { data } = await httpClient.get<BaseResponse<PreviousVendor>>(url, options);
    return {
      vendorCode: data.data.pg_id,
      creditCardVendorCode: data.data.credit_card_vendor_code,
    };
  } catch (err) {
    handleUnauthenticated(err);

    throw new UnknownError(err);
  }
};

export const postPreviousVendor = async ({
  accessToken,
  vendor,
  creditCard = '',
}: {
  accessToken: string;
  vendor: PaymentVendor;
  creditCard: string;
}) => {
  const url = '/v3/payment/preference';
  const params = {
    pg_id: vendor,
    credit_card_vendor_code: creditCard,
  };
  const options = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    await httpClient.put<BaseResponse<PreviousVendor>>(url, params, options);
    return;
  } catch (err) {
    handleUnauthenticated(err);

    throw new UnknownError(err);
  }
};

export const deletePreviousVendor = async ({ accessToken }: { accessToken: string }) => {
  const url = '/v3/payment/preference';
  const options = { headers: { Authorization: `Bearer ${accessToken}` } };
  try {
    await httpClient.delete(url, options);
  } catch (err) {
    handleUnauthenticated(err);

    throw new UnknownError(err);
  }
};
