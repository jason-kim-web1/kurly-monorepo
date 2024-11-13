import styled from '@emotion/styled';

import { times } from 'lodash';

import ProductCardSkeleton from './ProductCardSkeleton';
import { productListSlidePerView } from '../../constant';

const List = styled.div`
  display: flex;
`;

export default function ProductListSkeleton() {
  return (
    <List>
      {times(productListSlidePerView, (num) => (
        <ProductCardSkeleton key={num} />
      ))}
    </List>
  );
}
