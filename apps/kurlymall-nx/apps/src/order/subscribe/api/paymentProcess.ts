import { AxiosError } from 'axios';

import httpClient from '../../../shared/configs/http-client';
import { handleKurlyMembersCheckoutError } from '../../../shared/error-handlers/KurlyMembersErrorHandlers';
import { PaymentUrlResponse, RequestPaymentUrl, SubscribeResultParams, SubscribeResponse } from '../interfaces';

/**
 * 결제창 요청 API - 정기결제
 * @param productCode 상품코드
 * @param os 접속 OS
 * @param returnUrl 컬리페이에서 콜백될 URL
 * @param paymentMethodType 결제수단 (kurly-pay, credit)
 * @param paymentMethodId kurlypay 결제 ID 값
 */

export async function postPaymentUrl({
  productCode,
  os,
  returnUrl,
  paymentMethodType,
  paymentMethodId,
}: RequestPaymentUrl): Promise<PaymentUrlResponse> {
  const url = `/member/proxy/membership/v2/subscriptions/payments/products/${productCode}/payment-url`;

  try {
    const { data } = await httpClient.post<PaymentUrlResponse>(url, {
      returnUrl,
      os,
      paymentMethodType,
      paymentMethodId,
    });

    return data;
  } catch (error) {
    throw handleKurlyMembersCheckoutError(error as AxiosError);
  }
}

/**
 * 결제창 요청 API - 정기결제
 * @param productCode 상품코드
 * @param os 접속 OS
 * @param returnUrl 컬리페이에서 콜백될 URL
 * @param paymentMethodType 결제수단 (kurly-pay, credit)
 * @param paymentMethodId kurlypay 결제 ID 값
 */
export async function postChangePaymentUrl({
  productCode,
  os,
  returnUrl,
  paymentMethodType,
  paymentMethodId,
}: RequestPaymentUrl): Promise<PaymentUrlResponse> {
  const url = `/member/proxy/membership/v2/subscriptions/payments/products/${productCode}/payment-method-url`;

  try {
    const { data } = await httpClient.post<PaymentUrlResponse>(url, {
      returnUrl,
      os,
      paymentMethodType,
      paymentMethodId,
    });

    return data;
  } catch (error) {
    throw handleKurlyMembersCheckoutError(error as AxiosError);
  }
}

/**
 * 승인요청 API - 정기결제
 * @param productCode 상품코드
 * @param orderNo 주문번호
 * @param couponPackId 쿠폰팩 ID
 */
export async function postSubscribeMembership({ productCode, orderNo, couponPackId }: SubscribeResultParams) {
  const params = {
    productCd: productCode,
    orderNo,
    benefitOptionId: couponPackId && Number(couponPackId),
  };
  const url = '/member/proxy/membership/v2/subscriptions/payments/products/subscribe';
  const { data } = await httpClient.post<SubscribeResponse>(url, params);

  return data;
}

export async function getNextPaymentDate() {
  const url = '/member/proxy/membership/v1/subscriptions/members/next-settlement-date';
  const { data } = await httpClient.get<Pick<SubscribeResponse, 'nextSettlementDate'>>(url);

  return data;
}
