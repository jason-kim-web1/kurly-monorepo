import { css } from '@emotion/css';
import styled from '@emotion/styled';
import Link from 'next/link';
import { chain, gt, isEmpty, nth, range, size } from 'lodash';
import { ForwardedRef, forwardRef, useEffect, useMemo, useState } from 'react';

import ProductCardFunction from '../../../../../shared/components/product/card/ProductCardFunction';
import COLOR from '../../../../../shared/constant/colorset';
import type { ClickedTogetherItem, ClickedTogetherItemList } from '../../../../service/product.service';
import { AspectRatio } from '../../../../../shared/components/AspectRatio';
import NextImage from '../../../../../shared/components/NextImage';
import { convertToAllKoreanNumber } from '../../../../../shared/services';
import { sectionStyle, titleStyle, titleTextStyle } from '../style';
import { multiMaxLineText } from '../../../../../shared/utils';
import { clsx } from '../../../../../shared/utils/clsx';
import Reset20x20 from '../../../../../shared/components/icons/svg/Reset20x20';
import { isDefined, isNotNull } from '../../../../../shared/utils/typeGuard';
import { useAppSelector } from '../../../../../shared/store';
import { amplitudeService } from '../../../../../shared/amplitude';
import {
  ImpressionSection,
  ImpressionSectionItem,
  SelectSectionItem,
  SelectSectionItemShortcut,
} from '../../../../../shared/amplitude/events/search';
import { ImpressionPolicy } from '../../../../../shared/context/ImpressionPolicyContext';
import { getStickerText } from '../../../../../shared/amplitude/events/getStickerText';
import { getDeliveryTypeName } from '../../../../../search/shared/utils/getDeliveryTypeName';
import { DeliveryInfoName } from '../../../../types';
import { ShortCutType } from '../../../../../shared/types';
import { ne } from '../../../../../shared/utils/lodash-extends';
import { useOnceLogger } from '../../../../../shared/hooks/useOnceLogger';
import { createProductDetailPathWithReferer } from '../../../utils';

const productListStyle = css`
  padding: 0 16px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const clickedTogetherItemCardStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 12px;
`;

const StyledProductCardFunction = styled(ProductCardFunction)`
  display: flex;
  width: 69px;
  height: 36px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  line-height: 16px;
  > svg {
    width: 20px;
    height: 20px;
    margin: 0 4px 0 0;
  }
`;

const imageWrapStyle = css`
  width: 50px;
  border-radius: 4px;
  overflow: hidden;
`;

const productInfoWrapStyle = css`
  flex-basis: 58.3%;
  flex-grow: 1;
`;

const productNameStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  ${multiMaxLineText(1)}
  margin-bottom: 2px;
`;

const discountRateStyle = css`
  color: ${COLOR.pointText};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  margin-right: 4px;
`;

const salesPriceStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`;

const flexShrink0 = css`
  flex-shrink: 0;
`;

const nextButtonStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const nextButtonLabelStyle = css`
  color: ${COLOR.loversWhite};
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 19px;
`;

type ClickedTogetherSectionItemProps = {
  referrerProductName: string;
  referrerProductNo: number;
  product: ClickedTogetherItem;
  onClick: () => void;
  onClickShortCut: (shortCutType: ShortCutType) => void;
};

const ClickedTogetherSectionItemImpl = (
  { product, referrerProductNo, referrerProductName, onClick, onClickShortCut }: ClickedTogetherSectionItemProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const {
    _productDetailUrl,
    productVerticalMediumUrl,
    groupProduct,
    name,
    no,
    discountRate,
    discountedPrice,
    salesPrice,
    isBuyNow,
  } = product;
  const hasDiscountedPrice = ne(discountedPrice, salesPrice) && isNotNull(discountedPrice);
  const hasDiscountRate = gt(discountRate, 0);
  const shouldRenderDiscountRate = hasDiscountedPrice && hasDiscountRate;
  const actualPrice = discountedPrice || salesPrice;
  const productDetailPathWithReferer = createProductDetailPathWithReferer(_productDetailUrl, {
    name: referrerProductName,
    no: referrerProductNo,
  });
  return (
    <li>
      <Link href={productDetailPathWithReferer}>
        <a ref={ref} href={productDetailPathWithReferer} className={clickedTogetherItemCardStyle} onClick={onClick}>
          <div className={clsx(imageWrapStyle, flexShrink0)}>
            <AspectRatio ratio={1}>
              <NextImage src={productVerticalMediumUrl} layout="fill" disableImageDrag objectFit="cover" />
            </AspectRatio>
          </div>
          <div className={productInfoWrapStyle}>
            <p className={productNameStyle}>{name}</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {shouldRenderDiscountRate ? <span className={discountRateStyle}>{`${discountRate}%`}</span> : null}
              <span className={salesPriceStyle}>{convertToAllKoreanNumber(actualPrice)}</span>
            </div>
          </div>
          <div className={flexShrink0}>
            <StyledProductCardFunction
              code={'PURCHASABLE'}
              isGroupProduct={groupProduct.isGroup}
              canRestockNotify={false}
              contentProductNo={no}
              href={productDetailPathWithReferer}
              isBuyNow={isBuyNow}
              deliveryTypeNames={[]}
              isVisibleBuyNowIcon={false}
              onSelectProductShortcut={onClickShortCut}
              selectDetailShortcut={onClickShortCut}
              referrerProductName={referrerProductName}
              referrerProductNo={referrerProductNo}
            />
          </div>
        </a>
      </Link>
    </li>
  );
};

const ClickedTogetherSectionItem = forwardRef(ClickedTogetherSectionItemImpl);

const SECTION_NAME = '다른 고객이 함께 본 상품';
const SECTION_ID_PREFIX = 'clicked_together';

const DISPLAY_PRODUCT_COUNT = 4;

type ClickedTogetherSectionProps = {
  products: ClickedTogetherItemList;
  selectionPolicy: string;
};

const ClickedTogetherSection = ({ products, selectionPolicy }: ClickedTogetherSectionProps) => {
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const productName = useAppSelector(({ productDetail }) => productDetail.name);
  const { log } = useOnceLogger(`${SECTION_ID_PREFIX}-${productNo}`);
  const productCount = size(products);
  const [startIndex, setStartIndex] = useState(0);
  const visibleProducts = useMemo(
    () =>
      chain(range(DISPLAY_PRODUCT_COUNT))
        .map((i) => (startIndex + i) % productCount)
        .uniq()
        .map((i) => nth(products, i))
        .filter(isDefined)
        .value(),
    [products, productCount, startIndex],
  );
  const shouldHideSection = isEmpty(visibleProducts);
  const shouldRenderNextProductButton = size(products) > DISPLAY_PRODUCT_COUNT;
  const SECTION_ID = `${SECTION_ID_PREFIX}.${selectionPolicy}`;

  const handleClickNextProduct = () => {
    setStartIndex((prev) => (prev + DISPLAY_PRODUCT_COUNT) % productCount);
    amplitudeService.logEvent(
      new SelectSectionItem({
        selection_type: 'next',
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: productCount,
        section_screen: 'product_detail_description',
        referrer_content_id: productNo,
        referrer_content_name: productName,
      }),
    );
  };

  const handleInViewSection = () => {
    amplitudeService.logEvent(
      new ImpressionSection({
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: size(products),
        section_screen: 'product_detail_description',
        referrer_content_id: productNo,
        referrer_content_name: productName,
      }),
    );
  };

  const handleInViewSectionItem = (product: ClickedTogetherItem) => () => {
    const currentProductNo = product.no;
    log(currentProductNo, () => {
      amplitudeService.logEvent(
        new ImpressionSectionItem({
          section_name: SECTION_NAME,
          search_section_id: SECTION_ID,
          section_item_count: productCount,
          section_item_position: product._position,
          content_id: product.no,
          content_name: product.name,
          sales_price: product.salesPrice,
          price: product.discountedPrice || product.salesPrice,
          is_soldout: false,
          sticker: getStickerText(product.stickersV2),
          delivery_type: getDeliveryTypeName(product._deliveryTypeNames as DeliveryInfoName[]),
          shortcut_type: product.isBuyNow ? 'purchase' : 'cart',
          section_screen: 'product_detail_description',
          referrer_content_id: productNo,
          referrer_content_name: productName,
        }),
      );
    });
  };

  const handleSelectSectionItem = (product: ClickedTogetherItem) => () => {
    const selectProductNo = product.no;
    const selectProductName = product.name;
    amplitudeService.logEvent(
      new SelectSectionItem({
        selection_type: 'product',
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: productCount,
        section_item_position: product._position,
        content_id: selectProductNo,
        content_name: selectProductName,
        sales_price: product.salesPrice,
        price: product.discountedPrice || product.salesPrice,
        is_soldout: false,
        sticker: getStickerText(product.stickersV2),
        delivery_type: getDeliveryTypeName(product._deliveryTypeNames as DeliveryInfoName[]),
        section_screen: 'product_detail_description',
        referrer_content_id: productNo,
        referrer_content_name: productName,
        referrer_event: 'select_section_item',
      }),
    );
  };

  const handleSelectSectionItemShortCut = (product: ClickedTogetherItem) => (shortCutType: ShortCutType) => {
    const selectProductNo = product.no;
    const selectProductName = product.name;
    amplitudeService.logEvent(
      new SelectSectionItemShortcut({
        selection_type: shortCutType,
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: productCount,
        section_item_position: product._position,
        content_id: selectProductNo,
        content_name: selectProductName,
        sales_price: product.salesPrice,
        price: product.discountedPrice || product.salesPrice,
        is_soldout: false,
        sticker: getStickerText(product.stickersV2),
        delivery_type: getDeliveryTypeName(product._deliveryTypeNames as DeliveryInfoName[]),
        section_screen: 'product_detail_description',
        referrer_content_id: productNo,
        referrer_content_name: productName,
        referrer_event: `select_section_item_shortcut.selection_type.${shortCutType}`,
      }),
    );
  };

  useEffect(() => {
    setStartIndex(() => 0);
  }, [products]);

  if (shouldHideSection) {
    return null;
  }

  return (
    <ImpressionPolicy onInView={handleInViewSection}>
      <section className={sectionStyle}>
        <h3 className={titleStyle}>
          <span className={titleTextStyle}>{SECTION_NAME}</span>
          {shouldRenderNextProductButton ? (
            <button className={nextButtonStyle} type="button" onClick={handleClickNextProduct}>
              <span className={nextButtonLabelStyle}>다음상품</span>
              <Reset20x20 />
            </button>
          ) : null}
        </h3>
        <ul className={productListStyle}>
          {visibleProducts.map((product) => (
            <ImpressionPolicy key={product._id} onInView={handleInViewSectionItem(product)}>
              <ClickedTogetherSectionItem
                product={product}
                referrerProductName={productName}
                referrerProductNo={productNo}
                onClick={handleSelectSectionItem(product)}
                onClickShortCut={handleSelectSectionItemShortCut(product)}
              />
            </ImpressionPolicy>
          ))}
        </ul>
      </section>
    </ImpressionPolicy>
  );
};

export { ClickedTogetherSection, ClickedTogetherSectionItem };
