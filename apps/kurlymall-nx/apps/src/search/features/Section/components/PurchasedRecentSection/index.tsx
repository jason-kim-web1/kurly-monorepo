import { ForwardedRef, forwardRef, useRef } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperClass } from 'swiper/types';
import { eq, gt, isNull, size } from 'lodash';
import Link from 'next/link';

import type { PurchasedRecentSectionViewModel, PurchasedRecentSectionItemViewModel } from '../../factory';
import { ImpressionSection } from '../../shared/components/ImpressionSection';
import COLOR from '../../../../../shared/constant/colorset';
import NextImage from '../../../../../shared/components/NextImage';
import { convertToAllKoreanNumber } from '../../../../../shared/services';
import ProductCardFunction from '../../../../../shared/components/product/card/ProductCardFunction';
import { multiMaxLineText } from '../../../../../shared/utils';
import type { ShortCutType } from '../../../../../shared/types';
import { ProductShortCutMeta, useLogger } from '../../../../contexts/LogSearchContext';

const MAX_CARD_WIDTH = 360;

const sectionStyle = css`
  background-color: ${COLOR.bgLightGray};
  padding-bottom: 24px;
`;

const titleStyle = css`
  padding: 20px 10px 16px 16px;
  color: ${COLOR.kurlyGray800};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

const swiperStyle = css`
  padding: 0 16px;
  .swiper-slide {
    max-width: ${MAX_CARD_WIDTH}px;
  }
`;

const productCardStyle = css`
  display: flex;
  height: 80px;
  background-color: ${COLOR.kurlyWhite};
  border-radius: 4px;
  overflow: hidden;
  gap: 12px;
  > .button-wrapper {
    display: flex;
    align-items: center;
    margin-right: 16px;
  }
`;

const productImageWrapStyle = css`
  position: relative;
  width: 64px;
  height: 80px;
`;

const productInfoWrapStyle = css`
  flex: 1;
  margin: 10px 0;
`;

const StyledProductCardFunction = styled(ProductCardFunction)`
  display: flex;
  width: 60px;
  height: 30px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  > svg {
    width: 18px;
    height: 18px;
    margin: 0px 4px 0 0;
  }
`;

const purchaseCountStyle = css`
  color: ${COLOR.pointText};
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;

const productNameStyle = css`
  ${multiMaxLineText(1)};
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  margin: 2px 0 4px 0;
`;

const priceInfoWrapStyle = css`
  display: flex;
`;

const discountRateStyle = css`
  display: block;
  color: ${COLOR.pointText};
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
  margin-right: 2px;
`;

const priceStyle = css`
  display: block;
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  letter-spacing: -0.5px;
`;

type OnClickProductCardFn = (product: PurchasedRecentSectionItemViewModel) => void;
type OnClickProductCardShortCutFn = (product: PurchasedRecentSectionItemViewModel, meta: ProductShortCutMeta) => void;

type SectionItemProps = {
  data: PurchasedRecentSectionItemViewModel;
  onClickProductCard: OnClickProductCardFn;
  onClickProductShortcut: OnClickProductCardShortCutFn;
  onClickProductShortcutDetail: OnClickProductCardShortCutFn;
};

const SectionItemImpl = (
  { data, onClickProductCard, onClickProductShortcut }: SectionItemProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const {
    _productDetailPageUrl,
    productNo,
    productName,
    productVerticalSmallUrl,
    discountRate,
    discountedPrice,
    salesPrice,
    isBuyNow,
    groupProduct,
    purchasedCount,
  } = data;

  const handleClickProductCard = () => onClickProductCard(data);

  const handleClickProductShortcut = (type: ShortCutType) =>
    onClickProductShortcut(data, {
      type,
    });

  const handleClickProductShortcutDetail = (type: ShortCutType) => onClickProductShortcut(data, { type });

  return (
    <Link href={_productDetailPageUrl} passHref prefetch={false}>
      <a ref={ref} href={_productDetailPageUrl} className={productCardStyle} onClick={handleClickProductCard}>
        <div className={productImageWrapStyle}>
          <NextImage src={productVerticalSmallUrl} layout="fill" objectFit="cover" alt={productName} />
        </div>
        <div className={productInfoWrapStyle}>
          <span className={purchaseCountStyle}>{purchasedCount}회 구매</span>
          <span className={productNameStyle}>{productName}</span>
          <div className={priceInfoWrapStyle}>
            {gt(discountRate, 0) ? <span className={discountRateStyle}>{discountRate}%</span> : null}
            <span className={priceStyle}>
              {eq(discountRate, 0) || isNull(discountedPrice)
                ? convertToAllKoreanNumber(salesPrice)
                : convertToAllKoreanNumber(discountedPrice)}
            </span>
          </div>
        </div>
        <StyledProductCardFunction
          code={'PURCHASABLE'}
          isGroupProduct={groupProduct.isGroup}
          canRestockNotify={false}
          contentProductNo={productNo}
          href={_productDetailPageUrl}
          isBuyNow={isBuyNow}
          deliveryTypeNames={[]}
          isVisibleBuyNowIcon={false}
          onSelectProductShortcut={handleClickProductShortcut}
          selectDetailShortcut={handleClickProductShortcutDetail}
        />
      </a>
    </Link>
  );
};

const SectionItem = forwardRef(SectionItemImpl);

type Props = {
  section: PurchasedRecentSectionViewModel;
};

const PurchasedRecentSection = ({ section }: Props) => {
  const {
    data: { title, items },
  } = section;
  const swiperRef = useRef<SwiperClass | null>(null);
  const slidesPerView = eq(size(items), 1) ? 1 : 1.07;
  const { logSelectSectionItem, logSelectSectionItemShortCut } = useLogger();

  const handleClickProductCard: OnClickProductCardFn = (product) => logSelectSectionItem(section, product);

  const handleClickProductShortcut: OnClickProductCardShortCutFn = (product, meta) =>
    logSelectSectionItemShortCut(section, product, meta);

  const handleClickProductShortcutDetail: OnClickProductCardShortCutFn = (product, meta) =>
    logSelectSectionItemShortCut(section, product, meta);

  return (
    <ImpressionSection section={section} className={sectionStyle}>
      <h2 className={titleStyle}>{title}</h2>
      <Swiper
        className={swiperStyle}
        spaceBetween={12}
        slidesPerView={slidesPerView}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        touchStartPreventDefault={false}
      >
        {items.map((item) => {
          const { _id } = item;
          return (
            <SwiperSlide key={_id}>
              <SectionItem
                data={item}
                onClickProductCard={handleClickProductCard}
                onClickProductShortcut={handleClickProductShortcut}
                onClickProductShortcutDetail={handleClickProductShortcutDetail}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </ImpressionSection>
  );
};

export { PurchasedRecentSection };
