import Link from 'next/link';
import styled from '@emotion/styled';

import type { ProductData, ProductMainSelectData } from '../../../../shared/interfaces';
import type { ShortCutType } from '../../../../shared/types';
import { ProductImage } from '../../../../shared/components/ProductImage';
import ProductCardFunction from '../../../../shared/components/product/card/ProductCardFunction';
import ProductCardPrice from '../../../../shared/components/product/card/ProductCardPrice';
import { ProductImageType } from '../../../../shared/components/ProductImage/constants';
import COLOR from '../../../../shared/constant/colorset';
import { NOT_PURCHASABLE_STATUS } from '../../../../shared/constant/productStatusCode';
import { isPC } from '../../../../../util/window/getDevice';
import { multiMaxLineText } from '../../../../shared/utils';

const Container = styled.div`
  min-height: ${isPC ? '169px' : '145px'};
  border-radius: 10px;

  .product-function {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: ${isPC ? '36px' : '30px'};
    font-size: ${isPC ? '16px' : '13px'};
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
        font-size: ${isPC ? '16px' : '14px'};
        font-weight: bold;
        line-height: 1.36;
        white-space: nowrap;
      }

      .discount-rate {
        margin-right: 4px;
      }

      .dimmed-price {
        margin-top: 4px;
        display: flex;
        font-size: 14px;
        color: ${COLOR.kurlyGray450};
        text-decoration: line-through;
      }

      .price-number {
        ${multiMaxLineText(1)}
      }
    }
  }
`;

const ProductWrap = styled.div`
  display: flex;
  gap: 12px;

  & > div:first-child {
    min-width: ${isPC ? '127px' : '109px'};
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  width: 153px;
`;

const ContentRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Ranking = styled.div`
  font-weight: 700;
  height: 32px;
  line-height: 22px;
  font-size: ${isPC ? '24px' : '20px'};
  color: ${COLOR.benefitGray};
`;

const ProductName = styled.div`
  font-size: ${isPC ? '16px' : '14px'};
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

interface Props extends ProductData {
  className?: string;
  index: number;

  handleSelectProduct(selectProduct: ProductMainSelectData): void;

  onChangeSoldOutStatus?(): void;
}

const ProductCard = ({
  className,
  index,
  no: productNo,
  listImageUrl,
  productVerticalMediumUrl,
  salesPrice,
  discount,
  name,
  groupProduct,
  status,
  canRestockNotify,
  isMultiplePrice,
  isBuyNow,
  deliveryTypeNames,
  handleSelectProduct,
  onChangeSoldOutStatus,
  stickers_v2,
}: Props) => {
  const { code, message } = status;
  const link = `/goods/${productNo}`;
  const href = '/goods/[productCode]';
  const imageUrl = productVerticalMediumUrl || listImageUrl;
  const isGroupProduct = groupProduct.isGroup;
  const isSoldOut = NOT_PURCHASABLE_STATUS.includes(code);
  const handleSelectShortcut = (type: ShortCutType) => {
    handleSelectProduct({ type, index, productNo });
  };

  return (
    <Container className={className}>
      <Link href={href} as={link} passHref prefetch={false}>
        <a
          href={href}
          onClick={() =>
            handleSelectProduct({
              type: 'content',
              index,
              productNo,
            })
          }
        >
          <ProductWrap>
            <ProductImage
              src={imageUrl}
              type={ProductImageType.MAIN_COLLECTION_PRODUCT_NUMBER_LIST_ITEM}
              stickerList={stickers_v2}
              isSoldOut={isSoldOut}
              soldOutTitle={message?.title}
              soldOutMessage={message?.content}
            />
            <ProductInfo className="product-info">
              <div>
                <Ranking>{index + 1}</Ranking>
                <ProductName>{name}</ProductName>
                <ContentRow className="content-row">
                  <ProductCardPrice
                    className="product-price"
                    price={salesPrice}
                    discount={discount}
                    isMultiplePrice={isMultiplePrice}
                  />
                </ContentRow>
              </div>
              <ProductCardFunction
                className="product-function"
                contentProductNo={productNo}
                code={code}
                href={href.replace('[productCode]', String(productNo))}
                isGroupProduct={isGroupProduct}
                canRestockNotify={canRestockNotify}
                deliveryTypeNames={deliveryTypeNames}
                isBuyNow={isBuyNow}
                selectMainShortcut={handleSelectShortcut}
                selectDetailShortcut={handleSelectShortcut}
                onChangeSoldOutStatus={onChangeSoldOutStatus}
              />
            </ProductInfo>
          </ProductWrap>
        </a>
      </Link>
    </Container>
  );
};

export { ProductCard };
