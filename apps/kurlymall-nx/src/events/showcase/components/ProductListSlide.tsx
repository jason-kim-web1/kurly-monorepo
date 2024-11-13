import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useInView } from 'react-intersection-observer';
import { isEmpty, nth } from 'lodash';
import { css } from '@emotion/react';

// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css/pagination';
import { Navigation, Pagination, SwiperOptions } from 'swiper';

import styled from '@emotion/styled';

import { addComma } from '../../../shared/services';
import COLOR from '../../../shared/constant/colorset';
import type { ProductSlide } from '../types';
import { KURLY_URL } from '../../../shared/configs/config';
import { ignoreError } from '../../../shared/utils/general';
import { amplitudeService } from '../../../shared/amplitude';
import { SelectEventPageButton, ViewEventItem } from '../../../shared/amplitude/events/event';
import { isWebview } from '../../../../util/window/getDevice';
import deepLinkUrl from '../../../shared/constant/deepLink';
import SwiperIndexIndicator from '../../../main/components/shared/section/SwiperIndexIndicator';
import { CollectionSetProductItemType } from '../../../shared/api/events/collection/types';

const Section = styled.section<{ isBrandType: boolean }>`
  width: 100%;
  background-color: ${({ isBrandType }) => (isBrandType ? '#222' : '#06b360')};
  overflow: hidden;
`;

const SectionTitle = styled.h3`
  color: ${COLOR.kurlyWhite};
  font-size: 28px;
  font-weight: 600;
  line-height: 36px;
  padding-top: 36px;
  text-align: center;
`;

const SubTitle = styled.div`
  color: ${COLOR.kurlyGray150};
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  opacity: 0.9;
  padding-top: 8px;
  padding-bottom: 28px;
`;

const swiperStyle = css`
  width: 100vw;
  height: 430px;
  display: flex;
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }

  .swiper-slide {
    max-width: 268px;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: ${COLOR.kurlyWhite};
    opacity: 0.6;
  }

  .swiper-pagination-bullet-active {
    background-color: ${COLOR.kurlyBlack};
    opacity: 1;
  }
`;

const ProductCardWrapper = styled.article`
  border-radius: 12px;
  background-color: ${COLOR.kurlyWhite};
`;

const ImageWrapper = styled.button`
  display: inline-block;
  max-width: 268px;
  width: 100%;
  height: 308px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
`;

const ProductInformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: ${COLOR.kurlyWhite};
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const ProductInformation = styled.div`
  max-width: 160px;
`;

const Name = styled.h3`
  padding-bottom: 2px;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DiscountRate = styled.span`
  color: ${COLOR.pointText};
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  padding-right: 2px;
`;

const Price = styled.span`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
`;

const Button = styled.button`
  width: 60px;
  height: 30px;
  border: 1px solid ${COLOR.kurlyGray300};
  border-radius: 4px;
`;

const IndexIndicator = styled(SwiperIndexIndicator)`
  width: 48px;
  background-color: rgba(255, 255, 255, 0.15);
  height: 20px;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  border-radius: 10px;
`;

const getProductDetailLandingURL = (contentNo: number) => `${KURLY_URL}/goods/${contentNo}`;

const SWIPER_OPTIONS = {
  slidesPerView: 'auto',
  initialSlide: 0,
  spaceBetween: 8,
  slidesOffsetBefore: 8,
  slidesOffsetAfter: 8,
  loop: true,
  centeredSlides: true,
  centeredSlidesBounds: true,
} as SwiperOptions;

interface Props {
  productList: CollectionSetProductItemType[];
  productSlide: ProductSlide;
  type: string;
}

const ProductListSlide = ({ productList, productSlide, type }: Props) => {
  const router = useRouter();
  const isBrandType = type === 'brand';
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const displayProductList = productList.filter(({ isSales, isPurchaseStatus }) => isSales && isPurchaseStatus);
  const [checkedProductList, setCheckedProductList] = useState(displayProductList);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToProductDetail = (contentNo: number) => {
    if (isWebview()) {
      location.href = `${deepLinkUrl.PRODUCT}${contentNo}`;
      return;
    }

    void router.push(getProductDetailLandingURL(contentNo));
  };

  const handleClickProductCard =
    ({ no, name, position }: { no: number; name: string; position: number }) =>
    () => {
      ignoreError(() => {
        amplitudeService.logEvent(
          new SelectEventPageButton({
            url: getProductDetailLandingURL(no),
            message: name,
            selectionType: 'product_detail',
            position: String(position),
            contentId: String(no),
            contentName: name,
          }),
        );
      });

      goToProductDetail(no);
    };

  const ProductSlide = displayProductList?.map(
    ({ productVerticalMediumUrl, no, name, discount, salesPrice }, index) => {
      const mainImage = productVerticalMediumUrl || '';
      const position = index + 1;
      return (
        <SwiperSlide key={no}>
          <ProductCardWrapper>
            <ImageWrapper type="button" onClick={handleClickProductCard({ no, name, position })}>
              <ProductImage src={mainImage} alt={name} />
            </ImageWrapper>
            <ProductInformationWrapper>
              <ProductInformation>
                <Name>{name}</Name>
                <div>
                  {!!discount?.rate ? <DiscountRate>{discount.rate}%</DiscountRate> : null}
                  <Price>{addComma(discount?.price ?? salesPrice)}원</Price>
                </div>
              </ProductInformation>
              <Button onClick={handleClickProductCard({ no, name, position })}>보러가기</Button>
            </ProductInformationWrapper>
          </ProductCardWrapper>
        </SwiperSlide>
      );
    },
  );

  const logViewEvent = useCallback(
    (realIndex: number) => {
      if (!displayProductList || !inView || isEmpty(checkedProductList)) {
        return;
      }

      const currentProduct = nth(displayProductList, realIndex);
      if (!currentProduct) {
        return;
      }

      const filteredList = checkedProductList.filter((product) => product.no !== currentProduct.no);
      setCheckedProductList(filteredList);

      if (isEmpty(checkedProductList)) {
        return;
      }

      ignoreError(() => {
        amplitudeService.logEvent(
          new ViewEventItem({
            url: `${KURLY_URL}${router.asPath}`,
            previousUrl: '',
            contentId: String(currentProduct.no),
            contentName: currentProduct.name,
            position: String(realIndex + 1),
            eventItemCategory: 'slide',
          }),
        );
      });
    },
    [displayProductList, inView, checkedProductList, router.asPath],
  );

  const handleChangeSlide = (realIndex: number) => {
    logViewEvent(realIndex);
  };

  useEffect(() => {
    if (inView) {
      logViewEvent(0);
    }
  }, [inView]);

  if (isEmpty(displayProductList)) {
    return null;
  }

  // 10개 이하일 경우에 slide bullet indicator, 10개를 초과했을 경우 숫자 indicator 노출
  const isSlideBulletDisplayed = displayProductList.length < 11;

  return (
    <Section ref={ref} isBrandType={isBrandType}>
      <SectionTitle>{productSlide?.title}</SectionTitle>
      <SubTitle>{productSlide?.description}</SubTitle>
      <Swiper
        {...SWIPER_OPTIONS}
        pagination={isSlideBulletDisplayed}
        css={[
          swiperStyle,
          isBrandType &&
            css`
              .swiper-pagination-bullet-active {
                background-color: ${COLOR.kurlyWhite};
              }
            `,
        ]}
        modules={[Navigation, Pagination]}
        onSlideChange={(s) => {
          handleChangeSlide(s.realIndex);
          setCurrentIndex(s.realIndex);
        }}
      >
        {ProductSlide}
        {!isSlideBulletDisplayed ? (
          <IndexIndicator currentIndex={currentIndex} totalLength={displayProductList.length} />
        ) : null}
      </Swiper>
    </Section>
  );
};

export { ProductListSlide };
