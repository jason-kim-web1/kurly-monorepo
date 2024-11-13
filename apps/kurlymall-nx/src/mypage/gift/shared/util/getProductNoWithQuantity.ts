import { Order } from '../../../../shared/interfaces/OrderDetail';
import { CartItem } from '../../../../order/cart/interface/CartProduct';

interface Props {
  orders: Order[];
}
export const getProductNoWithQuantity = ({ orders }: Props) => {
  // 상품 다시 담기 시에 필요한 정보 세팅
  const productNoWithQuantity: CartItem[] = orders?.reduce((prev: CartItem[], cur: Order) => {
    const deals = cur?.dealProducts.map(({ dealProductNo, quantity }) => ({
      dealProductNo,
      quantity,
    }));

    return [...prev, ...deals];
  }, []);

  return productNoWithQuantity;
};
