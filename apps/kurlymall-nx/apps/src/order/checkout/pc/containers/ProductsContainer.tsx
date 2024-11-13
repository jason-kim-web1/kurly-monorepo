import { isEmpty } from 'lodash';

import { ProductsSkeleton } from '../components/ProductsSkeleton';
import Products from './Products';
import { useAppSelector } from '../../../../shared/store';

export default function ProductsContainer() {
  const products = useAppSelector(({ checkout }) => checkout.products);

  if (isEmpty(products)) {
    return <ProductsSkeleton />;
  }

  return <Products />;
}
