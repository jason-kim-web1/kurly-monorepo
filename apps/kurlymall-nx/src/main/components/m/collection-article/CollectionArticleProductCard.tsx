import type { MouseEvent } from 'react';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

import styled from '@emotion/styled';

import type { ProductMainSelectData, ProductStatus } from '../../../../shared/interfaces';
import type { DeliveryInfoName } from '../../../../product/types';
import { MobileLink } from '../../../../shared/components/Link/MobileLink';
import { NoProductImageLogo } from '../../../../shared/images';
import { multiMaxLineText } from '../../../../shared/utils';
import COLOR from '../../../../shared/constant/colorset';
import ProductCardPrice from '../../../../shared/components/product/card/ProductCardPrice';
import ProductCardFunction from '../../../../shared/components/product/card/ProductCardFunction';
import { productCardImageWrapper } from '../../../../shared/styles/product-card-image-style';
import NextImage from '../../../../shared/components/NextImage';
import { SHORTCUT_TYPE } from '../../../../shared/constant/shortcut-type';

const LinkInner = styled.a`
  display: flex;
  align-items: flex-start;
  padding-top: 12px;
`;

const ThumbWrapper = styled.span`
  flex: 0 0 13vw;
  min-width: 50px;
  margin-right: 11px;
  border-radius: 4px;
  ${productCardImageWrapper('14.579%')};
`;

const NamePrice = styled.div`
  flex: 1 1 auto;
`;

const Name = styled.p`
  padding-top: 5px;
  font-size: 14px;
  line-height: 19px;
  color: ${COLOR.benefitGray};
  ${multiMaxLineText(2)};
`;

const Price = styled.div`
  padding-top: 3px;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;

  .discount-rate {
    padding-right: 4px;
  }

  .price {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;

    &.discount-price {
      > div:nth-of-type(1) {
        order: 2;
        margin-top: -3px;
      }

      > div:nth-of-type(2) {
        padding-right: 7px;
        order: 1;
      }
    }

    .dimmed-price {
      font-weight: 400;
      font-size: 12px;
      color: ${COLOR.kurlyGray400};
      text-decoration: line-through;
    }
  }
`;

const CartWrapper = styled.div`
  flex: 0 0 85px;
  margin-left: auto;
  padding-left: 16px;
`;

const CartStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 83px;
  height: 36px;
  margin: 7px 0 0 auto;
  padding: 0;
  border: 1px solid ${COLOR.mainProductCardBorder};
  border-radius: 4px;
  white-space: nowrap;

  > svg {
    width: 20px;
    height: 20px;
    margin-right: 4px;
  }
`;

const Cart = styled(ProductCardFunction)`
  ${CartStyle};
`;

const GoodsViewLink = styled.button`
  ${CartStyle};
`;

interface Props {
  index: number;
  canRestockNotify: boolean;
  isGroupProduct: boolean;
  isBuyNow: boolean;
  isMultiplePrice: boolean;
  listImageUrl: string;
  name: string;
  no: number;
  salesPrice: number;
  status: ProductStatus;
  deliveryTypeNames: DeliveryInfoName[];

  selectProduct(selectProduct: ProductMainSelectData): void;

  discount: {
    price: number | null;
    rate: number;
  };
}

export default function CollectionArticleProductCard({
  index,
  listImageUrl,
  no,
  name,
  salesPrice,
  discount,
  isMultiplePrice,
  isGroupProduct,
  canRestockNotify,
  deliveryTypeNames,
  isBuyNow,
  status,
  selectProduct,
}: Props) {
  const router = useRouter();
  const productLink = `/goods/${no}`;

  /**
   * 기존의 상세보기를 누르면 이벤트 버블링에 의하여 select_recommendation_{event_code} 이벤트의 selection_type 값이 'content'로 지정되는데
   * 상세보기 버튼을 눌렀을 때는 'detail'로 지정되어야 하므로 타입을 detail로 직접 주입하고 라우팅 처리
   */
  const handleClickGoodsLink = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    selectProduct({ type: SHORTCUT_TYPE.DETAIL, index, productNo: no });
    router.push(productLink);
  };

  return (
    <li>
      <MobileLink url={productLink} passHref>
        <LinkInner
          href={productLink}
          onClick={() =>
            selectProduct({
              type: 'content',
              index,
              productNo: no,
            })
          }
        >
          <ThumbWrapper>
            <NextImage
              src={listImageUrl ? listImageUrl : NoProductImageLogo}
              layout="fill"
              objectFit="cover"
              alt="상품 이미지"
            />
          </ThumbWrapper>
          <NamePrice>
            <Name>{name}</Name>
            <Price>
              <ProductCardPrice
                price={salesPrice}
                discount={discount}
                isMultiplePrice={isMultiplePrice}
                className={'price'}
              />
            </Price>
          </NamePrice>
          <CartWrapper>
            {isGroupProduct || isBuyNow ? (
              <GoodsViewLink onClick={handleClickGoodsLink}>상세보기</GoodsViewLink>
            ) : (
              <Cart
                contentProductNo={no}
                code={status.code}
                href={productLink}
                isGroupProduct={isGroupProduct}
                canRestockNotify={canRestockNotify}
                deliveryTypeNames={deliveryTypeNames}
                isBuyNow={isBuyNow}
                selectMainShortcut={() =>
                  selectProduct({
                    type: SHORTCUT_TYPE.CART,
                    index,
                    productNo: no,
                  })
                }
              >
                담기
              </Cart>
            )}
          </CartWrapper>
        </LinkInner>
      </MobileLink>
    </li>
  );
}
