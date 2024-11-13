import styled from '@emotion/styled';

import { ReactNode } from 'react';

import { OrderProductSearchInfoState } from '../../../slice';
import ProductSearchSection from '../../shared/input/product/search/ProductSearchSection';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Description = styled.div`
  margin-top: 0.625rem;
  width: 100%;
  span {
    letter-spacing: -0.17px;
    font-size: 0.75rem;
    color: #999;
  }
`;

const ProductSearchSectionWrap = styled.div`
  padding: 0.375rem 1.25rem;
  flex: 2;
`;

interface Props {
  searchInfo: OrderProductSearchInfoState;
  children: ReactNode;
  description?: string;
}

export default function OrderProductPicker({ searchInfo, children, description }: Props) {
  return (
    <Container>
      <ProductSearchSectionWrap>
        <ProductSearchSection searchInfo={searchInfo} displaySearchIcon={false} />
        <Description>{description && <span>{description}</span>}</Description>
      </ProductSearchSectionWrap>
      {children}
    </Container>
  );
}
