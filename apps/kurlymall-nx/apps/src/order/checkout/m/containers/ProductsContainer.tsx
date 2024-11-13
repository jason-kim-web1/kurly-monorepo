import { isEmpty } from 'lodash';

import { useAppSelector } from '../../../../shared/store';

import { ProductsSkeleton } from '../components/ProductsSkeleton';
import Products from './Products';

export default function ProductsContainer({ isGiftOrder }: { isGiftOrder?: boolean }) {
  const products = useAppSelector(({ checkout }) => checkout.products);

  const title = isGiftOrder ? '선물' : '주문상품';

  if (isEmpty(products)) {
    return <ProductsSkeleton title={title} />;
  }

  return <Products title={title} />;
}
