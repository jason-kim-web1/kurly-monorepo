import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import ListSwiper from '../list/ListSwiper';
import { productListSlidePerView } from '../constant';
import MainProductCard from './MainProductCard';
import type { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const ProductCard = styled(MainProductCard)`
  width: 249px;
  .image-container {
    height: 320px;
  }
`;

interface Props {
  products: ProductData[];
  landingUrl?: string;
  selectProduct(selectProduct: ProductMainSelectData): void;
  selectMore(): void;
  imageType?: ProductImageType;
}

export default function ProductListSection({
  products,
  landingUrl,
  selectProduct,
  selectMore,
  imageType = ProductImageType.MAIN_PRODUCT_LIST_ITEM,
}: Props) {
  if (isEmpty(products)) {
    return null;
  }

  const items = products.map((product, index) => (
    <ProductCard key={product.no} index={index} selectProduct={selectProduct} product={product} imageType={imageType} />
  ));

  return (
    <ListSwiper
      items={items}
      top={160}
      slidesPerView={productListSlidePerView}
      landingUrl={landingUrl}
      handleSelectMore={selectMore}
    />
  );
}
