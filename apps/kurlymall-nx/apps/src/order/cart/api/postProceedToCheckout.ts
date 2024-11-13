import httpClient from '../../../shared/configs/http-client';
import { BaseResponse } from '../../../shared/interfaces';
import { handleCartToCheckoutError } from '../../../shared/error-handlers/CartToCheckoutErrorHandlers';
import { CartItem } from '../interface/CartProduct';
import { DeliveryTimeType } from '../../../shared/interfaces/ShippingAddress';
import { DeliveryNotice } from '../interface/DeliveryNotice';

const PROCEED_TO_CHECKOUT_URL = '/order/v2/proceed-to-checkout';

export interface ProceedToCheckoutRequest {
  dealProducts: Omit<CartItem, 'dealProductName'>[];
  address: string;
  addressDetail?: string;
  deliveryPolicy: DeliveryTimeType;
  isDirectCheckout: boolean;
  showKurlyMembersPopupMessage: boolean; // 전용상품 앱 구분을 위한 데이터
}

export interface ProceedToCheckoutResponse {
  displayMessage: {
    deliveryNotice: DeliveryNotice;
    useWebView: boolean;
  };
}

/**
 * 장바구니에서 주문하기 클릭 시 주문서를 생성하는 api 입니다.
 *
 * @param {ProceedToCheckoutRequest} params
 * @param {CartItem[]} params.dealProducts - 주문 상품 리스트
 * @param {string} params.address - 주소
 * @param {string | undefined} params.addressDetail - 상세 주소
 * @param {DeliveryTimeType} params.deliveryPolicy - 배송 유형 타입
 * @param {boolean} params.isDirectCheckout - 바로구매 여부
 * @param {boolean} params.showKurlyMembersPopupMessage - 전용상품 앱 구분을 위한 데이터
 *
 * @returns {Promise<ProceedToCheckoutResponse>} 컨티뉴이티/얼리버드 텍스트 및 스타일 객체
 */
export const postProceedToCheckout = async (params: ProceedToCheckoutRequest): Promise<ProceedToCheckoutResponse> => {
  try {
    const { data } = await httpClient.post<BaseResponse<ProceedToCheckoutResponse>>(PROCEED_TO_CHECKOUT_URL, params);
    return data.data;
  } catch (err) {
    throw handleCartToCheckoutError(err);
  }
};
