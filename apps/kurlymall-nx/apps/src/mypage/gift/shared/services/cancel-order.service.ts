import { isEmpty } from 'lodash';

import { GiftStatus } from '../../../../shared/constant';

import { GiftDetailItem, GiftDetails } from '../../../../shared/interfaces/Gift';

import { GiftOrderStatus } from '../enum/GiftOrderStatus.enum';

interface Props {
  products: GiftDetailItem[];
  suffixName?: string;
}

export const parseOrderSummary = ({ products = [], suffixName = '건' }: Props): string => {
  if (isEmpty(products)) {
    return '';
  }

  const productsNames: string[] = products.map(({ dealProductName }) => dealProductName);

  // 주문이 하나이고 상품이 1개일 때
  if (products.length === 1) {
    return productsNames[0];
  }

  const suffix = `${productsNames.length - 1}${suffixName}`;
  return `${productsNames[0]} 외 ${suffix}`;
};

export interface CancelPrice {
  totalDealProductPrice: number;
  totalDealProductDiscountPrice: number;
  totalCouponDiscountPrice: number;
  totalUsedFreePoint: number;
  totalUsedPaidPoint: number;
  totalPaymentPrice: number;
  totalAccruedPoint: number;
  deliveryPrice: number;
  totalCardInstantDiscountPrice: number;
}

export interface CancelDetail {
  summary?: string;
  price: CancelPrice;
}

export const getOrderDetail = (data: GiftDetails): CancelDetail => {
  const summary = parseOrderSummary({ products: data.products });

  const { payment } = data;

  return {
    summary,
    price: {
      totalDealProductPrice: payment?.totalDisplayProductsPrice ?? 0,
      totalDealProductDiscountPrice: payment?.totalDisplayProductsDiscountPrice ?? 0,
      totalCouponDiscountPrice: payment?.totalCouponDiscountPrice ?? 0,
      totalUsedFreePoint: payment?.totalUsedFreePoint ?? 0,
      totalUsedPaidPoint: payment?.totalUsedPaidPoint ?? 0,
      totalPaymentPrice: payment?.totalPaymentPrice ?? 0,
      totalAccruedPoint: payment?.totalAccruedPoint ?? 0,
      deliveryPrice: payment?.deliveryPrice ?? 0,
      totalCardInstantDiscountPrice: payment?.totalCardInstantDiscountPrice ?? 0,
    },
  };
};

export const checkCancelable = ({
  isSelfCancelable,
  orderStatus,
}: {
  isSelfCancelable: boolean;
  orderStatus: GiftStatus;
}) => {
  if (orderStatus === GiftOrderStatus.ACCEPTED) {
    return '배송준비가 시작되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.';
  }

  if (orderStatus === GiftOrderStatus.DELIVERED) {
    return '배송이 완료되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.';
  }

  if (orderStatus === GiftOrderStatus.CANCELED || orderStatus === GiftOrderStatus.REJECTED) {
    return '이미 취소된 상품이 포함되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.';
  }

  if (!isSelfCancelable) {
    return '상품준비가 시작되어 주문 취소가 불가능합니다. \n고객행복센터로 문의바랍니다.';
  }

  return '';
};
