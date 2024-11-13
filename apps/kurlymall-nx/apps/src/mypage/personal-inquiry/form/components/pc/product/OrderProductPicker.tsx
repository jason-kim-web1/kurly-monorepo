import styled from '@emotion/styled';

import { OrderProductSearchInfoState } from '../../../slice';
import ProductSearchSection from '../../shared/input/product/search/ProductSearchSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0 20px 12px;
`;

interface Props {
  searchInfo: OrderProductSearchInfoState;
}

export default function OrderProductPicker({ searchInfo }: Props) {
  return (
    <Container>
      <ProductSearchSection searchInfo={searchInfo} displaySearchIcon />
    </Container>
  );
}
