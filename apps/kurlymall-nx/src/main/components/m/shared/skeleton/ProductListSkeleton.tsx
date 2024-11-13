import styled from '@emotion/styled';

import ProductCardSkeleton from './ProductCardSkeleton';
import Repeat from '../../../../../shared/components/Repeat';

const List = styled.div`
  display: flex;
  gap: 1px;
  overflow-y: hidden;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ListProductCard = styled(ProductCardSkeleton)``;

export default function ProductListSkeleton() {
  return (
    <List>
      <Repeat count={3}>
        <ListProductCard />
      </Repeat>
    </List>
  );
}
