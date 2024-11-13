// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from '@emotion/styled';

import type { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import { ProductCard } from '../../shared/group-collection-number/ProductCard';
import LandingUrlItem from '../shared/LandingUrlItem';
import ShowAllProductsButton from './ShowAllProductsButton';

const Container = styled.div`
  margin-top: 16px;

  .swiper {
    .swiper-wrapper {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .swiper-slide {
        width: 230px;

        &:nth-child(-n + 2) {
          margin-right: 32px;
        }

        &:nth-child(4) {
          width: 107px;
        }

        .product-card:not(:first-child) {
          margin-top: 12px;
        }
      }
    }
  }
`;

interface Props {
  chunkProductList: ProductData[][];
  onSelectProduct: (selectProduct: ProductMainSelectData) => void;
  onSelectMore: () => void;
  selectedCollection?: { code: string; name: string };
  landingUrl?: string;
}

const ProductList = ({ chunkProductList, onSelectProduct, onSelectMore, selectedCollection, landingUrl }: Props) => {
  return (
    <Container>
      <Swiper slidesPerView={'auto'} slidesOffsetBefore={16} slidesOffsetAfter={16}>
        {chunkProductList.map((productList, outIndex) => (
          <SwiperSlide key={`slide-${outIndex + 1}`}>
            {productList.map((product, index) => (
              <ProductCard
                {...product}
                className="product-card"
                key={product.no}
                index={outIndex * 3 + index}
                handleSelectProduct={onSelectProduct}
              />
            ))}
          </SwiperSlide>
        ))}
        {landingUrl ? (
          <SwiperSlide className="landing-slide">
            <LandingUrlItem landingUrl={landingUrl.replace('/m', '')} handleSelectMore={onSelectMore} />
          </SwiperSlide>
        ) : null}
      </Swiper>
      {landingUrl && selectedCollection ? (
        <ShowAllProductsButton href={landingUrl} name={selectedCollection?.name} selectMore={onSelectMore} />
      ) : null}
    </Container>
  );
};

export { ProductList };
