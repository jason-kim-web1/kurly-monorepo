import { isEmpty } from 'lodash';

import { BenefitTitle, CardTitle } from '../../order/shared/shared/utils';

import { CheckoutCoupon, CheckoutProductItem, Product } from '../interfaces';
import { vendorStyles } from '../../order/shared/shared/constants/vendor-styles';
import { OrderType } from '../constant/order';

interface ProductSummary {
  products?: CheckoutProductItem[] | Product[];
  suffixName?: string;
}

interface ProductSummaryByCount {
  productName?: string;
  productCount?: number;
  suffixName?: string;
}

export const parseSummary = ({ products = [], suffixName = '건' }: ProductSummary) => {
  if (isEmpty(products)) {
    return { text: '' };
  }

  if (products.length === 1) {
    return {
      text: products[0].dealProductName,
    };
  }

  return {
    text: products[0].dealProductName,
    divider: '외 ',
    suffix: `${products.length - 1}${suffixName}`,
  };
};

export const parseSummaryByCount = ({
  productName = '',
  productCount = 0,
  suffixName = '건',
}: ProductSummaryByCount) => {
  const divider = ' 외 ';
  if (productCount > 1) return productName + divider + (productCount - 1) + suffixName;
  return productName;
};

// (주문서) 사용가능 쿠폰
export const placeholderCheckoutCouponText = ({
  selectedCoupon,
  availableCouponCount,
  totalCouponCount,
  isMobile = false,
}: {
  selectedCoupon?: CheckoutCoupon;
  availableCouponCount: number;
  totalCouponCount: number;
  isMobile?: boolean;
}) => {
  if (!selectedCoupon) {
    return `사용가능 쿠폰 ${availableCouponCount}장 / 전체 ${totalCouponCount}장`;
  }

  const { usable, type, totalCouponDiscount, name, paymentGateways, creditCardId } = selectedCoupon;

  const title = BenefitTitle({ disabled: !usable, type, totalCouponDiscount });
  const description = isMobile ? CardTitle({ paymentGateways, creditCardId }) : ` - ${name}`;

  return `${title}${description}`;
};

// (선물하기 주문서) 사용가능 쿠폰
export const placehoderCouponText = ({
  selectedCoupon,
  availableCouponCount,
  totalCouponCount,
}: {
  selectedCoupon?: CheckoutCoupon;
  availableCouponCount: number;
  totalCouponCount: number;
}) => {
  if (!selectedCoupon) {
    return `사용가능 쿠폰 ${availableCouponCount}장 / 전체 ${totalCouponCount}장`;
  }

  const [paymentGateway] = selectedCoupon.paymentGateways;
  if (paymentGateway === 'ALL') {
    return `${selectedCoupon.type} 쿠폰`;
  }

  const { name } = vendorStyles[paymentGateway];
  return `${selectedCoupon.type} 쿠폰 (${name} 전용)`;
};

export const isKurlyNowOrder = (orderType?: OrderType) => orderType && orderType === OrderType.KURLY_NOW;
