import { css } from '@emotion/css';
import Link from 'next/link';
import styled from '@emotion/styled';
import { get, gt, size } from 'lodash';
import { ForwardedRef, forwardRef, useEffect, useRef } from 'react';

import type { AdProductItem, AdProductItemList } from '../../../../service/product.service';
import { sectionStyle, titleStyle, titleTextStyle } from '../style';
import COLOR from '../../../../../shared/constant/colorset';
import ProductCardFunction from '../../../../../shared/components/product/card/ProductCardFunction';
import { convertToAllKoreanNumber } from '../../../../../shared/services';
import { multiMaxLineText } from '../../../../../shared/utils';
import { hiddenScrollBar } from '../../../../../shared/utils/hidden-scrollbar';
import { ImpressionPolicy, useImpressionPolicy } from '../../../../../shared/context/ImpressionPolicyContext';
import { amplitudeService } from '../../../../../shared/amplitude';
import {
  ImpressionSection,
  ImpressionSectionItem,
  SelectSectionItem,
  SelectSectionItemShortcut,
} from '../../../../../shared/amplitude/events/search';
import { useAppSelector } from '../../../../../shared/store';
import { getStickerText } from '../../../../../shared/amplitude/events/getStickerText';
import { getDeliveryTypeName } from '../../../../../search/shared/utils/getDeliveryTypeName';
import { DeliveryInfoName } from '../../../../types';
import { ShortCutType } from '../../../../../shared/types';
import { SHORTCUT_TYPE } from '../../../../../shared/constant/shortcut-type';
import { logTrackerApi } from '../../../../../search/shared/utils/logTrackerApi';
import { ProductImage } from '../../../../../shared/components/ProductImage';
import { ProductImageType } from '../../../../../shared/components/ProductImage/constants';
import { ne } from '../../../../../shared/utils/lodash-extends';
import { isNotNull } from '../../../../../shared/utils/typeGuard';
import { createProductDetailPathWithReferer } from '../../../utils';

const adChipStyle = css`
  display: flex;
  height: 21px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  color: ${COLOR.kurlyGray400};
  background-color: ${COLOR.bgLightGray};
  border-radius: 100px;
`;

const listItemRootStyle = css`
  padding-bottom: 8px;
  &:first-of-type {
    padding-left: 16px;
  }
  &:last-of-type {
    padding-right: 16px;
  }
`;

const productDetailLinkStyle = css`
  display: block;
  max-width: 120px;
`;

const productListWrapStyle = css`
  overflow-y: hidden;
  overflow-x: auto;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 8px;
  padding-bottom: 16px;
  ${hiddenScrollBar({ x: 'scroll', y: 'hidden' })};
`;

const imageWrapStyle = css`
  width: 120px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 6px;
`;

const productNameStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  ${multiMaxLineText(2)}
  margin-bottom: 2px;
`;

const originalPrice = css`
  color: ${COLOR.kurlyGray400};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration: line-through;
`;

const discountRateStyle = css`
  color: ${COLOR.pointText};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
  margin-right: 2px;
`;

const salesPriceStyle = css`
  color: ${COLOR.kurlyGray800};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 19px;
`;

const deliveryTypeStyle = css`
  color: ${COLOR.kurlyGray450};
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  margin: 2px 0;
`;

type AdProductSectionItemProps = {
  referrerProductName: string;
  referrerProductNo: number;
  product: AdProductItem;
  onClick: () => void;
  onClickShortCut: (shortCutType: ShortCutType) => void;
};

const StyledProductCardFunction = styled(ProductCardFunction)`
  display: flex;
  width: 120px;
  height: 32px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  line-height: 16px;
  margin-bottom: 8px;
  > svg {
    width: 18px;
    height: 18px;
    margin: 0 4px 0 0;
  }
`;

const AdProductSectionItemImpl = (
  { product, referrerProductNo, referrerProductName, onClick, onClickShortCut }: AdProductSectionItemProps,
  ref: ForwardedRef<HTMLAnchorElement>,
) => {
  const {
    discountRate,
    discountedPrice,
    salesPrice,
    no,
    name,
    productVerticalMediumUrl,
    isBuyNow,
    groupProduct,
    _productDetailUrl,
    _deliveryTypeNames,
    stickersV2,
  } = product;
  const hasDiscountedPrice = ne(discountedPrice, salesPrice) && isNotNull(discountedPrice);
  const hasDiscountRate = gt(discountRate, 0);
  const shouldRenderDiscountRate = hasDiscountedPrice && hasDiscountRate;
  const actualPrice = hasDiscountedPrice ? discountedPrice : salesPrice;
  const productDetailPathWithReferer = createProductDetailPathWithReferer(_productDetailUrl, {
    name: referrerProductName,
    no: referrerProductNo,
  });
  return (
    <li className={listItemRootStyle}>
      <Link href={productDetailPathWithReferer}>
        <a className={productDetailLinkStyle} href={productDetailPathWithReferer} ref={ref} onClick={onClick}>
          <div className={imageWrapStyle}>
            <ProductImage
              src={productVerticalMediumUrl}
              type={ProductImageType.PRODUCT_DETAIL_RECOMMEND_ITEM}
              stickerList={stickersV2}
            />
          </div>
          <StyledProductCardFunction
            code="PURCHASABLE"
            isGroupProduct={groupProduct.isGroup}
            canRestockNotify={false}
            contentProductNo={no}
            href={productDetailPathWithReferer}
            isBuyNow={isBuyNow}
            deliveryTypeNames={[]}
            onSelectProductShortcut={onClickShortCut}
            referrerProductNo={referrerProductNo}
            referrerProductName={referrerProductName}
          />
          <div className={deliveryTypeStyle}>
            {_deliveryTypeNames.map((deliveryTypeName, i) => (
              <span key={`${i}-${deliveryTypeName}`}>{deliveryTypeName}</span>
            ))}
          </div>
          <p className={productNameStyle}>{name}</p>
          {hasDiscountedPrice ? <div className={originalPrice}>{convertToAllKoreanNumber(salesPrice)}</div> : null}
          <div>
            {shouldRenderDiscountRate ? <span className={discountRateStyle}>{`${discountRate}%`}</span> : null}
            <span className={salesPriceStyle}>{convertToAllKoreanNumber(actualPrice)}</span>
          </div>
        </a>
      </Link>
    </li>
  );
};

const AdProductSectionItem = forwardRef(AdProductSectionItemImpl);

const SECTION_NAME = '이 상품은 어때요?';
const SECTION_ID = 'ad_product';

type AdProductSectionProps = {
  products: AdProductItemList;
};

const AdProductSection = ({ products }: AdProductSectionProps) => {
  const listElementRef = useRef<HTMLUListElement>(null);
  const { registerElement, unRegisterElement } = useImpressionPolicy();
  const productNo = useAppSelector(({ productDetail }) => productDetail.no);
  const productName = useAppSelector(({ productDetail }) => productDetail.name);
  const sectionItemCount = size(products);

  const handleInViewSection = () => {
    amplitudeService.logEvent(
      new ImpressionSection({
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: sectionItemCount,
        section_screen: 'product_detail_description',
        referrer_content_id: productNo,
        referrer_content_name: productName,
      }),
    );
  };

  const handleInViewSectionItem = (product: AdProductItem) => () => {
    amplitudeService.logEvent(
      new ImpressionSectionItem({
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: sectionItemCount,
        section_item_position: product._position,
        content_id: product.no,
        content_name: product.name,
        sales_price: product.salesPrice,
        price: product.discountedPrice || product.salesPrice,
        is_soldout: false,
        sticker: getStickerText(product.stickersV2),
        delivery_type: getDeliveryTypeName(product._deliveryTypeNames as DeliveryInfoName[]),
        shortcut_type: product.isBuyNow ? SHORTCUT_TYPE.PURCHASE : SHORTCUT_TYPE.CART,
        section_screen: 'product_detail_description',
        referrer_content_id: productNo,
        referrer_content_name: productName,
      }),
    );
    logTrackerApi(get(product, 'adInfo.impTrackers', []));
  };

  const handleSelectSectionItem = (product: AdProductItem) => () => {
    const selectProductNo = product.no;
    const selectProductName = product.name;
    amplitudeService.logEvent(
      new SelectSectionItem({
        selection_type: 'product',
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: sectionItemCount,
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
    logTrackerApi(get(product, 'adInfo.clickTrackers', []));
  };

  const handleSelectSectionItemShortCut = (product: AdProductItem) => (shortCutType: ShortCutType) => {
    const selectProductNo = product.no;
    const selectProductName = product.name;
    amplitudeService.logEvent(
      new SelectSectionItemShortcut({
        selection_type: shortCutType,
        section_name: SECTION_NAME,
        search_section_id: SECTION_ID,
        section_item_count: sectionItemCount,
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
    logTrackerApi(get(product, 'adInfo.clickTrackers', []));
  };

  useEffect(() => {
    const listElement = listElementRef.current;
    if (!listElement) {
      return;
    }
    registerElement(listElement);
    return () => {
      unRegisterElement(listElement);
    };
  }, [registerElement, unRegisterElement]);

  return (
    <ImpressionPolicy onInView={handleInViewSection}>
      <section className={sectionStyle}>
        <h3 className={titleStyle}>
          <span className={titleTextStyle}>이 상품은 어때요?</span>
          <span className={adChipStyle}>광고</span>
        </h3>
        <ul ref={listElementRef} className={productListWrapStyle}>
          {products.map((product) => (
            <ImpressionPolicy key={product._id} onInView={handleInViewSectionItem(product)}>
              <AdProductSectionItem
                referrerProductName={productName}
                referrerProductNo={productNo}
                product={product}
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

export { AdProductSection, AdProductSectionItem };
