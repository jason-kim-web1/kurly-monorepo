import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/css';
import { gt } from 'lodash';

import { AspectRatio } from '../../../../../../../shared/components/AspectRatio';
import NextImage from '../../../../../../../shared/components/NextImage';
import ProductCardFunction from '../../../../../../../shared/components/product/card/ProductCardFunction';
import COLOR from '../../../../../../../shared/constant/colorset';
import {
  AdSearchSectionItemViewModel,
  ThemePromotionSectionItemViewModel,
  ThemeRelatedSectionItemViewModel,
} from '../../../../factory';
import { multiMaxLineText } from '../../../../../../../shared/utils';
import { ShortCutType } from '../../../../../../../shared/types';
import { convertToAllKoreanNumber } from '../../../../../../../shared/services';
import { ne } from '../../../../../../../shared/utils/lodash-extends';
import { isNotNull } from '../../../../../../../shared/utils/typeGuard';

const productInfoWrap = css`
  padding: 8px;
`;

const productNameAndPriceWrapStyle = css`
  height: 56px;
  margin-bottom: 8px;
`;

const productPriceWrapStyle = css`
  display: flex;
  align-items: center;
  color: ${COLOR.kurlyGray800};
  text-overflow: ellipsis;
  font-size: 13px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
`;

const productNameStyle = css`
  ${multiMaxLineText(2)};
  margin-bottom: 2px;
  color: ${COLOR.kurlyGray800};
  text-overflow: ellipsis;
  font-size: 13px;
  font-style: normal;
  line-height: 18px;
  font-weight: 400;
`;

const discountRateStyle = css`
  margin-right: 2px;
  color: #fa622e;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
`;

const priceStyle = css`
  ${multiMaxLineText(1)};
  color: ${COLOR.kurlyGray800};
  text-overflow: ellipsis;
  font-size: 13px;
  font-weight: 700;
  line-height: 18px;
`;

const CardFunction = styled(ProductCardFunction)`
  display: flex;
  height: 30px;
  border: 1px solid ${COLOR.lightGray};
  border-radius: 4px;
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  > svg {
    width: 18px;
    height: 18px;
    margin: 0 4px 0 0;
  }
`;

type ThemeSectionProductCardProps = {
  product: Pick<
    ThemeRelatedSectionItemViewModel | ThemePromotionSectionItemViewModel | AdSearchSectionItemViewModel,
    | '_productDetailPageUrl'
    | 'productNo'
    | 'productName'
    | 'productVerticalMediumUrl'
    | 'discountRate'
    | 'discountedPrice'
    | 'salesPrice'
    | 'groupProduct'
    | 'isBuyNow'
  >;
  onClickProductCard: () => void;
  onClickProductCardShortcut: (type: ShortCutType) => void;
};

const ThemeSectionProductCard = ({
  product,
  onClickProductCard,
  onClickProductCardShortcut,
}: ThemeSectionProductCardProps) => {
  const {
    _productDetailPageUrl,
    productNo,
    productName,
    productVerticalMediumUrl,
    discountRate,
    discountedPrice,
    salesPrice,
    groupProduct,
    isBuyNow,
  } = product;
  const hasDiscountedPrice = ne(discountedPrice, salesPrice) && isNotNull(discountedPrice);
  const hasDiscountRate = gt(discountRate, 0);
  const shouldRenderDiscountRate = hasDiscountedPrice && hasDiscountRate;
  const actualPrice = hasDiscountedPrice ? discountedPrice : salesPrice;
  return (
    <Link href={_productDetailPageUrl} passHref prefetch={false}>
      <a href={_productDetailPageUrl} onClick={onClickProductCard}>
        <AspectRatio ratio={1}>
          <NextImage src={productVerticalMediumUrl} layout="fill" objectFit="cover" disableImageDrag />
        </AspectRatio>
        <div className={productInfoWrap}>
          <div className={productNameAndPriceWrapStyle}>
            <div className={productNameStyle}>{productName}</div>
            <div className={productPriceWrapStyle}>
              {shouldRenderDiscountRate ? <span className={discountRateStyle}>{`${discountRate}%`}</span> : null}
              <span className={priceStyle}>{convertToAllKoreanNumber(actualPrice)}</span>
            </div>
          </div>
          <CardFunction
            code={'PURCHASABLE'}
            isGroupProduct={groupProduct.isGroup}
            canRestockNotify={false}
            contentProductNo={productNo}
            href={_productDetailPageUrl}
            isBuyNow={isBuyNow}
            deliveryTypeNames={[]}
            isVisibleBuyNowIcon
            onSelectProductShortcut={onClickProductCardShortcut}
            selectDetailShortcut={onClickProductCardShortcut}
          />
        </div>
      </a>
    </Link>
  );
};

export { ThemeSectionProductCard };
export type { ThemeSectionProductCardProps };
