import { flattenDeep, isEmpty } from 'lodash';

import { fetchGiftOrderDetail, fetchGiftOrderList, postGiftOrderCancel, postSMSMessage } from '../../../../shared/api';
import { GiftDetails, GiftOrderListRequestParams, GiftDetailItem } from '../../../../shared/interfaces/Gift';

import { Order, DealProduct } from '../../../../shared/interfaces/OrderDetail';

export const giftOrderList = async (params: GiftOrderListRequestParams) => {
  const { items, pagination } = await fetchGiftOrderList(params);

  if (isEmpty(items)) {
    return {
      orders: [],
      pagination: {
        hasNext: false,
        totalPage: 0,
        currentPage: 0,
        limit: 0,
        startDate: '',
        endDate: '',
      },
    };
  }

  return {
    orders: items,
    pagination,
  };
};

export const fetchOrderDetail = async (orderNo: number): Promise<GiftDetails> => {
  const data = await fetchGiftOrderDetail(orderNo);

  const products: GiftDetailItem[] = flattenDeep(data.orders.map((order: Order) => order.dealProducts)).map(
    (product: DealProduct) => ({
      dealProductNo: product.dealProductNo,
      dealProductName: product.dealProductName,
      contentsProductName: product.contentsProductName,
      contentsProductNo: product.contentsProductNo,
      imageUrl: product.productVerticalSmallUrl,
      quantity: product.quantity,
      displayPrice: product.displayPrice,
      displayDiscountPrice: product.displayDiscountPrice,
      isGiveawayProduct: product.isGiveawayProduct,
    }),
  );

  return {
    groupOrderNo: data.groupOrderNo,
    externalGroupOrderNo: data.externalGroupOrderNo,
    status: data.status,
    recipientName: data.recipientName,
    recipientMobile: data.recipientMobile,
    message: data.message,
    ordererName: data.ordererName,
    possibleNotificationSentCount: data.possibleNotificationSentCount,
    notificationSentCount: data.notificationSentCount,
    isSelfCancelable: data.isSelfCancelable,
    notificationType: data.notificationType,
    availableDate: data.availableDate,
    payment: {
      receipt: data.receipt,
      method: data.paymentMethod,
      paymentGatewayId: data.paymentGatewayId,
      paymentGatewayIdDisplayName: data.paymentGatewayIdDisplayName,
      paymentCompletedAt: data.paymentCompletedAt,
      totalDisplayProductsPrice: data.totalDisplayProductsPrice,
      totalDisplayProductsDiscountPrice: data.totalDisplayProductsDiscountPrice,
      totalPaymentPrice: data.totalPaymentPrice,
      deliveryPrice: data.deliveryPrice,
      totalCouponDiscountPrice: data.totalCouponDiscountPrice,
      totalUsedPoint: data.totalUsedFreePoint + data.totalUsedPaidPoint,
      totalUsedFreePoint: data.totalUsedFreePoint,
      totalUsedPaidPoint: data.totalUsedPaidPoint,
      totalAccruedPoint: data.totalAccruedPoint,
      totalRefundedPrice: data.totalRefundedPrice,
      totalRemainPaymentPrice: data.totalRemainPaymentPrice,
      totalRefundRequestedPrice: data.totalRefundRequestedPrice,
      totalCardInstantDiscountPrice: data.totalCardInstantDiscountPrice,
    },
    products,
  };
};

export const postOrderCancel = (params: { orderNo: number; reasonDetail: string }) => postGiftOrderCancel(params);

export const postGiftMessage = (groupOrderNo: number) => postSMSMessage(groupOrderNo);
