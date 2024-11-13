import { isEmpty } from 'lodash';

import { validateDealProductQuantity } from '../../../shared/utils/validate-deal-product-quantity';
import { CartProduct } from '../interface/CartProduct';

interface Props {
  quantity: number;
  item: CartProduct;
}

export const getQuantityAlertMessage = ({
  quantity,
  item,
}: Props): {
  text: string;
  changedQuantity: number;
} => {
  const { voucher, dealProductName, isNotEnoughStock, minQuantity, maxQuantity } = item;

  if (voucher?.type === 'LUCKY_BOX' && quantity > 1) {
    return {
      text: `${dealProductName} 상품의 최대 구매 수량은 1개 입니다.`,
      changedQuantity: 1,
    };
  }

  // 딜 수량 검증
  const { text, changedQuantity } = validateDealProductQuantity({
    quantity,
    dealProductName,
    dealProductLimit: {
      min: minQuantity,
      max: maxQuantity,
    },
  });

  if (!isEmpty(text)) {
    return {
      text,
      changedQuantity,
    };
  }

  if (isNotEnoughStock && quantity > 5) {
    return {
      text: `${dealProductName} 상품의 잔여 재고는 5개 미만입니다.`,
      changedQuantity: 5,
    };
  }

  return {
    text: '',
    changedQuantity: quantity,
  };
};
