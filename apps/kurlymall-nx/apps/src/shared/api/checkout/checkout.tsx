import { AxiosError } from 'axios';

import httpClient from '../../configs/http-client';
import { handleCheckoutCalculateError } from '../../error-handlers/CheckoutCalculateErrorHandler';
import { handleCheckoutError } from '../../error-handlers/CheckoutErrorHandlers';
import {
  BaseResponse,
  CheckoutProductsRequest,
  CheckoutProductsResponse,
  PaymentMethodsResponse,
  PreferenceMethods,
  CalculateRequest,
  CalculateResponse,
  ContinuityResponse,
  PaymentMethodsRequest,
  InterestFreeResponse,
  CheckContinuityRequest,
  PersonalCustomsCodeResponse,
} from '../../interfaces';

// 일반 주문 상품 목록 조회
export const readCheckoutProducts = async (params: CheckoutProductsRequest) => {
  const url = '/order/v1/checkout';

  try {
    const { data } = await httpClient.get<BaseResponse<CheckoutProductsResponse>>(url, { params });
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 선물하기 주문 상품 목록 조회
export const readCheckoutGiftProducts = async (params: CheckoutProductsRequest) => {
  const url = '/gift-order/v2/receipt/checkout';

  try {
    const { data } = await httpClient.get<BaseResponse<CheckoutProductsResponse>>(url, { params });
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 함께구매 주문 상품 목록 조희
export const readCheckoutJoinProducts = async (params: CheckoutProductsRequest) => {
  const url = '/order/v1/join/checkout';

  try {
    const { data } = await httpClient.get<BaseResponse<CheckoutProductsResponse>>(url, { params });
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 가격 계산
export const postPriceCalculate = async (params: CalculateRequest) => {
  const url = '/order/v1/payment-price/calculate';

  try {
    const { data } = await httpClient.post<BaseResponse<CalculateResponse>>(url, params);
    return data.data;
  } catch (err) {
    throw handleCheckoutCalculateError(err as AxiosError);
  }
};

// [선물하기] 가격 계산
export const postGiftPriceCalculate = async (params: CalculateRequest) => {
  const url = '/gift-order/v2/receipt/payment-price-calculate';

  try {
    const { data } = await httpClient.post<BaseResponse<CalculateResponse>>(url, params);
    return data.data;
  } catch (err) {
    throw handleCheckoutCalculateError(err as AxiosError);
  }
};

// 사용 가능한 결제수단 및 결제수단 별 이벤트 목록
export const readPaymentMethods = async (params: PaymentMethodsRequest) => {
  const url = '/order/v1/payment-methods';

  try {
    const { data } = await httpClient.get<BaseResponse<PaymentMethodsResponse>>(url, { params });
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 마지막으로 사용했던 결제수단 조회
export const readPreferenceMethods = async () => {
  const url = '/payment-method-event/v1/payment-method-preference';

  try {
    const { data } = await httpClient.get<BaseResponse<PreferenceMethods>>(url);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 마지막으로 사용했던 결제수단 수정
export const updatePreferenceMethods = async (params: PreferenceMethods) => {
  const url = '/payment-method-event/v1/payment-method-preference';

  try {
    const { data } = await httpClient.put(url, params);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 마지막으로 사용했던 결제수단 삭제
export const deletePreferenceMethods = async () => {
  const url = '/payment-method-event/v1/payment-method-preference';

  try {
    const { data } = await httpClient.delete(url);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 컨티뉴이티 여부 확인
export const postCheckContinuity = async (params: CheckContinuityRequest) => {
  const url = '/order/v1/delivery-schedule';

  try {
    const { data } = await httpClient.post<BaseResponse<ContinuityResponse>>(url, params);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 무이자할부 혜택
export const getInterestFreeList = async () => {
  const url = '/order/v1/card/interest-free';

  try {
    const { data } = await httpClient.get<BaseResponse<InterestFreeResponse>>(url);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

/**
 * (회원) 개인통관고유부호 조회
 * @see {@link https://gateway.cloud.dev.kurly.services/member-main/docs/index.html#_%ED%95%B4%EC%99%B8_%EB%B0%B0%EC%86%A1_%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4_%EC%A1%B0%ED%9A%8C API 문서}
 */
export const getPersonalCustomsCode = async () => {
  try {
    const url = `/member/proxy/member-main/v1/member/shipments`;
    const { data } = await httpClient.get<BaseResponse<PersonalCustomsCodeResponse>>(url);
    return data.data;
  } catch (err) {
    throw new Error('개인통관고유부호를 조회할 수 없습니다. \n다시 시도해주세요.');
  }
};

/**
 * (회원) 개인통관고유부호 수정
 * @see {@link https://gateway.cloud.dev.kurly.services/member-main/docs/index.html#_%ED%95%B4%EC%99%B8_%EB%B0%B0%EC%86%A1_%EA%B0%9C%EC%9D%B8%EC%A0%95%EB%B3%B4_%EC%A1%B0%ED%9A%8C API문서}
 * @param personalCustomsCode 개인통관고우부호
 *
 */
export const putPersonalCustomsCode = async (personalCustomsCode: string) => {
  try {
    const url = `/member/proxy/member-main/v1/member/shipments`;
    await httpClient.put<BaseResponse<PersonalCustomsCodeResponse>>(url, {
      personalCustomsCode,
    });
  } catch (err) {
    throw new Error('개인통관고유부호를 수정할 수 없습니다. \n다시 시도해주세요.');
  }
};
