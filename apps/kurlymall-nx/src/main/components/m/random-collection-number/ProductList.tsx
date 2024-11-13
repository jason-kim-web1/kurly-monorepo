// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';

import { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import ProductCard from '../../shared/random-collection-number/ProductCard';
import COLOR from '../../../../shared/constant/colorset';

const Container = styled.div`
  .swiper {
    .swiper-slide {
      width: 190px;
    }
  }
`;

const NumberProductCard = styled(ProductCard)`
  background-color: ${COLOR.kurlyWhite};
`;

interface Props {
  products: ProductData[];
  selectProduct(selectProduct: ProductMainSelectData): void;
}

const ProductList = ({ products, selectProduct }: Props) => {
  return (
    <Container>
      <Swiper loop centeredSlides slidesPerView="auto" spaceBetween={12}>
        {products.map((product, index) => (
          <SwiperSlide key={product.no}>
            <NumberProductCard index={index} selectProduct={selectProduct} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export { ProductList };
