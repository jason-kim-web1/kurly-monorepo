import styled from '@emotion/styled';

import { ProductData } from '../../../../shared/interfaces';

import LandingUrlItem from './LandingUrlItem';
import MainProductCard from './MainProductCard';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const Container = styled.div`
  display: flex;
  gap: 1px;
  overflow-y: hidden;
  overflow-x: auto;
  padding-right: 16px;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ListProductCard = styled(MainProductCard)`
  flex-shrink: 0;
  scroll-snap-align: start;
  min-width: calc(40vw + 16px);
  max-width: calc(40vw + 16px);
  padding-left: 16px;
  margin-left: -8px;
  &:first-of-type {
    margin-left: 0;
  }
  .image-container {
    min-width: 40vw;
    padding-top: 130%;
  }
  .product-info {
    padding: 8px 0 0;
  }
`;

interface Props {
  products: ProductData[];
  landingUrl?: string;
  imageType?: ProductImageType;
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore(): void;
}

export default function MainProductList({
  products,
  landingUrl,
  selectProduct,
  selectMore,
  imageType = ProductImageType.MAIN_PRODUCT_LIST_ITEM,
}: Props) {
  return (
    <Container>
      {products.map((product, index) => (
        <ListProductCard
          key={product.no}
          index={index}
          selectProduct={selectProduct}
          product={product}
          imageType={imageType}
        />
      ))}
      {landingUrl && <LandingUrlItem landingUrl={landingUrl} handleSelectMore={selectMore} />}
    </Container>
  );
}
