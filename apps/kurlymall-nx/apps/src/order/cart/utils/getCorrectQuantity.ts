import { CartProduct } from '../interface/CartProduct';

interface Props {
  item: CartProduct;
  quantity: number;
}

/*
 * 묶음 수량 단위에 맞게 수량을 보정하여 반환한다.
 */
export function getCorrectQuantity({ quantity, item }: Props) {
  const { salesUnit } = item;

  if (salesUnit === 1) {
    return quantity;
  }

  const remainder = quantity % salesUnit;
  const matchSalesUnit = remainder === 0;

  if (matchSalesUnit) {
    return quantity;
  }

  const num = item.quantity < quantity ? item.quantity : quantity;
  const result = salesUnit * Math.ceil(num / salesUnit);

  return result < salesUnit ? salesUnit : result;
}
