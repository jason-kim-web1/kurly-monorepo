import useCartDetail from './useCartDetail';
import { useAppSelector } from '../../../shared/store';

export default function useDealProducts() {
  const { availableProducts } = useCartDetail();

  const selectedCartItems = useAppSelector(({ cart }) => cart.selectedCartItems);

  const dealProducts = availableProducts
    .filter((product) => selectedCartItems.includes(product.dealProductNo))
    .map((product) => ({
      dealProductNo: product.dealProductNo,
      quantity: product.quantity,
      dealProductName: product.dealProductName,
    }));

  return { dealProducts };
}
