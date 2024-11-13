import { isEmpty } from 'lodash';

import { fetchGiftInformation, GiftReceiveResponse, postGiftApproved, postGiftReject } from '../../shared/api';
import { AcceptInfo } from '../../shared/constant/giftTypes';

export const getGiftInformation = async (externalOrderNo: string): Promise<GiftReceiveResponse> => {
  const data = await fetchGiftInformation(externalOrderNo);

  return {
    orderNo: data.groupOrderNo,
    ordererName: data.ordererName,
    recipientName: data.recipientName,
    recipientMobile: data.recipientMobile,
    status: data.status,
    // 현재 선물하기는 싱글 딜만 지원하고 있습니다.
    dealProducts: data.dealProducts[0],
    message: data.message,
    giftSentDateTime: data.giftSentDateTime,
    availableDate: data.availableDate,
    giftAcceptedDateTime: data.giftAcceptedDateTime,
    giftRejectedDateTime: data.giftRejectedDateTime,
    giftCanceledDateTime: data.giftCanceledDateTime,
    invoice: isEmpty(data.invoices) ? undefined : data.invoices[0],
  };
};

export const updateGiftApproved = (orderNo: string, acceptInfo: AcceptInfo) => postGiftApproved(orderNo, acceptInfo);

export const updateGiftReject = (orderNo: string) => postGiftReject(orderNo);
