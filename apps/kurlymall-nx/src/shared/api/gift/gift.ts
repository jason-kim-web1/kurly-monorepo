import httpClient from '../../configs/http-client';
import { AcceptInfo, DealProducts, GiftStatus } from '../../constant';

import {
  UnknownError,
  NonExistOrderDetailsError,
  GiftApprovedFailError,
  GiftRejectFailError,
  GiftCancelFailError,
  GiftReceiveFailError,
} from '../../errors';
import { BaseResponse } from '../../interfaces';
import { GiftOrderDetailResponse, GiftOrderListRequestParams, GiftOrderListResponse } from '../../interfaces/Gift';
import { Invoice } from '../../interfaces/OrderDetail';

export type GiftNotificationMethod = 'SMS' | 'KAKAO_TALK';

export interface GiftProductItem {
  dealProductNo: number;
  imageUrl: string;
  dealProductName: string;
  contentsProductNo: number;
  contentsProductName: string;
  quantity: number;
  displayPrice: number;
  displayDiscountPrice: number;
  isGiveawayProduct: boolean;
}

export interface GiftReceiveResponse {
  orderNo: number;
  ordererName: string;
  recipientName: string;
  recipientMobile: string;
  status: GiftStatus;
  dealProducts: DealProducts;
  message: string;
  giftSentDateTime: string;
  availableDate: string;
  giftAcceptedDateTime?: string;
  giftRejectedDateTime?: string;
  giftCanceledDateTime?: string;
  invoice?: Invoice;
}

interface GiftInformationResponse {
  // 대표 주문번호
  groupOrderNo: number;
  // 선물수신인용 대표주문번호
  externalGroupOrderNo: string;
  // 주문자명
  ordererName: string;
  // 선물수신자명
  recipientName: string;
  // 선물수신자 연락처 (형식: 010-0000-0000)
  recipientMobile: string;
  // 선물주문 상태
  status: GiftStatus;
  // 딜 상품
  dealProducts: DealProducts[];
  // 선물 메시지
  message: string;
  // 선물주문 발송일시
  giftSentDateTime: string;
  // 선물받기 수락일시
  giftAcceptedDateTime: string;
  // 선물받기 거절일시
  giftRejectedDateTime: string;
  // 선물주문 취소일시
  giftCanceledDateTime: string;
  // 선물받기 수락가능 기간
  availableDate: string;
  // 배송 정보
  invoices: Invoice[];
}

// 선물 주문 내역 조회
export const fetchGiftOrderList = async (params: GiftOrderListRequestParams) => {
  const url = '/gift-order/v2/receipt';

  try {
    const { data } = await httpClient.get<BaseResponse<GiftOrderListResponse>>(url, {
      params,
    });

    return data.data;
  } catch (err) {
    throw new UnknownError(err);
  }
};

// 선물 내역 상세 조회
export const fetchGiftOrderDetail = async (orderNo: number): Promise<GiftOrderDetailResponse> => {
  const url = `/gift-order/v2/receipt/${orderNo}`;

  try {
    const { data } = await httpClient.get<BaseResponse<GiftOrderDetailResponse>>(url);
    return data.data;
  } catch (err) {
    if (err.response.status === 404 || err.response.status === 401) {
      throw new Error('존재하지 않는 주문번호입니다.');
    }
    throw new UnknownError(err);
  }
};

// 선물 수신자 조회(게스트 토큰)
export const fetchGiftInformation = async (externalOrderNo: string) => {
  const url = `/gift-order/v2/recipient/receipt/${externalOrderNo}`;
  try {
    const { data } = await httpClient.get<BaseResponse<GiftInformationResponse>>(url);
    return data.data;
  } catch (err) {
    if (err.response.status === 404) {
      throw new NonExistOrderDetailsError(err);
    }

    throw new UnknownError(err);
  }
};

// 선물 수락
export const postGiftApproved = async (orderNo: string, acceptInfo: AcceptInfo) => {
  const url = `/gift-order/v2/recipient/receipt/${orderNo}/accept`;
  try {
    await httpClient.put(url, acceptInfo);
  } catch (err) {
    throw new GiftApprovedFailError(err);
  }
};

// 선물 거절
export const postGiftReject = async (orderNo: string) => {
  const url = `/gift-order/v2/recipient/receipt/${orderNo}/reject`;
  try {
    await httpClient.put(url);
  } catch (err) {
    throw new GiftRejectFailError(err);
  }
};

// 선물 주문 취소
export const postGiftOrderCancel = async ({ orderNo, reasonDetail }: { orderNo: number; reasonDetail: string }) => {
  const url = `/gift-order/v2/receipt/${orderNo}/cancel`;
  try {
    await httpClient.put(url, { reasonDetail });
  } catch (err) {
    throw new GiftCancelFailError(err);
  }
};

// 선물 메시지 재전송
export const postSMSMessage = async (groupOrderNo: number) => {
  const url = `/gift-order/v2/receipt/${groupOrderNo}/resend`;

  try {
    await httpClient.post(url);
  } catch (err) {
    throw new GiftReceiveFailError(err);
  }
};
