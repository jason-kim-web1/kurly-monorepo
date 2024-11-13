import { format, isValid, parseISO } from 'date-fns';
import { ko } from 'date-fns/locale';

import { addComma } from '../../../../shared/services';

import { AcceptedProduct, ContentType, ProductProps } from '../../types';

interface GetAcceptedProductProps {
  changeATFOption: boolean;
  product: ProductProps;
  productDetailState: AcceptedProduct;
}

export function getAcceptedProduct({
  changeATFOption,
  product,
  productDetailState,
}: GetAcceptedProductProps): AcceptedProduct {
  return changeATFOption
    ? {
        ...productDetailState,
        memberCoupon: {
          ...productDetailState.memberCoupon,
        },
      }
    : {
        ...product,
        memberCoupon: {
          ...product.memberCoupon,
        },
      };
}

interface GetDealDisabledTextProps {
  isPurchaseStatus: boolean;
  isSoldOut: boolean;
}

export function getDealDisabledText({ isPurchaseStatus, isSoldOut }: GetDealDisabledTextProps) {
  if (!isPurchaseStatus) {
    return '구매불가';
  }

  if (isSoldOut) {
    return '품절';
  }

  return null;
}

interface GetCartButtonTextProps {
  isDirectOrder: boolean;
  isProductDisabled: boolean;
  totalPrice: number;
  totalQuantity: number;
}

export function getCartButtonText({
  isDirectOrder,
  isProductDisabled,
  totalPrice,
  totalQuantity,
}: GetCartButtonTextProps) {
  const orderTypeText = isDirectOrder ? '바로구매' : '장바구니 담기';

  return !isProductDisabled && totalQuantity > 0 ? `${addComma(totalPrice)}원 ${orderTypeText}` : orderTypeText;
}

export function getFormattedDate(value: string, formatType = 'yyyy년 MM월 dd일 EEE요일') {
  const parsedDate = parseISO(value);
  const isValidDate = isValid(parsedDate);

  return isValidDate ? format(parsedDate, formatType, { locale: ko }) : value;
}

export function buildFormattedDateInString(value: string) {
  const dateRegex = new RegExp(/(\d{4})-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])/g);

  return value.replace(dateRegex, '$1년 $2월 $3일');
}

interface GetContentsSoldOutGuideTextProps {
  contentType: ContentType;
  isSoldOut: boolean;
  soldOutText: string;
}

export const getContentsSoldOutGuideText = ({
  contentType,
  isSoldOut,
  soldOutText,
}: GetContentsSoldOutGuideTextProps) => {
  if (contentType === 'SINGLE' || contentType === 'MULTI') {
    return '';
  }

  if (!isSoldOut) {
    return '';
  }

  return buildFormattedDateInString(soldOutText);
};
