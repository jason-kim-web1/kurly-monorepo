import React from 'react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperClass } from 'swiper/types';

import { MdChoicesOption } from '../../../interfaces/MainSection.interface';
import ProductList from './ProductList';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

interface Props {
  selectedIndex: number;
  options: MdChoicesOption[];
  setSwiper(swiper: SwiperClass): void;
  changeOption(code: string): void;
  selectProduct(selectProduct: ProductMainSelectData): void;
}

export default function ProductListSwiperContainer({
  setSwiper,
  selectedIndex,
  options,
  changeOption,
  selectProduct,
}: Props) {
  const handleChange = ({ realIndex }: { realIndex: number }) => {
    const currentOption = options[realIndex];
    changeOption(currentOption.code);
  };

  return (
    <Swiper onSwiper={setSwiper} onRealIndexChange={handleChange} initialSlide={selectedIndex}>
      {options.map(({ code, products, loading }) => (
        <SwiperSlide key={code}>
          {({ isPrev, isActive, isNext }) =>
            (isPrev || isActive || isNext) && (
              <ProductList
                products={products}
                loading={loading}
                handleSelectProduct={selectProduct}
                imageType={ProductImageType.MAIN_MD_CHOICE_ITEM}
              />
            )
          }
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
