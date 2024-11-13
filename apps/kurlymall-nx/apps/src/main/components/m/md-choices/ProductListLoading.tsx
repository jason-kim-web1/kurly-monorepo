import styled from '@emotion/styled';

import { times } from 'lodash';

import ProductCardSkeleton from '../shared/ProductCardSkeleton';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  column-gap: 4px;
  row-gap: 8px;
`;

const ProductCard = styled(ProductCardSkeleton)`
  width: 29vw;
`;

export default function ProductListLoading() {
  return (
    <Container>
      {times(6, (num) => (
        <ProductCard key={num} />
      ))}
    </Container>
  );
}
