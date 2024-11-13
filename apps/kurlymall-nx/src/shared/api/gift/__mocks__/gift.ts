/* eslint-disable @typescript-eslint/no-unused-vars */
export const fetchGiftOrderList = async ({
  accessToken,
  page = 0,
  size = 10,
  period,
}: {
  accessToken: string;
  page: number;
  size?: number;
  period?: string;
}) => ({
  content: [
    {
      order_no: 444440,
      status: 'READY_FOR_ACCEPT',
      content_product_name: '[아티제] 테디베어 양과자 쿠키세트',
      deal_product_name: '[아티제] 테디베어 양과자 쿠키세트',
      deal_product_image_url: 'https://img-cf-dev.kurly.com/shop/data/goods/1540875942940i0.jpg',
      recipient_name: 'string',
      message: 'string',
      payment_datetime: 'string',
      total_payment_price: 0,
      possible_notification_sent_count: 0,
      notification_sent_count: 0,
      cancelable: true,
      inquiry: true,
    },
    {
      order_no: 1555555,
      status: 'ACCEPTED',
      content_product_name: '[아티제] 테디베어 양과자 쿠키세트',
      deal_product_name: '[아티제] 테디베어 양과자 쿠키세트',
      deal_product_image_url: 'https://img-cf-dev.kurly.com/shop/data/goods/1540875942940i0.jpg',
      recipient_name: 'string',
      message: 'string',
      payment_datetime: 'string',
      total_payment_price: 0,
      possible_notification_sent_count: 0,
      notification_sent_count: 0,
      cancelable: true,
      inquiry: true,
    },
    {
      order_no: 1555555,
      status: 'ACCEPTED',
      content_product_name: '[아티제] 테디베어 양과자 쿠키세트',
      deal_product_name: '[아티제] 테디베어 양과자 쿠키세트',
      deal_product_image_url: 'https://img-cf-dev.kurly.com/shop/data/goods/1540875942940i0.jpg',
      recipient_name: 'string',
      message: 'string',
      payment_datetime: 'string',
      total_payment_price: 0,
      possible_notification_sent_count: 0,
      notification_sent_count: 0,
      cancelable: true,
      inquiry: true,
    },
  ],
  paging: {
    next_page_no: 0,
    total: 0,
    total_row: 0,
  },
});

export const fetchGiftOrderDetail = async ({ accessToken, orderNo }: { accessToken: string; orderNo: number }) => ({
  data: {
    orderNo: 7000000000000,
    status: 'READY_FOR_ACCEPT',
    recipientName: '김쿠팡',
    message: '제발좀 가즈아',
    ordererName: '김컬리',
    possibleNotificationSentCount: 2,
    notificationSentCount: 0,
    cancelable: true,
    inquiry: false,
    notificationMethod: 'KAKAO_TALK',
    payment: {
      method: 'CARD',
      totalProductPrice: 45500,
      totalProductDiscount: 0,
      shippingPrice: 0,
      totalCouponDiscount: 0,
      totalUsedPoint: 100,
      totalPaymentPrice: 45400,
      paymentDatetime: '2021-07-07T12:05:39',
    },
    products: [
      {
        dealProductNo: 27977333,
        dealProductImageUrl: '',
        dealProductName: '[갈바니나] 레몬소다수355mlx12입(박스)',
        contentProductName: '[갈바니나] 유기농 과일 탄산음료 6종 1박스 (12개입)',
        quantity: 1,
        originalPrice: 1000,
        discountPrice: 800,
      },
      {
        dealProductNo: 279772,
        dealProductImageUrl: '',
        dealProductName: '[갈바니나] 레몬소다수355mlx12입(박스) 222',
        contentProductName: '[갈바니나] 유기농 과일 탄산음료 6종 1박스 (12개입) 222',
        quantity: 1,
        originalPrice: 1000,
        discountPrice: 800,
      },
    ],
  },
});

export const postGiftOrderCancel = async ({ accessToken, orderNo }: { accessToken: string; orderNo: number }) => ({
  success: true,
  message: 'success message',
  data: null,
});

export const fetchGiftInformation = async (params: { orderNo: string }) => ({
  success: true,
  message: null,
  data: {
    orderNo: 1,
    recipientName: '박쿠팡',
    status: 'READY_FOR_ACCEPT',
    dealProductName: '[아티제] 테디베어 양과자 쿠키세트',
    quantity: 1,
    giftSentDateTime: '2021-09-01 11:11:11.0',
    giftAcceptedDateTime: null,
    giftRejectedDateTime: null,
    giftCanceledDateTime: null,
    ordererName: '김컬리',
  },
});

export const postGiftApproved = async (params: {
  orderNumber: number;
  address: {
    main: string;
    sub: string;
  };
  requestMessage: string;
}) => ({
  data: 'success',
  message: '수락 이유 등',
});

export const postGiftReject = async (params: { orderNumber: number }) => ({
  data: 'success',
  message: '거절 이유 등',
});
