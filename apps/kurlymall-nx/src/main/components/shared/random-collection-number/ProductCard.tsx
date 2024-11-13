import { memo } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

import COLOR from '../../../../shared/constant/colorset';
import { getPageUrl, PRODUCT_PATH } from '../../../../shared/constant';
import { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';
import ProductCardFunction from '../../../../shared/components/product/card/ProductCardFunction';
import ProductCardPrice from '../../../../shared/components/product/card/ProductCardPrice';
import { ShortCutType } from '../../../../shared/types';
import { ProductImage } from '../../../../shared/components/ProductImage';
import { isPC } from '../../../../../util/window/getDevice';
import { multiMaxLineText } from '../../../../shared/utils';

const Container = styled.div`
  min-height: ${isPC ? '339px' : '335px'};
  border-radius: 10px;
  overflow: hidden;

  .product-function {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${isPC ? '36px' : '32px'};
    font-size: 13px;
    line-height: 19px;
    border: 1px solid ${COLOR.mainProductCardBorder};
    border-radius: 4px;
    background-color: ${isPC ? COLOR.kurlyWhite : 'transparent'};

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
    .product-price {
      .discount {
        display: flex;
      }

      .discount-rate,
      .sales-price {
        display: flex;
        font-size: 14px;
        font-weight: bold;
        line-height: 1.36;
        white-space: nowrap;
      }

      .discount-rate {
        margin-right: 4px;
      }

      .dimmed-price {
        display: none;
      }

      .price-number {
        ${multiMaxLineText(1)}
      }
    }
  }
`;

const ProductWrap = styled.a`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .button-wrapper {
    padding: 0 12px 12px 12px;
    margin-top: 8px;
  }
`;

const ProductContentWrap = styled.div`
  & > div {
    border-radius: 0;
  }
`;

const Ranking = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 700;
  line-height: 38px;
  font-size: 32px;
  color: ${COLOR.benefitGray};
`;

const ProductInfo = styled.div`
  min-height: 59px;
  padding: 12px 12px 0 12px;
  display: flex;
  gap: 12px;
`;

const ContentRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 59px;
`;

const ProductName = styled.div`
  font-size: 14px;
  line-height: 19px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  letter-spacing: normal;
  word-break: break-word;
  overflow-wrap: break-word;
  color: ${COLOR.benefitGray};
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

  selectProduct(selectProduct: ProductMainSelectData): void;

  onChangeSoldOutStatus?(): void;
}

function ProductCard({ index, product, className, selectProduct, onChangeSoldOutStatus }: Props) {
  const {
    no,
    name,
    salesPrice,
    groupProduct,
    status,
    imageUrl,
    discount,
    listImageUrl,
    productVerticalMediumUrl,
    canRestockNotify,
    isMultiplePrice,
    isBuyNow,
    deliveryTypeNames,
    stickers_v2,
  } = product;
  const link = `${getPageUrl(PRODUCT_PATH.detail)}/${no}`;
  const image = productVerticalMediumUrl || imageUrl || listImageUrl;
  const href = '/goods/[productCode]';

  const handleSelectShortcut = (type: ShortCutType) => {
    selectProduct({ type, index, productNo: no });
  };

  return (
    <Container>
      <Link href={href} as={link} passHref prefetch={false}>
        <ProductWrap
          href={href}
          className={className}
          onClick={() =>
            selectProduct({
              type: 'content',
              index,
              productNo: no,
            })
          }
        >
          <ProductContentWrap>
            <ProductImage
              src={image}
              type={ProductImageType.MAIN_RANDOM_COLLECTION_NUMBER_ITEM}
              stickerList={stickers_v2}
            />
            <ProductInfo className="product-info">
              <Ranking>{index + 1}</Ranking>
              <ContentRow>
                <ProductName>{name}</ProductName>
                <ProductCardPrice
                  className="product-price"
                  price={salesPrice}
                  discount={discount}
                  isMultiplePrice={isMultiplePrice}
                />
              </ContentRow>
            </ProductInfo>
          </ProductContentWrap>
          <ProductCardFunction
            className="product-function"
            contentProductNo={no}
            code={status.code}
            href={href.replace('[productCode]', String(no))}
            isGroupProduct={groupProduct.isGroup}
            canRestockNotify={canRestockNotify}
            deliveryTypeNames={deliveryTypeNames}
            isBuyNow={isBuyNow}
            selectMainShortcut={handleSelectShortcut}
            selectDetailShortcut={handleSelectShortcut}
            onChangeSoldOutStatus={onChangeSoldOutStatus}
          />
        </ProductWrap>
      </Link>
    </Container>
  );
}

export default memo(ProductCard);
