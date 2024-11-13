import { memo } from 'react';

import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';

import { PRODUCT_PATH } from '../../../../shared/constant';
import Card from '../../shared/MainProductCard';
import type { ProductMainSelectData, ProductData } from '../../../../shared/interfaces';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';

const ProductCard = styled(Card)`
  width: fit-content;
  color: ${COLOR.kurlyGray800};
  cursor: pointer;

  .product-function {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 36px;
    margin-top: 6px;
    padding-bottom: 1px;
    font-size: 16px;
    line-height: 29px;
    border: 1px solid ${COLOR.lightGray};
    border-radius: 4px;

    > svg {
      width: 22px;
      height: 22px;
      margin: 1px 4px 0 0;
    }

    &.goods-view,
    &.buy-now {
      pointer-events: none;
    }

    &.goods-view {
      padding-bottom: 0;
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
    height: 32px;
  }

  .product-info {
    position: relative;
    padding: 8px 10px 0 0;
    .product-description {
      margin-bottom: 6px;
    }
    .product-name {
      font-size: 16px;
      line-height: 23px;
      font-weight: 400;
      margin-bottom: 8px;
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
        font-size: 16px;
        font-weight: 700;
        line-height: 1.5;
        white-space: nowrap;
      }
      .discount-rate {
        margin-right: 7px;
      }
      .dimmed-price {
        display: block;
        padding-top: 2px;
        color: ${COLOR.kurlyGray400};
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
        text-decoration: line-through;
      }
    }
  }
  .sold-out-layer {
    strong {
      display: block;
      font-size: 24px;
      font-weight: 500;
      line-height: 35px;
      text-align: center;
      text-transform: capitalize;
    }
    span {
      display: block;
      margin-bottom: -6px;
      padding: 9px 16px 0;
      font-size: 13px;
      line-height: 18px;
      text-align: center;
      font-weight: 400;
    }
  }
  .review-count {
    padding-top: 8px;
    font-size: 13px;
    line-height: 20px;

    .review-icon {
      width: 15px;
      height: 15px;
      margin-top: 2px;
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
  imageType?: ProductImageType;
  selectProduct(selectProduct: ProductMainSelectData): void;
  onChangeSoldOutStatus?(): void;
}

function MainProductCard({
  index,
  product,
  className,
  selectProduct,
  imageType = ProductImageType.MAIN_PRODUCT_LIST_ITEM,
  onChangeSoldOutStatus,
}: Props) {
  const {
    no,
    name,
    salesPrice,
    groupProduct,
    discount,
    status,
    quantity,
    description,
    listImageUrl,
    imageUrl,
    canRestockNotify,
    isMultiplePrice,
    isBuyNow,
    deliveryTypeNames,
    reviewCount,
    productVerticalMediumUrl,
    stickers_v2,
  } = product;

  const link = `${PRODUCT_PATH.detail.uri}/${no}`;

  const image = productVerticalMediumUrl || imageUrl || listImageUrl;

  return (
    <ProductCard
      index={index}
      href={link}
      className={className}
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
      reviewCount={reviewCount}
      deliveryTypeNames={deliveryTypeNames}
      isMultiplePrice={isMultiplePrice}
      isBuyNow={isBuyNow}
      handleSelectProduct={selectProduct}
      onChangeSoldOutStatus={onChangeSoldOutStatus}
      stickers={stickers_v2}
      imageType={imageType}
    />
  );
}

export default memo(MainProductCard);
