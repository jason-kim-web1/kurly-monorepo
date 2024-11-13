import { memo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { getPageUrl, PRODUCT_PATH } from '../../../../shared/constant';
import { ProductData } from '../../../../shared/interfaces';

import Card from '../../shared/MainProductCard';
import { ProductMainSelectData } from '../../../../shared/interfaces/Product';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const ProductCard = styled(Card)`
  .product-function {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 32px;
    margin-top: 6px;
    font-size: 13px;
    line-height: 19px;
    border: 1px solid ${COLOR.mainProductCardBorder};
    border-radius: 4px;

    > svg {
      margin: 0 4px 0 0;
    }

    &.goods-view,
    &.buy-now {
      pointer-events: none;
    }

    &.notify {
      > &.off {
        pointer-events: none;
      }
    }
  }
  .product-sticker {
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 24px;
  }
  .product-info {
    padding: 7px 0 8px;
    .product-description {
      margin-bottom: 4px;
      color: ${COLOR.benefitTextGray};
      font-size: 12px;
      font-weight: 400;
    }
    .product-name {
      font-size: 14px;
      line-height: 1.36;
      font-weight: 400;
      margin-bottom: 4px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      letter-spacing: normal;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    .product-price {
      .discount-rate,
      .sales-price {
        font-size: 14px;
        font-weight: bold;
        line-height: 1.36;
        white-space: nowrap;
      }
      .discount-rate {
        margin-right: 4px;
      }
      .dimmed-price {
        display: block;
        color: ${COLOR.dimmed};
        font-size: 12px;
        font-weight: 400;
        text-decoration: line-through;
      }
    }
    .sold-out-layer {
      strong {
        margin-bottom: 8px;
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 12px;
        font-weight: normal;
      }
    }
    .review-count {
      padding-top: 9px;
      font-weight: 600;
      font-size: 12px;
      line-height: 13px;

      .review-icon {
        margin: 0 -1px 0 0;
        width: 14px;
        height: 14px;
      }
    }
  }
`;

interface ProductCardProps extends ProductData {
  quantity?: number;
  imageUrl?: string;
  description?: string;
}

interface Props {
  index: number;
  product: ProductCardProps;
  className?: string;
  isReviewCount?: boolean;
  imageType?: ProductImageType;
  selectProduct(selectProduct: ProductMainSelectData): void;
  onChangeSoldOutStatus?(): void;
}

function MainProductCard({
  index,
  product,
  className,
  isReviewCount,
  selectProduct,
  onChangeSoldOutStatus,
  imageType = ProductImageType.MAIN_PRODUCT_LIST_ITEM,
}: Props) {
  const {
    no,
    name,
    salesPrice,
    groupProduct,
    discount,
    status,
    quantity,
    imageUrl,
    listImageUrl,
    productVerticalMediumUrl,
    description,
    canRestockNotify,
    isMultiplePrice,
    isBuyNow,
    deliveryTypeNames,
    reviewCount,
    stickers_v2,
  } = product;

  const link = `${getPageUrl(PRODUCT_PATH.detail)}/${no}`;
  const image = productVerticalMediumUrl || imageUrl || listImageUrl;

  return (
    <ProductCard
      className={className}
      index={index}
      href="/goods/[productCode]"
      as={link}
      productNo={no}
      name={name}
      price={salesPrice}
      discount={discount}
      imageUrl={image}
      shortDescription={description}
      isGroupProduct={groupProduct.isGroup}
      canRestockNotify={canRestockNotify}
      status={status}
      quantity={quantity}
      deliveryTypeNames={deliveryTypeNames}
      reviewCount={reviewCount}
      isMultiplePrice={isMultiplePrice}
      isBuyNow={isBuyNow}
      isReviewCount={isReviewCount}
      handleSelectProduct={selectProduct}
      onChangeSoldOutStatus={onChangeSoldOutStatus}
      stickers={stickers_v2}
      imageType={imageType}
    />
  );
}

export default memo(MainProductCard);
