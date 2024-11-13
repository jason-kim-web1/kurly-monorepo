import { AxiosError } from 'axios';

import httpClient, { withCredentialsOption } from '../../configs/http-client';
import { handleCheckoutError } from '../../error-handlers/CheckoutErrorHandlers';

import {
  PlaceOrderRequest,
  PlaceOrderResponse,
  PaymentCancelRequest,
  PaymentCompleteRequest,
  PaymentCompleteResponse,
  BaseApiResponse,
  GiftPlaceOrderRequest,
  BaseResponse,
  FailedOrderResponse,
} from '../../interfaces';

// 주문 시작 - 주문서
export const postPlaceOrder = async (params: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  const url = '/order/v2/place-order';

  try {
    const { data } = await httpClient.post(url, params);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 주문 시작 - 함깨구매 주문서
export const postJoinPlaceOrder = async (params: PlaceOrderRequest): Promise<PlaceOrderResponse> => {
  const url = '/order/v1/join/place-order';

  try {
    const { data } = await httpClient.post<BaseResponse<PlaceOrderResponse>>(url, params);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 주문 시작 - 선물하기
export const postGiftPlaceOrder = async (params: GiftPlaceOrderRequest): Promise<PlaceOrderResponse> => {
  const url = '/gift-order/v2/receipt';

  try {
    const { data } = await httpClient.post(url, params);
    return data.data;
  } catch (err) {
    throw handleCheckoutError(err as AxiosError);
  }
};

// 결제 시도 중 이탈 - 주문서
export const postPaymentCancel = async (params: PaymentCancelRequest): Promise<BaseApiResponse<null>> => {
  const url = '/order/v1/payment-cancel';

  try {
    const { data } = await httpClient.post(url, params);
    return data;
  } catch (err) {
    throw err;
  }
};

// 결제 시도 중 이탈 - 선물하기
export const postGiftPaymentCancel = async (params: PaymentCancelRequest): Promise<BaseApiResponse<null>> => {
  const url = '/gift-order/v2/receipt/payment-cancel';

  try {
    const { data } = await httpClient.post(url, params);
    return data;
  } catch (err) {
    throw err;
  }
};

// 주문 완료 - 주문서
export const postPaymentComplete = async (
  params: PaymentCompleteRequest,
): Promise<BaseApiResponse<PaymentCompleteResponse>> => {
  const url = '/order/v1/payment-complete';

  try {
    const { data } = await httpClient.post(url, params, withCredentialsOption);
    return data;
  } catch (err) {
    throw err;
  }
};

// 주문 완료 - 선물하기
export const postGiftPaymentComplete = async (
  params: PaymentCompleteRequest,
): Promise<BaseApiResponse<PaymentCompleteResponse>> => {
  const url = '/gift-order/v2/receipt/payment-complete';

  try {
    const { data } = await httpClient.post(url, params);
    return data;
  } catch (err) {
    throw err;
  }
};

// 주문 실패 페이지에서 사용하는 주문정보
export const getFailedOrder = async (orderNo: string) => {
  const url = `/order/v1/failed-orders/${orderNo}`;

  try {
    const { data } = await httpClient.get<BaseResponse<FailedOrderResponse>>(url);
    return data.data;
  } catch (err) {
    throw err;
  }
};
