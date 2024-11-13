import { AxiosError } from 'axios';

import httpClient from '../../../shared/configs/http-client';
import {
  KurlyMembersChangePaymentMethodApiResponse,
  KurlyMembersCheckoutApiResponse,
} from '../interfaces/KurlyMembersProduct.interface';
import { handleKurlyMembersCheckoutError } from '../../../shared/error-handlers/KurlyMembersErrorHandlers';

// 컬리멤버스 주문서 정보 조회
export const readKurlyMembersCheckoutProduct = async (productCd: string) => {
  const url = `/member/proxy/membership/v1/subscriptions/payments/products/${productCd}/payment-page`;

  try {
    const { data } = await httpClient.get<KurlyMembersCheckoutApiResponse>(url);

    return data;
  } catch (err) {
    throw handleKurlyMembersCheckoutError(err as AxiosError);
  }
};

// 컬리멤버스 결제수단 변경 주문서 정보 조회
export const readKurlyMembersChangePaymentMethod = async (productCd: string) => {
  const url = `/member/proxy/membership/v1/subscriptions/payments/products/${productCd}/payment-method-page`;

  try {
    const { data } = await httpClient.get<KurlyMembersChangePaymentMethodApiResponse>(url);

    return data;
  } catch (err) {
    throw handleKurlyMembersCheckoutError(err as AxiosError);
  }
};
