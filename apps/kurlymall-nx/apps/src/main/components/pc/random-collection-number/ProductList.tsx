// eslint-disable-next-line import/no-unresolved
import { isEmpty } from 'lodash';
import styled from '@emotion/styled';

import { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import ProductCard from '../../shared/random-collection-number/ProductCard';
import COLOR from '../../../../shared/constant/colorset';
import ListSwiper from '../list/ListSwiper';

const NumberProductCard = styled(ProductCard)`
  width: 190px;
  background-color: ${COLOR.bgLightGray};
`;

interface Props {
  products: ProductData[];
  landingUrl?: string;
  selectProduct(selectProduct: ProductMainSelectData): void;
  onSelectMore(): void;
}

const ProductList = ({ products, selectProduct, landingUrl, onSelectMore }: Props) => {
  if (isEmpty(products)) {
    return null;
  }

  const items = products.map((product, index) => (
    <NumberProductCard key={product.no} index={index} selectProduct={selectProduct} product={product} />
  ));

  return (
    <ListSwiper
      items={items}
      top={160}
      slidesPerView={5}
      spaceBetween={25}
      landingUrl={landingUrl}
      handleSelectMore={onSelectMore}
    />
  );
};

export { ProductList };
